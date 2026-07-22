/* web.js — the interactive root web.
   Roots are nodes, bridge words are edges. Click a root to fan out its words;
   click an edge to see the words that bridge two roots. Pan and zoom freely. */

(function () {
  function api() {
    return window.WordWeb;
  }

  let sim = null;

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

  function show() {
    const { GAME, header, wireNav, esc, rootMastered, rootState, startLevel, showHome } = api();
    const app = document.querySelector("#app");
    app.innerHTML = `${header()}
      <section class="webview">
        <div class="webview-bar">
          <span class="phase-kicker">The root web</span>
          <span class="webview-hint">Drag to pan · scroll to zoom · tap a root to fan out its words · tap a line to see the bridge</span>
        </div>
        <div id="web-stage"></div>
        <div id="web-panel" class="web-panel" hidden></div>
      </section>`;
    wireNav();

    if (typeof d3 === "undefined") {
      document.querySelector("#web-stage").innerHTML =
        '<p class="discover-hint" style="padding:20px">The web view needs js/vendor/d3.min.js — it seems to be missing from this copy.</p>';
      return;
    }

    const stage = document.querySelector("#web-stage");
    const W = stage.clientWidth || 760;
    const H = Math.max(460, Math.min(620, window.innerHeight - 220));
    const { nodes, links } = buildGraph();

    const svg = d3
      .select(stage)
      .append("svg")
      .attr("viewBox", [0, 0, W, H])
      .attr("width", "100%")
      .attr("height", H);
    const g = svg.append("g");
    svg.call(
      d3.zoom().scaleExtent([0.4, 4]).on("zoom", (ev) => g.attr("transform", ev.transform))
    );

    let wordNodes = []; // expanded word leaves
    let wordLinks = [];
    const expanded = new Set();

    const linkLayer = g.append("g");
    const wordLinkLayer = g.append("g");
    const nodeLayer = g.append("g");
    const wordLayer = g.append("g");
    const labelLayer = g.append("g");

    sim = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id).distance(90).strength(0.3))
      .force("charge", d3.forceManyBody().strength(-160))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide().radius((d) => radius(d) + 6))
      .force("x", d3.forceX(W / 2).strength(0.04))
      .force("y", d3.forceY(H / 2).strength(0.06));

    function radius(d) {
      return d.type === "word" ? 3.5 : 5 + Math.min(10, Math.sqrt(d.wordCount) * 2);
    }

    const linkSel = linkLayer
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("class", "web-edge")
      .on("click", (ev, d) => showEdgePanel(d));

    const nodeSel = nodeLayer
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", radius)
      .attr("class", (d) => "web-root" + (rootMastered(d.id) ? " lit" : ""))
      .attr("style", (d) => `--h:${d.hue}`)
      .on("click", (ev, d) => {
        toggleWords(d);
        showRootPanel(d);
      })
      .call(
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

    const labelSel = labelLayer
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("class", "web-label")
      .text((d) => d.label);

    let wordSel = wordLayer.selectAll("circle");
    let wordLinkSel = wordLinkLayer.selectAll("line");
    let wordLabelSel = labelLayer.selectAll(".web-word-label");

    function toggleWords(rootNode) {
      const idx = window.WORDWEB_DATA.root_word_index;
      if (expanded.has(rootNode.id)) {
        expanded.delete(rootNode.id);
        wordNodes = wordNodes.filter((w) => w.parent !== rootNode.id);
        wordLinks = wordLinks.filter((l) => l.parent !== rootNode.id);
      } else {
        expanded.add(rootNode.id);
        (idx[rootNode.id] || []).forEach((w) => {
          const learned = !!rootState(rootNode.id).correct[w];
          const n = {
            id: rootNode.id + "::" + w,
            type: "word",
            label: w,
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
        .attr("r", 3.5)
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
      sim.force("wordlink", d3.forceLink(wordLinks).distance(28).strength(0.7));
      sim.alpha(0.5).restart();
    }

    sim.on("tick", () => {
      linkSel
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      nodeSel.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      labelSel.attr("x", (d) => d.x).attr("y", (d) => d.y + radius(d) + 11);
      wordSel.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      wordLinkSel
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      wordLabelSel.attr("x", (d) => d.x + 6).attr("y", (d) => d.y + 3);
    });

    function showRootPanel(d) {
      const { GAME } = api();
      const r = GAME.rootsById[d.id];
      const idx = window.WORDWEB_DATA.root_word_index;
      const words = idx[d.id] || [];
      const rs = rootState(d.id);
      const level = GAME.domains.flatMap((x) => x.levels).find((lv) => lv.roots.includes(d.id));
      const panel = document.querySelector("#web-panel");
      panel.hidden = false;
      panel.innerHTML = `<div class="panel-head">
          <span class="root-name" style="--h:${d.hue}">${esc(r.root)}</span>
          <span class="root-origin">${esc(r.origin)} — “${esc(r.meaning)}”</span>
          ${rootMastered(d.id) ? '<span class="tag" style="position:static">mastered</span>' : ""}
        </div>
        ${r.note ? `<div class="root-note">${esc(r.note)}</div>` : ""}
        <div class="panel-words">${words
          .map((w) => `<span class="chip ${rs.correct[w] ? "learned" : ""}">${esc(w)}</span>`)
          .join("")}</div>
        ${level ? `<button class="btn primary" id="play-root">Play this root</button>` : ""}`;
      const btn = document.querySelector("#play-root");
      if (btn) btn.addEventListener("click", () => startLevel(level.id));
    }

    function showEdgePanel(d) {
      const { GAME, wordsByName } = { GAME: api().GAME, wordsByName: api().GAME.wordsByName };
      const a = GAME.rootsById[d.source.id],
        b = GAME.rootsById[d.target.id];
      const panel = document.querySelector("#web-panel");
      panel.hidden = false;
      panel.innerHTML = `<div class="panel-head">
          <span class="root-name">${esc(a.root)} ✕ ${esc(b.root)}</span>
          <span class="root-origin">bridge word${d.words.length > 1 ? "s" : ""}</span>
        </div>
        <div class="panel-words">${d.words
          .map((w) => {
            const wo = wordsByName[w];
            return `<div class="bridge-item"><strong>${esc(w)}</strong> — ${esc(wo ? wo.definition : "")}</div>`;
          })
          .join("")}</div>`;
    }
  }

  window.WordWebView = { show };
})();
