/* game.js — screens, state, scoring, persistence. Vanilla JS, no build step. */

(function () {
  const L = window.WordWebLevels;
  let GAME; // set below, once `save` is loaded — see rebuildGame()

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
    daily: {}, // dateStr -> true
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
        body: "Words are grouped into <b>domains</b> — Science, Law, Emotion, and more. Each domain is a winding path of levels. Complete a level to light up stars in its constellation.",
        visual: `<div class="tut-visual tut-visual-domains">
          <div class="tut-domain-row"><span class="tut-star lit">★</span><span class="tut-star lit">★</span><span class="tut-star">☆</span><span class="tut-star">☆</span> <b>Kinship &amp; Gender</b> <span class="tut-badge">start here</span></div>
          <div class="tut-domain-row"><span class="tut-star">☆</span><span class="tut-star">☆</span><span class="tut-star">☆</span><span class="tut-star">☆</span> <b>Mind &amp; Senses</b></div>
        </div>`,
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
        icon: "📅",
        title: "Daily Challenges",
        body: "<b>Word of the Day</b> — one mystery word every 24 hours.<br><b>Bridge Run</b> — assemble bridge words from root tiles.<br><b>Review Sprint</b> — words you missed come back for spaced practice.",
        visual: `<div class="tut-visual tut-visual-cards">
          <div class="tut-mini-card daily-c"><span>📅</span> Word of the day</div>
          <div class="tut-mini-card bridge-c"><span>⬡</span> Bridge run</div>
          <div class="tut-mini-card review-c"><span>🔄</span> Review sprint</div>
        </div>`,
      },
      // {
      //   icon: "⬡",
      //   title: "Your Knowledge Web",
      //   body: "Every root is a node. Roots that share a bridge word are linked by an edge. During quizzes your web <b>grows in real time</b> as you answer correctly. Mastered roots glow gold.",
      //   visual: `<div class="tut-visual tut-visual-web">
      //     <svg viewBox="0 0 160 70" width="160" height="70">
      //       <line x1="80" y1="35" x2="32" y2="18" stroke="#2a3868" stroke-width="1.5"/>
      //       <line x1="80" y1="35" x2="128" y2="18" stroke="#2a3868" stroke-width="1.5"/>
      //       <line x1="80" y1="35" x2="50" y2="58" stroke="#2a3868" stroke-width="1.5"/>
      //       <line x1="80" y1="35" x2="115" y2="58" stroke="#2a3868" stroke-width="1.5"/>
      //       <circle cx="80" cy="35" r="11" fill="hsl(220 60% 50%)" stroke="hsl(220 60% 75%)" stroke-width="1.5"/>
      //       <circle cx="32" cy="18" r="5" fill="#4cc27a" stroke="#9fe0b8" stroke-width="1.2"/>
      //       <circle cx="128" cy="18" r="5" fill="#4cc27a" stroke="#9fe0b8" stroke-width="1.2"/>
      //       <circle cx="50" cy="58" r="5" fill="#e8b64c" stroke="#fff0c9" stroke-width="1.2"/>
      //       <circle cx="115" cy="58" r="5" fill="#4cc27a" stroke="#9fe0b8" stroke-width="1.2"/>
      //       <text x="80" y="38.5" text-anchor="middle" font-size="7" fill="#c8c2b4" font-family="monospace">aud</text>
      //     </svg>
      //   </div>`,
      // },
      {
        icon: "🎓",
        title: "Studying for a Specific Exam?",
        body: "Every word carries small badges for the real vocabulary lists it appears on — <b>GRE, SAT, ACT, GMAT, TOEFL, IELTS</b>. Head to your <b>Profile → Exam focus</b> to filter play down to just one exam, any combination, or leave them all unchecked to play everything.",
        visual: `<div class="tut-visual tut-visual-exams">
          <span class="exam-badge gre" style="--h:45">GRE</span>
          <span class="exam-badge" style="--h:205">SAT</span>
          <span class="exam-badge" style="--h:140">ACT</span>
          <span class="exam-badge" style="--h:275">GMAT</span>
          <span class="exam-badge" style="--h:185">TOEFL</span>
          <span class="exam-badge" style="--h:15">IELTS</span>
        </div>`,
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
    overlay.className = "tutorial-backdrop";

    function render() {
      const s = steps[step];
      const isLast = step === steps.length - 1;
      overlay.innerHTML = `<div class="tutorial-card">
        <div class="tut-step-line">
          ${steps.map((_, i) => `<span class="tutorial-dot${i === step ? " active" : ""}"></span>`).join("")}
        </div>
        <span class="tutorial-icon">${s.icon}</span>
        <h2 class="tutorial-title">${s.title}</h2>
        ${s.visual || ""}
        <p class="tutorial-body">${s.body}</p>
        <div class="tutorial-nav">
          <button class="tut-skip">${isLast ? "" : "Skip"}</button>
          <button class="btn primary tut-next">${isLast ? "Let's go! ★" : "Next →"}</button>
        </div>
      </div>`;

      overlay.querySelector(".tut-next").addEventListener("click", () => {
        if (isLast) closeTutorial();
        else { step++; render(); }
      });
      const skipBtn = overlay.querySelector(".tut-skip");
      if (skipBtn && skipBtn.textContent) skipBtn.addEventListener("click", closeTutorial);
    }

    function closeTutorial() {
      save.tutorialDone = true;
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
    const daily = dailyWord();
    const dailyDone = save.daily[todayStr()];
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
          dailyDone
            ? `<div class="quest-bubble done" style="cursor:default">
                <span class="qb-icon">📅</span>
                <span class="qb-text">
                  <span class="qb-label">Word of the day</span>
                  <span class="qb-word">${esc(daily.word)} — solved</span>
                </span>
              </div>`
            : `<button class="quest-bubble" data-nav="daily">
                <span class="qb-icon">📅</span>
                <span class="qb-text">
                  <span class="qb-label">Word of the day</span>
                  <span class="qb-word">? ? ? ? ? ?</span>
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
    if (!save.tutorialDone) setTimeout(() => showTutorial(), 400);
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
    const dailyDone = save.daily[todayStr()];
    app.innerHTML = `${header()}
      <section class="practice">
        <div class="practice-head">
          <span class="phase-kicker">Practice</span>
          <p class="practice-sub">Short, focused reps — no island required.</p>
          <button class="back-btn" data-nav="home">Back</button>
        </div>
        <div class="practice-list">
          <button class="prac-row" data-nav="daily">
            <span class="prac-icon daily">📅</span>
            <span class="prac-text">
              <span class="prac-title">Word of the day</span>
              <span class="prac-note">${dailyDone ? "Solved. New word tomorrow." : "One untaught word · 30 points"}</span>
            </span>
            <span class="prac-badge ${dailyDone ? "done" : ""}">${dailyDone ? "✓" : "NEW"}</span>
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
        <div class="hint-row">${isDecode ? "" : '<button class="btn ghost" id="hint">Show roots (halves points)</button>'}
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
  function dailyWord() {
    const days = Math.floor(Date.now() / DAY);
    return GAME.daily[days % GAME.daily.length];
  }
  function showDaily() {
    const word = dailyWord();
    if (save.daily[todayStr()]) {
      showPractice();
      return;
    }
    const q = L.optionsFor(word, GAME, rng, save.hardMode);
    app.innerHTML = `${header()}
      <section class="quiz daily-quiz">
        <div class="quiz-top"><span class="phase-kicker boss">Word of the day</span><span><button class="back-btn" data-nav="home">Back</button></span></div>
        <h2 class="quiz-word">${esc(word.word)} <span class="pos">${esc(word.part_of_speech || "")}</span>${examBadges(word)}</h2>
        <p class="discover-hint">No roots to lean on — this one you just have to know. 30 points.</p>
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
        if (correct) {
          save.points += 30;
          popEl(btn);
          confettiBurst(btn);
          if (window.WordWebSFX) window.WordWebSFX.correct();
        } else {
          const wordKey = word.key || word.word;
          if (!save.review.some((r) => r.word === wordKey))
            save.review.push({ word: wordKey, box: 0, due: Date.now() });
          shakeEl(btn);
          if (window.WordWebSFX) window.WordWebSFX.wrong();
        }
        save.daily[todayStr()] = true;
        touchStreak();
        persist();
        if (correct) checkAchievements();
        const fb = $("#feedback");
        fb.hidden = false;
        fb.innerHTML = `<div class="verdict ${correct ? "yes" : "no"}"><span class="mascot">${correct ? "✳" : "…"}</span> ${reactionLine(correct)} ${correct ? "<b>+30</b>" : ""}</div>
          <p class="example">“${esc(word.example)}”</p>
          <button class="btn primary" id="next">Done</button>`;
        document.body.classList.add("has-sticky-next");
        $("#next").addEventListener("click", showPractice);
        $("#next").focus();
      })
    );
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
        if (t === "daily") showDaily();
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
