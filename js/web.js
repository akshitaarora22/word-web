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
    const { GAME } = api();
    const data = window.WORDWEB_DATA;
    const idx = data.root_word_index;
    const domHue = {};
    GAME.domains.forEach((d) => (domHue[d.id] = d.hue));

    const nodes = Object.keys(idx).map((rid) => {
      const r = GAME.rootsById[rid];
      return {
        id: rid,
        type: "root",
        label: r.root.split(",")[0],
        meaning: r.meaning,
        domain: r.domain,
        hue: domHue[r.domain] ?? 220,
        wordCount: idx[rid].length,
      };
    });

    const edgeMap = {};
    data.words
      .filter((w) => (w.roots || []).length >= 2)
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
            <button class="web-home-btn" data-nav="home">🗺️ Map</button>
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
      return (touch ? 6 : 5) + Math.min(10, Math.sqrt(d.wordCount) * 2);
    }

    sim = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(compact ? 48 : 90)
          .strength(0.3)
      )
      .force("charge", d3.forceManyBody().strength(compact ? -70 : -160))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide().radius((d) => radius(d) + (compact ? 4 : 6)))
      .force("x", d3.forceX(W / 2).strength(0.04))
      .force("y", d3.forceY(H / 2).strength(0.06))
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
      .attr("class", (d) => "web-root" + (rootMastered(d.id) ? " lit" : ""))
      .attr("style", (d) => `--h:${d.hue}`);

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

    /* ---------- interaction ---------- */
    tappable(edgeHitSel, (ev, d) => {
      selEdge = d;
      selNode = null;
      markSelection();
      showEdgePanel(d);
    });

    tappable(nodeHitSel, (ev, d) => {
      selNode = d;
      selEdge = null;
      markSelection();
      const opening = !expanded.has(d.id);
      toggleWords(d);
      showRootPanel(d);
      if (opening && phone()) setTimeout(() => focusOn(d, Math.max(zk, 1.15)), 320);
    });

    tappable(bg, () => {
      selEdge = null;
      selNode = null;
      markSelection();
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
      const idx = window.WORDWEB_DATA.root_word_index; // rootId -> [key,...]
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

    function focusOn(d, k) {
      // With the sheet up on a phone, centre high so the node stays visible.
      const cy = phone() && !panel.hidden ? H * 0.3 : H / 2;
      const t = d3.zoomIdentity.translate(W / 2 - k * d.x, cy - k * d.y).scale(k);
      if (calm()) svg.call(zoom.transform, t);
      else svg.transition().duration(420).call(zoom.transform, t);
    }

    rescale();
    fitView(0);

    /* ---------- panels ---------- */
    function openPanel(html) {
      panel.hidden = false;
      panel.innerHTML = `<button class="web-panel-close" aria-label="Close">×</button>${html}`;
      panel.querySelector(".web-panel-close").addEventListener("click", () => {
        selEdge = null;
        selNode = null;
        markSelection();
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
      const idx = window.WORDWEB_DATA.root_word_index; // rootId -> [key,...]
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
        sim.force("x", d3.forceX(W / 2).strength(0.04));
        sim.force("y", d3.forceY(H / 2).strength(0.06));
        sim.alpha(0.3).restart();
        setTimeout(() => fitView(ease(400)), 500);
      }, 220);
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
  }

  window.WordWebView = { show };
})();
