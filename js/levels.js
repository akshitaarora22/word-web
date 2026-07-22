/* levels.js — builds the game structure from the raw dataset.
   Everything here is deterministic: same dataset in, same levels out. */

(function () {
  const DOMAIN_ORDER = [
    "kinship_and_gender",      // small, tightly linked misein/gamos/gyne cluster — tutorial world
    "mind_and_emotion",
    "speech_and_writing",
    "knowledge_and_perception",
    "body_and_life",
    "structure_and_measure",
    "motion_and_force",
    "time_and_change",
    "people_and_society",
    "world_and_nature",
    "value_and_judgment",
    "quantity_and_scale",
    "power_and_conflict",
  ];

  const DOMAIN_NAMES = {
    kinship_and_gender: "Kinship & Gender",
    mind_and_emotion: "Mind & Emotion",
    speech_and_writing: "Speech & Writing",
    knowledge_and_perception: "Knowledge & Perception",
    body_and_life: "Body & Life",
    structure_and_measure: "Structure & Measure",
    motion_and_force: "Motion & Force",
    time_and_change: "Time & Change",
    people_and_society: "People & Society",
    world_and_nature: "World & Nature",
    value_and_judgment: "Value & Judgment",
    quantity_and_scale: "Quantity & Scale",
    power_and_conflict: "Power & Conflict",
  };

  // Per-domain accent hues (used by CSS via inline custom property)
  const DOMAIN_HUES = {
    kinship_and_gender: 340, mind_and_emotion: 265, speech_and_writing: 205,
    knowledge_and_perception: 180, body_and_life: 130, structure_and_measure: 35,
    motion_and_force: 15, time_and_change: 55, people_and_society: 300,
    world_and_nature: 155, value_and_judgment: 225, quantity_and_scale: 85,
    power_and_conflict: 0,
  };

  // Simple deterministic string hash → positive int
  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return Math.abs(h);
  }

  function buildGame(data) {
    const rootsById = {};
    data.roots.forEach((r) => (rootsById[r.id] = r));
    const wordsByName = {};
    data.words.forEach((w) => (wordsByName[w.word] = w));

    const index = data.root_word_index; // rootId -> [word,...]

    // Group roots (that have words) by the domain of the ROOT itself
    const domainRoots = {};
    Object.keys(index).forEach((rootId) => {
      const root = rootsById[rootId];
      if (!root) return;
      const dom = root.domain;
      (domainRoots[dom] = domainRoots[dom] || []).push(rootId);
    });

    const domains = [];

    DOMAIN_ORDER.forEach((domId) => {
      const rootIds = (domainRoots[domId] || []).slice();
      if (!rootIds.length) return;

      // Big roots (4+ words) become their own level, largest first
      const big = rootIds
        .filter((r) => index[r].length >= 4)
        .sort((a, b) => index[b].length - index[a].length);
      const small = rootIds
        .filter((r) => index[r].length < 4)
        .sort((a, b) => index[b].length - index[a].length);

      const levels = [];

      big.forEach((rootId) => {
        const words = index[rootId]
          .map((w) => wordsByName[w])
          .filter(Boolean);
        // Decode holdout: ~20% (max 2), preferring GRE-listed multi-root words.
        const n = Math.min(2, Math.max(1, Math.floor(words.length * 0.2)));
        const ranked = words
          .slice()
          .sort((a, b) => decodeScore(b) - decodeScore(a) || hash(a.word) - hash(b.word));
        const decodeWords = ranked.slice(0, n);
        const decodeSet = new Set(decodeWords.map((w) => w.word));
        const teachWords = words.filter((w) => !decodeSet.has(w.word));
        const root = rootsById[rootId];
        levels.push({
          id: domId + "::" + rootId,
          kind: "root",
          title: root.root,
          subtitle: root.meaning,
          domain: domId,
          roots: [rootId],
          teachWords,
          decodeWords,
        });
      });

      // Bundle small roots into levels of ~5–9 words, no decode boss
      let bundle = [];
      let bundleWords = 0;
      const flushBundle = () => {
        if (!bundle.length) return;
        const words = [];
        bundle.forEach((rid) =>
          index[rid].forEach((w) => {
            const wo = wordsByName[w];
            if (wo && !words.some((x) => x.word === wo.word)) words.push(wo);
          })
        );
        levels.push({
          id: domId + "::bundle-" + levels.length,
          kind: "bundle",
          title: bundle.map((r) => rootsById[r].root.split(",")[0]).join(" · "),
          subtitle: "root medley",
          domain: domId,
          roots: bundle.slice(),
          teachWords: words,
          decodeWords: [],
        });
        bundle = [];
        bundleWords = 0;
      };
      small.forEach((rid) => {
        bundle.push(rid);
        bundleWords += index[rid].length;
        if (bundleWords >= 5) flushBundle();
      });
      flushBundle();

      domains.push({
        id: domId,
        name: DOMAIN_NAMES[domId] || domId,
        hue: DOMAIN_HUES[domId] ?? 220,
        levels,
        rootIds,
      });
    });

    // Distractor pool: definitions grouped by domain of the WORD
    const defsByDomain = {};
    data.words.forEach((w) => {
      (defsByDomain[w.domain] = defsByDomain[w.domain] || []).push(w);
    });

    // Daily words: the unrooted set, stable order
    const daily = data.words
      .filter((w) => !w.roots || w.roots.length === 0)
      .sort((a, b) => a.word.localeCompare(b.word));

    return { domains, rootsById, wordsByName, defsByDomain, daily, meta: data.meta };
  }

  function decodeScore(w) {
    let s = 0;
    if (w.gre_list) s += 2;
    if (w.roots && w.roots.length > 1) s += 1; // bridge words make the best bosses
    return s;
  }

  /* Build 4 answer options for a word: its definition + 3 plausible distractors
     drawn from the same domain (different roots), falling back to the full list. */
  function optionsFor(word, game, rng) {
    const pool = (game.defsByDomain[word.domain] || [])
      .concat(game.defsByDomain["unrooted"] || [])
      .filter(
        (w) =>
          w.word !== word.word &&
          w.definition !== word.definition &&
          !(w.roots || []).some((r) => (word.roots || []).includes(r))
      );
    const picked = [];
    const used = new Set();
    let guard = 0;
    while (picked.length < 3 && guard++ < 200) {
      const src = pool.length >= 3 ? pool : game.defsByDomain[word.domain] || pool;
      const cand = src.length
        ? src[Math.floor(rng() * src.length)]
        : null;
      if (!cand) break;
      if (used.has(cand.definition)) continue;
      used.add(cand.definition);
      picked.push(cand.definition);
    }
    const options = picked.concat([word.definition]);
    // shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return { options, correctIndex: options.indexOf(word.definition) };
  }

  window.WordWebLevels = { buildGame, optionsFor, hash, DOMAIN_NAMES };
})();
