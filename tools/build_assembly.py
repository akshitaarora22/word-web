#!/usr/bin/env python3
"""Build tile-assembly daily puzzles (chain + cluster) for the prototype.
A word qualifies only if EVERY root (incl. affixes) has a visible,
non-overlapping stem in it. Decoy tiles are rejected if they could
combine with any bank tile into a real dataset word that isn't an answer.
Output: assembly_puzzles.json
"""
import json, random, re
from collections import Counter, defaultdict
import importlib.util

spec = importlib.util.spec_from_file_location("gc", "generate_chains.py")
gc = importlib.util.module_from_spec(spec); spec.loader.exec_module(gc)

d, roots, words, affixes, root_words = gc.load("roots_words_dataset_v2.json")
rng = random.Random(7)

def affix_stem(rid, word):
    base = re.sub(r"_.*$", "", rid)          # 'in_neg' -> 'in'
    return base if word.lower().startswith(base) else None

PUZZLE_STEMS = {}  # rid -> stem, chosen per puzzle before decomposing

def canon_stem(w, rid):
    if rid in PUZZLE_STEMS:
        return PUZZLE_STEMS[rid] if PUZZLE_STEMS[rid] in w else None
    for s in sorted(gc.LEARNED_STEMS.get(rid, []), key=len, reverse=True):
        if s in w:
            return s
    return None

def choose_puzzle_stems(word_list):
    """For each root in the puzzle, the LONGEST stem visible in every
    puzzle word containing it — keeps tiles morpheme-shaped (anthrop,
    biblio) while guaranteeing shared tiles across chain links."""
    PUZZLE_STEMS.clear()
    by_root = defaultdict(list)
    for wn in word_list:
        for rid in words[wn]["roots"]:
            if rid not in affixes:
                by_root[rid].append(wn.lower())
    for rid, members in by_root.items():
        for s in sorted(gc.LEARNED_STEMS.get(rid, []), key=len, reverse=True):
            if all(s in m for m in members):
                PUZZLE_STEMS[rid] = s
                break

def decompose(wname):
    """[(start, stem, root_id|None, meaning|None)] covering the word with
    root stems + ending tiles (leftover chunks >=3 letters). Short glue
    (1-2 letters) is dropped and auto-filled on reveal. None if any root
    is invisible or stems overlap."""
    w, out, taken = wname.lower(), [], set()
    for rid in words[wname]["roots"]:
        if rid in affixes:
            s = affix_stem(rid, w)
            pos = 0 if s else -1
        else:
            s = canon_stem(w, rid)
            pos = w.find(s) if s else -1
        if pos < 0:
            return None
        span = set(range(pos, pos + len(s)))
        if span & taken:
            return None                       # overlapping stems: skip
        taken |= span
        out.append((pos, s, rid, roots[rid]["meaning"]))
    # leftover chunks become ending tiles when they're big enough
    i = 0
    while i < len(w):
        if i in taken:
            i += 1
            continue
        j = i
        while j < len(w) and j not in taken:
            j += 1
        chunk = w[i:j]
        if len(chunk) >= 3:
            out.append((i, chunk, None, None))
        i = j
    out.sort()
    return out if len(out) >= 2 else None

def forms_word(a, b, answers):
    """Would stems a+b (in order) spell a non-answer dataset word?"""
    for wn in words:
        if wn in answers:
            continue
        wl = wn.lower()
        ia = wl.find(a)
        if ia >= 0 and wl.find(b, ia + len(a)) >= 0:
            return True
    return False

def make_puzzle(word_list, kind, extra=None):
    choose_puzzle_stems(word_list)
    parts = {}
    for w in word_list:
        dec = decompose(w)
        if not dec:
            return None
        parts[w] = dec
    tiles = []                                # unique, order-stable
    for w in word_list:
        for _, s, rid, m in parts[w]:
            if all(t["stem"] != s for t in tiles):
                tiles.append({"stem": s, "meaning": m, "root": rid})
    # decoys: stems from unrelated roots, validated against accidents
    pool = [r for r in roots.values() if r["id"] not in affixes]
    rng.shuffle(pool)
    answers = set(word_list)
    for r in pool:
        if len(tiles) >= len({s for w in word_list for _, s, *_ in parts[w]}) + 3:
            break
        cand = gc.LEARNED_STEMS.get(r["id"])
        if not cand:
            continue
        s = cand[-1] if len(cand[-1]) >= 3 else cand[0]
        if any(t["stem"] == s or s in t["stem"] or t["stem"] in s for t in tiles):
            continue
        if any(forms_word(s, t["stem"], answers) or
               forms_word(t["stem"], s, answers) for t in tiles):
            continue
        tiles.append({"stem": s, "meaning": r["meaning"],
                      "root": r["id"], "decoy": True})
    rng.shuffle(tiles)
    return {
        "type": kind,
        "words": [{
            "word": w,
            "definition": words[w]["definition"],
            "sequence": [s for _, s, *_ in parts[w]],
            "parts": [{"stem": s, "meaning": m}
                      for _, s, rid, m in parts[w]],
            "gre": "GRE" in words[w].get("exam_lists", []),
        } for w in word_list],
        "tiles": tiles,
        **(extra or {}),
    }

bank = json.load(open("daily_puzzles.json"))["puzzles"]
# Index-aligned with daily_puzzles.json (one slot per day, same order) —
# NOT a separate compacted bank — so today's assembly puzzle is always the
# same word set as today's multiple-choice puzzle, just played a different
# way. A day whose words can't be fully decomposed (an invisible or
# overlapping root stem) gets `null`; the app falls back to MC mode for
# that day rather than skipping/renumbering days.
out = []
for p in bank:
    if p["type"] == "chain":
        wl = p["chain"]
        extra = {"pivots": [pr["id"] for pr in p["pivot_roots"]]}
    else:
        wl = [r["answer"] for r in p["rounds"]]
        extra = {"hub": {"root": p["root"]["root"],
                         "stem": None, "meaning": p["root"]["meaning"]}}
    pz = make_puzzle(wl, p["type"], extra)
    if pz is not None and p["type"] == "cluster":  # hub stem = the shared tile
        shared = Counter(s for w in pz["words"] for s in w["sequence"])
        hub_stem = shared.most_common(1)[0][0]
        if shared.most_common(1)[0][1] < len(wl):
            pz = None                         # root not visible in all 4
        else:
            pz["hub"]["stem"] = hub_stem
    if pz is not None:
        pz["id"] = p["id"]
    out.append(pz)

ok = [p for p in out if p]
kinds = Counter(p["type"] for p in ok)
print(f"assembly puzzles: {len(ok)}/{len(out)} days covered  ({dict(kinds)})")
avg_tiles = sum(len(p["tiles"]) for p in ok) / max(1, len(ok))
print(f"avg tile bank size: {avg_tiles:.1f}")
json.dump(out, open("assembly_puzzles.json", "w"), indent=1)
if ok:
    p = ok[0]
    print("sample:", p["type"], [w["word"] for w in p["words"]])
    print(" tiles:", ", ".join(t["stem"] + ("*" if t.get("decoy") else "")
                               for t in p["tiles"]))
