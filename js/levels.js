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
    "law_and_governance",
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
    law_and_governance: "Law & Governance",
  };

  // Per-domain accent hues (used by CSS via inline custom property)
  const DOMAIN_HUES = {
    kinship_and_gender: 340, mind_and_emotion: 265, speech_and_writing: 205,
    knowledge_and_perception: 180, body_and_life: 130, structure_and_measure: 35,
    motion_and_force: 15, time_and_change: 55, people_and_society: 300,
    world_and_nature: 155, value_and_judgment: 225, quantity_and_scale: 85,
    power_and_conflict: 0, law_and_governance: 245,
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
    // A few words share a spelling but teach a distinct sense (e.g. two
    // "pedestrian" entries — noun and adjective — marked alternate sense in
    // the dataset). wordsByName is keyed by the display word and silently
    // collides for those; wordsByKey is keyed by w.key (falls back to
    // w.word for every other entry) and never collides. Use wordsByKey
    // anywhere a word needs to be tracked/looked-up as a unique item —
    // wordsByName stays around for display-only lookups where any one
    // same-spelled sense is an acceptable answer (e.g. bridge words, which
    // are always multi-root and never one of these single-root pairs).
    const wordsByName = {};
    data.words.forEach((w) => (wordsByName[w.word] = w));
    const wordsByKey = {};
    data.words.forEach((w) => (wordsByKey[w.key || w.word] = w));

    const index = data.root_word_index; // rootId -> [key,...]

    // Group roots (that have words) by the domain of the ROOT itself
    const domainRoots = {};
    Object.keys(index).forEach((rootId) => {
      const root = rootsById[rootId];
      if (!root) return;
      const dom = root.domain;
      (domainRoots[dom] = domainRoots[dom] || []).push(rootId);
    });

    // A root that is NEVER any word's primary_root (only ever tagged on
    // as a secondary root, e.g. "syn" appended to sympathy/symphony/... for
    // hint accuracy) has no content of its own — every word it touches is
    // already owned by that word's real primary root. Such a root must
    // never drive level generation itself, no matter how many words it's
    // tagged on: it should stay a hint-only tag, visible in a word's root
    // chips but silent in the level list. (Its constellation star still
    // lights up normally — finish() marks *every* root a word carries as
    // correct, not just the level's root, so mastery completes passively
    // once the word is learned via its actual primary root.)
    const everPrimary = new Set();
    data.words.forEach((w) => {
      if (w.roots && w.roots.length) everPrimary.add(w.roots[0]);
    });

    // "Big" (4+ words) roots always get their own dedicated level — that's
    // a property of the root itself, independent of domain. Precompute
    // globally (not per-domain) so a small root in one domain correctly
    // sees that its word is already fully taught by a big root over in a
    // *different* domain (e.g. "potens" in power_and_conflict shouldn't
    // re-teach "omnipotent" just because "omnis", the root that already
    // teaches it, happens to live in quantity_and_scale).
    const bigRootIds = new Set(
      Object.keys(index).filter((r) => index[r].length >= 4 && everPrimary.has(r))
    );
    const bigTaughtWords = new Set();
    bigRootIds.forEach((r) => index[r].forEach((k) => bigTaughtWords.add(k)));

    const domains = [];

    DOMAIN_ORDER.forEach((domId) => {
      const rootIds = (domainRoots[domId] || []).slice();
      if (!rootIds.length) return;

      // Big roots (4+ words) become their own level, largest first
      const big = rootIds
        .filter((r) => bigRootIds.has(r))
        .sort((a, b) => index[b].length - index[a].length);
      const small = rootIds
        .filter((r) => !bigRootIds.has(r) && everPrimary.has(r))
        .sort((a, b) => index[b].length - index[a].length);

      const levels = [];
      // Seeded with every word any big root teaches, anywhere in the game —
      // a small root's medley must never re-teach those. From here it also
      // accumulates this domain's own big-root and medley words, so two
      // small roots that happen to share a word (e.g. "kallos" and "pyge"
      // both touching "callipygian") only teach it once. Two *big* roots
      // sharing a word (e.g. "misein" + "gamos" on "misogamy") still both
      // teach it — that's the intentional bridge-word mechanic, and this
      // set is never consulted by the big-root loop below.
      const domainTaught = new Set(bigTaughtWords);

      big.forEach((rootId) => {
        const words = index[rootId]
          .map((k) => wordsByKey[k])
          .filter(Boolean);
        words.forEach((w) => domainTaught.add(w.key || w.word));
        // Decode holdout: ~20% (max 2), preferring GRE-listed multi-root words.
        const n = Math.min(2, Math.max(1, Math.floor(words.length * 0.2)));
        const ranked = words
          .slice()
          .sort((a, b) => decodeScore(b) - decodeScore(a) || hash(a.word) - hash(b.word));
        const decodeWords = ranked.slice(0, n);
        const decodeSet = new Set(decodeWords.map((w) => w.key || w.word));
        const teachWords = words.filter((w) => !decodeSet.has(w.key || w.word));
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

      // Bundle small roots into levels of ~5–9 words, no decode boss. Each
      // small root only contributes words not already claimed above —
      // otherwise a root added purely for hint accuracy (e.g. "potens" on
      // "omnipotent", already fully taught under "omnis") would re-teach
      // the same word a second time in an unrelated, low-content medley,
      // and two small roots that happen to share a word (e.g. "kallos" and
      // "pyge" both touching "callipygian") would each re-teach it too.
      const remainingFor = (rid) => index[rid].filter((k) => !domainTaught.has(k));

      let bundle = [];
      let bundleWords = 0;
      const flushBundle = () => {
        if (!bundle.length) return;
        const words = [];
        bundle.forEach((rid) =>
          remainingFor(rid).forEach((k) => {
            const wo = wordsByKey[k];
            const woKey = wo && (wo.key || wo.word);
            if (wo && !words.some((x) => (x.key || x.word) === woKey)) {
              words.push(wo);
              domainTaught.add(woKey);
            }
          })
        );
        if (!words.length) {
          // every word this batch would teach is already covered elsewhere
          bundle = [];
          bundleWords = 0;
          return;
        }
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
        const rem = remainingFor(rid);
        if (!rem.length) return; // fully redundant with what's already taught — no medley entry
        bundle.push(rid);
        bundleWords += rem.length;
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

    // A one-word medley barely counts as a lesson — drop it, unless that
    // word has no other level teaching it anywhere (dropping it then would
    // make the word completely unreachable in play, which is worse than a
    // thin medley).
    const allLevels = domains.flatMap((d) => d.levels);
    const levelCountForWord = {};
    allLevels.forEach((lv) =>
      lv.teachWords.concat(lv.decodeWords).forEach((w) => {
        const k = w.key || w.word;
        levelCountForWord[k] = (levelCountForWord[k] || 0) + 1;
      })
    );
    domains.forEach((d) => {
      d.levels = d.levels.filter((lv) => {
        if (lv.kind !== "bundle" || lv.teachWords.length !== 1) return true;
        const k = lv.teachWords[0].key || lv.teachWords[0].word;
        return levelCountForWord[k] <= 1; // keep only if this is its sole level
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

    return { domains, rootsById, wordsByName, wordsByKey, defsByDomain, daily, meta: data.meta };
  }

  function decodeScore(w) {
    let s = 0;
    if (w.gre_list) s += 2;
    if (w.roots && w.roots.length > 1) s += 1; // bridge words make the best bosses
    return s;
  }

  // Shuffle-then-take-N-unique-by-definition — shared by both option tiers below.
  function fillUnique(src, picked, used, need, rng) {
    const shuffled = src.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    for (let i = 0; i < shuffled.length && picked.length < need; i++) {
      const cand = shuffled[i];
      if (used.has(cand.definition)) continue;
      used.add(cand.definition);
      picked.push(cand.definition);
    }
  }

  /* Build 4 answer options for a word: its definition + 3 distractors.
     Normal mode draws distractors from the same domain but explicitly avoids
     any word sharing a root with the target, so the wrong answers read as
     obviously unrelated. Hard mode does the opposite on purpose: it prefers
     "half-root" siblings — other words that share one of this word's roots
     (e.g. pediatrics/pedagogy both carry "paidos") — so every option looks
     plausible at a glance and the player actually has to read them. */
  function optionsFor(word, game, rng, hard) {
    const notSelf = (w) => w.word !== word.word && w.definition !== word.definition;
    const picked = [];
    const used = new Set();
    if (hard) {
      const siblingKeys = new Set();
      (word.roots || []).forEach((rid) => {
        (window.WORDWEB_DATA.root_word_index[rid] || []).forEach((k) => siblingKeys.add(k));
      });
      const siblings = Array.from(siblingKeys)
        .map((k) => game.wordsByKey[k])
        .filter((w) => w && notSelf(w));
      const domainPool = (game.defsByDomain[word.domain] || []).filter(notSelf);
      const everyone = Object.values(game.defsByDomain).flat().filter(notSelf);
      fillUnique(siblings, picked, used, 3, rng);
      fillUnique(domainPool, picked, used, 3, rng);
      fillUnique(everyone, picked, used, 3, rng);
    } else {
      const pool = (game.defsByDomain[word.domain] || [])
        .concat(game.defsByDomain["unrooted"] || [])
        .filter((w) => notSelf(w) && !(w.roots || []).some((r) => (word.roots || []).includes(r)));
      const domainPool = game.defsByDomain[word.domain] || pool;
      fillUnique(pool, picked, used, 3, rng);
      fillUnique(domainPool, picked, used, 3, rng);
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
