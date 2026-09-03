#!/usr/bin/env python3
"""
Daily constellation chain generator for Word Web.

Generates 5-word chains where consecutive words share a content root
(never an affix), each link pivots on a DIFFERENT root, and every link
has 3 validated distractors chosen to defeat letter-pattern spotting.

Output: daily_puzzles.json  (list of puzzle objects, one per day)
Usage:  python3 generate_chains.py roots_words_dataset_v2.json
"""

import json, random, sys, re
from collections import defaultdict, Counter

CHAIN_LEN = 5            # words per chain (4 links / pivot roots)
TARGET_PUZZLES = 400     # bank size to aim for
MIN_GRE = 2              # at least this many GRE-flagged words per chain
MAX_GRE = 4              # keep one accessible word in every chain
SEED = 20260902          # fixed seed -> reproducible bank

# ---------------------------------------------------------------- load

def load(path):
    d = json.load(open(path))
    roots = {r["id"]: r for r in d["roots"]}
    words = {w["word"]: w for w in d["words"]}
    affixes = {rid for rid, r in roots.items() if r.get("affix")}
    root_words = defaultdict(list)          # root id -> [word]
    for w in d["words"]:
        for rid in w["roots"]:
            root_words[rid].append(w["word"])
    compute_global_grams(list(words))
    learn_stems(roots, root_words, affixes)
    return d, roots, words, affixes, root_words

# ------------------------------------------------- surface-form stems

LEARNED_STEMS = {}    # root id -> [stems], filled by learn_stems()
GLOBAL_GRAM_DF = {}   # n-gram -> fraction of ALL words containing it

def compute_global_grams(all_words):
    """Generic English chunks ('tion','ous','ate') appear everywhere and
    must never count as a root's stem."""
    n_words = len(all_words)
    df = Counter()
    for w in all_words:
        wl, grams = w.lower(), set()
        for n in (3, 4, 5):
            for i in range(len(wl) - n + 1):
                grams.add(wl[i:i+n])
        for g in grams:
            df[g] += 1
    GLOBAL_GRAM_DF.update({g: c / n_words for g, c in df.items()})

def display_stems(root_obj):
    """Stems guessed from the root's display form ('dico, dictus' -> dic...)."""
    forms = re.findall(r"[a-z]+", root_obj["root"].lower())
    stems = set()
    for f in forms:
        stems.add(f)
        for n in (3, 4, 5):
            if len(f) >= n:
                stems.add(f[:n])
    return {s for s in stems if len(s) >= 3}

def learn_stems(roots, root_words, affixes):
    """A root's real surface stems are the letter n-grams shared across its
    word family (handles kakos->'cac', kratos->'crat', paidos->'ped')."""
    for rid, robj in roots.items():
        if rid in affixes:
            continue
        members = [w.lower() for w in root_words.get(rid, [])]
        cands = Counter()
        for w in members:
            grams = set()
            for n in (3, 4, 5):
                for i in range(len(w) - n + 1):
                    grams.add(w[i:i+n])
            for g in grams:
                cands[g] += 1
        threshold = max(2, int(0.6 * len(members)))
        learned = {g for g, c in cands.items()
                   if c >= threshold and GLOBAL_GRAM_DF.get(g, 0) < 0.08}
        # keep only maximal grams (drop 'gra' if 'grap' also qualifies)
        maximal = {g for g in learned
                   if not any(g != h and g in h for h in learned)}
        stems = maximal | display_stems(robj)
        LEARNED_STEMS[rid] = sorted(stems, key=len, reverse=True)

def visible_stem(word, root_obj):
    """The longest stem of the root actually visible in the word, or None."""
    wl = word.lower()
    for s in LEARNED_STEMS.get(root_obj["id"], []) or display_stems(root_obj):
        if s in wl:
            return s
    return None

def shares_substring(a, b, n=3):
    """Do two words share any n-letter substring? (letter-leak muddier)"""
    a, b = a.lower(), b.lower()
    subs = {a[i:i+n] for i in range(len(a) - n + 1)}
    return any(b[i:i+n] in subs for i in range(len(b) - n + 1))

# ------------------------------------------------------- chain walker

def build_chains(d, roots, words, affixes, root_words, rng):
    """Random-walk the word graph through content-root pivots."""
    content_bridge = [
        w["word"] for w in d["words"]
        if len([r for r in w["roots"] if r not in affixes]) >= 1
    ]
    chains, seen_sets = [], set()
    attempts = 0
    while len(chains) < TARGET_PUZZLES * 15 and attempts < 1_200_000:
        attempts += 1
        start = rng.choice(content_bridge)
        chain, pivots = [start], []
        used_roots = set()
        ok = True
        for _ in range(CHAIN_LEN - 1):
            cur = words[chain[-1]]
            cands = []
            for rid in cur["roots"]:
                if rid in affixes or rid in used_roots:
                    continue
                if visible_stem(cur["word"], roots[rid]) is None:
                    continue  # pivot must be visible in current word
                for nxt in root_words[rid]:
                    if nxt in chain:
                        continue
                    if visible_stem(nxt, roots[rid]) is None:
                        continue
                    cands.append((rid, nxt))
            if not cands:
                ok = False
                break
            # weight against hub roots so small families get airtime
            weights = [1.0 / len(root_words[rid]) for rid, _ in cands]
            rid, nxt = rng.choices(cands, weights=weights, k=1)[0]
            used_roots.add(rid)
            pivots.append(rid)
            chain.append(nxt)
        if not ok:
            continue
        key = frozenset(chain)
        if key in seen_sets:
            continue
        gre = sum(1 for w in chain if "GRE" in words[w].get("exam_lists", []))
        if not (MIN_GRE <= gre <= MAX_GRE):
            continue
        seen_sets.add(key)
        chains.append((chain, pivots))
    return chains

# ---------------------------------------------------- distractor pick

def pick_distractors(cur, nxt, rid, chain, roots, words, root_words,
                     affixes, rng, k=3):
    """3 wrong options for a link. Anti-letter-leak rules:
    - never contains the pivot root
    - PREFER words that share a 3-letter substring with the current word
      or contain the pivot's stem letters WITHOUT the root (false friends)
    - prefer same domain / part of speech as the correct answer
    """
    stem = visible_stem(nxt, roots[rid]) or ""
    stem_bits = {stem[i:i+3] for i in range(len(stem) - 2)} if stem else set()
    nxt_obj = words[nxt]

    def stem_overlap(wl):
        """Word carries the exact stem, or >=3 consecutive letters of it."""
        return (stem and stem in wl) or any(b in wl for b in stem_bits)

    pool = []
    for wname, wobj in words.items():
        if wname in chain or rid in wobj["roots"]:
            continue
        score = 0
        wl = wname.lower()
        if stem and stem in wl:               # false friend: best distractor
            score += 8
        elif stem_overlap(wl):                # partial stem letters: good
            score += 4
        if shares_substring(cur, wname):      # muddies vs current word too
            score += 2
        if wobj["domain"] == nxt_obj["domain"]:
            score += 2
        if wobj.get("part_of_speech") == nxt_obj.get("part_of_speech"):
            score += 1
        if abs(len(wname) - len(nxt)) <= 3:
            score += 1
        pool.append((score, rng.random(), wname))
    pool.sort(reverse=True)
    picked = [w for _, _, w in pool[:k]]
    # leak check: >=2 distractors must carry stem letters, so the answer
    # is never the only option that "looks like" the visible pivot
    muddy = sum(1 for w in picked if stem_overlap(w.lower()))
    return picked, muddy

# ------------------------------------------------- cluster generator

def build_clusters(d, roots, words, affixes, root_words, rng,
                   per_root=2, quiz_size=4):
    """Cluster days: one root family, pick-the-word-for-this-definition.
    All options share the root's stem, so letter-spotting is impossible."""
    clusters = []
    for rid, robj in roots.items():
        if rid in affixes:
            continue
        fam = [w for w in root_words.get(rid, [])
               if visible_stem(w, robj) and words[w].get("definition")]
        if len(fam) < quiz_size:
            continue
        made = set()
        for _ in range(per_root):
            fam_sorted = sorted(
                fam, key=lambda w: (
                    "GRE" not in words[w].get("exam_lists", []), rng.random()))
            # 4 quiz words: lead with GRE words, shuffle within tiers
            quiz = fam_sorted[:quiz_size]
            key = frozenset(quiz)
            if key in made:
                continue
            made.add(key)
            rng.shuffle(quiz)
            # option set: the quiz words + 1 stem-carrying outsider
            stem = visible_stem(quiz[0], robj) or rid[:3]
            outsider = None
            for wname, wobj in words.items():
                if rid in wobj["roots"] or wname in fam:
                    continue
                if any(b in wname.lower()
                       for b in {stem[i:i+3] for i in range(len(stem)-2)}):
                    outsider = wname
                    break
            options = quiz + ([outsider] if outsider else [])
            rng.shuffle(options)
            clusters.append({
                "type": "cluster",
                "root": {"id": rid, "root": robj["root"],
                         "meaning": robj["meaning"],
                         "origin": robj.get("origin", "")},
                "options": options,
                "rounds": [
                    {"definition": words[w]["definition"], "answer": w}
                    for w in quiz
                ],
                "gre_count": sum(
                    1 for w in quiz
                    if "GRE" in words[w].get("exam_lists", [])),
            })
            if len(fam) <= quiz_size:
                break  # family too small for a second distinct subset
    return clusters

def schedule(chains, clusters, rng):
    """Interleave formats so consecutive days differ, ratio driven by
    bank sizes. Both lists arrive best-first; keep that ordering."""
    out, ci, ki = [], 0, 0
    ratio = max(1, round(len(clusters) / max(1, len(chains))))
    while ci < len(chains) or ki < len(clusters):
        if ci < len(chains):
            out.append(chains[ci]); ci += 1
        for _ in range(ratio):
            if ki < len(clusters):
                out.append(clusters[ki]); ki += 1
    for i, p in enumerate(out):
        p["id"] = i + 1
    return out

# ------------------------------------------------------------- emit

def main(path):
    rng = random.Random(SEED)
    d, roots, words, affixes, root_words = load(path)
    raw = build_chains(d, roots, words, affixes, root_words, rng)
    print(f"raw valid chains walked: {len(raw)}")

    puzzles, root_usage = [], Counter()
    MAX_USE = 30  # no root may pivot more than this many puzzles
    # greedy selection: repeatedly take the chain whose pivots are least used
    remaining = list(raw)
    ordered = []
    while remaining:
        remaining.sort(key=lambda cp: sum(root_usage[r] for r in cp[1]))
        best = remaining.pop(0)
        ordered.append(best)
        for r in best[1]:
            root_usage[r] += 1
    root_usage = Counter()  # reset: ordering pass counts are not real usage
    # grade every chain: quality = muddiness of its WEAKEST link
    graded = []
    for chain, pivots in ordered:
        links, min_muddy = [], 99
        for i, rid in enumerate(pivots):
            cur, nxt = chain[i], chain[i + 1]
            dis, muddy = pick_distractors(
                cur, nxt, rid, chain, roots, words, root_words, affixes, rng)
            if len(dis) < 3:
                links = None
                break
            min_muddy = min(min_muddy, muddy)
            opts = dis + [nxt]
            rng.shuffle(opts)
            links.append({
                "from": cur,
                "root": rid,
                "root_display": roots[rid]["root"],
                "root_meaning": roots[rid]["meaning"],
                "answer": nxt,
                "answer_definition": words[nxt]["definition"],
                "options": opts,
            })
        if links is None or min_muddy < 1:
            continue  # every link needs at least one stem-carrying distractor
        graded.append((min_muddy, chain, pivots, links))

    # fill the bank: quality 3 first, then 2, then 1; respect root caps
    graded.sort(key=lambda g: -g[0])
    for quality, chain, pivots, links in graded:
        if len(puzzles) >= TARGET_PUZZLES:
            break
        if any(root_usage[r] >= MAX_USE for r in pivots):
            continue
        for r in pivots:
            root_usage[r] += 1
        puzzles.append({
            "id": len(puzzles) + 1,
            "quality": quality,
            "start_word": chain[0],
            "start_definition": words[chain[0]]["definition"],
            "chain": chain,
            "pivot_roots": [
                {"id": r, "root": roots[r]["root"],
                 "meaning": roots[r]["meaning"]} for r in pivots
            ],
            "links": links,
            "gre_count": sum(
                1 for w in chain if "GRE" in words[w].get("exam_lists", [])),
        })

    for p in puzzles:
        p["type"] = "chain"
    clusters = build_clusters(d, roots, words, affixes, root_words, rng)
    rng.shuffle(clusters)
    bank = schedule(puzzles, clusters, rng)
    json.dump({"version": 2, "chain_length": CHAIN_LEN, "puzzles": bank},
              open("daily_puzzles.json", "w"), indent=1)

    covered = set()
    for p in bank:
        if p["type"] == "chain":
            covered.update(r["id"] for r in p["pivot_roots"])
        else:
            covered.add(p["root"]["id"])
    n_content = len([r for r in roots if r not in affixes])
    print(f"\nCOMBINED BANK: {len(bank)} puzzles "
          f"({len(puzzles)} chains + {len(clusters)} clusters)")
    print(f"root coverage: {len(covered)} of {n_content} content roots "
          f"({100*len(covered)//n_content}%)")

    # ------- report
    print(f"clean puzzles banked: {len(puzzles)}")
    print(f"distinct pivot roots used: {len(root_usage)} "
          f"of {len([r for r in roots if r not in affixes])} content roots")
    print("most-used pivots:", root_usage.most_common(5))
    gre_dist = Counter(p["gre_count"] for p in puzzles)
    print("GRE words per chain:", dict(sorted(gre_dist.items())))
    if puzzles:
        p = puzzles[0]
        print("\nsample puzzle #1:")
        print("  chain:", " -> ".join(p["chain"]))
        for l in p["links"]:
            print(f"  [{l['root_display']} = {l['root_meaning']}] "
                  f"{l['from']} -> {l['answer']}  "
                  f"(options: {', '.join(l['options'])})")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "roots_words_dataset_v2.json")
