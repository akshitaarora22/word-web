/* game.js — screens, state, scoring, persistence. Vanilla JS, no build step. */

(function () {
  const L = window.WordWebLevels;
  const GAME = L.buildGame(window.WORDWEB_DATA);

  /* ---------- persistence ---------- */
  const SAVE_KEY = "wordweb_save_v1";
  const defaultSave = () => ({
    points: 0,
    bestStreak: 0,
    levels: {}, // levelId -> { completed, bestScore }
    roots: {}, // rootId -> { correct: {word:true}, decoded: bool }
    review: [], // { word, box, due } due = ms epoch
    daily: {}, // dateStr -> true
    hearts: 5,
    heartsMax: 5,
    nextHeartAt: null, // ms epoch when next heart regenerates
    streakDays: 0,
    lastPlayDate: null, // dateStr
    soundOn: true,
    tutorialDone: false,
  });
  let save = load();
  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      return raw ? Object.assign(defaultSave(), JSON.parse(raw)) : defaultSave();
    } catch (e) {
      return defaultSave();
    }
  }
  function persist() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    } catch (e) {}
  }

  /* ---------- helpers ---------- */
  const $ = (sel) => document.querySelector(sel);
  const app = $("#app");
  const rng = Math.random;
  const todayStr = () => new Date().toISOString().slice(0, 10);
  const DAY = 24 * 60 * 60 * 1000;
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function rootState(rootId) {
    return (save.roots[rootId] = save.roots[rootId] || { correct: {}, decoded: false });
  }
  function rootMastered(rootId) {
    const level = GAME.domains.flatMap((d) => d.levels).find((lv) => lv.roots.includes(rootId) && lv.kind === "root");
    const rs = rootState(rootId);
    if (level) {
      const all = level.teachWords.every((w) => rs.correct[w.word]);
      const dec = level.decodeWords.length === 0 || rs.decoded;
      return all && dec;
    }
    // bundled root: mastered when all its words answered correctly
    const words = window.WORDWEB_DATA.root_word_index[rootId] || [];
    return words.length > 0 && words.every((w) => rs.correct[w]);
  }
  function levelProgress(level) {
    const seen = new Set();
    let done = 0;
    level.teachWords.forEach((w) => {
      level.roots.forEach((r) => {
        if (rootState(r).correct[w.word] && !seen.has(w.word)) {
          seen.add(w.word);
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
        body: "Words are grouped into <b>13 domains</b> — Science, Law, Emotion, and more. Each domain is a winding path of levels. Complete a level to light up stars in its constellation.",
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
      {
        icon: "⬡",
        title: "Your Knowledge Web",
        body: "Every root is a node. Roots that share a bridge word are linked by an edge. During quizzes your web <b>grows in real time</b> as you answer correctly. Mastered roots glow gold.",
        visual: `<div class="tut-visual tut-visual-web">
          <svg viewBox="0 0 160 70" width="160" height="70">
            <line x1="80" y1="35" x2="32" y2="18" stroke="#2a3868" stroke-width="1.5"/>
            <line x1="80" y1="35" x2="128" y2="18" stroke="#2a3868" stroke-width="1.5"/>
            <line x1="80" y1="35" x2="50" y2="58" stroke="#2a3868" stroke-width="1.5"/>
            <line x1="80" y1="35" x2="115" y2="58" stroke="#2a3868" stroke-width="1.5"/>
            <circle cx="80" cy="35" r="11" fill="hsl(220 60% 50%)" stroke="hsl(220 60% 75%)" stroke-width="1.5"/>
            <circle cx="32" cy="18" r="5" fill="#4cc27a" stroke="#9fe0b8" stroke-width="1.2"/>
            <circle cx="128" cy="18" r="5" fill="#4cc27a" stroke="#9fe0b8" stroke-width="1.2"/>
            <circle cx="50" cy="58" r="5" fill="#e8b64c" stroke="#fff0c9" stroke-width="1.2"/>
            <circle cx="115" cy="58" r="5" fill="#4cc27a" stroke="#9fe0b8" stroke-width="1.2"/>
            <text x="80" y="38.5" text-anchor="middle" font-size="7" fill="#c8c2b4" font-family="monospace">aud</text>
          </svg>
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
    const wid = "word:" + word.word;
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

  function miniConstellationSVG(dom) {
    const W = 160, H = 70;
    const cx = W / 2, cy = H / 2;
    const pts = dom.rootIds.map((rid, j) => {
      const a = (L.hash(rid) % 360) * (Math.PI / 180);
      const r = 12 + (L.hash(rid + "r") % 22);
      return {
        x: Math.min(W - 8, Math.max(8, cx + Math.cos(a + j) * r)),
        y: Math.min(H - 8, Math.max(8, cy + Math.sin(a + j) * (r * 0.6))),
        m: rootMastered(rid),
      };
    });
    let out = `<svg viewBox="0 0 ${W} ${H}" class="mini-sky" aria-hidden="true">`;
    for (let j = 1; j < pts.length; j++) {
      out += `<line x1="${pts[j - 1].x.toFixed(1)}" y1="${pts[j - 1].y.toFixed(1)}" x2="${pts[j].x.toFixed(1)}" y2="${pts[j].y.toFixed(1)}" class="sky-line" style="--h:${dom.hue}"/>`;
    }
    pts.forEach((p) => {
      out += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.m ? 5 : 2.5}" class="star ${p.m ? "lit mini-lit" : "dim"}" style="--h:${dom.hue}"/>`;
    });
    out += `</svg>`;
    return out;
  }

  /* ---------- screens ---------- */
  function header() {
    refreshHearts();
    const hearts = Array.from({ length: save.heartsMax }, (_, i) =>
      i < save.hearts ? '<span class="heart full">♥</span>' : '<span class="heart empty">♡</span>'
    ).join("");
    return `<header class="top">
      <div class="brand" data-nav="home"><span class="brand-mark">✳</span> Word Web</div>
      <nav class="topnav">
        <a data-nav="web" title="Explore the root web">Web</a>
        <a data-nav="share" title="Copy your progress">Share</a>
      </nav>
      <div class="stats">
        <span class="streak-pill" title="Day streak">🔥 ${save.streakDays}</span>
        <span class="hearts" title="${save.hearts < save.heartsMax ? "Next heart in " + heartTimeLeft() : "Full hearts"}">${hearts}</span>
        <span title="Total points">${save.points} pts</span>
        <button class="sound-toggle" data-nav="sound" title="${save.soundOn ? "Mute" : "Unmute"} sound">${save.soundOn ? "🔊" : "🔇"}</button>
        <button class="help-btn" data-nav="tutorial" title="How to play">?</button>
      </div>
    </header>`;
  }

  function showHome() {
    touchStreak();
    const due = dueReviews();
    const daily = dailyWord();
    const dailyDone = save.daily[todayStr()];
    const masteredRoots = GAME.domains.reduce((acc, d) => acc + d.rootIds.filter((rid) => rootMastered(rid)).length, 0);
    const masteryPct = GAME.meta.root_count ? Math.round((100 * masteredRoots) / GAME.meta.root_count) : 0;
    app.innerHTML = `${header()}
      <section class="hero">
        <h1>Learn the root. Unlock the words.</h1>
        <p class="lede">${GAME.meta.root_count} roots · ${GAME.meta.word_count} words · ${GAME.meta.words_on_gre_list} on the GRE list</p>
        <div class="hero-progress">
          <div class="hero-progress-labels">
            <span class="hero-mastered-num">${masteredRoots}</span><span class="hero-mastered-label"> of ${GAME.meta.root_count} roots mastered</span>
            <span class="hero-pct">${masteryPct}%</span>
          </div>
          <div class="hero-bar"><div class="hero-bar-fill" style="width:${masteryPct}%"></div></div>
        </div>
      </section>
      <section class="cards">
        <div class="card daily ${dailyDone ? "done" : ""}" data-nav="daily">
          <div class="card-kicker">Word of the day</div>
          <div class="card-title">${dailyDone ? esc(daily.word) : "?????"}</div>
          <div class="card-note">${dailyDone ? "Solved. New word tomorrow." : "One untaught word. 30 points."}</div>
        </div>
        <div class="card bridge" data-nav="bridges">
          <div class="card-kicker">Bridge run</div>
          <div class="card-title">Build words</div>
          <div class="card-note">Assemble bridge words from root tiles. 30 points each.</div>
        </div>
        <div class="card review ${due.length ? "" : "done"}" data-nav="review">
          <div class="card-kicker">Review sprint</div>
          <div class="card-title">${due.length} due</div>
          <div class="card-note">${due.length ? "Missed words come back. Clear the queue." : "Queue is clear."}</div>
        </div>
        <div class="card web-featured" data-nav="web">
          <div class="card-kicker">Root Web ✦</div>
          <div class="card-title">Explore all ${GAME.meta.root_count} roots</div>
          <div class="card-note">See every root linked by shared words. Drag, zoom, tap. Mastered roots glow gold.</div>
        </div>
      </section>
      <p class="section-label">Explore by domain</p>
      <section class="domain-grid">
        ${GAME.domains
          .map((dom, i) => {
            const m = domainMastery(dom);
            const pct = m.total ? Math.round((100 * m.mastered) / m.total) : 0;
            return `<button class="domain-card" data-domain="${dom.id}" style="--h:${dom.hue};--accent:hsl(${dom.hue} 65% 60%)">
              <div class="domain-card-sky">${miniConstellationSVG(dom)}</div>
              <div class="domain-card-body">
                ${i === 0 && m.mastered === 0 ? '<span class="tag">start here</span>' : ""}
                <div class="domain-card-name">${esc(dom.name)}</div>
                <div class="domain-card-meta">${dom.levels.length} levels · ${m.mastered}/${m.total} mastered</div>
                <span class="meter"><span style="width:${pct}%"></span></span>
              </div>
            </button>`;
          })
          .join("")}
      </section>
      <footer class="foot">Progress is saved in this browser.</footer>`;
    app.querySelectorAll("[data-domain]").forEach((el) =>
      el.addEventListener("click", () => showDomain(el.dataset.domain))
    );
    wireNav();
    if (!save.tutorialDone) setTimeout(() => showTutorial(), 400);
  }

  function showDomain(domId) {
    const dom = GAME.domains.find((d) => d.id === domId);
    app.innerHTML = `${header()}
      <section class="crumbs"><a data-nav="home">Map</a> / ${esc(dom.name)}</section>
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
      </section>`;
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
    const queue = level.teachWords.slice();
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
    run = { level, queue, idx: -1, score: 0, streak: 0, correct: 0, phase: "discover", decodeIdx: 0 };
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
    app.innerHTML = `${header()}
      <section class="crumbs"><a data-nav="home">Map</a> / <a data-domain-link="${dom.id}">${esc(dom.name)}</a> / ${esc(level.title)}</section>
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
        <p class="discover-hint">${level.teachWords.length} words ahead${level.decodeWords.length ? `, then ${level.decodeWords.length} you'll decode cold` : ""}. Answer without the hint for double points.</p>
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
    const q = L.optionsFor(word, GAME, rng);
    let hintUsed = false;
    let answered = false;
    const total = run.queue.length + run.level.decodeWords.length;
    const num = isDecode ? run.queue.length + run.decodeIdx + 1 : run.idx + 1;
    app.innerHTML = `${header()}
      ${progressBar(num - 1, total)}
      <section class="quiz" style="--h:${dom.hue}">
        <div class="quiz-top">
          <span class="phase-kicker ${isDecode ? "boss" : ""}">${isDecode ? "Decode" : esc(run.level.title)}</span>
          <span class="quiz-count">${num}/${total}${run.streak > 1 ? ` · <span class="streak-live">🔥${run.streak}</span>` : ""}</span>
        </div>
        <h2 class="quiz-word">${esc(word.word)} <span class="pos">${esc(word.part_of_speech || "")}</span>
          ${word.gre_list ? '<span class="gre">GRE</span>' : ""}</h2>
        <div class="hint-row">${isDecode ? "" : '<button class="btn ghost" id="hint">Show roots (halves points)</button>'}
          <div id="hint-box" class="hint-box" hidden></div></div>
        <div class="options">
          ${q.options.map((o, i) => `<button class="option" data-i="${i}">${esc(o)}</button>`).join("")}
        </div>
        <div id="quiz-graph" class="quiz-graph"></div>
        <div id="feedback" class="feedback" hidden></div>
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
            run.level.roots.forEach((rid) => (rootState(rid).decoded = true));
          } else {
            gained = hintUsed ? 10 : 20;
            gained += Math.min(10, (run.streak - 1) * 2);
          }
          if (word.gre_list) gained += 5;
          run.score += gained;
          save.points += gained;
          (word.roots || []).forEach((rid) => (rootState(rid).correct[word.word] = true));
          run.level.roots.forEach((rid) => (rootState(rid).correct[word.word] = rootState(rid).correct[word.word] || (word.roots || []).includes(rid)));
          popEl(btn);
          addWordToGraph(word, isDecode);
          renderQuizGraph();
          if (isDecode || run.streak % 5 === 0) confettiBurst(btn);
          if (window.WordWebSFX) window.WordWebSFX.correct();
        } else {
          run.streak = 0;
          if (!save.review.some((r) => r.word === word.word)) {
            save.review.push({ word: word.word, box: 0, due: Date.now() });
          }
          shakeEl(btn);
          if (window.WordWebSFX) window.WordWebSFX.wrong();
          loseHeart();
          if (window.WordWebSFX && save.hearts === 0) window.WordWebSFX.heartLost();
        }
        touchStreak();
        persist();
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
    const { level, score, correct, queue } = run;
    const st = (save.levels[level.id] = save.levels[level.id] || { completed: false, bestScore: 0 });
    st.completed = true;
    st.bestScore = Math.max(st.bestScore, score);
    persist();
    const dom = GAME.domains.find((d) => d.id === level.domain);
    const mastered = level.roots.every(rootMastered);
    app.innerHTML = `${header()}
      <section class="results" style="--h:${dom.hue}">
        <div class="phase-kicker">${mastered ? "Root mastered" : "Level complete"}</div>
        <h2>${esc(level.title)}</h2>
        <p class="score-line">+${score} points · ${correct}/${queue.length + level.decodeWords.length} correct</p>
        ${mastered ? '<p class="mastered-note">This constellation is lit on your map.</p>' : '<p class="mastered-note dim">Answer every word (and the boss) correctly to master this root.</p>'}
        <div class="btn-row">
          <button class="btn" id="replay">Play again</button>
          <button class="btn primary" id="back">Back to ${esc(dom.name)}</button>
        </div>
      </section>`;
    $("#replay").addEventListener("click", () => startLevel(level.id));
    $("#back").addEventListener("click", () => showDomain(dom.id));
    wireNav();
    if (window.WordWebSFX) window.WordWebSFX.levelup();
    confettiBurst($(".results h2"));
    run = null;
  }

  /* ---------- review sprint ---------- */
  function showReview() {
    const due = dueReviews();
    if (!due.length) {
      showHome();
      return;
    }
    const item = due[0];
    const word = GAME.wordsByName[item.word];
    if (!word) {
      save.review = save.review.filter((r) => r !== item);
      persist();
      showReview();
      return;
    }
    const q = L.optionsFor(word, GAME, rng);
    app.innerHTML = `${header()}
      <section class="quiz review-quiz">
        <div class="quiz-top"><span class="phase-kicker">Review</span><span class="quiz-count">${due.length} left</span></div>
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
        const fb = $("#feedback");
        fb.hidden = false;
        fb.innerHTML = `<div class="verdict ${correct ? "yes" : "no"}"><span class="mascot">${correct ? "✳" : "…"}</span> ${reactionLine(correct)} ${correct ? "<b>+5</b>" + (heartGained ? " · +1 heart" : "") : ""}</div>
          <p class="example">“${esc(word.example)}”</p>
          <button class="btn primary" id="next">Next</button>`;
        $("#next").addEventListener("click", () => {
          if (dueReviews().length) showReview();
          else showHome();
        });
        $("#next").focus();
      })
    );
  }

  /* ---------- daily word ---------- */
  function dailyWord() {
    const days = Math.floor(Date.now() / DAY);
    return GAME.daily[days % GAME.daily.length];
  }
  function showDaily() {
    const word = dailyWord();
    if (save.daily[todayStr()]) {
      showHome();
      return;
    }
    const q = L.optionsFor(word, GAME, rng);
    app.innerHTML = `${header()}
      <section class="quiz daily-quiz">
        <div class="quiz-top"><span class="phase-kicker boss">Word of the day</span></div>
        <h2 class="quiz-word">${esc(word.word)} <span class="pos">${esc(word.part_of_speech || "")}</span>${word.gre_list ? '<span class="gre">GRE</span>' : ""}</h2>
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
          if (!save.review.some((r) => r.word === word.word))
            save.review.push({ word: word.word, box: 0, due: Date.now() });
          shakeEl(btn);
          if (window.WordWebSFX) window.WordWebSFX.wrong();
        }
        save.daily[todayStr()] = true;
        touchStreak();
        persist();
        const fb = $("#feedback");
        fb.hidden = false;
        fb.innerHTML = `<div class="verdict ${correct ? "yes" : "no"}"><span class="mascot">${correct ? "✳" : "…"}</span> ${reactionLine(correct)} ${correct ? "<b>+30</b>" : ""}</div>
          <p class="example">“${esc(word.example)}”</p>
          <button class="btn primary" id="next">Done</button>`;
        $("#next").addEventListener("click", showHome);
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
        if (t === "review") showReview();
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
    GAME,
    getSave: () => save,
    persist,
    rootState,
    rootMastered,
    showHome,
    showDomain,
    startLevel,
    wireNav,
    header,
    esc,
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
    },
    confettiBurst,
    shakeEl,
    popEl,
    reactionLine,
    touchStreak,
    gainHeart,
  };

  showHome();
})();
