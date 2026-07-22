# Word Web

An etymology game: master Greek and Latin roots, then decode GRE-level words you were never taught.

Built from a dataset of **140 roots, 476 words, and 13 semantic domains** (113 words GRE-flagged). No frameworks, no build step — plain HTML/CSS/JS that runs anywhere, including GitHub Pages.

## How the game works

- **Worlds = domains.** 13 semantic domains (Mind & Emotion, Speech & Writing, ...), each a cluster on the constellation map. Every star is a root; it turns gold when mastered.
- **Levels = root families.** Roots with 4+ words get their own level; smaller roots are bundled into medleys. Levels are generated automatically from `data/roots_words_dataset_v2.json` — update the dataset and the game restructures itself.
- **Level flow:** Discover (root card) → Match (multiple choice, root hints cost half the points) → **Boss word**: a held-out word you were never taught, decoded from roots alone for 50 points.
- **Scoring:** 10 base / 20 without hint, streak bonus up to +10, +5 for GRE-listed words, 50 for decodes.
- **Root mastery:** answer every taught word correctly and beat the boss → the root's star lights up permanently.
- **Review sprint:** missed words return after 1 / 3 / 7 days (Leitner spaced repetition).
- **Word of the day:** one of the 31 root-less words, one per day, 30 points.
- **Bridge run:** assembly puzzles — given a definition, build the word by picking its roots from a tile grid (the 63 word-less roots serve as distractors). 30 points per word, +5 for GRE words.
- **The root web:** an interactive force-directed map of all 77 word-bearing roots, connected by the 61 bridges formed by multi-root words. Pan, zoom, tap a root to fan out its word family (green = learned, gold = mastered), tap an edge to see the bridge words, and jump straight into any root's level.
- **Share:** copies a one-line progress summary to your clipboard.

Progress is saved in the browser via `localStorage`.

## Run it locally

Just open `index.html` in a browser. That's it.

## Project layout

```
index.html                       entry page
css/style.css                    night-sky lexicon theme
js/levels.js                     level generation from the dataset (deterministic)
js/game.js                       screens, scoring, mastery, review, daily word
js/bridges.js                    bridge run (word assembly from root tiles)
js/web.js                        interactive root web (force-directed graph)
js/vendor/d3.min.js              D3 v7, vendored locally (no CDN needed)
js/audio.js                      synthesized SFX (WebAudio, no files/CDN)
data/roots_words_dataset_v2.json the source dataset (words, roots, index)
data/dataset.js                  same data as a JS file (lets the game run from file://)
```

To update content, edit the JSON, then regenerate `dataset.js`:

```bash
python3 -c "import json;d=json.load(open('data/roots_words_dataset_v2.json'));open('data/dataset.js','w').write('window.WORDWEB_DATA = '+json.dumps(d,ensure_ascii=False)+';')"
```

## Roadmap

- **Phase 2 (done):** word-assembly bridge run, interactive root web, progress sharing.
- **Phase 3 (done) — Duolingo-style engagement:**
  - **Hearts:** 5 lives; a wrong answer in a level costs one, regenerating 1 every 4 hours. Review sprints and the daily word never cost hearts, and a correct review answer refills one — so running low pushes you toward review, not away from the app.
  - **Day streak:** a 🔥 counter in the header that increments once per calendar day you play anything.
  - **Winding path:** each domain's levels render as a Duolingo-style path with sequential unlocking — finish one level to reveal the next. Mastered roots get a gold star node.
  - **Juice:** an animated top progress bar during quizzes, confetti bursts on decodes/streaks/mastery, shake-on-wrong and pop-on-right micro-animations, a rotating set of short encouragement lines, and a live streak-fire counter mid-quiz.
  - **Sound:** tiny synthesized SFX (no audio files) for correct/wrong/level-up, toggleable from the header; fails silently if the browser blocks audio so it never breaks gameplay.
- **Phase 4:** accounts + cross-device sync (Supabase), GRE-only mode, leaderboards.
