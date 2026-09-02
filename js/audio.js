/* audio.js — tiny synthesized SFX via WebAudio. No files, no CDN, ~instant. */

(function () {
  let ctx = null;
  function ac() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, type, gainPeak) {
    const c = ac();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, c.currentTime + start);
    gain.gain.setValueAtTime(0, c.currentTime + start);
    gain.gain.linearRampToValueAtTime(gainPeak ?? 0.16, c.currentTime + start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(c.currentTime + start);
    osc.stop(c.currentTime + start + dur + 0.02);
  }

  function enabled() {
    return window.WordWeb && window.WordWeb.getSave().soundOn !== false;
  }

  // Reuses the sound toggle — there's no separate haptics setting, and on
  // desktop navigator.vibrate is simply absent so this is a no-op there.
  function buzz(pattern) {
    try {
      if (enabled() && navigator.vibrate) navigator.vibrate(pattern);
    } catch (e) {}
  }

  const sfx = {
    correct() {
      buzz(15);
      try {
        if (!enabled()) return;
        tone(523.25, 0, 0.11, "sine");
        tone(659.25, 0.09, 0.14, "sine");
        tone(783.99, 0.17, 0.2, "sine");
      } catch (e) {}
    },
    wrong() {
      buzz([30, 40, 30]);
      try {
        if (!enabled()) return;
        tone(220, 0, 0.14, "sawtooth", 0.09);
        tone(174.6, 0.1, 0.18, "sawtooth", 0.08);
      } catch (e) {}
    },
    tap() {
      try {
        if (!enabled()) return;
        tone(440, 0, 0.05, "triangle", 0.06);
      } catch (e) {}
    },
    // "Enter galaxy" — a rising pitch sweep (not a chord like the others)
    // to match the warp-flash's outward launch, rather than a fanfare.
    warp() {
      buzz(25);
      try {
        if (!enabled()) return;
        const c = ac();
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = "sawtooth";
        const t0 = c.currentTime;
        osc.frequency.setValueAtTime(180, t0);
        osc.frequency.exponentialRampToValueAtTime(1400, t0 + 0.32);
        gain.gain.setValueAtTime(0, t0);
        gain.gain.linearRampToValueAtTime(0.12, t0 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.36);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(t0);
        osc.stop(t0 + 0.38);
      } catch (e) {}
    },
    levelup() {
      buzz([20, 30, 20, 30, 40]);
      try {
        if (!enabled()) return;
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.09, 0.22, "sine"));
      } catch (e) {}
    },
    supernova() {
      buzz([30, 40, 30, 40, 30, 40, 60]);
      try {
        if (!enabled()) return;
        [392, 523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => tone(f, i * 0.07, 0.32, "sine", 0.14));
      } catch (e) {}
    },
    heartLost() {
      buzz(60);
      try {
        if (!enabled()) return;
        tone(300, 0, 0.2, "sawtooth", 0.07);
      } catch (e) {}
    },
  };

  window.WordWebSFX = sfx;
})();
