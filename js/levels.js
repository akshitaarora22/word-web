/* levels.js — builds the game structure from the raw dataset.
   Everything here is deterministic: same dataset in, same levels out. */

(function () {
  const DOMAIN_ORDER = [
    "kinship_and_gender",      // small, tightly linked paidos/gamos/gyne/nepos cluster — tutorial world
    "mind_and_emotion",
    "speech_and_writing",
    "knowledge_and_perception",
    "body_and_life",
    "life_and_vitality",       // split off body_and_life: birth, health, harm, death — not literal anatomy
    "structure_and_measure",
    "motion_and_force",
    "force_and_manipulation",  // split off motion_and_force: driving/holding/throwing/pulling, not travel
    "time_and_change",
    "people_and_society",
    "world_and_nature",
    "value_and_judgment",
    "truth_and_deception",     // split off value_and_judgment: belief, honesty, lying
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
    life_and_vitality: "Life & Vitality",
    structure_and_measure: "Structure & Measure",
    motion_and_force: "Motion & Force",
    force_and_manipulation: "Force & Manipulation",
    time_and_change: "Time & Change",
    people_and_society: "People & Society",
    world_and_nature: "World & Nature",
    value_and_judgment: "Value & Judgment",
    truth_and_deception: "Truth & Deception",
    quantity_and_scale: "Quantity & Scale",
    power_and_conflict: "Power & Conflict",
    law_and_governance: "Law & Governance",
  };

  // Per-domain accent hues (used by CSS via inline custom property)
  const DOMAIN_HUES = {
    kinship_and_gender: 340, mind_and_emotion: 265, speech_and_writing: 205,
    knowledge_and_perception: 180, body_and_life: 130, life_and_vitality: 110,
    structure_and_measure: 35, motion_and_force: 15, force_and_manipulation: 25,
    time_and_change: 55, people_and_society: 300, world_and_nature: 155,
    value_and_judgment: 225, truth_and_deception: 235, quantity_and_scale: 85,
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

  // Reduces a full dataset down to only words tagged with at least one of
  // examIds, for exam-focus mode. Roots stay as-is (a root is still a
  // legitimate distractor/hint even if none of its remaining words are
  // tagged); root_word_index is rebuilt from scratch against the filtered
  // word list so a root's word count — and therefore whether it's "big
  // enough" for its own level — reflects only what's actually in play.
  function filterByExams(data, examIds) {
    const set = new Set(examIds);
    const words = data.words.filter((w) => (w.exam_lists || []).some((e) => set.has(e)));
    const index = {};
    words.forEach((w) => {
      if (!w.roots) return;
      const k = w.key || w.word;
      w.roots.forEach((rid) => (index[rid] = index[rid] || []).push(k));
    });
    return { roots: data.roots, words, root_word_index: index, meta: data.meta };
  }

  function buildGame(data, opts) {
    const { bigThreshold = 4, idPrefix = "" } = opts || {};
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

    // Group roots (that have words) by the domain of the ROOT itself.
    // Affix roots (re-, con-, in-...) are excluded here at the source: they're
    // hint-only tags on other roots' words (see the everPrimary comment
    // below), never a real teachable root, so they must never enter a
    // domain's rootIds — that list feeds every "roots mastered"/domain%
    // count in game.js, and an affix root's words are scattered across
    // levels it has nothing to do with, so it could never be "mastered" in
    // any meaningful sense.
    const domainRoots = {};
    Object.keys(index).forEach((rootId) => {
      const root = rootsById[rootId];
      if (!root || root.affix) return;
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

    // "Big" (bigThreshold+ words, 4 by default) roots always get their own
    // dedicated level — that's a property of the root itself, independent
    // of domain. Precompute globally (not per-domain) so a small root in
    // one domain correctly sees that its word is already fully taught by a
    // big root over in a *different* domain (e.g. "potens" in
    // power_and_conflict shouldn't re-teach "omnipotent" just because
    // "omnis", the root that already teaches it, happens to live in
    // quantity_and_scale).
    const bigRootIds = new Set(
      Object.keys(index).filter((r) => index[r].length >= bigThreshold && everPrimary.has(r))
    );
    const bigTaughtWords = new Set();
    bigRootIds.forEach((r) => index[r].forEach((k) => bigTaughtWords.add(k)));

    // Builds one root's own level: the usual ~20% (max 2) decode holdout,
    // preferring GRE-listed multi-root words, with everything else taught.
    // Shared by the normal per-domain pass and the rescue pass below.
    function buildRootLevel(domId, rootId, words) {
      const n = Math.min(2, Math.max(1, Math.floor(words.length * 0.2)));
      const ranked = words
        .slice()
        .sort((a, b) => decodeScore(b) - decodeScore(a) || hash(a.word) - hash(b.word));
      const decodeWords = ranked.slice(0, n);
      const decodeSet = new Set(decodeWords.map((w) => w.key || w.word));
      const teachWords = words.filter((w) => !decodeSet.has(w.key || w.word));
      const root = rootsById[rootId];
      return {
        // idPrefix keeps GRE-mode level ids from colliding with normal-mode
        // ones in save.levels — a lower bigThreshold changes which roots
        // are "big" and how bundles are grouped, so the same id could
        // otherwise point at differently-built levels across modes.
        id: idPrefix + domId + "::" + rootId,
        kind: "root",
        title: root.root,
        subtitle: root.meaning,
        domain: domId,
        roots: [rootId],
        teachWords,
        decodeWords,
      };
    }

    const domains = [];
    // A bridge word (e.g. "misogamy", carried by both "misein" and "gamos")
    // can belong to two *big* roots at once. It's only ever taught once —
    // by whichever of those roots' domains comes first in DOMAIN_ORDER —
    // so it's playable in exactly one galaxy. This accumulates across the
    // DOMAIN_ORDER loop below, in order, so "first domain wins."  The web
    // view's bridge lines are unaffected: those are drawn straight from
    // data.words, independent of which domain ends up teaching the word.
    const globalBigClaimed = new Set();
    // A big root can end up with literally zero words after that filter if
    // *every* one of its words is a bridge word an earlier domain already
    // claimed (e.g. "anthropos": misanthrope/misanthropic/anthropological/
    // philanthropy are all shared with misein/logos/philein, each processed
    // earlier). Rather than leave such a root without a level of its own,
    // it's queued here and rescued below with its full, unfiltered word
    // list — the one deliberate exception to "each word taught once": those
    // particular bridge words end up taught in two places after all, so
    // the root isn't left contentless.
    const rescueQueue = [];

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
      // both touching "callipygian") only teach it once.
      const domainTaught = new Set(bigTaughtWords);

      big.forEach((rootId) => {
        // A word already claimed by an earlier-processed domain's big root
        // (globalBigClaimed) is dropped here rather than taught again —
        // see the comment on globalBigClaimed above.
        const words = index[rootId]
          .map((k) => wordsByKey[k])
          .filter((w) => w && !globalBigClaimed.has(w.key || w.word));
        if (!words.length) {
          rescueQueue.push({ domId, rootId });
          return;
        }
        words.forEach((w) => {
          const k = w.key || w.word;
          domainTaught.add(k);
          globalBigClaimed.add(k);
        });
        levels.push(buildRootLevel(domId, rootId, words));
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
          id: idPrefix + domId + "::bundle-" + levels.length,
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

    // Rescue pass — see the comment on rescueQueue above. Runs after every
    // domain's normal pass so it never displaces a level that already
    // legitimately claimed one of these words.
    rescueQueue.forEach(({ domId, rootId }) => {
      const dom = domains.find((d) => d.id === domId);
      if (!dom) return;
      const words = index[rootId].map((k) => wordsByKey[k]).filter(Boolean);
      if (!words.length) return;
      dom.levels.push(buildRootLevel(domId, rootId, words));
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

    // meta.root_count feeds every "X of Y roots mastered" display — it must
    // count only roots that actually appear in some domain's rootIds (i.e.
    // can ever actually be mastered), not every root row in the dataset.
    // Affix roots (re-, con-, in-...) are already excluded from rootIds
    // above, and under a raised bigThreshold some content roots can end up
    // with no level of their own without a word left over anywhere in
    // rootIds either — either way, this must be derived, not trusted from
    // data.meta, or the two numbers drift out of sync.
    const rootCount = domains.reduce((n, d) => n + d.rootIds.length, 0);

    return {
      domains,
      rootsById,
      wordsByName,
      wordsByKey,
      defsByDomain,
      daily,
      // The active (possibly GRE-filtered) roots/words/index — anything
      // that needs "every root" or "every word" should read these, not
      // window.WORDWEB_DATA directly, so it respects GRE-only mode too.
      roots: data.roots,
      words: data.words,
      root_word_index: index,
      meta: { ...data.meta, root_count: rootCount },
    };
  }

  function decodeScore(w) {
    let s = 0;
    if (w.exam_lists && w.exam_lists.length) s += 2; // on any real exam list — not just GRE
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
        (game.root_word_index[rid] || []).forEach((k) => siblingKeys.add(k));
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

  window.WordWebLevels = { buildGame, filterByExams, optionsFor, hash, DOMAIN_NAMES };
})();
