/* game.js — screens, state, scoring, persistence. Vanilla JS, no build step. */

(function () {
  const L = window.WordWebLevels;
  let GAME; // set below, once `save` is loaded — see rebuildGame()
  // showTutorial() now spotlights real Home elements, so it forces
  // showHome() first (in case it was opened from elsewhere, e.g. Profile's
  // "How to play") — this guard stops that from re-triggering showHome()'s
  // own auto-launch of the tutorial (tutorialDone is still false while the
  // tour itself is running) into an infinite loop.
  let tutorialOpen = false;

  // Every exam a word can be tagged with (word.exam_lists), in a fixed
  // display order, and the accent hue each gets for its badge (see
  // .exam-badge in style.css) and its exam-focus toggle chip in Profile.
  // GRE keeps its original gold via the .exam-badge.gre CSS override.
  const EXAM_ORDER = ["GRE", "SAT", "ACT", "GMAT", "TOEFL", "IELTS"];
  const EXAM_HUES = { GRE: 45, SAT: 205, ACT: 140, GMAT: 275, TOEFL: 185, IELTS: 15 };
  // Only exams the dataset actually has tagged words for — keeps the
  // Profile screen from offering a toggle that can never do anything.
  function availableExams() {
    const present = (window.WORDWEB_DATA.meta && window.WORDWEB_DATA.meta.words_by_exam) || {};
    return EXAM_ORDER.filter((e) => present[e]);
  }
  // Renders one small pill per exam a word is tagged with, e.g. a word on
  // both GRE and SAT gets two badges side by side.
  function examBadges(word) {
    return (word.exam_lists || [])
      .slice()
      .sort((a, b) => EXAM_ORDER.indexOf(a) - EXAM_ORDER.indexOf(b))
      .map((e) => `<span class="exam-badge${e === "GRE" ? " gre" : ""}" style="--h:${EXAM_HUES[e] ?? 0}">${e}</span>`)
      .join("");
  }

  // The exam-toggle chips + select-all + status line — identical markup
  // and wiring whether they're shown inline in Profile or in the
  // Home-screen modal, so both just call these two.
  function examFilterGridHTML() {
    const exams = availableExams();
    const allSelected = exams.length > 0 && exams.every((e) => save.examFilter.includes(e));
    return `<div class="exam-filter-grid">
        ${exams
          .map((e) => {
            const on = save.examFilter.includes(e);
            return `<button class="btn exam-toggle${on ? " primary" : ""}" style="--h:${EXAM_HUES[e] ?? 0}" data-exam="${e}">${e}</button>`;
          })
          .join("")}
        ${exams.length > 1 ? `<button class="btn ghost" data-exam-select-all>${allSelected ? "Clear all" : "Select all"}</button>` : ""}
      </div>
      <p class="exam-filter-status">${
        save.examFilter.length
          ? `Playing ${GAME.meta.word_count} of ${window.WORDWEB_DATA.meta.word_count} words, tagged ${esc(save.examFilter.slice().sort().join(", "))}.`
          : `Playing all ${window.WORDWEB_DATA.meta.word_count} words.`
      }</p>`;
  }
  function wireExamFilterGrid(container, onChange) {
    container.querySelectorAll(".exam-toggle").forEach((btn) =>
      btn.addEventListener("click", () => {
        const exam = btn.dataset.exam;
        if (save.examFilter.includes(exam)) save.examFilter = save.examFilter.filter((e) => e !== exam);
        else save.examFilter.push(exam);
        persist();
        rebuildGame();
        if (window.WordWebSFX) window.WordWebSFX.tap();
        onChange();
      })
    );
    const selectAllBtn = container.querySelector("[data-exam-select-all]");
    if (selectAllBtn) {
      selectAllBtn.addEventListener("click", () => {
        const exams = availableExams();
        const allOn = exams.every((e) => save.examFilter.includes(e));
        save.examFilter = allOn ? [] : exams.slice();
        persist();
        rebuildGame();
        if (window.WordWebSFX) window.WordWebSFX.tap();
        onChange();
      });
    }
  }

  /* ---------- persistence ---------- */
  const SAVE_KEY = "wordweb_save_v1";
  const defaultSave = () => ({
    points: 0,
    bestStreak: 0,
    levels: {}, // levelId -> { completed, bestScore }
    roots: {}, // rootId -> { correct: {word:true}, decoded: bool }
    review: [], // { word, box, due } due = ms epoch
    constellations: {}, // localDateStr -> result { puzzleId, puzzleNum, type, stars, total, flickers, words, starGlyphs, completedAt }
    celebratedDomains: {}, // domainId -> true, so the supernova only fires once
    hearts: 5,
    heartsMax: 5,
    nextHeartAt: null, // ms epoch when next heart regenerates
    streakDays: 0,
    lastPlayDate: null, // dateStr
    soundOn: true,
    tutorialDone: false,
    hardMode: true, // "Pro mode" default: distractors prefer root-siblings over unrelated words
    bossDecoded: 0, // lifetime count of correctly-decoded boss words
    badges: {}, // badgeId -> ms epoch when unlocked
    badgesBackfilled: false, // true once existing progress has been checked once, silently
    currentRootId: null, // root of the level last started — the web view auto-focuses here
    examFilter: [], // exam ids to restrict play to (see EXAM_ORDER); empty = everything
  });
  let save = load();
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      const s = raw ? Object.assign(defaultSave(), JSON.parse(raw)) : defaultSave();
      // Migrate the old single-exam GRE-only toggle this replaced.
      if (s.greOnly && (!s.examFilter || !s.examFilter.length)) s.examFilter = ["GRE"];
      delete s.greOnly;
      return s;
    } catch (e) {
      return defaultSave();
    }
  }
  function persist() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    } catch (e) {}
  }

  // Exam-focus mode reduces the dataset to just words tagged with one of
  // save.examFilter's exams first (with a lower "own level" word threshold,
  // since most roots individually have too few tagged words to clear the
  // normal bar of 4) and prefixes level ids with the exact filter combo so
  // they never collide with a level of the same domain/root built from a
  // different word set — either normal mode's, or a different exam
  // selection's. Anything that needs "every root/word in play" should read
  // it off GAME (.roots, .words, .root_word_index) rather than
  // window.WORDWEB_DATA directly, or it'll silently ignore the mode.
  function rebuildGame() {
    const filter = save.examFilter && save.examFilter.length ? save.examFilter : null;
    GAME = filter
      ? L.buildGame(L.filterByExams(window.WORDWEB_DATA, filter), {
          bigThreshold: 2,
          idPrefix: "exam:" + filter.slice().sort().join(",") + "::",
        })
      : L.buildGame(window.WORDWEB_DATA);
  }
  rebuildGame();

  /* ---------- helpers ---------- */
  const $ = (sel) => document.querySelector(sel);
  const app = $("#app");
  const rng = Math.random;
  const todayStr = () => new Date().toISOString().slice(0, 10);
  const DAY = 24 * 60 * 60 * 1000;
  // Tonight's Constellation is indexed by the player's LOCAL calendar date,
  // Wordle-style, so it flips at their own midnight and everyone on the same
  // date gets the same puzzle — deliberately separate from todayStr()/DAY
  // above (UTC-based, used for streaks), which stay as they are.
  const localDateStr = (d) => {
    d = d || new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${m}-${day}`;
  };
  const CONSTELLATION_EPOCH = new Date(2026, 0, 1); // local Jan 1 2026 = puzzle #1
  const daysSinceEpochLocal = (d) => {
    d = d || new Date();
    const midnight = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const epoch = CONSTELLATION_EPOCH.getTime();
    return Math.floor((midnight - epoch) / DAY);
  };
  const REVISION_COUNT = 12; // number of words in revision mode
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function rootState(rootId) {
    return (save.roots[rootId] = save.roots[rootId] || { correct: {}, decoded: false });
  }
  function rootMastered(rootId) {
    const level = GAME.domains.flatMap((d) => d.levels).find((lv) => lv.roots.includes(rootId) && lv.kind === "root");
    const rs = rootState(rootId);
    if (level) {
      const all = level.teachWords.every((w) => rs.correct[w.key || w.word]);
      const dec = level.decodeWords.length === 0 || rs.decoded;
      return all && dec;
    }
    // bundled root: mastered when all its words answered correctly.
    // root_word_index stores keys (unique per sense), so this is already
    // consistent with however rs.correct[] gets written elsewhere. Reads
    // off GAME (not window.WORDWEB_DATA) so GRE-only mode only requires
    // the root's GRE-flagged words, not its full normal-mode word list.
    const words = GAME.root_word_index[rootId] || [];
    return words.length > 0 && words.every((k) => rs.correct[k]);
  }
  function levelProgress(level) {
    const seen = new Set();
    let done = 0;
    level.teachWords.forEach((w) => {
      const key = w.key || w.word;
      level.roots.forEach((r) => {
        if (rootState(r).correct[key] && !seen.has(key)) {
          seen.add(key);
          done++;
        }
      });
    });
    return { done, total: level.teachWords.length };
  }
  function domainMastery(dom) {
    const mastered = dom.rootIds.filter(rootMastered).length;
    return { mastered, total: dom.rootIds.length };
  }
  function dueReviews() {
    const now = Date.now();
    return save.review.filter((r) => r.due <= now);
  }

  /* ---------- achievements ---------- */
  // Each badge is a pure predicate over a small snapshot of save state
  // (achievementContext), so checking them is cheap enough to call after
  // every point-awarding action without worrying about ordering.
  const ACHIEVEMENTS = [
    { id: "first-root", icon: "🌱", title: "First Root", desc: "Master your first root.", check: (c) => c.masteredRoots >= 1 },
    { id: "root-5", icon: "🌿", title: "Root Runner", desc: "Master 5 roots.", check: (c) => c.masteredRoots >= 5 },
    { id: "root-25", icon: "🌳", title: "Rooted", desc: "Master 25 roots.", check: (c) => c.masteredRoots >= 25 },
    { id: "root-all", icon: "🌌", title: "Deep Rooted", desc: "Master every root in the game.", check: (c) => c.masteredRoots >= c.totalRoots && c.totalRoots > 0 },
    { id: "domain-1", icon: "✦", title: "Galaxy Charted", desc: "Fully master a whole domain.", check: (c) => c.domainsMastered >= 1 },
    { id: "decode-1", icon: "🔓", title: "First Decode", desc: "Decode a boss word cold.", check: (c) => c.bossDecoded >= 1 },
    { id: "decode-10", icon: "🧩", title: "Codebreaker", desc: "Decode 10 boss words.", check: (c) => c.bossDecoded >= 10 },
    { id: "streak-3", icon: "🔥", title: "Warming Up", desc: "Play 3 days in a row.", check: (c) => c.streakDays >= 3 },
    { id: "streak-7", icon: "🔥", title: "Week One", desc: "Play 7 days in a row.", check: (c) => c.streakDays >= 7 },
    { id: "streak-30", icon: "🔥", title: "Committed", desc: "Play 30 days in a row.", check: (c) => c.streakDays >= 30 },
    { id: "words-50", icon: "📖", title: "Word Hoarder", desc: "Learn 50 words.", check: (c) => c.learnedWords >= 50 },
    { id: "words-150", icon: "📚", title: "Lexicon Builder", desc: "Learn 150 words.", check: (c) => c.learnedWords >= 150 },
    { id: "points-1000", icon: "💎", title: "1000 Points", desc: "Earn 1000 points total.", check: (c) => c.points >= 1000 },
  ];
  function achievementContext() {
    const allRoots = GAME.domains.flatMap((d) => d.rootIds);
    const learned = new Set();
    Object.values(save.roots).forEach((rs) => Object.keys(rs.correct).forEach((w) => learned.add(w)));
    return {
      masteredRoots: allRoots.filter(rootMastered).length,
      totalRoots: allRoots.length,
      learnedWords: learned.size,
      bossDecoded: save.bossDecoded || 0,
      domainsMastered: Object.keys(save.celebratedDomains).length,
      streakDays: save.streakDays,
      points: save.points,
    };
  }
  // Evaluates every not-yet-earned badge and unlocks any that now pass.
  // `silent` skips the toast/confetti/sound — used once on load to backfill
  // badges for progress made before this feature shipped, so a returning
  // player isn't hit with a wall of toasts for things they did last month.
  function checkAchievements(silent) {
    save.badges = save.badges || {};
    const ctx = achievementContext();
    const newly = ACHIEVEMENTS.filter((a) => !save.badges[a.id] && a.check(ctx));
    if (!newly.length) return;
    newly.forEach((a) => (save.badges[a.id] = Date.now()));
    persist();
    if (!silent) showBadgeToast(newly);
  }
  function showBadgeToast(list) {
    let i = 0;
    function next() {
      if (i >= list.length) return;
      const a = list[i++];
      const el = document.createElement("div");
      el.className = "badge-toast";
      el.innerHTML = `<span class="badge-toast-icon">${a.icon}</span>
        <span class="badge-toast-text"><span class="badge-toast-label">Badge unlocked</span><span class="badge-toast-title">${esc(a.title)}</span></span>`;
      document.body.appendChild(el);
      requestAnimationFrame(() => el.classList.add("show"));
      if (window.WordWebSFX) window.WordWebSFX.levelup();
      setTimeout(() => confettiBurst(el), 120);
      setTimeout(() => {
        el.classList.remove("show");
        setTimeout(() => {
          el.remove();
          next();
        }, 320);
      }, 2200);
    }
    next();
  }

  /* ---------- hearts ---------- */
  const HEART_REGEN_MS = 4 * 60 * 60 * 1000; // one heart every 4 hours
  function refreshHearts() {
    if (save.hearts >= save.heartsMax) {
      save.nextHeartAt = null;
      return;
    }
    if (!save.nextHeartAt) {
      save.nextHeartAt = Date.now() + HEART_REGEN_MS;
      return;
    }
    let now = Date.now();
    while (save.nextHeartAt <= now && save.hearts < save.heartsMax) {
      save.hearts++;
      save.nextHeartAt += HEART_REGEN_MS;
    }
    if (save.hearts >= save.heartsMax) save.nextHeartAt = null;
  }
  function loseHeart() {
    save.hearts = Math.max(0, save.hearts - 1);
    if (!save.nextHeartAt) save.nextHeartAt = Date.now() + HEART_REGEN_MS;
    persist();
  }
  function gainHeart() {
    if (save.hearts < save.heartsMax) {
      save.hearts++;
      if (save.hearts >= save.heartsMax) save.nextHeartAt = null;
      persist();
    }
  }
  function heartTimeLeft() {
    if (!save.nextHeartAt) return "";
    const ms = Math.max(0, save.nextHeartAt - Date.now());
    const m = Math.ceil(ms / 60000);
    const h = Math.floor(m / 60);
    return h > 0 ? `${h}h ${m % 60}m` : `${m}m`;
  }

  /* ---------- daily streak ---------- */
  function touchStreak() {
    const today = todayStr();
    if (save.lastPlayDate === today) return;
    const yesterday = new Date(Date.now() - DAY).toISOString().slice(0, 10);
    save.streakDays = save.lastPlayDate === yesterday ? save.streakDays + 1 : 1;
    save.lastPlayDate = today;
    persist();
  }

  /* ---------- juice: celebration + shake ---------- */
  function confettiBurst(originEl) {
    const rect = originEl ? originEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 3, width: 0 };
    const cx = rect.left + rect.width / 2;
    const cy = rect.top;
    const colors = ["#e8b64c", "#4cc27a", "#7aa2e0", "#e07a9c", "#f4f1ea"];
    for (let i = 0; i < 22; i++) {
      const p = document.createElement("span");
      p.className = "confetti-bit";
      const angle = Math.random() * Math.PI - Math.PI / 2 - Math.PI / 2;
      const dist = 60 + Math.random() * 120;
      p.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      p.style.setProperty("--dy", Math.sin(angle) * dist - 40 + "px");
      p.style.setProperty("--rot", Math.round(Math.random() * 720 - 360) + "deg");
      p.style.left = cx + "px";
      p.style.top = cy + "px";
      p.style.background = colors[i % colors.length];
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }
  }
  function shakeEl(el) {
    el.classList.remove("shake");
    void el.offsetWidth; // restart animation
    el.classList.add("shake");
  }
  function popEl(el) {
    el.classList.remove("pop");
    void el.offsetWidth;
    el.classList.add("pop");
  }
  // Counts a number up from `from` to `to` over `dur`ms — used for the XP
  // tally on the lesson-complete screen. Snaps straight to the end value
  // under reduced motion.
  function animateCount(el, from, to, dur) {
    if (!el) return;
    if ((window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) || !dur) {
      el.textContent = to;
      return;
    }
    const t0 = performance.now();
    function step(t) {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const ENCOURAGE = ["Nice!", "Got it.", "Exactly right.", "You know this one.", "Clean.", "Nailed it."];
  const CONSOLE_LINES = ["Not this time.", "Close — check the roots below.", "That one's tricky.", "Filed for review."];
  function reactionLine(correct) {
    const arr = correct ? ENCOURAGE : CONSOLE_LINES;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ---------- tutorial (card modal) ---------- */
  function showTutorial() {
    // Several steps spotlight a real Home element (the domain cards, the
    // quest-row bubbles, the Web tab), so Home has to actually be what's
    // rendered underneath — "How to play" can be tapped from Profile,
    // where none of those exist. tutorialOpen guards against the
    // re-entrant loop this would otherwise cause (see its declaration).
    tutorialOpen = true;
    showHome();

    const steps = [
      {
        icon: "✳",
        title: "Welcome to Word Web",
        body: "Master Greek and Latin roots — the building blocks of thousands of English words. Learn a root and you can <b>decode words you've never seen before</b>.",
        visual: `<div class="tut-visual tut-visual-welcome">
          <span class="tut-root-chip" style="--h:220">aud</span><span class="tut-arrow">→</span>
          <span class="tut-word-chip">audible</span>
          <span class="tut-word-chip">audience</span>
          <span class="tut-word-chip">auditorium</span>
        </div>`,
      },
      {
        icon: "🌌",
        title: "Pick a Domain",
        target: "[data-system]",
        body: "Each galaxy is a domain of roots. Tap one to explore its levels — smaller galaxies are a good place to start.",
      },
      {
        icon: "⚡",
        title: "Three Quiz Phases",
        body: "<b>Discover</b> — read the root card and learn its meaning.<br><b>Match</b> — pick the word built from that root. Skip the hint for double points!<br><b>Decode</b> — crack a boss word cold. Worth 50 points.",
        visual: `<div class="tut-visual tut-visual-phases">
          <div class="tut-phase"><span class="tut-phase-icon">📖</span> Discover</div>
          <span class="tut-arrow">→</span>
          <div class="tut-phase"><span class="tut-phase-icon">⚡</span> Match</div>
          <span class="tut-arrow">→</span>
          <div class="tut-phase"><span class="tut-phase-icon">🔓</span> Decode</div>
        </div>`,
      },
      {
        icon: "🌌",
        title: "Tonight's Constellation",
        target: ".quest-row",
        body: "A new chain of linked words every night, same for everyone. Pick correctly and a star ignites. <b>Bridge Run</b> and <b>Review Sprint</b> live under the Practice tab below.",
      },
      {
        icon: "⬡",
        title: "Your Knowledge Web",
        target: '[data-nav="web"]',
        body: "Every root is a node — roots that share a word are linked. It grows in real time as you learn, right here.",
        visual: `<svg viewBox="0 0 120 54" width="120" height="54" class="tut-mini-web">
          <line x1="60" y1="27" x2="24" y2="14" stroke="#2a3868" stroke-width="1.2"/>
          <line x1="60" y1="27" x2="96" y2="14" stroke="#2a3868" stroke-width="1.2"/>
          <line x1="60" y1="27" x2="38" y2="44" stroke="#2a3868" stroke-width="1.2"/>
          <line x1="60" y1="27" x2="86" y2="44" stroke="#2a3868" stroke-width="1.2"/>
          <circle cx="60" cy="27" r="8" fill="hsl(220 60% 50%)" stroke="hsl(220 60% 75%)" stroke-width="1.2"/>
          <circle cx="24" cy="14" r="4" fill="#4cc27a" stroke="#9fe0b8" stroke-width="1"/>
          <circle cx="96" cy="14" r="4" fill="#4cc27a" stroke="#9fe0b8" stroke-width="1"/>
          <circle cx="38" cy="44" r="4" fill="#e8b64c" stroke="#fff0c9" stroke-width="1"/>
          <circle cx="86" cy="44" r="4" fill="#4cc27a" stroke="#9fe0b8" stroke-width="1"/>
        </svg>`,
      },
      {
        icon: "🎓",
        title: "Studying for a Specific Exam?",
        target: ".examfocus-bubble",
        body: "Words are tagged for real vocabulary lists — <b>GRE, SAT, ACT, GMAT, TOEFL, IELTS</b>. Tap here to filter play to any combination.",
      },
      {
        icon: "★",
        title: "Ready to begin?",
        body: "Start with <b>Kinship &amp; Gender</b> — the smallest domain, just 6 roots. Answer without the hint for full points.<br><br>Good luck! ✳",
        visual: "",
      },
    ];

    let step = 0;
    const overlay = document.createElement("div");

    // Parks the callout below the spotlighted element if there's room,
    // above it otherwise, clamped so it never runs off the viewport edge.
    function placeCallout(card, rect) {
      const margin = 14;
      const cw = Math.min(300, window.innerWidth - margin * 2);
      card.style.maxWidth = cw + "px";
      card.style.left = Math.max(margin, Math.min(rect.left, window.innerWidth - cw - margin)) + "px";
      const roomBelow = window.innerHeight - rect.bottom;
      const cardH = card.offsetHeight || 160;
      card.style.top =
        roomBelow > cardH + margin * 2
          ? rect.bottom + margin + "px"
          : Math.max(margin, rect.top - cardH - margin) + "px";
    }

    function render() {
      const s = steps[step];
      const isLast = step === steps.length - 1;
      const target = s.target ? document.querySelector(s.target) : null;
      const navHTML = `<div class="tut-step-line">
          ${steps.map((_, i) => `<span class="tutorial-dot${i === step ? " active" : ""}"></span>`).join("")}
        </div>
        <span class="tutorial-icon">${s.icon}</span>
        <h2 class="tutorial-title">${s.title}</h2>
        ${s.visual || ""}
        <p class="tutorial-body">${s.body}</p>
        <div class="tutorial-nav">
          <button class="tut-skip">${isLast ? "" : "Skip"}</button>
          <button class="btn primary tut-next">${isLast ? "Let's go! ★" : "Next →"}</button>
        </div>`;

      // A step with a real target spotlights it in place (a gold-ring
      // cutout dimming everything else, via an oversized box-shadow — see
      // .tut-spotlight-hole) with a small callout parked beside it, rather
      // than a centered card describing it in prose. Falls back to the
      // plain card if the target isn't actually in the DOM for some
      // reason, so a step never renders empty.
      if (target) {
        overlay.className = "tut-spotlight-overlay";
        const r = target.getBoundingClientRect();
        const pad = 8;
        overlay.innerHTML = `<div class="tut-spotlight-hole" style="left:${r.left - pad}px;top:${r.top - pad}px;width:${r.width + pad * 2}px;height:${r.height + pad * 2}px"></div>
          <div class="tut-callout">${navHTML}</div>`;
        placeCallout(overlay.querySelector(".tut-callout"), r);
      } else {
        overlay.className = "tutorial-backdrop";
        overlay.innerHTML = `<div class="tutorial-card">${navHTML}</div>`;
      }

      overlay.querySelector(".tut-next").addEventListener("click", () => {
        if (isLast) closeTutorial();
        else { step++; render(); }
      });
      const skipBtn = overlay.querySelector(".tut-skip");
      if (skipBtn && skipBtn.textContent) skipBtn.addEventListener("click", closeTutorial);
    }

    function closeTutorial() {
      save.tutorialDone = true;
      tutorialOpen = false;
      persist();
      overlay.classList.add("tutorial-fade-out");
      setTimeout(() => overlay.remove(), 320);
    }

    render();
    document.body.appendChild(overlay);
  }

  // The exam-focus picker as a modal — opened by tapping the Home-screen
  // bubble, so switching exams doesn't require leaving the map. Reuses
  // the tutorial's overlay chrome/animation but as a single static card,
  // not a step wizard, and always re-renders showHome() underneath on
  // close so the bubble text and mastery stats reflect whatever changed.
  function showExamFocusModal() {
    const overlay = document.createElement("div");
    overlay.className = "examfocus-backdrop";

    function render() {
      overlay.innerHTML = `<div class="examfocus-card">
        <button class="web-panel-close" aria-label="Close">×</button>
        <span class="tutorial-icon">🎓</span>
        <h2 class="tutorial-title">Exam focus</h2>
        <p class="tutorial-body">Show only words that appear on real vocabulary lists for these exams — fewer words per root, so some lessons run leaner and a few roots sit out entirely. Leave everything unchecked to play the full set.</p>
        ${examFilterGridHTML()}
      </div>`;
      overlay.querySelector(".web-panel-close").addEventListener("click", close);
      wireExamFilterGrid(overlay, render);
    }

    function close() {
      overlay.classList.add("tutorial-fade-out");
      setTimeout(() => {
        overlay.remove();
        showHome();
      }, 320);
    }

    overlay.addEventListener("click", (ev) => {
      if (ev.target === overlay) close();
    });

    render();
    document.body.appendChild(overlay);
  }

  /* ---------- quiz knowledge graph ---------- */
  function initQuizGraph(level) {
    if (graphSim) { graphSim.stop(); graphSim = null; }
    const dom = GAME.domains.find((d) => d.id === level.domain);
    const hue = dom ? dom.hue : 220;
    run.graph = {
      nodes: level.roots.map((rid) => {
        const r = GAME.rootsById[rid];
        return { id: "root:" + rid, rid, label: r.root.split(",")[0].trim(), type: "root", hue };
      }),
      rawLinks: [],
    };
  }

  function addWordToGraph(word, isDecode) {
    if (!run || !run.graph) return;
    const wid = "word:" + (word.key || word.word);
    if (run.graph.nodes.some((n) => n.id === wid)) return;
    const parentRids = (word.roots || []).filter((rid) =>
      run.graph.nodes.some((n) => n.id === "root:" + rid)
    );
    const anchorNode =
      parentRids.length
        ? run.graph.nodes.find((n) => n.id === "root:" + parentRids[0])
        : run.graph.nodes[0];
    const newNode = {
      id: wid,
      label: word.word,
      type: isDecode ? "decode" : "word",
      hue: isDecode ? 43 : 140,
      isNew: true,
      x: anchorNode && anchorNode.x != null ? anchorNode.x + (Math.random() - 0.5) * 20 : null,
      y: anchorNode && anchorNode.y != null ? anchorNode.y + (Math.random() - 0.5) * 20 : null,
    };
    run.graph.nodes.push(newNode);
    if (parentRids.length) {
      parentRids.forEach((rid) => run.graph.rawLinks.push({ s: wid, t: "root:" + rid }));
    } else if (run.graph.nodes.length > 1) {
      run.graph.rawLinks.push({ s: wid, t: run.graph.nodes[0].id });
    }
  }

  function renderQuizGraph() {
    const el = document.getElementById("quiz-graph");
    if (!el || !run || !run.graph || typeof d3 === "undefined") return;
    if (graphSim) { graphSim.stop(); graphSim = null; }
    const W = 420, H = 150;
    el.innerHTML = "";
    const svg = d3.select(el).append("svg")
      .attr("viewBox", `0 0 ${W} ${H}`)
      .attr("width", "100%").attr("height", H);
    svg.append("text").attr("x", 10).attr("y", 13)
      .attr("font-size", 7.5).attr("font-family", '"IBM Plex Mono", monospace')
      .attr("fill", "#252e50").attr("letter-spacing", 1.2).text("knowledge web");
    const g = svg.append("g");
    const { nodes } = run.graph;
    const links = run.graph.rawLinks.map((l) => ({ source: l.s, target: l.t }));

    function rOf(d) { return d.type === "root" ? 11 : d.type === "decode" ? 9 : 5; }

    graphSim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id).distance(52).strength(0.9))
      .force("charge", d3.forceManyBody().strength(-65))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide((d) => rOf(d) + 5))
      .alphaDecay(0.05);

    const linkSel = g.selectAll("line").data(links).join("line")
      .attr("stroke", "#252e50").attr("stroke-width", 1.3).attr("stroke-opacity", 0.9);

    const nodeSel = g.selectAll("circle").data(nodes, (d) => d.id).join("circle")
      .attr("fill", (d) => d.type === "root" ? `hsl(${d.hue} 60% 55%)` : d.type === "decode" ? "var(--gold)" : "#4cc27a")
      .attr("stroke", (d) => d.type === "root" ? `hsl(${d.hue} 60% 78%)` : d.type === "decode" ? "#fff0c9" : "#9fe0b8")
      .attr("stroke-width", 1.5)
      .attr("r", (d) => d.isNew ? 0 : rOf(d));

    nodeSel.filter((d) => d.isNew)
      .transition().duration(450).ease(d3.easeElasticOut.amplitude(0.8).period(0.35))
      .attr("r", rOf)
      .on("end", function (_, d) { if (d) d.isNew = false; });

    const labelSel = g.selectAll("text.ql").data(nodes, (d) => d.id).join("text")
      .attr("class", "ql")
      .attr("text-anchor", "middle")
      .attr("font-family", '"IBM Plex Mono", monospace')
      .attr("font-size", (d) => d.type === "root" ? 8.5 : 7)
      .attr("fill", (d) => d.type === "root" ? "#c8c2b4" : d.type === "decode" ? "var(--gold)" : "#9fe0b8")
      .attr("pointer-events", "none")
      .attr("opacity", (d) => d.isNew ? 0 : 1)
      .text((d) => d.label);

    labelSel.filter((d) => d.isNew)
      .transition().delay(200).duration(300).attr("opacity", 1);

    graphSim.on("tick", () => {
      nodes.forEach((n) => {
        n.x = Math.max(rOf(n) + 4, Math.min(W - rOf(n) - 4, n.x));
        n.y = Math.max(rOf(n) + 18, Math.min(H - rOf(n) - 4, n.y));
      });
      linkSel
        .attr("x1", (d) => d.source.x).attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x).attr("y2", (d) => d.target.y);
      nodeSel.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      labelSel.attr("x", (d) => d.x).attr("y", (d) => d.y + rOf(d) + 10);
    });
  }

  function miniConstellationSVG(dom, kind) {
    const W = 160, H = 70;
    const cx = W / 2, cy = H / 2;
    const idx = window.WORDWEB_DATA.root_word_index;

    const pts = dom.rootIds.map((rid, j) => {
      const wordBoost = Math.min(2.2, Math.sqrt((idx[rid] || []).length) * 0.75);
      const m = rootMastered(rid);
      let x, y, arm = 0;
      if (kind === "spiral") {
        // Two arms: roots alternate between them, angle and radius both
        // growing along each arm, so the stars actually trace a spiral —
        // the CSS glow just lights the shape they draw, instead of a random
        // scatter sitting inside an unrelated spiral-shaped blob.
        arm = j % 2;
        const t = Math.floor(j / 2);
        const jitter = ((L.hash(rid + "sj") % 100) / 100 - 0.5) * 0.4;
        const angle = (arm ? Math.PI : 0) + t * 0.85 + jitter;
        const radius = 5 + t * 6.5 + (L.hash(rid + "sr") % 4);
        x = cx + Math.cos(angle) * radius;
        y = cy + Math.sin(angle) * (radius * 0.62);
      } else if (kind === "cluster") {
        // Denser toward the center, tapering off — a real cluster's
        // profile — via a squared radius falloff instead of a flat scatter.
        const a = (L.hash(rid) % 360) * (Math.PI / 180);
        const rt = (L.hash(rid + "r") % 100) / 100;
        const r = 4 + rt * rt * 26;
        x = cx + Math.cos(a + j) * r;
        y = cy + Math.sin(a + j) * (r * 0.6);
      } else {
        // nebula: loose, even scatter — a diffuse cloud, no organized shape
        const a = (L.hash(rid) % 360) * (Math.PI / 180);
        const r = 12 + (L.hash(rid + "r") % 24);
        x = cx + Math.cos(a + j) * r;
        y = cy + Math.sin(a + j) * (r * 0.6);
      }
      return {
        x: Math.min(W - 8, Math.max(8, x)),
        y: Math.min(H - 8, Math.max(8, y)),
        arm,
        m,
        radius: (m ? 3.4 : 2) + wordBoost,
      };
    });

    let out = `<svg viewBox="0 0 ${W} ${H}" class="mini-sky" aria-hidden="true">`;
    // A scatter of small unconnected background stars — pure texture, no
    // meaning — so the field reads as a dense starscape rather than a bare
    // wireframe of just the taught roots. Deterministic per domain, so it's
    // stable across re-renders instead of jittering on every screen visit.
    for (let k = 0; k < 26; k++) {
      const bx = ((L.hash(dom.id + "bgx" + k) % 1000) / 1000) * (W - 8) + 4;
      const by = ((L.hash(dom.id + "bgy" + k) % 1000) / 1000) * (H - 8) + 4;
      const br = 0.35 + ((L.hash(dom.id + "bgr" + k) % 100) / 100) * 0.85;
      out += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${br.toFixed(2)}" class="bg-star" style="--h:${dom.hue}"/>`;
    }
    if (kind === "spiral") {
      // Connect each arm's own points in outward order — connecting by
      // plain index would zigzag between the two arms instead of tracing
      // either of them.
      [0, 1].forEach((armId) => {
        const armPts = pts.filter((p) => p.arm === armId);
        for (let j = 1; j < armPts.length; j++) {
          out += `<line x1="${armPts[j - 1].x.toFixed(1)}" y1="${armPts[j - 1].y.toFixed(1)}" x2="${armPts[j].x.toFixed(1)}" y2="${armPts[j].y.toFixed(1)}" class="sky-line" style="--h:${dom.hue}"/>`;
        }
      });
    } else {
      for (let j = 1; j < pts.length; j++) {
        out += `<line x1="${pts[j - 1].x.toFixed(1)}" y1="${pts[j - 1].y.toFixed(1)}" x2="${pts[j].x.toFixed(1)}" y2="${pts[j].y.toFixed(1)}" class="sky-line" style="--h:${dom.hue}"/>`;
      }
    }
    pts.forEach((p, j) => {
      out += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.radius.toFixed(1)}" class="star ${p.m ? "lit mini-lit" : "dim"}" style="--h:${dom.hue};--i:${j}"/>`;
    });
    out += `</svg>`;
    return out;
  }

  /* ---------- screens ---------- */
  function header() {
    refreshHearts();
    // Each top-level screen redraws its own chrome; these default off and
    // whichever screen wants them re-adds them right after this returns.
    document.body.classList.remove("web-open");
    document.body.classList.remove("has-tabbar");
    document.body.classList.remove("has-sticky-next");
    const hearts = Array.from({ length: save.heartsMax }, (_, i) =>
      i < save.hearts ? '<span class="heart full">♥</span>' : '<span class="heart empty">♡</span>'
    ).join("");
    // A persistent reminder that exam-focus mode is on, visible on every
    // screen (not just Home, where the quest-row bubble already shows it) —
    // tapping it opens the same picker modal. Absent entirely when no
    // filter is set, so its mere presence is the signal.
    const examBadge = save.examFilter.length
      ? `<button class="header-exam-badge" data-nav="examfocus" title="Exam focus: ${esc(save.examFilter.slice().sort().join(", "))} — tap to change">
          🎓 ${esc(save.examFilter.length > 1 ? save.examFilter[0] + " +" + (save.examFilter.length - 1) : save.examFilter[0])}
        </button>`
      : "";
    return `<header class="top">
      <div class="header-left">
        <div class="brand" data-nav="home"><span class="brand-mark">✳</span> Word Web</div>
        ${examBadge}
      </div>
      <div class="stats">
        <span class="streak-pill" title="Day streak">🔥 ${save.streakDays}</span>
        <span class="hearts" title="${save.hearts < save.heartsMax ? "Next heart in " + heartTimeLeft() : "Full hearts"}">${hearts}</span>
        <span title="Total points">${save.points} pts</span>
        <button class="sound-toggle" data-nav="sound" title="${save.soundOn ? "Mute" : "Unmute"} sound">${save.soundOn ? "🔊" : "🔇"}</button>
      </div>
    </header>`;
  }

  /* Map / Practice / Web / You — the app's one persistent nav surface.
     Only shown on the four hub screens; hidden during quizzes, review,
     the daily word, bridge runs and the domain path so focused tasks
     keep the full screen. */
  function tabBarHTML(active) {
    const tabs = [
      { id: "home", icon: "🗺️", label: "Map" },
      { id: "practice", icon: "🎯", label: "Practice" },
      { id: "web", icon: "⬡", label: "Web" },
      { id: "you", icon: "👤", label: "You" },
    ];
    return `<nav class="tabbar">${tabs
      .map(
        (t) => `<button class="tab${t.id === active ? " active" : ""}" data-nav="${t.id}">
          <span class="tab-icon">${t.icon}</span><span class="tab-label">${t.label}</span><span class="tab-dot"></span>
        </button>`
      )
      .join("")}</nav>`;
  }

  function showHome() {
    touchStreak();
    const todayDay = todaysDayRec();
    const todayConst = primaryRun(todayDay);
    const bothDone = !!(todayDay && todayDay.mc && todayDay.assembly);
    const otherModeAvailable = !!todayDay && !bothDone && (todayDay.mc ? !!todaysAssemblyPuzzle() : true);
    const masteredRoots = GAME.domains.reduce((acc, d) => acc + d.rootIds.filter((rid) => rootMastered(rid)).length, 0);
    const masteryPct = GAME.meta.root_count ? Math.round((100 * masteredRoots) / GAME.meta.root_count) : 0;
    // The first not-yet-mastered domain gets the "continue" nudge — every
    // system stays tappable regardless, nothing is ever locked.
    const nextDomain = GAME.domains.find((d) => {
      const m = domainMastery(d);
      return m.mastered < m.total;
    });
    // Size still comes from how many roots a domain has.
    const rootCounts = GAME.domains.map((d) => d.rootIds.length);
    const minRoots = Math.min(...rootCounts);
    const maxRoots = Math.max(...rootCounts);
    const KINDS = ["cluster", "spiral", "nebula"];
    const LEANS = ["flex-start", "center", "flex-end"];

    // Two columns only make sense once there's actually room for both a
    // big card AND slack left over for the lean below — on a phone-width
    // screen that's a contradiction (halving the width either shrinks the
    // galaxies or flattens the stagger), so two columns only kick in once
    // the viewport is wide enough that each column gets it all anyway.
    // Single column keeps domains in curriculum order; two explicit flex
    // columns (not CSS column-count, which doesn't reliably handle the
    // tap-to-expand panel growing after layout) balanced by estimated
    // height give the two-column case its stagger.
    const numCols = window.innerWidth >= 620 ? 2 : 1;
    const domainMeta = GAME.domains.map((dom) => {
      const sizeT = maxRoots > minRoots ? (dom.rootIds.length - minRoots) / (maxRoots - minRoots) : 0.5;
      const fieldW = Math.round(105 + sizeT * 85); // 105–190px
      const fieldH = (fieldW * 70) / 160;
      const kind = KINDS[L.hash(dom.id + "kind") % KINDS.length];
      const lean = LEANS[L.hash(dom.id + "lean") % LEANS.length];
      return { dom, fieldW, kind, lean, estHeight: fieldH + 96 };
    });
    const columns = numCols === 1 ? [domainMeta] : [[], []];
    if (numCols === 2) {
      const colHeights = [0, 0];
      domainMeta.forEach((meta) => {
        const c = colHeights[0] <= colHeights[1] ? 0 : 1;
        columns[c].push(meta);
        colHeights[c] += meta.estHeight;
      });
    }

    const renderCell = ({ dom, fieldW, kind, lean }) => {
      const m = domainMastery(dom);
      const isMastered = m.total > 0 && m.mastered === m.total;
      const isNext = !!nextDomain && dom.id === nextDomain.id;
      return `<div class="system-cell" style="align-items:${lean}">
          <button class="system ${kind} ${isMastered ? "mastered" : ""} ${isNext ? "next" : ""}" style="--h:${dom.hue}" data-system="${dom.id}">
            <span class="system-field" style="width:${fieldW}px">
              <span class="system-halo"></span>
              <span class="system-glow"></span>
              ${kind === "spiral" ? '<span class="system-arm"></span><span class="system-arm2"></span>' : ""}
              <span class="system-core"></span>
              ${isMastered ? '<span class="system-flag">★</span>' : ""}
              ${miniConstellationSVG(dom, kind)}
            </span>
            <span class="system-name">${esc(dom.name)}</span>
            ${isNext ? '<span class="system-start-tag">continue</span>' : `<span class="system-meta">${m.mastered}/${m.total} mastered</span>`}
          </button>
          <div class="system-expand" id="exp-${dom.id}">
            <div class="system-expand-inner" style="--h:${dom.hue}">
              <div class="system-expand-head">
                <span class="root-name" style="font-size:19px;font-weight:700">${esc(dom.name)}</span>
                <span class="pct">${m.mastered}/${m.total} mastered</span>
              </div>
              <div class="system-levels">${dom.levels
                .map((lv) => {
                  const st = save.levels[lv.id];
                  const done = !!(st && st.completed);
                  return `<span class="system-level-chip ${done ? "done" : ""}">${esc(lv.title)}${done ? " ✓" : ""}</span>`;
                })
                .join("")}</div>
              <button class="system-enter-btn" data-domain="${dom.id}" style="--h:${dom.hue}">Enter galaxy</button>
            </div>
          </div>
        </div>`;
    };

    app.innerHTML = `${header()}
      <section class="hero">
        <div class="hero-progress">
          <div class="hero-progress-labels">
            <span class="hero-mastered-num">${masteredRoots}</span><span class="hero-mastered-label"> of ${GAME.meta.root_count} roots mastered</span>
            <span class="hero-pct">${masteryPct}%</span>
          </div>
          <div class="hero-bar"><div class="hero-bar-fill" style="width:${masteryPct}%"></div></div>
        </div>
      </section>
      <div class="quest-row">
        ${
          todayConst
            ? `<button class="quest-bubble done" data-nav="constellation">
                <span class="qb-icon">🌌</span>
                <span class="qb-text">
                  <span class="qb-label">Tonight's Constellation</span>
                  <span class="qb-word">${todayConst.stars}/${todayConst.total} stars — ${bothDone ? "both modes done" : otherModeAvailable ? "try the other mode?" : "revisit"}</span>
                </span>
              </button>`
            : `<button class="quest-bubble" data-nav="constellation">
                <span class="qb-icon">🌌</span>
                <span class="qb-text">
                  <span class="qb-label">Tonight's Constellation</span>
                  <span class="qb-word">New tonight ✨</span>
                </span>
                <span class="qb-go">›</span>
              </button>`
        }
        <button class="quest-bubble examfocus-bubble${save.examFilter.length ? " active" : ""}" data-open-examfocus>
          <span class="qb-icon">🎓</span>
          <span class="qb-text">
            <span class="qb-label">Exam focus</span>
            <span class="qb-word">${save.examFilter.length ? esc(save.examFilter.slice().sort().join(", ")) : "No exam selected"}</span>
          </span>
          <span class="qb-go">›</span>
        </button>
      </div>
      <div class="journey">
        ${columns.map((col) => `<div class="journey-col">${col.map(renderCell).join("")}</div>`).join("")}
      </div>
      <footer class="foot">Progress is saved in this browser.</footer>
      <div class="warp-flash" id="warp-flash"></div>
      ${tabBarHTML("home")}`;

    app.querySelectorAll("[data-system]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const expand = document.querySelector("#exp-" + btn.dataset.system);
        const wasOpen = expand.classList.contains("open");
        app.querySelectorAll(".system-expand.open").forEach((el) => el.classList.remove("open"));
        if (!wasOpen) expand.classList.add("open");
      })
    );
    app.querySelectorAll("[data-domain]").forEach((el) =>
      el.addEventListener("click", () => warpToDomain(el.dataset.domain, el))
    );
    const examFocusBtn = app.querySelector("[data-open-examfocus]");
    if (examFocusBtn) examFocusBtn.addEventListener("click", showExamFocusModal);
    wireNav();
    document.body.classList.add("has-tabbar");
    if (!save.tutorialDone && !tutorialOpen) setTimeout(() => showTutorial(), 400);
  }

  /* A quick radial flash in the destination's hue before the domain path
     screen replaces the map — reads as "traveling" instead of a hard cut. */
  function warpToDomain(domId, btnEl) {
    if (window.WordWebSFX) window.WordWebSFX.warp();
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const flash = $("#warp-flash");
    if (reduceMotion || !flash || !btnEl) {
      showDomain(domId);
      return;
    }
    const dom = GAME.domains.find((d) => d.id === domId);
    const r = btnEl.getBoundingClientRect();
    flash.style.setProperty("--wx", r.left + r.width / 2 + "px");
    flash.style.setProperty("--wy", r.top + r.height / 2 + "px");
    flash.style.setProperty("--h", dom ? dom.hue : 220);
    flash.classList.remove("go");
    void flash.offsetWidth; // restart the animation
    flash.classList.add("go");
    setTimeout(() => showDomain(domId), 340);
  }

  function showPractice() {
    const due = dueReviews();
    const todayDay = todaysDayRec();
    const todayConst = primaryRun(todayDay);
    const bothDone = !!(todayDay && todayDay.mc && todayDay.assembly);
    app.innerHTML = `${header()}
      <section class="practice">
        <div class="practice-head">
          <span class="phase-kicker">Practice</span>
          <p class="practice-sub">Short, focused reps — no island required.</p>
          <button class="back-btn" data-nav="home">Back</button>
        </div>
        <div class="practice-list">
          <button class="prac-row" data-nav="constellation">
            <span class="prac-icon daily">🌌</span>
            <span class="prac-text">
              <span class="prac-title">Tonight's Constellation</span>
              <span class="prac-note">${todayConst ? `${todayConst.stars}/${todayConst.total} stars${bothDone ? " — both modes done" : " — tap to revisit or try the other mode"}` : "5 linked stars · pick the word from its definition"}</span>
            </span>
            <span class="prac-badge ${todayConst ? "done" : ""}">${todayConst ? "✓" : "NEW"}</span>
          </button>
          <button class="prac-row" data-nav="nightsky">
            <span class="prac-icon review">🌠</span>
            <span class="prac-text">
              <span class="prac-title">Night sky</span>
              <span class="prac-note">Every constellation you've completed, dated</span>
            </span>
          </button>
          <button class="prac-row" data-nav="bridges">
            <span class="prac-icon bridge">🌉</span>
            <span class="prac-text">
              <span class="prac-title">Build words</span>
              <span class="prac-note">Assemble bridge words from root tiles · 30 pts each</span>
            </span>
          </button>
          <button class="prac-row" data-nav="revision">
            <span class="prac-icon review">🔁</span>
            <span class="prac-text">
              <span class="prac-title">Revision</span>
              <span class="prac-note">Random words you've already played · quick review</span>
            </span>
          </button>
          <button class="prac-row" data-nav="review">
            <span class="prac-icon review">🔄</span>
            <span class="prac-text">
              <span class="prac-title">Review sprint</span>
              <span class="prac-note">${due.length ? "Missed words, spaced for recall" : "Queue is clear"}</span>
            </span>
            ${due.length ? `<span class="prac-badge">${due.length}</span>` : '<span class="prac-badge done">✓</span>'}
          </button>
        </div>
      </section>
      ${tabBarHTML("practice")}`;
    wireNav();
    document.body.classList.add("has-tabbar");
  }

  function showProfile() {
    const allRoots = GAME.domains.flatMap((d) => d.rootIds);
    const mastered = allRoots.filter(rootMastered).length;
    const learned = new Set();
    Object.values(save.roots).forEach((rs) => Object.keys(rs.correct).forEach((w) => learned.add(w)));
    const masteryPct = GAME.meta.root_count ? Math.round((100 * mastered) / GAME.meta.root_count) : 0;
    const earnedCount = ACHIEVEMENTS.filter((a) => save.badges[a.id]).length;
    app.innerHTML = `${header()}
      <section class="profile">
        <div class="practice-head">
          <span class="phase-kicker">Your stats</span>
          <button class="back-btn" data-nav="home">Back</button>
        </div>
        <div class="profile-stats">
          <div class="stat-tile"><span class="stat-num">${mastered}</span><span class="stat-label">roots mastered</span></div>
          <div class="stat-tile"><span class="stat-num">${learned.size}</span><span class="stat-label">words learned</span></div>
          <div class="stat-tile"><span class="stat-num">${save.bestStreak}</span><span class="stat-label">best streak</span></div>
          <div class="stat-tile"><span class="stat-num">${save.points}</span><span class="stat-label">points</span></div>
        </div>
        <div class="hero-bar"><div class="hero-bar-fill" style="width:${masteryPct}%"></div></div>
        <p class="hero-pct" style="margin:6px 0 0;text-align:right">${masteryPct}% of all roots mastered</p>
        <div class="badge-shelf-head">
          <span class="phase-kicker" style="margin:0">Badges</span>
          <span class="badge-count">${earnedCount}/${ACHIEVEMENTS.length}</span>
        </div>
        <div class="badge-shelf">
          ${ACHIEVEMENTS.map((a) => {
            const earned = !!save.badges[a.id];
            return `<div class="badge-tile ${earned ? "earned" : "locked"}" title="${esc(a.desc)}">
              <span class="badge-tile-icon">${earned ? a.icon : "🔒"}</span>
              <span class="badge-tile-title">${esc(a.title)}</span>
            </div>`;
          }).join("")}
        </div>
        <div class="profile-actions">
          <button class="btn ${save.hardMode ? "primary" : ""}" data-nav="hardmode">🎯 Pro mode: ${save.hardMode ? "ON" : "OFF"}</button>
          <p class="discover-hint" style="margin:-4px 0 0">Pro mode swaps in trickier answer choices — other words sharing a root with the correct one — so you can't just spot a keyword.</p>
          <div>
            <p class="phase-kicker" style="margin:0 0 6px">🎓 Exam focus</p>
            <p class="discover-hint" style="margin:0 0 8px">Show only words that appear on real vocabulary lists for these exams — fewer words per root, so some lessons run leaner and a few roots sit out entirely. Leave everything unchecked to play the full set.</p>
            ${examFilterGridHTML()}
          </div>
          <button class="btn" data-nav="share">Share progress</button>
          <button class="btn" data-nav="tutorial">How to play</button>
        </div>
        <footer class="foot">Progress is saved in this browser.</footer>
      </section>
      ${tabBarHTML("you")}`;
    wireNav();
    document.body.classList.add("has-tabbar");
    // Rebuilds GAME (the filtered word set changes its whole level
    // structure, so an in-place DOM patch isn't enough) and re-renders
    // this screen so every dependent number stays in sync.
    wireExamFilterGrid(app, showProfile);
  }

  function showDomain(domId) {
    const dom = GAME.domains.find((d) => d.id === domId);
    app.innerHTML = `${header()}
      <section class="crumbs"><span><a data-nav="home">Map</a> / ${esc(dom.name)}</span><button class="back-btn" data-nav="home">Back</button></section>
      <section class="path" style="--h:${dom.hue}">
        ${dom.levels
          .map((lv, i) => {
            const p = levelProgress(lv);
            const st = save.levels[lv.id];
            const mastered = lv.roots.every(rootMastered);
            const prev = dom.levels[i - 1];
            const locked = i > 0 && !(save.levels[prev.id] && save.levels[prev.id].completed);
            const side = i % 2 === 0 ? "l" : "r";
            const icon = mastered ? "★" : st && st.completed ? "✓" : locked ? "🔒" : "";
            return `<div class="path-row ${side}">
              <button class="path-node ${mastered ? "mastered" : ""} ${locked ? "locked" : ""} ${!locked && !st ? "next" : ""}"
                data-level="${lv.id}" ${locked ? 'data-locked="1"' : ""} title="${esc(lv.title)}">
                <span class="path-icon">${icon}</span>
              </button>
              <div class="path-info">
                <span class="level-root">${esc(lv.title)}</span>
                <span class="level-meaning">${esc(lv.subtitle)}</span>
                <span class="level-meta">${locked ? "Complete the previous level to unlock" : `${p.done}/${p.total} words${lv.decodeWords.length ? " · boss word" : ""}`}</span>
              </div>
            </div>`;
          })
          .join("")}
      </section>
      ${tabBarHTML("home")}`;
    app.querySelectorAll("[data-level]").forEach((el) =>
      el.addEventListener("click", () => {
        if (el.dataset.locked) {
          shakeEl(el);
          if (window.WordWebSFX) window.WordWebSFX.wrong();
          return;
        }
        startLevel(el.dataset.level);
      })
    );
    wireNav();
    document.body.classList.add("has-tabbar");
  }

  /* ---------- level play ---------- */
  let run = null; // current run state
  let graphSim = null; // D3 simulation for in-quiz knowledge graph

  function startLevel(levelId) {
    refreshHearts();
    if (save.hearts <= 0) {
      showOutOfHearts(() => startLevel(levelId));
      return;
    }
    const level = GAME.domains.flatMap((d) => d.levels).find((l) => l.id === levelId);
    // Remembered so the root web can auto-focus whichever root the player is
    // actually working on, instead of always opening to the whole map.
    save.currentRootId = level.roots[0];
    persist();
    const st = save.levels[level.id];
    // Resuming a level you never finished skips words you already got right
    // (and the boss word if it's already decoded) instead of replaying the
    // whole thing — nothing here touches an already-completed level, so
    // "Play again" still replays it in full for practice/points.
    const resuming = !(st && st.completed);
    let queue = level.teachWords.slice();
    let skipped = 0;
    if (resuming) {
      const before = queue.length;
      queue = queue.filter((w) => {
        const key = w.key || w.word;
        return !level.roots.some((rid) => rootState(rid).correct[key]);
      });
      skipped = before - queue.length;
    }
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
    const decodeIdx = resuming && level.decodeWords.length && level.roots.some((rid) => rootState(rid).decoded) ? level.decodeWords.length : 0;
    // decodeTotal is this run's planned decode-question count (0 if the boss
    // word was already decoded in an earlier session) — finishLevel uses it
    // instead of level.decodeWords.length so the "x/y correct" tally on the
    // recap screen reflects what this run actually asked, not the level's
    // full lifetime total.
    const decodeTotal = level.decodeWords.length - decodeIdx;
    run = { level, queue, idx: -1, score: 0, streak: 0, correct: 0, phase: "discover", decodeIdx, decodeTotal, skipped, xp: { base: 0, streak: 0, gre: 0 } };
    initQuizGraph(level);
    showDiscover();
  }

  function showOutOfHearts(retry) {
    app.innerHTML = `${header()}
      <section class="results">
        <div class="phase-kicker boss">Out of hearts</div>
        <h2>Take a breath.</h2>
        <p class="score-line">Next heart in ${heartTimeLeft()}. Review sprints and the daily word never cost hearts.</p>
        <div class="btn-row">
          <button class="btn" id="go-review">Review instead</button>
          <button class="btn primary" id="go-home">Back to map</button>
        </div>
      </section>`;
    $("#go-review").addEventListener("click", showReview);
    $("#go-home").addEventListener("click", showHome);
    wireNav();
  }

  function showDiscover() {
    const { level } = run;
    const dom = GAME.domains.find((d) => d.id === level.domain);
    const wordsLeft = run.queue.length;
    const decodeLeft = level.decodeWords.length - run.decodeIdx;
    let hint;
    if (wordsLeft === 0 && decodeLeft === 0) {
      hint = "You've already answered everything here — this just wraps up the level.";
    } else if (wordsLeft === 0) {
      hint = `You already know every word here — straight to the boss word${decodeLeft > 1 ? "s" : ""}.`;
    } else {
      hint = `${wordsLeft} word${wordsLeft === 1 ? "" : "s"} ahead${decodeLeft ? `, then ${decodeLeft} you'll decode cold` : ""}. Answer without the hint for double points.`;
    }
    app.innerHTML = `${header()}
      <section class="crumbs"><span><a data-nav="home">Map</a> / <a data-domain-link="${dom.id}">${esc(dom.name)}</a> / ${esc(level.title)}</span><button class="back-btn" data-nav="home">Back</button></section>
      <section class="discover" style="--h:${dom.hue}">
        <div class="phase-kicker">Discover</div>
        ${level.roots
          .map((rid) => {
            const r = GAME.rootsById[rid];
            return `<div class="root-card">
              <div class="root-name">${esc(r.root)}</div>
              <div class="root-origin">${esc(r.origin)} — “${esc(r.meaning)}”</div>
              ${r.note ? `<div class="root-note">${esc(r.note)}</div>` : ""}
            </div>`;
          })
          .join("")}
        ${run.skipped ? `<p class="discover-hint resume-note">↺ Picking up where you left off — skipping ${run.skipped} word${run.skipped === 1 ? "" : "s"} you already know.</p>` : ""}
        <p class="discover-hint">${hint}</p>
        <button class="btn primary" id="begin">Begin</button>
      </section>`;
    $("#begin").addEventListener("click", nextQuestion);
    wireNav();
  }

  function nextQuestion() {
    if (save.hearts <= 0) {
      showOutOfHearts(() => {
        run.idx--; // retry the same question once hearts return
        nextQuestion();
      });
      return;
    }
    run.idx++;
    if (run.idx < run.queue.length) {
      showQuestion(run.queue[run.idx], false);
    } else if (run.decodeIdx < run.level.decodeWords.length) {
      showDecodeIntro();
    } else {
      finishLevel();
    }
  }

  function showDecodeIntro() {
    const dom = GAME.domains.find((d) => d.id === run.level.domain);
    app.innerHTML = `${header()}
      <section class="decode-intro" style="--h:${dom.hue}">
        <button class="back-btn" data-nav="home">Back</button>
        <div class="phase-kicker boss">Boss word</div>
        <h2>You were never taught this one.</h2>
        <p>Use the roots you just learned to decode it. 50 points on the line — no hints, no penalty for guessing.</p>
        <button class="btn primary" id="go">Show me the word</button>
      </section>`;
    $("#go").addEventListener("click", () => {
      const w = run.level.decodeWords[run.decodeIdx];
      showQuestion(w, true);
    });
    wireNav();
  }

  function progressBar(done, total) {
    const pct = total ? Math.round((100 * done) / total) : 0;
    return `<div class="quiz-progress"><span style="width:${pct}%"></span></div>`;
  }

  function showQuestion(word, isDecode) {
    const dom = GAME.domains.find((d) => d.id === run.level.domain);
    const q = L.optionsFor(word, GAME, rng, save.hardMode);
    let hintUsed = false;
    let answered = false;
    const total = run.queue.length + run.decodeTotal;
    const num = isDecode ? run.queue.length + run.decodeIdx + 1 : run.idx + 1;
    app.innerHTML = `${header()}
      ${progressBar(num - 1, total)}
      <section class="quiz" style="--h:${dom.hue}">
        <div class="quiz-top">
          <span class="phase-kicker ${isDecode ? "boss" : ""}">${isDecode ? "Decode" : esc(run.level.title)}</span>
          <span>
            <span class="quiz-count">${num}/${total}${run.streak > 1 ? ` · <span class="streak-live">🔥${run.streak}</span>` : ""}</span>
            <button class="back-btn" data-nav="home">Back</button>
          </span>
        </div>
        <h2 class="quiz-word">${esc(word.word)} <span class="pos">${esc(word.part_of_speech || "")}</span>
          ${examBadges(word)}</h2>
        <div class="hint-row">${isDecode ? "" : '<button class="btn ghost" id="hint">💡 Hint <span class="hint-note">root · half points</span></button>'}
          <div id="hint-box" class="hint-box" hidden></div></div>
        <div class="options">
          ${q.options.map((o, i) => `<button class="option" data-i="${i}">${esc(o)}</button>`).join("")}
        </div>
        <div id="feedback" class="feedback" hidden></div>
        <div id="quiz-graph" class="quiz-graph"></div>
      </section>`;
    wireNav();
    renderQuizGraph();

    const hintBtn = $("#hint");
    if (hintBtn)
      hintBtn.addEventListener("click", () => {
        hintUsed = true;
        hintBtn.hidden = true;
        const box = $("#hint-box");
        box.hidden = false;
        box.innerHTML = (word.roots || [])
          .map((rid) => {
            const r = GAME.rootsById[rid];
            return r ? `<span class="chip">${esc(r.root)} — ${esc(r.meaning)}</span>` : "";
          })
          .join("");
      });

    app.querySelectorAll(".option").forEach((btn) =>
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const i = Number(btn.dataset.i);
        const correct = i === q.correctIndex;
        app.querySelectorAll(".option").forEach((b, bi) => {
          if (bi === q.correctIndex) b.classList.add("right");
          else if (bi === i) b.classList.add("wrong");
          b.disabled = true;
        });
        let gained = 0;
        if (correct) {
          run.correct++;
          run.streak++;
          save.bestStreak = Math.max(save.bestStreak, run.streak);
          if (isDecode) {
            gained = 50;
            run.xp.base += 50;
            run.level.roots.forEach((rid) => (rootState(rid).decoded = true));
            save.bossDecoded = (save.bossDecoded || 0) + 1;
          } else {
            const base = hintUsed ? 10 : 20;
            const streakBonus = Math.min(10, (run.streak - 1) * 2);
            gained = base + streakBonus;
            run.xp.base += base;
            run.xp.streak += streakBonus;
          }
          if ((word.exam_lists || []).includes("GRE")) {
            gained += 5;
            run.xp.gre += 5;
          }
          run.score += gained;
          save.points += gained;
          const wordKey = word.key || word.word;
          (word.roots || []).forEach((rid) => (rootState(rid).correct[wordKey] = true));
          run.level.roots.forEach((rid) => (rootState(rid).correct[wordKey] = rootState(rid).correct[wordKey] || (word.roots || []).includes(rid)));
          popEl(btn);
          addWordToGraph(word, isDecode);
          renderQuizGraph();
          if (isDecode || run.streak % 5 === 0) confettiBurst(btn);
          if (window.WordWebSFX) window.WordWebSFX.correct();
        } else {
          run.streak = 0;
          const wordKey = word.key || word.word;
          if (!save.review.some((r) => r.word === wordKey)) {
            save.review.push({ word: wordKey, box: 0, due: Date.now() });
          }
          shakeEl(btn);
          if (window.WordWebSFX) window.WordWebSFX.wrong();
          loseHeart();
          if (window.WordWebSFX && save.hearts === 0) window.WordWebSFX.heartLost();
        }
        touchStreak();
        persist();
        if (correct) checkAchievements();
        const fb = $("#feedback");
        fb.hidden = false;
        fb.innerHTML = `<div class="verdict ${correct ? "yes" : "no"}"><span class="mascot">${correct ? "✳" : "…"}</span> ${reactionLine(correct)} ${
          correct ? `<b>+${gained}</b>` : ""
        }</div>
        <div class="roots-reveal">${(word.roots || [])
          .map((rid) => {
            const r = GAME.rootsById[rid];
            return r ? `<span class="chip">${esc(r.root)} — ${esc(r.meaning)}</span>` : "";
          })
          .join("")}</div>
        <p class="example">“${esc(word.example)}”</p>
        <button class="btn primary" id="next">${isDecode ? "Continue" : "Next"}</button>`;
        // Pinned to the bottom of the screen on phone — with the quiz-graph
        // and roots-reveal both above it, this button could otherwise land
        // below the fold and need a scroll to find.
        document.body.classList.add("has-sticky-next");
        $("#next").addEventListener("click", () => {
          if (isDecode) {
            run.decodeIdx++;
            if (run.decodeIdx < run.level.decodeWords.length) showDecodeIntro();
            else finishLevel();
          } else nextQuestion();
        });
        $("#next").focus();
      })
    );
  }

  function finishLevel() {
    if (graphSim) { graphSim.stop(); graphSim = null; }
    const { level, score, correct, queue, xp, decodeTotal } = run;
    const st = (save.levels[level.id] = save.levels[level.id] || { completed: false, bestScore: 0 });
    st.completed = true;
    st.bestScore = Math.max(st.bestScore, score);
    const dom = GAME.domains.find((d) => d.id === level.domain);
    const mastered = level.roots.every(rootMastered);
    // A whole galaxy going fully gold is rarer than any single root — worth
    // a bigger, one-time moment instead of the routine level-complete screen.
    const domMastery = domainMastery(dom);
    const supernova = domMastery.mastered === domMastery.total && !save.celebratedDomains[dom.id];
    if (supernova) save.celebratedDomains[dom.id] = true;
    persist();
    checkAchievements();

    // XP breakdown: only the buckets that actually contributed get a row,
    // so a level with no streak/GRE bonus doesn't show empty "+0" lines.
    const xpRows = [{ label: "Words answered", val: xp.base }];
    if (xp.streak) xpRows.push({ label: "Streak bonus", val: xp.streak });
    if (xp.gre) xpRows.push({ label: "GRE bonus", val: xp.gre });
    const STAGGER = 160; // ms between each row's reveal
    const rowsHTML = xpRows
      .map((r, i) => `<div class="xp-row" style="--d:${i}"><span>${esc(r.label)}</span><span>+${r.val}</span></div>`)
      .join("");

    app.innerHTML = `${header()}
      <section class="results recap ${supernova ? "supernova" : ""}" style="--h:${dom.hue}">
        <div class="phase-kicker ${supernova ? "boss" : ""}">${supernova ? "Galaxy fully charted" : mastered ? "Root mastered" : "Lesson complete!"}</div>
        <h2>${supernova ? esc(dom.name) : esc(level.title)}</h2>
        <p class="score-line">${correct}/${queue.length + decodeTotal} correct</p>
        <div class="xp-breakdown">
          ${rowsHTML}
          <div class="xp-row xp-total" style="--d:${xpRows.length}"><span>Total XP</span><span id="xp-total-num">0</span></div>
        </div>
        ${
          supernova
            ? '<p class="mastered-note">Every root in this galaxy is lit. ✦</p>'
            : mastered
            ? '<p class="mastered-note">This constellation is lit on your map.</p>'
            : '<p class="mastered-note dim">Answer every word (and the boss) correctly to master this root.</p>'
        }
        <div class="btn-row">
          <button class="btn" id="replay">Play again</button>
          <button class="btn primary" id="back">Back to ${esc(dom.name)}</button>
          <button class="back-btn" data-nav="home">Back</button>
        </div>
      </section>`;
    $("#replay").addEventListener("click", () => startLevel(level.id));
    $("#back").addEventListener("click", () => showDomain(dom.id));
    wireNav();
    if (supernova) {
      if (window.WordWebSFX) window.WordWebSFX.supernova();
      confettiBurst($(".results h2"));
      setTimeout(() => confettiBurst($(".results h2")), 220);
      setTimeout(() => confettiBurst($(".results h2")), 440);
    } else {
      if (window.WordWebSFX) window.WordWebSFX.levelup();
      confettiBurst($(".results h2"));
    }
    // Each XP row ticks in on its own beat, then the total counts up to match.
    xpRows.forEach((_, i) => setTimeout(() => window.WordWebSFX && window.WordWebSFX.tap(), i * STAGGER));
    setTimeout(() => animateCount($("#xp-total-num"), 0, score, 650), (xpRows.length + 1) * STAGGER);
    run = null;
  }

  /* ---------- review sprint ---------- */
  function showReview() {
    const due = dueReviews();
    if (!due.length) {
      showPractice();
      return;
    }
    const item = due[0];
    // item.word actually holds a key (see showQuestion) — wordsByKey
    // resolves it to the exact sense that was answered wrong, not just
    // whichever same-spelled word happened to load last.
    const word = GAME.wordsByKey[item.word];
    if (!word) {
      save.review = save.review.filter((r) => r !== item);
      persist();
      showReview();
      return;
    }
    const q = L.optionsFor(word, GAME, rng, save.hardMode);
    app.innerHTML = `${header()}
      <section class="quiz review-quiz">
        <div class="quiz-top"><span class="phase-kicker">Review</span><span><span class="quiz-count">${due.length} left</span><button class="back-btn" data-nav="home">Back</button></span></div>
        <h2 class="quiz-word">${esc(word.word)} <span class="pos">${esc(word.part_of_speech || "")}</span></h2>
        <div class="options">${q.options.map((o, i) => `<button class="option" data-i="${i}">${esc(o)}</button>`).join("")}</div>
        <div id="feedback" class="feedback" hidden></div>
      </section>`;
    wireNav();
    let answered = false;
    app.querySelectorAll(".option").forEach((btn) =>
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const correct = Number(btn.dataset.i) === q.correctIndex;
        app.querySelectorAll(".option").forEach((b, bi) => {
          if (bi === q.correctIndex) b.classList.add("right");
          else if (b === btn) b.classList.add("wrong");
          b.disabled = true;
        });
        let heartGained = false;
        if (correct) {
          save.points += 5;
          item.box++;
          if (item.box > 2) save.review = save.review.filter((r) => r !== item);
          else item.due = Date.now() + [1, 3, 7][item.box] * DAY;
          popEl(btn);
          if (window.WordWebSFX) window.WordWebSFX.correct();
          heartGained = save.hearts < save.heartsMax;
          if (heartGained) gainHeart();
        } else {
          item.box = 0;
          item.due = Date.now() + DAY;
          save.review = save.review.filter((r) => r !== item).concat(item); // move to back
          shakeEl(btn);
          if (window.WordWebSFX) window.WordWebSFX.wrong();
        }
        touchStreak();
        persist();
        if (correct) checkAchievements();
        const fb = $("#feedback");
        fb.hidden = false;
        fb.innerHTML = `<div class="verdict ${correct ? "yes" : "no"}"><span class="mascot">${correct ? "✳" : "…"}</span> ${reactionLine(correct)} ${correct ? "<b>+5</b>" + (heartGained ? " · +1 heart" : "") : ""}</div>
          <p class="example">“${esc(word.example)}”</p>
          <button class="btn primary" id="next">Next</button>`;
        document.body.classList.add("has-sticky-next");
        $("#next").addEventListener("click", () => {
          if (dueReviews().length) showReview();
          else showPractice();
        });
        $("#next").focus();
      })
    );
  }

  /* ---------- revision mode (practice random previously-played words) ---------- */
  function playedWords() {
    const keys = new Set();
    Object.values(save.roots).forEach((rs) => Object.keys(rs.correct || {}).forEach((k) => keys.add(k)));
    return Array.from(keys).map((k) => GAME.wordsByKey[k]).filter(Boolean);
  }

  function showRevision() {
    const all = playedWords();
    if (!all.length) {
      app.innerHTML = `${header()}<section class="discover"><div class="phase-kicker">Revision</div><p class="discover-hint">You haven't played any words yet — try a Practice run first.</p><button class="btn" data-nav="practice">Back to practice</button></section>`;
      wireNav();
      return;
    }
    // shuffle and take up to REVISION_COUNT
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    const queue = all.slice(0, Math.min(REVISION_COUNT, all.length));
    let idx = 0;

    function renderItem() {
      const word = queue[idx];
      const q = L.optionsFor(word, GAME, rng, save.hardMode);
      app.innerHTML = `${header()}<section class="quiz review-quiz"><div class="quiz-top"><span class="phase-kicker">Revision</span><span><span class="quiz-count">${idx + 1}/${queue.length}</span><button class="back-btn" data-nav="home">Back</button></span></div><h2 class="quiz-word">${esc(word.word)} <span class="pos">${esc(word.part_of_speech || "")}</span></h2><div class="options">${q.options.map((o, i) => `<button class="option" data-i="${i}">${esc(o)}</button>`).join("")}</div><div id="feedback" class="feedback" hidden></div></section>`;
      wireNav();
      let answered = false;
      app.querySelectorAll(".option").forEach((btn) =>
        btn.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const correct = Number(btn.dataset.i) === q.correctIndex;
          app.querySelectorAll(".option").forEach((b, bi) => {
            if (bi === q.correctIndex) b.classList.add("right");
            else if (b === btn) b.classList.add("wrong");
            b.disabled = true;
          });
          if (correct) {
            save.points += 5;
            persist();
            checkAchievements();
            if (window.WordWebSFX) window.WordWebSFX.correct();
          } else {
            const wordKey = word.key || word.word;
            if (!save.review.some((r) => r.word === wordKey)) save.review.push({ word: wordKey, box: 0, due: Date.now() });
            if (window.WordWebSFX) window.WordWebSFX.wrong();
          }
          const fb = $("#feedback");
          fb.hidden = false;
          fb.innerHTML = `<div class="verdict ${correct ? "yes" : "no"}"><span class="mascot">${correct ? "✳" : "…"}</span> ${reactionLine(correct)} ${correct ? "<b>+5</b>" : ""}</div><p class="example">“${esc(word.example)}”</p><button class="btn primary" id="next">${idx + 1 < queue.length ? "Next" : "Done"}</button>`;
          document.body.classList.add("has-sticky-next");
          $("#next").addEventListener("click", () => {
            document.body.classList.remove("has-sticky-next");
            idx++;
            if (idx < queue.length) renderItem();
            else showPractice();
          });
        })
      );
    }

    renderItem();
  }

  /* ---------- daily word ---------- */
  /* ---------- Tonight's Constellation ----------
     One pre-curated puzzle a day (data/daily_puzzles.js, generated by
     tools/generate_chains.py), indexed by local calendar date so every
     player on the same date sees the same puzzle. Two shapes, unified into
     a common { steps: [...] } walk so the rest of this code doesn't care
     which one it's playing:
       "chain"   — 5 words linked by 4 different pivot roots, one root/step.
       "cluster" — 1 root's word family, 4 definition rounds against a
                   shared shrinking option pool (see normalizeConstellation).
     Anti-letter-leak distractors, quality grading etc. are all baked into
     the JSON already — this layer only renders it and tracks the play.

     A second way to play the SAME daily puzzle also lives here: "assembly"
     mode (data/assembly_puzzles.js, generated by tools/build_assembly.py)
     builds each word from root-stem tiles instead of picking it from a
     multiple-choice list. It's index-aligned with the MC bank — same
     position, same day's word set — so a `null` slot (a day whose words
     don't decompose into clean visible stems) just means that mode isn't
     offered today; MC mode is always available.

     Both modes share one visual: an SVG "sky" (buildConstellationSVG) where
     a cluster's shared root renders as a sun with word-planets orbiting it,
     and a chain renders as a gentle arc of linked stars — the shape the
     share string reduces to. Completing one mode doesn't use up the day:
     save.constellations[date] is { mc?, assembly? }, each set independently
     by finishConstellation/finishAssembly, so a player can play both and
     renderConstellationDay shows every run that's done plus a prompt for
     whichever mode is still open (see normalizeDayRec for the old flat-rec
     shape this replaced). */
  function puzzleBank() {
    return (window.WORDWEB_DAILY_PUZZLES && window.WORDWEB_DAILY_PUZZLES.puzzles) || [];
  }
  function assemblyBank() {
    return window.WORDWEB_ASSEMBLY_PUZZLES || [];
  }
  function puzzleNumber() {
    return Math.max(1, daysSinceEpochLocal() + 1);
  }
  function todaysPuzzle() {
    const bank = puzzleBank();
    if (!bank.length) return null;
    const days = daysSinceEpochLocal();
    const idx = ((days % bank.length) + bank.length) % bank.length;
    return bank[idx];
  }
  // null if today's words can't be decomposed into clean tiles — build mode
  // just isn't offered that day (see tools/build_assembly.py's coverage note).
  function todaysAssemblyPuzzle() {
    const puzzles = puzzleBank();
    const bank = assemblyBank();
    if (!puzzles.length || !bank.length) return null;
    const days = daysSinceEpochLocal();
    const idx = ((days % puzzles.length) + puzzles.length) % puzzles.length;
    return bank[idx] || null;
  }
  function rootRecapFromPuzzle(puzzle) {
    return puzzle.type === "chain"
      ? puzzle.pivot_roots.map((r) => ({ root: r.root, meaning: r.meaning }))
      : [{ root: puzzle.root.root, meaning: puzzle.root.meaning }];
  }
  // A day's record holds BOTH modes' results independently — { mc?, assembly? }
  // — so completing one never locks out the other; see showConstellationModePicker
  // and renderConstellationDay. Old saves before this shape existed stored one
  // flat rec with a `.mode` field directly; migrate those on read.
  function normalizeDayRec(dayRec) {
    if (!dayRec) return null;
    if (dayRec.mc || dayRec.assembly) return dayRec;
    if (dayRec.mode) return { [dayRec.mode]: dayRec };
    return null;
  }
  function todaysDayRec() {
    return normalizeDayRec(save.constellations && save.constellations[localDateStr()]);
  }
  // The bubble/prac-row summary only has room for one line — prefer MC
  // since it's the default/always-available mode.
  function primaryRun(dayRec) {
    return dayRec ? dayRec.mc || dayRec.assembly : null;
  }
  function normalizeConstellation(puzzle) {
    if (puzzle.type === "chain") {
      return {
        type: "chain",
        words: puzzle.chain.slice(),
        steps: puzzle.links.map((l) => ({
          definition: l.answer_definition,
          answer: l.answer,
          options: l.options.slice(),
          rootDisplay: l.root_display,
          rootMeaning: l.root_meaning,
        })),
      };
    }
    return {
      type: "cluster",
      root: puzzle.root,
      pool: puzzle.options.slice(),
      steps: puzzle.rounds.map((r) => ({
        definition: r.definition,
        answer: r.answer,
        rootDisplay: puzzle.root.root,
        rootMeaning: puzzle.root.meaning,
      })),
    };
  }

  function starGlyph(state, isRoot) {
    if (state === "lit") return isRoot ? "✹" : "⭐";
    if (state === "muddy") return "💫"; // assembly mode: solved, but took retries
    if (state === "dark") return "🌑"; // MC mode: missed, chain moved on anyway
    if (state === "current") return "☆";
    return "·";
  }
  // MC mode's sky: the original one-line strip — a row of star glyphs
  // joined by short dashes, matching the share string's own look
  // (⭐—⭐—🌑—⭐—⭐). Build mode uses the fuller SVG sun/arc view below instead
  // (buildConstellationSVG) since its slower, more deliberate pace has room
  // for it; this one stays deliberately compact for the faster MC flow.
  function constellationStripHTML(stars) {
    return `<div class="const-strip">${stars
      .map(
        (s, i) => `${
          i > 0
            ? `<span class="const-strip-edge${s.edgeLit ? " lit" : ""}">${s.edgeLabel ? `<span class="const-strip-edge-tag">${esc(s.edgeLabel)}</span>` : ""}</span>`
            : ""
        }<span class="const-strip-star ${s.state}${s.isRoot ? " root" : ""}" title="${esc(s.label || "?")}">${starGlyph(s.state, s.isRoot)}</span>`
      )
      .join("")}</div>`;
  }
  /* ---- SVG sky renderer (build mode) ---- */
  // Fixed 5-node layouts (both puzzle types always have exactly 5 nodes: a
  // free/hub star + 4 built ones): cluster puts the shared root at the
  // center as a sun with 4 word-planets orbiting it; chain spaces its 5
  // stars along a gentle arc, left to right, the shape the share string is.
  function constellationLayout(type) {
    const W = 320,
      H = 176;
    if (type === "cluster") {
      const cx = W / 2,
        cy = H / 2 + 6,
        R = 60;
      const pts = [];
      for (let i = 0; i < 4; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 2 + 0.35;
        pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
      }
      return { W, H, hub: [cx, cy], R, pts };
    }
    const xFrac = [0.08, 0.31, 0.535, 0.755, 0.95];
    const yFrac = [0.8, 0.28, 0.68, 0.16, 0.55];
    return { W, H, hub: null, pts: xFrac.map((xf, i) => [xf * W, yFrac[i] * H]) };
  }
  // `stars`: [{label, state: lit|muddy|dark|current|pending, isRoot?,
  // hubMeaning?, edgeLabel?, edgeLit?}], one per node, in order.
  function buildConstellationSVG(type, stars) {
    const { W, H, hub, R, pts } = constellationLayout(type);
    const coords = type === "cluster" ? [hub, ...pts] : pts;
    let edges = type === "cluster" ? `<circle cx="${hub[0]}" cy="${hub[1]}" r="${R}" class="const-orbit"/>` : "";
    stars.forEach((s, i) => {
      if (i === 0) return;
      const [x1, y1] = coords[type === "cluster" ? 0 : i - 1];
      const [x2, y2] = coords[i];
      edges += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="const-edge${s.edgeLit ? " lit" : ""}"/>`;
      if (s.edgeLabel && s.edgeLit) {
        edges += `<text x="${((x1 + x2) / 2).toFixed(1)}" y="${((y1 + y2) / 2 - 6).toFixed(1)}" text-anchor="middle" class="const-edge-tag">${esc(s.edgeLabel)}</text>`;
      }
    });
    const nodes = stars
      .map((s, i) => {
        const [x, y] = coords[i];
        const r = s.isRoot ? 15 : 6;
        let g = `<g class="const-node ${s.state}${s.isRoot ? " sun" : ""}">`;
        if (s.state === "lit" || s.state === "muddy" || s.isRoot) g += `<circle cx="${x}" cy="${y}" r="${r + 8}" class="const-halo"/>`;
        g += `<circle cx="${x}" cy="${y}" r="${r}" class="const-dot"/>`;
        if (s.isRoot) {
          g += `<text x="${x}" y="${y + 3}" text-anchor="middle" class="const-hub-word">${esc((s.label || "").split(",")[0])}</text>`;
          g += `<text x="${x}" y="${y + r + 19}" text-anchor="middle" class="const-hub-meaning">${esc(s.hubMeaning || "")}</text>`;
        } else if (s.label) {
          g += `<text x="${x}" y="${y - r - 8}" text-anchor="middle" class="const-label">${esc(s.label)}</text>`;
        }
        return g + `</g>`;
      })
      .join("");
    return `<svg class="const-sky" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tonight's constellation">${edges}${nodes}</svg>`;
  }
  function frozenStarsFromRec(rec) {
    return rec.starGlyphs.map((state, i) => {
      const isRoot = rec.type === "cluster" && i === 0;
      return {
        state,
        label: rec.words[i],
        isRoot,
        hubMeaning: isRoot ? rec.rootRecap[0].meaning : undefined,
        edgeLit: i > 0,
      };
    });
  }

  /* ---- mode picker ---- */
  let constellation = null; // in-progress MC play state; see startConstellation()
  let assembly = null; // in-progress "build the word" play state; see startAssembly()
  function showConstellation() {
    const today = localDateStr();
    if (constellation && constellation.dateStr === today) {
      renderConstellation();
      return;
    }
    if (assembly && assembly.dateStr === today) {
      renderAssembly();
      return;
    }
    // A day record holds both modes independently — show the day screen
    // (with a prompt to try whichever mode is still open) as soon as
    // EITHER one is done, rather than only once both are.
    const dayRec = todaysDayRec();
    if (dayRec) {
      renderConstellationDay(dayRec);
      return;
    }
    showConstellationModePicker();
  }
  function showConstellationModePicker() {
    const puzzle = todaysPuzzle();
    if (!puzzle) {
      showPractice(); // puzzle bank missing/failed to load — fail soft
      return;
    }
    // Build mode only covers ~1/3 of days (see tools/build_assembly.py) —
    // when it's not available tonight, still show the picker with that
    // card disabled and say so, rather than silently skipping straight to
    // MC mode. A vanishing choice reads as broken; a disabled, explained
    // one doesn't.
    const asm = todaysAssemblyPuzzle();
    app.innerHTML = `${header()}
      <section class="quiz const-quiz">
        <div class="quiz-top">
          <span class="phase-kicker boss">🌌 Tonight's Constellation <span class="const-num">#${puzzleNumber()}</span></span>
          <button class="back-btn" data-nav="home">Back</button>
        </div>
        <p class="const-def">How do you want to chart tonight's stars?</p>
        <div class="const-mode-row">
          <button class="const-mode-card" id="mode-mc">
            <span class="const-mode-icon">🔭</span>
            <span class="const-mode-title">Multiple choice</span>
            <span class="const-mode-note">Read the definition, pick the word.</span>
          </button>
          <button class="const-mode-card${asm ? "" : " disabled"}" id="mode-assembly"${asm ? "" : " disabled"}>
            <span class="const-mode-icon">🧩</span>
            <span class="const-mode-title">Build the word</span>
            <span class="const-mode-note">${asm ? "Assemble it from root tiles." : "Not available for tonight's words — try tomorrow."}</span>
          </button>
        </div>
      </section>`;
    wireNav();
    $("#mode-mc").addEventListener("click", startConstellation);
    if (asm) $("#mode-assembly").addEventListener("click", () => startAssembly(asm));
  }

  /* ---- mode 1: multiple choice ---- */
  function startConstellation() {
    const puzzle = todaysPuzzle();
    if (!puzzle) {
      showPractice();
      return;
    }
    const norm = normalizeConstellation(puzzle);
    constellation = {
      dateStr: localDateStr(),
      puzzle,
      norm,
      idx: 0,
      flickers: 0,
      results: new Array(norm.steps.length).fill(null), // null=pending, true/false once answered
    };
    renderConstellation();
  }
  // One star per word in the constellation: the free starting star (chain)
  // or the root itself (cluster), then one per step, lit/dark/current/pending.
  function constellationStars() {
    const { norm, idx, results } = constellation;
    const stars = [];
    if (norm.type === "chain") {
      stars.push({ label: norm.words[0], state: "lit" });
      norm.steps.forEach((st, i) => {
        const r = results[i];
        stars.push({
          label: r === null ? "" : norm.words[i + 1],
          state: r === true ? "lit" : r === false ? "dark" : i === idx ? "current" : "pending",
          edgeLabel: st.rootDisplay,
          edgeLit: r !== null,
        });
      });
    } else {
      stars.push({ label: norm.root.root, state: "lit", isRoot: true, hubMeaning: norm.root.meaning });
      norm.steps.forEach((st, i) => {
        const r = results[i];
        stars.push({
          label: r === null ? "" : st.answer,
          state: r === true ? "lit" : r === false ? "dark" : i === idx ? "current" : "pending",
          edgeLabel: null,
          edgeLit: r !== null,
        });
      });
    }
    return stars;
  }
  function renderConstellation() {
    const { norm, idx, flickers } = constellation;
    const stars = constellationStars();
    const step = norm.steps[idx];
    const total = norm.steps.length;
    // Cluster rounds all draw from the SAME fixed options list (not shrunk
    // as rounds are answered) — otherwise the last round or two would be
    // down to one or two forced picks instead of a real 4-5 way choice.
    const options = norm.type === "chain" ? step.options : norm.pool;
    app.innerHTML = `${header()}
      <section class="quiz const-quiz">
        <div class="quiz-top">
          <span class="phase-kicker boss">🌌 Tonight's Constellation <span class="const-num">#${puzzleNumber()}</span></span>
          <span><span class="const-flicker" title="Flickers so far">✨ ${flickers}</span><button class="back-btn" data-nav="home">Back</button></span>
        </div>
        ${
          norm.type === "cluster"
            ? `<div class="const-root-badge"><span class="const-root-word">${esc(norm.root.root)}</span><span class="const-root-arrow">→</span><span class="const-root-meaning">${esc(norm.root.meaning)}</span></div>`
            : ""
        }
        ${constellationStripHTML(stars)}
        ${
          norm.type === "chain"
            ? `<div class="const-root-badge"><span class="const-root-word">${esc(step.rootDisplay)}</span><span class="const-root-arrow">→</span><span class="const-root-meaning">${esc(step.rootMeaning)}</span></div>`
            : ""
        }
        <p class="const-progress">Star ${idx + 1} of ${total}</p>
        <p class="const-def">“${esc(step.definition)}”</p>
        <div class="options">${options.map((o) => `<button class="option" data-opt="${esc(o)}">${esc(o)}</button>`).join("")}</div>
        <div id="feedback" class="feedback" hidden></div>
      </section>`;
    wireNav();
    let answered = false;
    app.querySelectorAll(".option").forEach((btn) =>
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        resolveConstellationPick(btn, btn.dataset.opt === step.answer, step);
      })
    );
  }
  function resolveConstellationPick(btn, correct, step) {
    const { norm, idx } = constellation;
    app.querySelectorAll(".option").forEach((b) => {
      b.disabled = true;
      if (b.dataset.opt === step.answer) b.classList.add("right");
      else if (b === btn) b.classList.add("wrong");
    });
    constellation.results[idx] = correct;
    if (correct) {
      popEl(btn);
      confettiBurst(btn);
      if (window.WordWebSFX) window.WordWebSFX.correct();
    } else {
      constellation.flickers++;
      shakeEl(btn);
      if (window.WordWebSFX) window.WordWebSFX.wrong();
      // Missed words feed the personal review queue — the post-completion
      // "revisit fading stars" button funnels into save.review, same as
      // every other wrong answer in the app.
      const missed = GAME.wordsByName && GAME.wordsByName[step.answer];
      const key = (missed && (missed.key || missed.word)) || step.answer;
      if (!save.review.some((r) => r.word === key)) save.review.push({ word: key, box: 0, due: Date.now() });
    }
    persist();
    const fb = $("#feedback");
    fb.hidden = false;
    fb.innerHTML = `<div class="verdict ${correct ? "yes" : "no"}"><span class="mascot">${correct ? "✳" : "…"}</span> ${reactionLine(correct)}</div>
      <button class="btn primary" id="const-next">${idx + 1 >= norm.steps.length ? "See your sky" : "Next star"}</button>`;
    document.body.classList.add("has-sticky-next");
    $("#const-next").addEventListener("click", () => {
      constellation.idx++;
      if (constellation.idx >= norm.steps.length) finishConstellation();
      else renderConstellation();
    });
    $("#const-next").focus();
  }
  function finishConstellation() {
    const { norm, results, flickers, puzzle } = constellation;
    const stars = results.filter((r) => r === true).length;
    const rec = {
      puzzleId: puzzle.id,
      puzzleNum: puzzleNumber(),
      type: norm.type,
      mode: "mc",
      stars,
      total: results.length,
      flickers,
      words: norm.type === "chain" ? norm.words.slice() : [norm.root.root].concat(norm.steps.map((s) => s.answer)),
      rootRecap: rootRecapFromPuzzle(puzzle),
      starGlyphs: constellationStars().map((s) => s.state),
      completedAt: Date.now(),
    };
    save.constellations = save.constellations || {};
    const today = localDateStr();
    save.constellations[today] = Object.assign({}, normalizeDayRec(save.constellations[today]), { mc: rec });
    persist();
    touchStreak();
    checkAchievements();
    constellation = null;
    renderConstellationDay(save.constellations[today]);
  }

  /* ---- mode 2: build the word from root tiles ----
     Same daily words, played by assembling each one from a tile bank
     (its root stems + leftover "ending" chunks + decoys) instead of
     picking it from a list — data/assembly_puzzles.js (see
     tools/build_assembly.py). No free first star here: every word,
     including the chain's opener, has to be built. A wrong attempt just
     shakes and resets the slots — you keep trying the same word, so
     "flickers" here means retries, not a permanently missed star; a word
     solved clean on the first try lights fully, one that took retries
     lights dimmer ("muddy") rather than staying dark.
     Cluster puzzles pre-fill the shared root's tile into whichever slot it
     actually belongs in for THAT word (its position moves — "dermatology"
     starts with the root, "pachyderm" ends with it — so a fixed slot would
     be wrong for half the family) and drop it from the tile bank, so the
     player places it once per puzzle instead of re-picking it every round. */
  function startAssembly(asm) {
    const puzzle = todaysPuzzle();
    assembly = {
      dateStr: localDateStr(),
      puzzle,
      asm,
      wordIdx: 0,
      misfires: asm.words.map(() => 0),
      placed: null, // set fresh by renderAssembly() each round
      locked: false,
      usedHints: false,
    };
    renderAssembly();
  }
  function sharedAssemblyStem(prevWord, word) {
    return word.sequence.find((s) => prevWord.sequence.includes(s)) || null;
  }
  function assemblyStars() {
    const { asm, wordIdx, misfires } = assembly;
    const clean = (i) => (misfires[i] === 0 ? "lit" : "muddy");
    const stars = [];
    if (asm.type === "chain") {
      asm.words.forEach((w, i) => {
        stars.push({
          label: i < wordIdx ? w.word : "",
          state: i < wordIdx ? clean(i) : i === wordIdx ? "current" : "pending",
          edgeLabel: i > 0 ? sharedAssemblyStem(asm.words[i - 1], w) : null,
          edgeLit: i > 0 && i <= wordIdx,
        });
      });
    } else {
      stars.push({ label: asm.hub.root, state: "lit", isRoot: true, hubMeaning: asm.hub.meaning });
      asm.words.forEach((w, i) => {
        stars.push({
          label: i < wordIdx ? w.word : "",
          state: i < wordIdx ? clean(i) : i === wordIdx ? "current" : "pending",
          edgeLabel: null,
          edgeLit: i < wordIdx,
        });
      });
    }
    return stars;
  }
  function renderAssembly() {
    const { asm, wordIdx, misfires } = assembly;
    const w = asm.words[wordIdx];
    const stars = assemblyStars();
    const hubStem = asm.type === "cluster" ? asm.hub.stem : null;
    const hubSlotIdx = hubStem ? w.sequence.indexOf(hubStem) : -1;
    // Pre-fill the shared root's slot (at ITS position in this word, not a
    // fixed one — see the doc comment above) and keep it out of the bank.
    assembly.placed = w.sequence.map((_, i) => (i === hubSlotIdx ? { stem: hubStem, given: true } : null));
    assembly.locked = false;
    const bankTiles = asm.tiles.map((t, i) => ({ ...t, tileIdx: i })).filter((t) => !(hubStem && t.stem === hubStem));
    app.innerHTML = `${header()}
      <section class="quiz const-quiz const-assembly">
        <div class="quiz-top">
          <span class="phase-kicker boss">🌌 Tonight's Constellation <span class="const-num">#${puzzleNumber()}</span><span class="const-mode-tag">🧩 build mode</span></span>
          <button class="back-btn" data-nav="home">Back</button>
        </div>
        ${buildConstellationSVG(asm.type, stars)}
        <p class="const-progress">Word ${wordIdx + 1} of ${asm.words.length}${misfires[wordIdx] ? ` · ${misfires[wordIdx]} retr${misfires[wordIdx] === 1 ? "y" : "ies"}` : ""}</p>
        <p class="const-def">“${esc(w.definition)}”</p>
        <div class="const-slots" id="const-slots">${w.sequence
          .map((_, i) => `<button class="const-slot${i === hubSlotIdx ? " given" : ""}" data-slot="${i}">${i === hubSlotIdx ? esc(hubStem) : ""}</button>`)
          .join("")}</div>
        <div class="const-bank">${bankTiles
          .map(
            (t) => `<button class="const-tile${t.meaning ? "" : " ending"}" data-tile-idx="${t.tileIdx}">
              <span class="const-tile-stem">${esc(t.stem)}</span>${t.meaning ? `<span class="const-tile-meaning">${esc(t.meaning)}</span>` : ""}
            </button>`
          )
          .join("")}</div>
        <div class="const-assembly-controls">
          <button class="btn ghost" id="const-hint">Show root meanings</button>
          <button class="btn ghost" id="const-clear">Clear</button>
        </div>
        <div id="feedback" class="feedback" hidden></div>
      </section>`;
    wireNav();
    app.querySelectorAll(".const-tile").forEach((btn) => btn.addEventListener("click", () => placeAssemblyTile(Number(btn.dataset.tileIdx), btn)));
    app.querySelectorAll(".const-slot").forEach((btn) => btn.addEventListener("click", () => removeAssemblyTile(Number(btn.dataset.slot))));
    $("#const-hint").addEventListener("click", () => {
      assembly.usedHints = true;
      $(".const-assembly").classList.toggle("show-hints");
    });
    $("#const-clear").addEventListener("click", () => {
      if (!assembly.locked) renderAssembly();
    });
  }
  function placeAssemblyTile(tileIdx, btnEl) {
    if (assembly.locked || btnEl.classList.contains("used")) return;
    const nextSlot = assembly.placed.findIndex((p) => p === null);
    if (nextSlot === -1) return;
    assembly.placed[nextSlot] = { stem: assembly.asm.tiles[tileIdx].stem, tileIdx };
    btnEl.classList.add("used");
    refreshAssemblySlots();
    if (assembly.placed.every((p) => p !== null)) checkAssembly();
  }
  function removeAssemblyTile(slotIdx) {
    if (assembly.locked) return;
    const p = assembly.placed[slotIdx];
    if (!p || p.given) return; // the pre-filled root tile can't be pulled back out
    assembly.placed[slotIdx] = null;
    const bankBtn = app.querySelector(`[data-tile-idx="${p.tileIdx}"]`);
    if (bankBtn) bankBtn.classList.remove("used");
    refreshAssemblySlots();
  }
  function refreshAssemblySlots() {
    app.querySelectorAll(".const-slot").forEach((el, i) => {
      const p = assembly.placed[i];
      el.textContent = p ? p.stem : "";
      el.classList.toggle("filled", !!p);
    });
  }
  function checkAssembly() {
    const { asm, wordIdx } = assembly;
    const w = asm.words[wordIdx];
    const built = assembly.placed.map((p) => p.stem);
    const ok = built.join("|") === w.sequence.join("|");
    const slotsEl = $("#const-slots");
    assembly.locked = true;
    $(".const-assembly").classList.add("locked");
    if (!ok) {
      assembly.misfires[wordIdx]++;
      slotsEl.classList.add("wrong");
      if (window.WordWebSFX) window.WordWebSFX.wrong();
      setTimeout(renderAssembly, 650);
      return;
    }
    if (window.WordWebSFX) window.WordWebSFX.correct();
    confettiBurst(slotsEl);
    // Held open on a "Next" tap rather than a fixed timeout — the whole
    // point of this pause is to actually register the assembled word, and
    // a timer either rushes that or (if long enough not to) idles for
    // players who read fast. A button lets everyone set their own pace.
    const fb = $("#feedback");
    fb.hidden = false;
    fb.innerHTML = `<div class="verdict yes"><span class="mascot">✳</span> ${reactionLine(true)}</div>
      <h3 class="const-built-word">${esc(w.word)}</h3>
      <p class="example">“${esc(w.definition)}”</p>
      <button class="btn primary" id="const-next">${assembly.wordIdx + 1 >= asm.words.length ? "See your sky" : "Next word"}</button>`;
    document.body.classList.add("has-sticky-next");
    persist();
    $("#const-next").addEventListener("click", () => {
      assembly.wordIdx++;
      if (assembly.wordIdx >= asm.words.length) finishAssembly();
      else renderAssembly();
    });
    $("#const-next").focus();
  }
  function finishAssembly() {
    const { asm, misfires, puzzle } = assembly;
    const total = asm.words.length;
    const rec = {
      puzzleId: puzzle.id,
      puzzleNum: puzzleNumber(),
      type: asm.type,
      mode: "assembly",
      stars: misfires.filter((m) => m === 0).length,
      total,
      flickers: misfires.reduce((a, b) => a + b, 0),
      usedHints: assembly.usedHints,
      words: asm.type === "chain" ? asm.words.map((w) => w.word) : [asm.hub.root].concat(asm.words.map((w) => w.word)),
      rootRecap: rootRecapFromPuzzle(puzzle),
      starGlyphs: assemblyStars().map((s) => s.state),
      completedAt: Date.now(),
    };
    save.constellations = save.constellations || {};
    const today = localDateStr();
    save.constellations[today] = Object.assign({}, normalizeDayRec(save.constellations[today]), { assembly: rec });
    persist();
    touchStreak();
    checkAchievements();
    assembly = null;
    renderConstellationDay(save.constellations[today]);
  }

  /* ---- shared: recap, share, archive ---- */
  // A day record can hold one or both modes' results (see finishConstellation/
  // finishAssembly); this always shows every run that's done and, if a mode
  // is still open (and actually available today), offers it as a next step
  // instead of treating the day as "used up" the moment one mode is played.
  function renderConstellationDay(dayRec) {
    const dueCount = dueReviews().length;
    const runs = [
      dayRec.mc ? { key: "mc", icon: "🔭", label: "Multiple choice", rec: dayRec.mc } : null,
      dayRec.assembly ? { key: "assembly", icon: "🧩", label: "Build the word", rec: dayRec.assembly } : null,
    ].filter(Boolean);
    const missing = !dayRec.mc ? "mc" : !dayRec.assembly ? "assembly" : null;
    const missingAsm = missing === "assembly" ? todaysAssemblyPuzzle() : null;
    const canTryOther = missing === "mc" || (missing === "assembly" && !!missingAsm);
    app.innerHTML = `${header()}
      <section class="results const-results">
        <div class="phase-kicker boss">🌌 Tonight's Constellation <span class="const-num">#${runs[0].rec.puzzleNum}</span></div>
        ${runs.map(renderConstellationRunCard).join("")}
        ${
          canTryOther
            ? `<button class="btn const-try-other" id="const-try-other">${missing === "mc" ? "🔭 Also try multiple choice" : "🧩 Also try building the word"}</button>`
            : ""
        }
        <div class="btn-row">
          <button class="btn ghost" id="const-sky">🌠 Night sky</button>
        </div>
        ${
          dueCount
            ? `<button class="btn const-revisit" id="const-revisit">${dueCount} star${dueCount === 1 ? "" : "s"} from past galaxies are fading ✨ Revisit them?</button>`
            : ""
        }
        <button class="back-btn" data-nav="home">Back</button>
      </section>`;
    wireNav();
    runs.forEach((r) => $(`#const-share-${r.key}`).addEventListener("click", () => shareConstellation(r.rec, $(`#const-share-${r.key}`))));
    $("#const-sky").addEventListener("click", showNightSky);
    const tryBtn = $("#const-try-other");
    if (tryBtn) tryBtn.addEventListener("click", () => (missing === "mc" ? startConstellation() : startAssembly(missingAsm)));
    const revisitBtn = $("#const-revisit");
    if (revisitBtn) revisitBtn.addEventListener("click", showReview);
  }
  function renderConstellationRunCard(run) {
    const rec = run.rec;
    const stars = frozenStarsFromRec(rec);
    return `<div class="const-run-card">
        <div class="const-run-head"><span class="const-run-icon">${run.icon}</span><span class="const-run-label">${esc(run.label)}</span></div>
        ${run.key === "assembly" ? buildConstellationSVG(rec.type, stars) : constellationStripHTML(stars)}
        <h2>${rec.stars}/${rec.total} stars${rec.flickers ? `, ${rec.flickers} flicker${rec.flickers === 1 ? "" : "s"}` : ""}</h2>
        <div class="const-root-recap">${rec.rootRecap.map((r) => `<span class="const-recap-chip"><b>${esc(r.root)}</b> — ${esc(r.meaning)}</span>`).join("")}</div>
        <p class="const-words">${rec.words.map(esc).join(" → ")}</p>
        <button class="btn primary" id="const-share-${run.key}">Share</button>
      </div>`;
  }
  function shareConstellation(rec, el) {
    const glyphs = rec.starGlyphs.map((s, i) => starGlyph(s, rec.type === "cluster" && i === 0)).join("—");
    const text = `Word Web #${rec.puzzleNum} 🌌\n${glyphs}\n${rec.stars}/${rec.total} stars${rec.flickers ? `, ${rec.flickers} flicker${rec.flickers === 1 ? "" : "s"}` : ""}${
      rec.mode === "assembly" && !rec.usedHints ? " · 🔒 no hints" : ""
    }`;
    const done = () => {
      if (el) {
        const old = el.textContent;
        el.textContent = "Copied!";
        setTimeout(() => (el.textContent = old), 1500);
      }
    };
    if (navigator.share) navigator.share({ text }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
  }
  // Reverse-chronological archive of every completed constellation — a free
  // collection mechanic, and gaps are shown deliberately (not skipped) so a
  // lapsed player sees the hole in their sky. Trimmed to start at today and
  // stop just past the earliest completion, rather than a fixed 60-day
  // stretch, so a brand-new player doesn't see 59 empty rows.
  function showNightSky() {
    const now = new Date();
    const rows = [];
    for (let i = 0; i < 60; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      rows.push({ d, dayRec: normalizeDayRec(save.constellations && save.constellations[localDateStr(d)]) });
    }
    const lastFilled = rows.reduce((last, r, i) => (r.dayRec ? i : last), -1);
    const visible = lastFilled === -1 ? rows.slice(0, 1) : rows.slice(0, lastFilled + 1);
    const runGlyphs = (rec, icon) =>
      `<span class="sky-run"><span class="sky-glyphs">${rec.starGlyphs.map((s, i) => starGlyph(s, rec.type === "cluster" && i === 0)).join("")}</span><span class="sky-score">${icon} ${rec.stars}/${rec.total}</span></span>`;
    app.innerHTML = `${header()}
      <section class="night-sky">
        <div class="practice-head">
          <span class="phase-kicker boss">🌠 Your night sky</span>
          <p class="practice-sub">Every constellation you've completed, dated.</p>
          <button class="back-btn" data-nav="home">Back</button>
        </div>
        <div class="sky-list">
          ${visible
            .map(
              ({ d, dayRec }) => `<div class="sky-row ${dayRec ? "filled" : "empty"}">
                <span class="sky-date">${esc(d.toLocaleDateString(undefined, { month: "short", day: "numeric" }))}</span>
                ${
                  dayRec
                    ? `${dayRec.mc ? runGlyphs(dayRec.mc, "🔭") : ""}${dayRec.assembly ? runGlyphs(dayRec.assembly, "🧩") : ""}`
                    : `<span class="sky-glyphs sky-gap">· · · · ·</span><span class="sky-score dim">—</span>`
                }
              </div>`
            )
            .join("")}
        </div>
      </section>`;
    wireNav();
  }

  /* ---------- share ---------- */
  function shareProgress(el) {
    const allRoots = GAME.domains.flatMap((d) => d.rootIds);
    const mastered = allRoots.filter(rootMastered).length;
    const learned = new Set();
    Object.values(save.roots).forEach((rs) => Object.keys(rs.correct).forEach((w) => learned.add(w)));
    const text = `Word Web: ${mastered}/${GAME.meta.root_count} roots mastered, ${learned.size} words learned, ${save.points} points. Learn the root, unlock the words.`;
    const done = () => {
      if (el) {
        const old = el.textContent;
        el.textContent = "Copied!";
        setTimeout(() => (el.textContent = old), 1500);
      }
    };
    if (navigator.share) navigator.share({ text }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
  }

  /* ---------- nav wiring ---------- */
  function wireNav() {
    app.querySelectorAll("[data-nav]").forEach((el) =>
      el.addEventListener("click", () => {
        const t = el.dataset.nav;
        if (t === "home") showHome();
        if (t === "practice") showPractice();
        if (t === "you") showProfile();
        if (t === "review") showReview();
        if (t === "revision") showRevision();
        if (t === "constellation") showConstellation();
        if (t === "nightsky") showNightSky();
        if (t === "bridges" && window.WordWebBridges) window.WordWebBridges.show();
        if (t === "web" && window.WordWebView) window.WordWebView.show();
        if (t === "share") shareProgress(el);
        if (t === "tutorial") showTutorial();
        if (t === "sound") {
          save.soundOn = !save.soundOn;
          persist();
          if (save.soundOn && window.WordWebSFX) window.WordWebSFX.tap();
          const icon = el.querySelector ? el : el;
          el.textContent = save.soundOn ? "🔊" : "🔇";
          el.title = (save.soundOn ? "Mute" : "Unmute") + " sound";
        }
        if (t === "hardmode") {
          save.hardMode = !save.hardMode;
          persist();
          if (window.WordWebSFX) window.WordWebSFX.tap();
          el.classList.toggle("primary", save.hardMode);
          el.textContent = `🎯 Pro mode: ${save.hardMode ? "ON" : "OFF"}`;
        }
        if (t === "examfocus") showExamFocusModal();
      })
    );
    app.querySelectorAll("[data-domain-link]").forEach((el) =>
      el.addEventListener("click", () => showDomain(el.dataset.domainLink))
    );
    app.querySelectorAll(".sky-label").forEach((el) =>
      el.addEventListener("click", () => showDomain(el.dataset.domain))
    );
  }

  /* ---------- public API for phase-2 modules (bridges.js, web.js) ---------- */
  window.WordWeb = {
    // A live getter, not a frozen snapshot — exam-focus mode reassigns the
    // GAME variable via rebuildGame(), and phase-2 modules always re-fetch
    // it through api() rather than caching it, so they pick up the swap.
    get GAME() {
      return GAME;
    },
    getSave: () => save,
    persist,
    rootState,
    rootMastered,
    showHome,
    showPractice,
    showProfile,
    showDomain,
    startLevel,
    wireNav,
    header,
    tabBarHTML,
    esc,
    examBadges,
    DAY,
    addReview(word) {
      if (!save.review.some((r) => r.word === word)) {
        save.review.push({ word, box: 0, due: Date.now() });
        persist();
      }
    },
    addPoints(n) {
      save.points += n;
      persist();
      checkAchievements();
    },
    confettiBurst,
    shakeEl,
    popEl,
    reactionLine,
    touchStreak,
    gainHeart,
  };

  // Silently backfill badges for progress made before this feature shipped —
  // a returning player earns them retroactively without a flood of toasts.
  if (!save.badgesBackfilled) {
    checkAchievements(true);
    save.badgesBackfilled = true;
    persist();
  }

  showHome();
})();
