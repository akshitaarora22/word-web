/* web.js — the interactive root web.
   Roots are nodes, bridge words are edges. Tap a root to fan out its words;
   tap an edge to see the words that bridge two roots. Pan, pinch, zoom freely.

   Touch notes: a 1.4px stroke is unhittable with a fingertip, so every
   interactive shape carries an invisible hit target sized in *screen* pixels
   (see rescale) — a ~26px ribbon over each edge, a ~23px disc over each root.
   Taps are recognised from pointerdown/pointerup with a slop budget, so
   dragging the canvas across an edge never opens a panel. */

(function () {
  function api() {
    return window.WordWeb;
  }

  const TAP_SLOP = 12; // px of finger travel still counted as a tap
  const TAP_MS = 700; // longer than this is a hold, not a tap
  const EDGE_HIT = 26; // screen px: width of the invisible edge ribbon
  const NODE_HIT = 23; // screen px: min radius of the invisible root disc

  let sim = null;

  const coarse = () => !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
  const phone = () => window.innerWidth <= 640;
  const calm = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const ease = (ms) => (calm() ? 0 : ms);

  function buildGraph() {
    const { GAME, rootMastered, rootState } = api();
    const idx = GAME.root_word_index; // rootId -> [key,...] — respects GRE-only mode
    const domHue = {};
    GAME.domains.forEach((d) => (domHue[d.id] = d.hue));

    // Affix roots (re-, con-, in-...) are hint-only tags, never a taught
    // root — see js/levels.js's everPrimary comment. They're excluded from
    // the graph entirely (no node, no bridge edges): a handful of them
    // touch dozens of words apiece, and drawing all of that would bury the
    // real root-to-root bridges in noise. They still show as chips on a
    // word's own panel, just not here.
    const affixIds = new Set(GAME.roots.filter((r) => r.affix).map((r) => r.id));

    // A root that actually got its own dedicated level, vs. one bundled
    // into a medley (or with no level at all) — derived from the built
    // levels rather than a hardcoded word-count threshold, since GRE-only
    // mode uses a lower bar (2, not 4) for what counts as "big enough".
    const ownLeveledRootIds = new Set(
      GAME.domains.flatMap((d) => d.levels).filter((lv) => lv.kind === "root").map((lv) => lv.roots[0])
    );

    const nodes = Object.keys(idx)
      .filter((rid) => !affixIds.has(rid))
      .map((rid) => {
        const r = GAME.rootsById[rid];
        const mastered = rootMastered(rid);
        // "started" = at least one word answered correctly, but not yet mastered.
        // Computed once here (not per simulation tick) since rootMastered walks
        // every domain/level.
        const rs = rootState(rid);
        const started = !mastered && idx[rid].some((k) => rs.correct[k]);
        return {
          id: rid,
          type: "root",
          label: r.root.split(",")[0],
          meaning: r.meaning,
          domain: r.domain,
          hue: domHue[r.domain] ?? 220,
          wordCount: idx[rid].length,
          mastered,
          started,
          // A root without its own dedicated lesson doesn't belong to any
          // one galaxy either — it drifts loose in the shared space
          // between them rather than orbiting a cluster.
          asteroid: !ownLeveledRootIds.has(rid),
        };
      });

    const edgeMap = {};
    GAME.words
      .map((w) => ({ word: w.word, roots: (w.roots || []).filter((rid) => !affixIds.has(rid)) }))
      .filter((w) => w.roots.length >= 2)
      .forEach((w) => {
        const rs = w.roots.slice().sort();
        for (let i = 0; i < rs.length; i++)
          for (let j = i + 1; j < rs.length; j++) {
            const key = rs[i] + "|" + rs[j];
            (edgeMap[key] = edgeMap[key] || { source: rs[i], target: rs[j], words: [] }).words.push(w.word);
          }
      });
    const links = Object.values(edgeMap);
    return { nodes, links };
  }

  /* Recognise a tap on a selection without stealing pan/pinch gestures. */
  function tappable(selection, handler) {
    selection
      .on("pointerdown", function (ev) {
        this.__tap = { x: ev.clientX, y: ev.clientY, t: ev.timeStamp, id: ev.pointerId };
      })
      .on("pointercancel", function () {
        this.__tap = null;
      })
      .on("pointerup", function (ev, d) {
        const s = this.__tap;
        this.__tap = null;
        if (!s || s.id !== ev.pointerId) return;
        if (Math.hypot(ev.clientX - s.x, ev.clientY - s.y) > TAP_SLOP) return;
        if (ev.timeStamp - s.t > TAP_MS) return;
        handler.call(this, ev, d);
      });
  }

  function show() {
    const { header, wireNav, esc, rootMastered, rootState, startLevel } = api();
    const app = document.querySelector("#app");
    const touch = coarse();
    if (sim) {
      sim.stop(); // don't leave a previous visit's simulation ticking
      sim = null;
    }

    app.innerHTML = `${header()}
      <section class="webview">
        <div class="webview-bar">
          <div class="webview-bar-top">
            <span class="phase-kicker">The root web</span>
            <button class="web-home-btn" data-nav="home">Back to main</button>
          </div>
          <div class="web-search">
            <input type="search" id="web-search-input" class="web-search-input" placeholder="Search a root…" autocomplete="off" aria-label="Search roots" />
            <div id="web-search-results" class="web-search-results" hidden></div>
          </div>
          <span class="webview-hint">${
            phone()
              ? "Drag to pan · pinch to zoom · tap a root or a line"
              : touch
              ? "Drag to pan · pinch to zoom · tap a root to fan out its words · tap a line for its bridge words"
              : "Drag to pan · scroll to zoom · click a root to fan out its words · click a line for its bridge words"
          }</span>
        </div>
        <div id="web-stage">
          <div class="warp-flash" id="web-warp-flash"></div>
          <div class="web-zoom">
            <button class="web-zoom-btn" data-zoom="in" aria-label="Zoom in" title="Zoom in">+</button>
            <button class="web-zoom-btn" data-zoom="out" aria-label="Zoom out" title="Zoom out">−</button>
            <button class="web-zoom-btn" data-zoom="fit" aria-label="Fit the whole web" title="Fit the whole web">⤢</button>
          </div>
        </div>
        <div id="web-panel" class="web-panel" hidden></div>
      </section>`;
    wireNav();
    // header() clears this on every other screen, so leaving the view undoes it.
    document.body.classList.add("web-open");

    if (typeof d3 === "undefined") {
      document.querySelector("#web-stage").innerHTML =
        '<p class="discover-hint" style="padding:20px">The web view needs js/vendor/d3.min.js — it seems to be missing from this copy.</p>';
      return;
    }

    const stage = document.querySelector("#web-stage");
    const panel = document.querySelector("#web-panel");

    /* ---------- sizing ---------- */
    function measure() {
      const rect = stage.getBoundingClientRect();
      const w = Math.max(260, Math.round(rect.width));
      const h = phone()
        ? Math.max(320, Math.round(window.innerHeight - rect.top - 14))
        : Math.max(460, Math.min(620, window.innerHeight - 220));
      return { w, h };
    }
    let { w: W, h: H } = measure();

    const { nodes, links } = buildGraph();
    const compact = phone(); // a phone-sized viewport wants a denser layout

    const svg = d3
      .select(stage)
      .append("svg")
      .attr("viewBox", [0, 0, W, H])
      .attr("width", "100%")
      .attr("height", H)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // Solid backdrop: gives empty space something to hit, so a tap on nothing
    // can dismiss the panel and the zoom behaviour always has a target.
    const bg = svg.append("rect").attr("class", "web-bg").attr("x", 0).attr("y", 0).attr("width", W).attr("height", H);

    /* ---------- gradients & filters: domains get a soft nebula cloud behind
       their cluster. Roots/words stay flat-filled (CSS) — a sphere gradient
       was tried here and didn't read as well as the plain disc. ---------- */
    const defs = svg.append("defs");
    const usedHues = [...new Set(nodes.map((n) => n.hue))];
    usedHues.forEach((h) => {
      const neb = defs.append("radialGradient").attr("id", `nebula-${h}`).attr("cx", "48%").attr("cy", "44%");
      neb.append("stop").attr("offset", "0%").attr("stop-color", `hsl(${h} 70% 55% / 0.30)`);
      neb.append("stop").attr("offset", "55%").attr("stop-color", `hsl(${h} 60% 45% / 0.13)`);
      neb.append("stop").attr("offset", "100%").attr("stop-color", `hsl(${h} 60% 45% / 0)`);
      // A small, much brighter/tighter nucleus layered on top of the soft
      // halo — same two-layer trick the map's galaxy icons use (halo + core)
      // so the cloud reads as a galaxy with a bright center, not one flat blob.
      const core = defs.append("radialGradient").attr("id", `nebula-core-${h}`).attr("cx", "50%").attr("cy", "46%");
      core.append("stop").attr("offset", "0%").attr("stop-color", `hsl(${h + 10} 90% 85% / 0.8)`);
      core.append("stop").attr("offset", "55%").attr("stop-color", `hsl(${h} 82% 68% / 0.32)`);
      core.append("stop").attr("offset", "100%").attr("stop-color", `hsl(${h} 82% 68% / 0)`);
    });
    defs
      .append("filter")
      .attr("id", "nebula-blur")
      .attr("x", "-60%")
      .attr("y", "-60%")
      .attr("width", "220%")
      .attr("height", "220%")
      .append("feGaussianBlur")
      .attr("stdDeviation", compact ? 10 : 16);
    defs
      .append("filter")
      .attr("id", "nebula-core-blur")
      .attr("x", "-60%")
      .attr("y", "-60%")
      .attr("width", "220%")
      .attr("height", "220%")
      .append("feGaussianBlur")
      .attr("stdDeviation", 1.5);

    const g = svg.append("g");

    let zk = 1; // current zoom scale
    const zoom = d3
      .zoom()
      .scaleExtent([0.12, 6])
      .on("zoom", (ev) => {
        g.attr("transform", ev.transform);
        if (ev.transform.k !== zk) {
          zk = ev.transform.k;
          rescale();
        }
      });
    svg.call(zoom);

    let wordNodes = []; // expanded word leaves
    let wordLinks = [];
    const expanded = new Set();

    // ---------- domain clusters: each domain gets its own gravity well, so
    // the web settles into neighboring galaxies instead of one flat cloud.
    // Bridge-word links can still pull directly-connected roots from
    // different domains toward each other, same as always — this just gives
    // every root somewhere to fall back to when it's not being pulled.
    const domainIds = [...new Set(nodes.map((n) => n.domain))];
    const domHueByDomain = {};
    api().GAME.domains.forEach((d) => (domHueByDomain[d.id] = d.hue));
    const domainHaloR = {};
    domainIds.forEach((dom) => {
      const count = nodes.filter((n) => n.domain === dom).length;
      domainHaloR[dom] = 46 + Math.sqrt(count) * 26;
    });

    // Deterministic pseudo-random in the 0-1 range, seeded off a string —
    // so the "random" scatter below is stable across reloads/resizes
    // instead of reshuffling every time the view opens.
    function seedRand(str) {
      let h = 2166136261;
      for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return (h >>> 0) / 4294967296;
    }

    // Cluster centers come from a tiny standalone relaxation, not a formula —
    // a perfect ring (every domain equidistant, evenly spaced) read as a
    // protractor, not a universe. Seeded random starting points + collision
    // (sized to each domain's own halo) settle into an irregular scatter
    // that's still guaranteed non-overlapping, closer to how galaxies are
    // actually strewn around a sky.
    const domainCenter = {};
    function layoutClusters(cx, cy) {
      const spread = Math.max(420, domainIds.length * 95);
      const seed = domainIds.map((dom) => ({
        r: domainHaloR[dom],
        x: cx + (seedRand(dom + "x") - 0.5) * spread,
        y: cy + (seedRand(dom + "y") - 0.5) * spread,
      }));
      const relax = d3
        .forceSimulation(seed)
        .force(
          "collide",
          d3
            .forceCollide()
            .radius((d) => d.r + 70)
            .strength(1)
        )
        .force("charge", d3.forceManyBody().strength(-40))
        .force("x", d3.forceX(cx).strength(0.03))
        .force("y", d3.forceY(cy).strength(0.03))
        .stop();
      for (let i = 0; i < 400; i++) relax.tick();
      domainIds.forEach((dom, i) => (domainCenter[dom] = { x: seed[i].x, y: seed[i].y }));
    }
    layoutClusters(W / 2, H / 2);
    function domX(d) {
      if (d.asteroid) return W / 2;
      const c = domainCenter[d.domain];
      return c ? c.x : W / 2;
    }
    function domY(d) {
      if (d.asteroid) return H / 2;
      const c = domainCenter[d.domain];
      return c ? c.y : H / 2;
    }

    // Seed every root at its domain's cluster point (small jitter so same-
    // domain roots don't start exactly stacked) instead of leaving D3's
    // default near-origin placement. Cluster centers can now be far apart —
    // relying on 320 settle ticks to *migrate* a node that whole distance,
    // against a graph that's heavily cross-linked by bridge words, is why
    // roots were staying near the middle while their halos sat far away.
    // Starting already in the right neighborhood means the simulation only
    // has to refine a local layout, not travel one.
    nodes.forEach((n) => {
      const c = domainCenter[n.domain];
      if (c) {
        n.x = c.x + (seedRand(n.id + "sx") - 0.5) * 70;
        n.y = c.y + (seedRand(n.id + "sy") - 0.5) * 70;
      }
    });

    // A point sequence along a logarithmic spiral, local to the origin —
    // the actual curve real spiral-arm pitch angles trace, not just a
    // stretched ellipse. flatten compresses it vertically so it reads as a
    // disc seen at an angle, the way spiral galaxy photos usually look.
    function spiralArmPath(startR, endR, turns, rot, flatten) {
      const steps = 34;
      const b = Math.log(endR / startR) / (turns * Math.PI * 2);
      let d = "";
      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * turns * Math.PI * 2;
        const r = startR * Math.exp(b * theta);
        const angle = theta + rot;
        d += (i === 0 ? "M" : "L") + (Math.cos(angle) * r).toFixed(1) + "," + (Math.sin(angle) * r * flatten).toFixed(1) + " ";
      }
      return d;
    }

    // A sprinkling of small sharp points scattered through a galaxy's own
    // footprint — the soft blurred glow alone read as gas with nothing
    // actually in it. Shaped to match the kind: hugging the two spiral arms
    // (with a little scatter into the disc between them), radially denser
    // toward the center for an elliptical, loosely scattered for an
    // irregular. No blur, unlike everything else in the halo — the contrast
    // between sharp points and soft cloud is what reads as "stars in gas."
    function scatterStars(grp, dom, hue, kind, haloR) {
      const n = Math.round(12 + Math.sqrt(haloR) * 2.4);
      for (let i = 0; i < n; i++) {
        const a = seedRand(dom + "st" + i + "a");
        const b = seedRand(dom + "st" + i + "b");
        let x, y;
        if (kind === "spiral" || kind === "barred") {
          const startR = kind === "barred" ? haloR * 0.4 : haloR * 0.15;
          const endR = haloR * 1.45;
          const turns = 0.8;
          const grow = Math.log(endR / startR) / (turns * Math.PI * 2);
          const theta = a * turns * Math.PI * 2;
          const r = startR * Math.exp(grow * theta);
          const angle = theta + (i % 2 === 0 ? 0 : Math.PI);
          // a little perpendicular jitter so it's a band of stars around
          // each arm, not a single-file line riding the curve exactly
          const jitter = (b - 0.5) * haloR * 0.26;
          x = Math.cos(angle) * r + Math.cos(angle + Math.PI / 2) * jitter;
          y = (Math.sin(angle) * r + Math.sin(angle + Math.PI / 2) * jitter) * 0.5;
        } else if (kind === "elliptical") {
          const eccentricity = 0.4 + seedRand(dom + "ecc") * 0.5;
          const rr = Math.pow(a, 1.7) * haloR; // biased toward the center
          const angle = b * Math.PI * 2;
          x = Math.cos(angle) * rr;
          y = Math.sin(angle) * rr * eccentricity;
        } else {
          const rr = Math.pow(a, 1.1) * haloR * 1.1;
          const angle = b * Math.PI * 2;
          x = Math.cos(angle) * rr;
          y = Math.sin(angle) * rr;
        }
        const bright = seedRand(dom + "st" + i + "c");
        grp
          .append("circle")
          .attr("cx", x.toFixed(1))
          .attr("cy", y.toFixed(1))
          .attr("r", 0.6 + bright * 1.1)
          .attr("fill", bright > 0.82 ? "#fff" : `hsl(${hue} 45% 82%)`)
          .attr("opacity", 0.4 + bright * 0.5);
      }
    }

    // Domain nebula clouds — appended first so every other layer draws over
    // them. Each domain deterministically gets one of four real galaxy
    // morphologies (Hubble-sequence flavored) so the field reads as an
    // actual mix of galaxy types, not one repeated shape recolored:
    //  - spiral: soft disc + two logarithmic-spiral arms off a bright bulge
    //  - barred: same, but the arms spring from the ends of a bright bar
    //    through the core instead of the core itself
    //  - elliptical: a smooth glow with no arms at all, eccentricity
    //    randomized per domain from nearly circular to stretched — real
    //    ellipticals run that same range (E0 "spherical" to E7 elongated),
    //    so "spherical" and "ellipse" are two ends of one spectrum here
    //    rather than needing two separate shapes
    //  - nebula: two overlapping soft blobs, no defined structure or
    //    sharp nucleus — irregular galaxies don't have one either
    const NEBULA_KINDS = ["spiral", "barred", "elliptical", "nebula"];
    const domainKind = {};
    const domainTilt = {};
    domainIds.forEach((dom) => {
      domainKind[dom] = NEBULA_KINDS[Math.floor(seedRand(dom + "kind") * NEBULA_KINDS.length)];
      domainTilt[dom] = (seedRand(dom + "tilt") - 0.5) * 360;
    });

    const haloLayer = g.append("g").attr("class", "web-nebula-layer");
    domainIds.forEach((dom) => {
      const c = domainCenter[dom];
      const hue = domHueByDomain[dom];
      const haloR = domainHaloR[dom];
      if (hue == null) return;
      const kind = domainKind[dom];
      const grp = haloLayer
        .append("g")
        .datum(dom)
        .attr("class", `web-nebula web-nebula-${kind}`)
        .attr("transform", `translate(${c.x},${c.y}) rotate(${domainTilt[dom]})`);

      let nucleusR = haloR * 0.3;
      let nucleusOpacity = 1;

      if (kind === "spiral" || kind === "barred") {
        // A dim flattened disc underneath the arms, so they don't float on
        // empty space, then the arms themselves on top.
        grp
          .append("ellipse")
          .attr("rx", haloR * 1.1)
          .attr("ry", haloR * 0.48)
          .attr("fill", `url(#nebula-${hue})`)
          .attr("filter", "url(#nebula-blur)")
          .attr("opacity", 0.5);

        if (kind === "barred") {
          grp
            .append("rect")
            .attr("x", -haloR * 0.42)
            .attr("y", -haloR * 0.09)
            .attr("width", haloR * 0.84)
            .attr("height", haloR * 0.18)
            .attr("rx", haloR * 0.09)
            .attr("fill", `url(#nebula-core-${hue})`)
            .attr("filter", "url(#nebula-core-blur)")
            .attr("opacity", 0.75);
        }
        const armStartR = kind === "barred" ? haloR * 0.4 : haloR * 0.15;
        [0, Math.PI].forEach((baseAngle) => {
          grp
            .append("path")
            .attr("d", spiralArmPath(armStartR, haloR * 1.45, 0.8, baseAngle, 0.48))
            .attr("fill", "none")
            .attr("stroke", `hsl(${hue} 70% 62% / 0.55)`)
            .attr("stroke-width", Math.max(6, haloR * 0.1))
            .attr("stroke-linecap", "round")
            .attr("filter", "url(#nebula-blur)");
        });
        nucleusR = haloR * 0.24;
      } else if (kind === "elliptical") {
        const eccentricity = 0.4 + seedRand(dom + "ecc") * 0.5; // 0.4 (stretched) .. 0.9 (near-spherical)
        grp
          .append("ellipse")
          .attr("rx", haloR * 1.05)
          .attr("ry", haloR * 1.05 * eccentricity)
          .attr("fill", `url(#nebula-${hue})`)
          .attr("filter", "url(#nebula-blur)");
        nucleusR = haloR * 0.4; // smoother, broader light concentration — no sharp point source
      } else {
        // Two offset soft blobs instead of one perfect circle, so it reads
        // as a shapeless cloud rather than just a bigger dot.
        grp
          .append("circle")
          .attr("r", haloR * 1.1)
          .attr("fill", `url(#nebula-${hue})`)
          .attr("filter", "url(#nebula-blur)")
          .attr("opacity", 0.8);
        grp
          .append("circle")
          .attr("cx", haloR * 0.4)
          .attr("cy", -haloR * 0.22)
          .attr("r", haloR * 0.6)
          .attr("fill", `url(#nebula-${hue})`)
          .attr("filter", "url(#nebula-blur)")
          .attr("opacity", 0.5);
        nucleusR = haloR * 0.14;
        nucleusOpacity = 0.55; // irregular galaxies rarely show a sharp nucleus at all
      }

      scatterStars(grp, dom, hue, kind, haloR);

      // A small, sharper, much brighter nucleus on top — the halo alone
      // read as one flat smudge with no center to anchor on.
      grp
        .append("circle")
        .attr("r", Math.max(10, nucleusR))
        .attr("fill", `url(#nebula-core-${hue})`)
        .attr("filter", "url(#nebula-core-blur)")
        .attr("opacity", nucleusOpacity);
    });

    // Layer order matters for hit testing: root discs sit on top of edge ribbons.
    const linkLayer = g.append("g");
    const edgeHitLayer = g.append("g");
    const wordLinkLayer = g.append("g");
    const nodeLayer = g.append("g");
    const wordLayer = g.append("g");
    const labelLayer = g.append("g");
    const nodeHitLayer = g.append("g");

    function radius(d) {
      if (d.type === "word") return touch ? 4 : 3.5;
      const base = (touch ? 6 : 5) + Math.min(10, Math.sqrt(d.wordCount) * 2);
      return d.mastered ? base + 2 : base; // mastered roots read as slightly bigger stars
    }

    sim = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(compact ? 48 : 90)
          // A bridge word like "logos" touches roots across a dozen
          // different domains ("-ology" alone spans half the map) — at a
          // flat strength every one of those cross-domain pulls fights the
          // clustering force below, and a hub root wins that fight by sheer
          // numbers, dragging itself (and everything chained to it) back to
          // the middle regardless of where it was seeded. Full strength
          // within a domain, where it isn't fighting anything; weak across
          // domains, so the bridge still draws as a line without forcibly
          // merging two galaxies.
          .strength((l) => (l.source.domain === l.target.domain ? 0.35 : 0.03))
      )
      .force("charge", d3.forceManyBody().strength(compact ? -70 : -160))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide().radius((d) => radius(d) + (compact ? 4 : 6)))
      // Asteroids barely feel this pull — they're not bound to any one
      // galaxy's gravity well, just loosely centered on the whole canvas
      // (charge + collide do the rest of the work of scattering them).
      .force("x", d3.forceX(domX).strength((d) => (d.asteroid ? 0.015 : 0.22)))
      .force("y", d3.forceY(domY).strength((d) => (d.asteroid ? 0.015 : 0.22)))
      .alphaDecay(0.035);

    /* ---------- static shapes ---------- */
    const linkSel = linkLayer.selectAll("line").data(links).join("line").attr("class", "web-edge");

    const edgeHitSel = edgeHitLayer
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("class", "web-edge-hit")
      .each(function (d, i) {
        this.__i = i;
      });

    const nodeSel = nodeLayer
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", radius)
      .attr("class", (d) => "web-root" + (d.asteroid ? " asteroid" : "") + (d.mastered ? " lit" : d.started ? " started" : ""))
      // --i staggers the mastered-star twinkle so a cluster of gold roots
      // doesn't all pulse in lockstep; mod 8 keeps the cycle short.
      .attr("style", (d, i) => `--h:${d.hue};--i:${i % 8}`);

    const nodeHitSel = nodeHitLayer
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("class", "web-hit")
      .each(function (d, i) {
        this.__i = i;
      });

    const labelSel = labelLayer
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("class", "web-label")
      .text((d) => d.label);

    let wordSel = wordLayer.selectAll("circle");
    let wordLinkSel = wordLinkLayer.selectAll("line");
    let wordLabelSel = labelLayer.selectAll(".web-word-label");

    /* ---------- selection ---------- */
    let selEdge = null;
    let selNode = null;
    function markSelection() {
      linkSel.classed("sel", (d) => d === selEdge);
      nodeSel.classed("sel", (d) => d === selNode);
    }
    // Pin the node the player is actively looking at. Expanding/collapsing
    // its words reheats the whole simulation (restart()'s sim.alpha(0.5)),
    // and an asteroid's anchor pull is deliberately near-zero (see the
    // "x"/"y" force above) — without a pin, the sudden burst of
    // charge/collide pressure from its own new-or-removed word children can
    // fling it clear across the canvas right as the camera centers on it,
    // and focusOn() only pans once, so it visibly rockets out of view.
    // Released whenever selection changes (selectNode/deselectAll below).
    function selectNode(d) {
      if (selNode) {
        selNode.fx = null;
        selNode.fy = null;
      }
      selNode = d;
      selEdge = null;
      d.fx = d.x;
      d.fy = d.y;
      markSelection();
    }
    function deselectAll() {
      if (selNode) {
        selNode.fx = null;
        selNode.fy = null;
      }
      selEdge = null;
      selNode = null;
      markSelection();
    }

    /* ---------- interaction ---------- */
    tappable(edgeHitSel, (ev, d) => {
      if (selNode) {
        selNode.fx = null;
        selNode.fy = null;
      }
      selEdge = d;
      selNode = null;
      markSelection();
      showEdgePanel(d);
    });

    tappable(nodeHitSel, (ev, d) => {
      const opening = !expanded.has(d.id);
      selectNode(d);
      toggleWords(d);
      showRootPanel(d);
      if (opening && phone()) setTimeout(() => focusOn(d, Math.max(zk, 1.15)), 320);
    });

    tappable(bg, () => {
      deselectAll();
      closePanel();
    });

    if (!touch) {
      // Node dragging is a mouse affordance. On touch the same gesture has to
      // stay available for panning, or half the canvas becomes undraggable.
      nodeHitSel.call(
        d3
          .drag()
          .on("start", (ev, d) => {
            if (!ev.active) sim.alphaTarget(0.2).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (ev, d) => {
            d.fx = ev.x;
            d.fy = ev.y;
          })
          .on("end", (ev, d) => {
            if (!ev.active) sim.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );
      nodeHitSel
        .on("mouseenter", function () {
          d3.select(nodeSel.nodes()[this.__i]).classed("hover", true);
        })
        .on("mouseleave", function () {
          d3.select(nodeSel.nodes()[this.__i]).classed("hover", false);
        });
      edgeHitSel
        .on("mouseenter", function () {
          d3.select(linkSel.nodes()[this.__i]).classed("hover", true);
        })
        .on("mouseleave", function () {
          d3.select(linkSel.nodes()[this.__i]).classed("hover", false);
        });
    }

    stage.querySelectorAll("[data-zoom]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const kind = btn.dataset.zoom;
        if (kind === "fit") fitView(ease(400));
        else zoom.scaleBy(svg.transition().duration(ease(220)), kind === "in" ? 1.6 : 1 / 1.6);
      })
    );

    /* ---------- expansion ---------- */
    function toggleWords(rootNode) {
      const idx = api().GAME.root_word_index; // rootId -> [key,...] — respects GRE-only mode
      const wordsByKey = api().GAME.wordsByKey;
      if (expanded.has(rootNode.id)) {
        expanded.delete(rootNode.id);
        wordNodes = wordNodes.filter((w) => w.parent !== rootNode.id);
        wordLinks = wordLinks.filter((l) => l.parent !== rootNode.id);
      } else {
        expanded.add(rootNode.id);
        (idx[rootNode.id] || []).forEach((key) => {
          const wo = wordsByKey[key];
          if (!wo) return;
          const learned = !!rootState(rootNode.id).correct[key];
          const n = {
            id: rootNode.id + "::" + key,
            type: "word",
            label: wo.word,
            parent: rootNode.id,
            learned,
            hue: rootNode.hue,
            domain: rootNode.domain, // so the cluster force pulls it toward the same galaxy, not the canvas center
            // ...unless the parent itself is an asteroid, drifting loose and
            // unbound to that galaxy's cluster (domX/domY special-case
            // asteroids to the canvas center instead). Without this, an
            // asteroid's word gets yanked at full strength toward a domain
            // cluster the parent isn't anywhere near, fighting the much
            // shorter parent-child link and visibly flying off on expand.
            asteroid: rootNode.asteroid,
            x: rootNode.x + (Math.random() - 0.5) * 30,
            y: rootNode.y + (Math.random() - 0.5) * 30,
          };
          wordNodes.push(n);
          wordLinks.push({ source: n, target: rootNode, parent: rootNode.id });
        });
      }
      restart();
    }

    function restart() {
      wordSel = wordLayer
        .selectAll("circle")
        .data(wordNodes, (d) => d.id)
        .join("circle")
        .attr("r", radius)
        .attr("class", (d) => "web-word" + (d.learned ? " learned" : ""))
        .attr("style", (d) => `--h:${d.hue}`);
      wordLinkSel = wordLinkLayer
        .selectAll("line")
        .data(wordLinks, (d) => d.source.id + d.target.id)
        .join("line")
        .attr("class", "web-word-edge");
      wordLabelSel = labelLayer
        .selectAll(".web-word-label")
        .data(wordNodes, (d) => d.id)
        .join("text")
        .attr("class", "web-word-label")
        .text((d) => d.label);
      sim.nodes(nodes.concat(wordNodes));
      sim.force("wordlink", d3.forceLink(wordLinks).distance(compact ? 24 : 28).strength(0.7));
      rescale();
      sim.alpha(0.5).restart();
    }

    /* ---------- geometry ---------- */
    let labelFS = 10;
    let wordFS = 7.5;

    // Hit targets, strokes and type are all specified in screen pixels and
    // divided by the zoom scale, so they stay finger-sized at every zoom level.
    function rescale() {
      const k = zk;
      labelFS = Math.min(15, 10 / k);
      wordFS = Math.min(12, 8 / k);
      edgeHitSel.attr("stroke-width", EDGE_HIT / k);
      nodeHitSel.attr("r", (d) => Math.max(radius(d) + 3, NODE_HIT / k));
      linkSel.attr("stroke-width", Math.min(4, 1.4 / k));
      wordLinkSel.attr("stroke-width", Math.min(2, 0.8 / k));
      labelSel
        .attr("font-size", labelFS)
        .attr("display", (d) => (k >= 0.55 || d.wordCount >= 8 || expanded.has(d.id) ? null : "none"));
      wordLabelSel.attr("font-size", wordFS).attr("display", k >= 0.5 ? null : "none");
      position();
    }

    function position() {
      linkSel
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      edgeHitSel
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      nodeSel.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      nodeHitSel.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      labelSel.attr("x", (d) => d.x).attr("y", (d) => d.y + radius(d) + labelFS * 0.95);
      wordSel.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      wordLinkSel
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      wordLabelSel.attr("x", (d) => d.x + 5 / zk).attr("y", (d) => d.y + wordFS * 0.35);
    }

    sim.on("tick", position);

    // Settle the layout up front instead of animating 118 nodes into place —
    // faster to read and much kinder to a phone battery.
    sim.stop();
    for (let i = 0; i < 320; i++) sim.tick();

    /* ---------- camera ---------- */
    function fitView(dur) {
      const all = nodes.concat(wordNodes).filter((n) => isFinite(n.x) && isFinite(n.y));
      if (!all.length) return;
      let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
      all.forEach((n) => {
        const r = radius(n) + 14;
        minX = Math.min(minX, n.x - r);
        maxX = Math.max(maxX, n.x + r);
        minY = Math.min(minY, n.y - r);
        maxY = Math.max(maxY, n.y + r);
      });
      const bw = Math.max(1, maxX - minX);
      const bh = Math.max(1, maxY - minY);
      const k = Math.max(0.12, Math.min(2, Math.min(W / bw, H / bh)));
      const t = d3.zoomIdentity
        .translate(W / 2 - (k * (minX + maxX)) / 2, H / 2 - (k * (minY + maxY)) / 2)
        .scale(k);
      if (dur) svg.transition().duration(dur).call(zoom.transform, t);
      else svg.call(zoom.transform, t);
    }

    // A quick radial flash in the destination root's hue, centered on the
    // stage — the same "warping in" effect the map uses when entering a
    // domain, reused here so arriving at a root reads as travel, not a cut.
    function triggerWarp(hue) {
      const flash = document.querySelector("#web-warp-flash");
      if (!flash || calm()) return;
      const rect = stage.getBoundingClientRect();
      flash.style.setProperty("--wx", rect.width / 2 + "px");
      flash.style.setProperty("--wy", rect.height / 2 + "px");
      flash.style.setProperty("--h", hue);
      flash.classList.remove("go");
      void flash.offsetWidth; // restart the animation
      flash.classList.add("go");
    }

    function focusOn(d, k) {
      triggerWarp(d.hue);
      // With the sheet up on a phone, centre high so the node stays visible.
      const cy = phone() && !panel.hidden ? H * 0.3 : H / 2;
      const t = d3.zoomIdentity.translate(W / 2 - k * d.x, cy - k * d.y).scale(k);
      if (calm()) svg.call(zoom.transform, t);
      else svg.transition().duration(420).call(zoom.transform, t);
    }

    rescale();
    // Always open focused on whatever root the player is actually working
    // on (set whenever a level starts) rather than the whole map — falls
    // back to the old fit-everything view if nothing's been played yet.
    const currentRootId = api().getSave().currentRootId;
    const currentNode = currentRootId && nodes.find((n) => n.id === currentRootId);
    if (currentNode) {
      selectNode(currentNode);
      if (!expanded.has(currentNode.id)) toggleWords(currentNode);
      showRootPanel(currentNode);
      focusOn(currentNode, 1.3);
    } else {
      fitView(0);
    }

    /* ---------- panels ---------- */
    function openPanel(html) {
      panel.hidden = false;
      panel.innerHTML = `<button class="web-panel-close" aria-label="Close">×</button>${html}`;
      panel.querySelector(".web-panel-close").addEventListener("click", () => {
        deselectAll();
        closePanel();
      });
      panel.scrollTop = 0;
    }
    function closePanel() {
      panel.hidden = true;
      panel.innerHTML = "";
    }

    function showRootPanel(d) {
      const { GAME } = api();
      const r = GAME.rootsById[d.id];
      const idx = GAME.root_word_index; // rootId -> [key,...] — respects GRE-only mode
      const words = (idx[d.id] || []).map((key) => GAME.wordsByKey[key]).filter(Boolean);
      const rs = rootState(d.id);
      const level = GAME.domains.flatMap((x) => x.levels).find((lv) => lv.roots.includes(d.id));
      openPanel(`<div class="panel-head">
          <span class="root-name" style="--h:${d.hue}">${esc(r.root)}</span>
          <span class="root-origin">${esc(r.origin)} — “${esc(r.meaning)}”</span>
          ${rootMastered(d.id) ? '<span class="tag" style="position:static">mastered</span>' : ""}
        </div>
        ${r.note ? `<div class="root-note">${esc(r.note)}</div>` : ""}
        <div class="panel-words">${words
          .map((wo) => `<span class="chip ${rs.correct[wo.key || wo.word] ? "learned" : ""}">${esc(wo.word)}</span>`)
          .join("")}</div>
        ${level ? `<button class="btn primary" id="play-root">Play this root</button>` : ""}`);
      const btn = document.querySelector("#play-root");
      if (btn) btn.addEventListener("click", () => startLevel(level.id));
    }

    function showEdgePanel(d) {
      const GAME = api().GAME;
      const wordsByName = GAME.wordsByName;
      const a = GAME.rootsById[d.source.id],
        b = GAME.rootsById[d.target.id];
      openPanel(`<div class="panel-head">
          <span class="root-name">${esc(a.root)} ✕ ${esc(b.root)}</span>
          <span class="root-origin">bridge word${d.words.length > 1 ? "s" : ""}</span>
        </div>
        <div class="panel-words">${d.words
          .map((w) => {
            const wo = wordsByName[w];
            return `<div class="bridge-item"><strong>${esc(w)}</strong> — ${esc(wo ? wo.definition : "")}</div>`;
          })
          .join("")}</div>`);
    }

    /* ---------- search ---------- */
    const searchInput = document.querySelector("#web-search-input");
    const searchResults = document.querySelector("#web-search-results");
    let searchMatches = [];
    let searchActive = -1;

    function findRoots(query) {
      const q = query.trim().toLowerCase();
      if (!q) return [];
      const { GAME } = api();
      return nodes
        .filter((d) => {
          const r = GAME.rootsById[d.id];
          return d.label.toLowerCase().includes(q) || r.root.toLowerCase().includes(q) || r.meaning.toLowerCase().includes(q);
        })
        .sort((a, b) => {
          // exact/prefix label matches float to the top of the list
          const rank = (d) => {
            const l = d.label.toLowerCase();
            return l === q ? 0 : l.startsWith(q) ? 1 : 2;
          };
          return rank(a) - rank(b) || a.label.localeCompare(b.label);
        })
        .slice(0, 8);
    }

    function renderSearchResults() {
      const has = searchInput.value.trim().length > 0;
      if (!searchMatches.length) {
        searchResults.innerHTML = has ? '<div class="web-search-empty">No roots match</div>' : "";
        searchResults.hidden = !has;
        return;
      }
      const { GAME } = api();
      searchResults.innerHTML = searchMatches
        .map((d, i) => {
          const r = GAME.rootsById[d.id];
          const tier = d.mastered ? " mastered" : d.started ? " started" : "";
          return `<button type="button" class="web-search-result${i === searchActive ? " active" : ""}${tier}" data-i="${i}" style="--h:${d.hue}">
              <span class="web-search-root">${esc(r.root)}</span>
              <span class="web-search-meaning">${esc(r.meaning)}</span>
            </button>`;
        })
        .join("");
      searchResults.hidden = false;
    }

    function pickSearchResult(d) {
      selNode = d;
      selEdge = null;
      markSelection();
      if (!expanded.has(d.id)) toggleWords(d);
      showRootPanel(d);
      focusOn(d, Math.max(zk, 1.3));
      searchInput.value = "";
      searchMatches = [];
      searchActive = -1;
      renderSearchResults();
      searchInput.blur();
    }

    searchInput.addEventListener("input", () => {
      searchMatches = findRoots(searchInput.value);
      searchActive = searchMatches.length ? 0 : -1;
      renderSearchResults();
    });

    searchInput.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        searchInput.value = "";
        searchMatches = [];
        searchActive = -1;
        renderSearchResults();
        searchInput.blur();
        return;
      }
      if (!searchMatches.length) return;
      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        searchActive = (searchActive + 1) % searchMatches.length;
        renderSearchResults();
      } else if (ev.key === "ArrowUp") {
        ev.preventDefault();
        searchActive = (searchActive - 1 + searchMatches.length) % searchMatches.length;
        renderSearchResults();
      } else if (ev.key === "Enter") {
        ev.preventDefault();
        pickSearchResult(searchMatches[Math.max(0, searchActive)]);
      }
    });

    searchInput.addEventListener("focus", () => {
      if (searchMatches.length) renderSearchResults();
    });

    // A click on a result fires after this, so give it time to land before hiding.
    searchInput.addEventListener("blur", () => {
      setTimeout(() => {
        searchResults.hidden = true;
      }, 150);
    });

    searchResults.addEventListener("click", (ev) => {
      const btn = ev.target.closest("[data-i]");
      if (!btn) return;
      pickSearchResult(searchMatches[Number(btn.dataset.i)]);
    });

    /* ---------- viewport changes ---------- */
    let resizeTimer = null;
    function onResize() {
      if (!document.body.contains(stage)) {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
        return;
      }
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const m = measure();
        if (Math.abs(m.w - W) < 24 && Math.abs(m.h - H) < 60) return;
        W = m.w;
        H = m.h;
        svg.attr("viewBox", [0, 0, W, H]).attr("height", H);
        bg.attr("width", W).attr("height", H);
        sim.force("center", d3.forceCenter(W / 2, H / 2));
        // clusterR itself doesn't depend on W/H (it's sized off the halos),
        // so re-centering is all a resize needs — domX/domY read
        // domainCenter live, so updating it in place re-targets every root.
        layoutClusters(W / 2, H / 2);
        // Each domain's shapes live at local (0,0) inside their own group,
        // so repositioning is just moving that one translate — the group's
        // own rotation (domainTilt) has to stay, or a resize would snap
        // every spiral/barred/elliptical galaxy back to unrotated.
        haloLayer
          .selectAll("g")
          .data(domainIds)
          .attr("transform", (dom) => `translate(${domainCenter[dom].x},${domainCenter[dom].y}) rotate(${domainTilt[dom]})`);
        sim.alpha(0.3).restart();
        setTimeout(() => fitView(ease(400)), 500);
      }, 220);
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
  }

  window.WordWebView = { show };
})();
