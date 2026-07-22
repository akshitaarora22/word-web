/* bridges.js — Bridge run: given a definition, build the word from root tiles.
   Uses the 114 multi-root "bridge" words; the 63 word-less roots pull duty as distractors. */

(function () {
  const RUN_LENGTH = 5;

  function api() {
    return window.WordWeb;
  }

  function pool() {
    const { GAME, rootState } = api();
    const words = window.WORDWEB_DATA.words.filter((w) => (w.roots || []).length >= 2);
    // Prefer words whose roots the player has already touched — decoding feels earned.
    const touched = (rid) => Object.keys(rootState(rid).correct).length > 0 || rootState(rid).decoded;
    return words
      .map((w) => ({ w, warm: w.roots.filter(touched).length }))
      .sort((a, b) => b.warm - a.warm || Math.random() - 0.5);
  }

  function distractorRoots(word, count) {
    const { GAME } = api();
    const all = window.WORDWEB_DATA.roots;
    const correct = new Set(word.roots);
    // Mix: word-less roots (the vault) + same-domain roots, shuffled
    const cands = all.filter((r) => !correct.has(r.id));
    for (let i = cands.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cands[i], cands[j]] = [cands[j], cands[i]];
    }
    // bias toward same domain for plausibility
    cands.sort((a, b) => (b.domain === word.domain ? 1 : 0) - (a.domain === word.domain ? 1 : 0) + (Math.random() - 0.5));
    return cands.slice(0, count);
  }

  let run = null;

  function show() {
    const p = pool();
    const picks = p.slice(0, Math.max(RUN_LENGTH * 3, 15));
    // sample RUN_LENGTH from the warm end with a little variety
    const chosen = [];
    const used = new Set();
    while (chosen.length < RUN_LENGTH && picks.length) {
      const i = Math.floor(Math.random() * Math.min(picks.length, 8));
      const c = picks.splice(i, 1)[0];
      if (!used.has(c.w.word)) {
        used.add(c.w.word);
        chosen.push(c.w);
      }
    }
    run = { words: chosen, idx: 0, score: 0, correct: 0 };
    puzzle();
  }

  function puzzle() {
    const { GAME, header, wireNav, esc } = api();
    if (run.idx >= run.words.length) {
      results();
      return;
    }
    const word = run.words[run.idx];
    const dom = GAME.domains.find((d) => d.id === (GAME.rootsById[word.roots[0]] || {}).domain) || GAME.domains[0];
    const need = word.roots.length;
    const tiles = word.roots
      .map((rid) => GAME.rootsById[rid])
      .concat(distractorRoots(word, need >= 3 ? 5 : 4));
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    const app = document.querySelector("#app");
    app.innerHTML = `${header()}
      <section class="quiz bridge-quiz" style="--h:${dom.hue}">
        <div class="quiz-top">
          <span class="phase-kicker boss">Bridge run</span>
          <span class="quiz-count">${run.idx + 1}/${run.words.length}</span>
        </div>
        <p class="bridge-def">“${esc(word.definition)}” <span class="pos">${esc(word.part_of_speech || "")}</span>${word.gre_list ? '<span class="gre">GRE</span>' : ""}</p>
        <p class="discover-hint">Pick the ${need} roots this word is built from.</p>
        <div class="slots">${Array.from({ length: need }, (_, i) => `<div class="slot" data-slot="${i}"></div>`).join("")}</div>
        <div class="tiles">
          ${tiles
            .map(
              (r, i) => `<button class="tile" data-tile="${i}" data-root="${esc(r.id)}">
                <span class="tile-root">${esc(r.root)}</span>
                <span class="tile-meaning">${esc(r.meaning)}</span>
              </button>`
            )
            .join("")}
        </div>
        <div class="btn-row">
          <button class="btn primary" id="check" disabled>Check</button>
          <button class="btn ghost" id="skip">Skip</button>
        </div>
        <div id="feedback" class="feedback" hidden></div>
      </section>`;
    wireNav();

    const picked = []; // {rootId, tileEl}
    const checkBtn = document.querySelector("#check");
    const refresh = () => {
      document.querySelectorAll(".slot").forEach((s, i) => {
        s.textContent = picked[i] ? picked[i].label : "";
        s.classList.toggle("filled", !!picked[i]);
      });
      checkBtn.disabled = picked.length !== need;
    };
    app.querySelectorAll(".tile").forEach((t) =>
      t.addEventListener("click", () => {
        const rid = t.dataset.root;
        const at = picked.findIndex((p) => p.tile === t);
        if (at >= 0) {
          picked.splice(at, 1);
          t.classList.remove("picked");
        } else if (picked.length < need) {
          picked.push({ rootId: rid, tile: t, label: t.querySelector(".tile-root").textContent });
          t.classList.add("picked");
        }
        refresh();
      })
    );
    document.querySelector("#skip").addEventListener("click", () => {
      run.idx++;
      puzzle();
    });
    checkBtn.addEventListener("click", () => {
      const chosen = picked.map((p) => p.rootId).sort().join("|");
      const target = word.roots.slice().sort().join("|");
      const correct = chosen === target;
      finish(word, correct);
    });
  }

  function finish(word, correct) {
    const { GAME, esc, addPoints, addReview, rootState, confettiBurst, shakeEl, popEl, reactionLine, touchStreak } = api();
    let gained = 0;
    const checkBtn = document.querySelector("#check");
    if (correct) {
      gained = 30 + (word.gre_list ? 5 : 0);
      addPoints(gained);
      run.score += gained;
      run.correct++;
      word.roots.forEach((rid) => (rootState(rid).correct[word.word] = true));
      api().persist();
      popEl(checkBtn);
      confettiBurst(checkBtn);
      if (window.WordWebSFX) window.WordWebSFX.correct();
    } else {
      addReview(word.word);
      shakeEl(checkBtn);
      if (window.WordWebSFX) window.WordWebSFX.wrong();
    }
    touchStreak();
    document.querySelectorAll(".tile, #check, #skip").forEach((b) => (b.disabled = true));
    document.querySelectorAll(".tile").forEach((t) => {
      if (word.roots.includes(t.dataset.root)) t.classList.add("right");
      else if (t.classList.contains("picked")) t.classList.add("wrong");
    });
    const fb = document.querySelector("#feedback");
    fb.hidden = false;
    fb.innerHTML = `<div class="verdict ${correct ? "yes" : "no"}"><span class="mascot">${correct ? "✳" : "…"}</span> ${reactionLine(correct)} ${correct ? `<b>+${gained}</b>` : ""}</div>
      <h3 class="bridge-word">${esc(word.word)}</h3>
      <div class="roots-reveal">${word.roots
        .map((rid) => {
          const r = GAME.rootsById[rid];
          return `<span class="chip">${esc(r.root)} — ${esc(r.meaning)}</span>`;
        })
        .join("")}</div>
      <p class="example">“${esc(word.example)}”</p>
      <button class="btn primary" id="next">Next</button>`;
    document.querySelector("#next").addEventListener("click", () => {
      run.idx++;
      puzzle();
    });
    document.querySelector("#next").focus();
  }

  function results() {
    const { header, wireNav, showHome } = api();
    const app = document.querySelector("#app");
    app.innerHTML = `${header()}
      <section class="results">
        <div class="phase-kicker boss">Bridge run complete</div>
        <h2>${run.correct}/${run.words.length} built</h2>
        <p class="score-line">+${run.score} points</p>
        <div class="btn-row">
          <button class="btn" id="again">Run again</button>
          <button class="btn primary" id="home">Back to map</button>
        </div>
      </section>`;
    wireNav();
    document.querySelector("#again").addEventListener("click", show);
    document.querySelector("#home").addEventListener("click", showHome);
    run = null;
  }

  window.WordWebBridges = { show };
})();
