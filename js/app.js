/*
 * Beyond the Label: hash-routed static app. No network calls, no tracking.
 * Progress and answers stay in this browser (localStorage), and nothing is sent anywhere.
 * Runs from file:// so the showcase copy works offline.
 */
(function () {
  "use strict";

  var CASES = (window.BTL_CASES || []).slice().sort(function (a, b) { return a.id - b.id; });
  var SOURCES = window.BTL_SOURCES || [];
  var STAGES = ["Scenario", "Claim", "Assumptions", "Logic", "Evidence", "Fuller picture", "Reframe"];
  var STORE_KEY = "btl.v1";

  // ---------- storage (wrapped: private windows may block it) ----------
  var memory = {};
  var storageOK = true;
  function load() {
    var raw;
    try { raw = localStorage.getItem(STORE_KEY); }
    catch (e) { storageOK = false; return memory; }
    try {
      var v = JSON.parse(raw);
      // Anything that isn't a plain object (corrupted or hand-edited) falls back to empty progress.
      return v && typeof v === "object" && !Array.isArray(v) ? v : {};
    }
    catch (e) { return {}; }
  }
  var state = load();
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
    catch (e) { storageOK = false; memory = state; }
  }
  function caseState(id) {
    state.cases = state.cases || {};
    state.cases[id] = state.cases[id] || {};
    return state.cases[id];
  }

  // ---------- helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var sourceIndex = {};
  SOURCES.forEach(function (g) { g.items.forEach(function (it) { sourceIndex[it.id] = it; }); });
  // Escape content, then turn [[source-id]] into a citation link.
  function rich(s) {
    return esc(s).replace(/\[\[([a-z0-9-]+)\]\]/g, function (m, id) {
      var src = sourceIndex[id];
      if (!src) return "";
      return '<a class="cite" href="#/sources/' + id + '">(' + esc(src.cite || id) + ")</a>";
    });
  }
  function claimHTML(claim) {
    var i = claim.indexOf(", so ");
    if (i < 0) return esc(claim);
    return esc(claim.slice(0, i)) + ', <span class="so">so</span> ' + esc(claim.slice(i + 5));
  }
  function findCase(id) {
    for (var i = 0; i < CASES.length; i++) if (String(CASES[i].id) === String(id)) return CASES[i];
    return null;
  }
  var ICONS = {
    stated: '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><rect x="1" y="1" width="10" height="10" fill="currentColor"/></svg>',
    assumed: '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><rect x="1" y="1" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M1 11 L11 1 L11 11 Z" fill="currentColor"/></svg>',
    unknown: '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="1.6 1.6"/></svg>',
    doc: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1h6l3 3v9H3z" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M5 7h5M5 9.5h5" stroke="currentColor" stroke-width="1.3"/></svg>',
    beyond: '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="6" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M9 6v14M2 13h14" stroke="currentColor" stroke-width="1.3"/><path d="M16 13h6" stroke="currentColor" stroke-width="1.3" stroke-dasharray="2 1.5"/></svg>'
  };
  var CATS = {
    stated: { label: "Stated in the scenario", cls: "cat-stated", note: "is-stated" },
    assumed: { label: "Assumed by the reader", cls: "cat-assumed", note: "is-assumed" },
    unknown: { label: "Not told", cls: "cat-unknown", note: "is-unknown" }
  };
  function catTag(key) {
    var c = CATS[key];
    return '<span class="cat ' + c.cls + '">' + ICONS[key] + esc(c.label) + "</span>";
  }
  function provenanceChip(text) {
    return '<p class="chip">' + ICONS.doc + esc(text || "Constructed scenario. Not a real person’s account.") + "</p>";
  }
  function ratingFieldset(name, legend, value) {
    var opts = [["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["cant", "Can’t tell"]];
    return '<fieldset><legend>' + esc(legend) + '</legend><div class="scale">' +
      opts.map(function (o) {
        return '<label class="choice"><input type="radio" name="' + name + '" value="' + o[0] + '"' +
          (value === o[0] ? " checked" : "") + "> " + esc(o[1]) + "</label>";
      }).join("") +
      '</div><div class="scale-ends" aria-hidden="true"><span>1 = Not at all</span><span>5 = Very well</span></div>' +
      '<p class="sr-only">1 means not at all, 5 means very well.</p></fieldset>';
  }
  function confidenceFieldset(name, value) {
    return '<fieldset><legend>How confident are you?</legend><div class="scale">' +
      ["Low", "Medium", "High"].map(function (o) {
        var v = o.toLowerCase();
        return '<label class="choice"><input type="radio" name="' + name + '" value="' + v + '"' +
          (value === v ? " checked" : "") + "> " + o + "</label>";
      }).join("") + "</div></fieldset>";
  }
  function localNote() {
    return '<p class="field-note">Your answers stay in this browser. Nothing is sent anywhere.</p>';
  }

  // ---------- page shells ----------
  function page(inner, cls) {
    return '<div class="page ' + (cls || "") + '"><div class="reading">' + inner + "</div></div>";
  }
  function h1(text) { return '<h1 tabindex="-1">' + text + "</h1>"; }

  // ---------- Home ----------
  function renderHome() {
    var resume = "";
    var started = CASES.filter(function (c) { return c.ready && state.cases && state.cases[c.id] && state.cases[c.id].stage && !state.cases[c.id].done; });
    if (started.length) {
      var c = started[0], st = state.cases[c.id].stage;
      resume = '<p><a class="btn btn-quiet" href="#/case/' + c.id + "/" + st + '">Resume Case ' + c.id + ": " + esc(c.title) + " (" + esc(STAGES[st - 1]) + ")</a></p>";
    }
    return '<div class="page hero">' +
      '<h1 tabindex="-1">Beyond the Label</h1>' +
      '<p class="subtitle">How language and reasoning shape the way we understand trafficking narratives.</p>' +
      '<figure class="specimen-hero"><blockquote>“She went back, <span class="so">so</span> she wanted to.”</blockquote>' +
      "<figcaption>One small word, “so,” carries a whole conclusion. This tool shows you how much it’s carrying.</figcaption></figure>" +
      '<div class="reading">' +
      "<p>We often make conclusions about people’s choices based on what we can see: whether someone stayed, returned, participated, or did not leave. But what can be observed is not always enough to explain why someone acted. This interactive tool helps you examine the assumptions, reasoning, and evidence behind those interpretations.</p>" +
      '<div class="btn-row"><a class="btn btn-primary" href="' + (state.noteAck ? "#/cases" : "#/note") + '">Explore a case</a>' +
      '<a class="btn btn-secondary" href="#/how">How it works</a></div>' + resume +
      '<p class="meta hero-note">Content note: this project discusses trafficking and coercion in general terms, with no graphic detail and no real people’s accounts. <a href="#/note">Read the note</a>. About ' + CASES[0].minutes + ' minutes for the first case.</p>' +
      "</div></div>";
  }

  // ---------- Content note ----------
  function renderNote() {
    return page(
      '<p class="eyebrow">Before you begin</p>' + h1("Content note") +
      "<p>This project is about how people talk about trafficking. It discusses coercion and control in general terms.</p>" +
      "<p>It does not include graphic detail, images, or real people’s accounts. The scenarios are constructed for learning. You can skip any question, and you can stop at any time.</p>" +
      '<div class="btn-row"><button class="btn btn-primary" data-action="ack-note">Continue to the cases</button>' +
      '<a class="btn btn-quiet" href="#/break">Take a break</a></div>'
    );
  }

  // ---------- Case index ----------
  function renderCases() {
    var rows = CASES.map(function (c) {
      var cs = state.cases && state.cases[c.id];
      var status = !c.ready ? "In development" :
        cs && cs.done ? "Complete" :
        cs && cs.stage ? "In progress: " + STAGES[cs.stage - 1] : "Not started";
      var inner = '<span><span class="case-title">Case ' + c.id + ": " + esc(c.title) + '</span><br>' +
        '<span class="case-claim">“' + esc(c.claim) + '”</span><br>' +
        '<span class="case-focus">' + esc(c.focus) + "</span></span>" +
        '<span class="case-status">' + esc(status) + (c.ready ? " · about " + c.minutes + " min" : "") + "</span>";
      if (!c.ready) return '<li><div class="case-row is-draft">' + inner + "</div></li>";
      var to = cs && cs.stage && !cs.done ? cs.stage : 1;
      return '<li><a class="case-row" href="#/case/' + c.id + "/" + to + '">' + inner + "</a></li>";
    }).join("");
    return '<div class="page">' + '<div class="reading">' + h1("Cases") +
      "<p>Each case starts with something an observer might see, and a conclusion someone might draw from it. Start with Case 1, which walks through every step. Later cases move faster.</p></div>" +
      '<ol class="case-list" aria-label="Cases">' + rows + "</ol></div>";
  }

  // ---------- Case stages ----------
  function specimenFor(c, n, cs) {
    switch (n) {
      case 1: return { html: "“" + esc(c.logic.stated) + "”", tag: "Stated" };
      case 4: return cs.premiseRevealed
        ? { html: "“" + esc(c.logic.stated) + " <em>[" + esc(keyOption(c).text) + "]</em> " + esc(c.logic.conclusion) + "”", tag: "Hidden premise added" }
        : { html: "“" + esc(c.logic.stated) + " <em>[ ? ]</em> " + esc(c.logic.conclusion) + "”", tag: "Something is missing" };
      case 7: return { html: "“" + esc(c.reframe.short || c.claim) + "”", tag: "Reframed" };
      default: return { html: "“" + claimHTML(c.claim) + "”", tag: n === 2 ? "A commonly heard claim" : n === 3 ? "What’s stated, what’s assumed?" : n === 5 ? "What would we need to know?" : "What did it leave out?" };
    }
  }
  function keyOption(c) {
    for (var i = 0; i < c.logic.options.length; i++) if (c.logic.options[i].key) return c.logic.options[i];
    return c.logic.options[0];
  }

  function renderCase(c, n) {
    var cs = caseState(c.id);
    cs.stage = n; save();
    var spec = specimenFor(c, n, cs);
    var ticks = STAGES.map(function (s, i) {
      return '<span class="' + (i + 1 < n ? "done" : i + 1 === n ? "current" : "") + '"></span>';
    }).join("");
    var rail = '<nav class="rail" aria-label="Stages"><ol>' + STAGES.map(function (s, i) {
      var k = i + 1;
      var inner = '<span class="num">' + k + "</span> " + esc(s);
      if (k === n) return '<li><a href="#/case/' + c.id + "/" + k + '" aria-current="step">' + inner + "</a></li>";
      return '<li><a href="#/case/' + c.id + "/" + k + '">' + inner + (k < n ? '<span class="sr-only"> (visited)</span>' : "") + "</a></li>";
    }).join("") + "</ol></nav>";

    var body = STAGE_RENDER[n - 1](c, cs);
    var prev = n > 1 ? '<a class="btn btn-quiet" href="#/case/' + c.id + "/" + (n - 1) + '">Back</a>' : '<a class="btn btn-quiet" href="#/cases">All cases</a>';
    var next = n < 7 ? '<a class="btn btn-primary" href="#/case/' + c.id + "/" + (n + 1) + '">' + esc(NEXT_LABEL[n - 1]) + "</a>"
      : '<a class="btn btn-primary" href="#/final" data-action="finish-case" data-case="' + c.id + '">Finish: Think before you label</a>';

    return '<div class="case-shell">' +
      '<div class="case-top"><div class="bar"><span class="case-name">Case ' + c.id + ": " + esc(c.title) + "</span>" +
      "<span>Stage " + n + " of 7: " + esc(STAGES[n - 1]) + "</span></div>" +
      '<div class="ticks" aria-hidden="true">' + ticks + "</div>" +
      '<p class="specimen"><span class="sentence">' + spec.html + '</span><span class="tag">' + esc(spec.tag) + "</span></p></div>" +
      '<div class="case-body">' + rail +
      '<article class="stage">' + body.main +
      '<div class="stage-nav">' + prev + next + "</div>" +
      (storageOK ? '<p class="saved-note">Progress is saved on this device only.</p>' : '<p class="saved-note">Progress won’t be saved in this browser.</p>') +
      "</article>" +
      '<aside class="margin" aria-label="Notes">' + (body.margin || "") + "</aside>" +
      "</div></div>";
  }

  // Commit-then-compare: each reveal waits until the learner has answered,
  // but can always be opened anyway, and each step can be started over.
  function remainingSort(c, cs) {
    var sorted = cs.sort || {};
    return c.sort.items.filter(function (it) { return !sorted[it.id]; }).length;
  }
  var REVEALS = {
    "reveal-sort": {
      flag: "sortRevealed", label: "Compare with one reading", focus: ".reading-note",
      ready: function (c, cs) { return remainingSort(c, cs) === 0; },
      nudge: function (c, cs) {
        var n = remainingSort(c, cs);
        return "You have " + n + " statement" + (n === 1 ? "" : "s") + " left to sort. Sort " + (n === 1 ? "it" : "them") + " first, or see the reading now.";
      },
      reset: function (cs) { cs.sort = {}; }
    },
    "reveal-premise": {
      flag: "premiseRevealed", label: "See how each option works", focus: ".feedback-list",
      ready: function (c, cs) { return !!cs.premise; },
      nudge: function () { return "Pick the sentence you think the argument relies on first, or see the explanation now."; },
      reset: function (cs) { delete cs.premise; }
    },
    "reveal-cards": {
      flag: "cardsRevealed", label: "Compare", focus: ".card-why",
      ready: function (c, cs) { return (cs.cards || []).length > 0; },
      nudge: function () { return "Choose at least one question first, or see the comparison now."; },
      reset: function (cs) { cs.cards = []; }
    },
    "show-reframe": {
      flag: "reframeShown", label: "Show one careful version", focus: ".compare",
      ready: function (c, cs) { return !!(cs.rewrite && cs.rewrite.trim()); },
      nudge: function () { return "Try writing your own version first. A rough one is fine. Or see one careful version now."; },
      reset: function (cs) { delete cs.checks; delete cs.post; }
    }
  };
  var nudges = {};
  function revealRow(c, cs, action) {
    var r = REVEALS[action];
    if (nudges[action] && !r.ready(c, cs)) {
      return '<div class="nudge reveal" tabindex="-1"><p>' + esc(r.nudge(c, cs)) + '</p><div class="btn-row">' +
        '<button class="btn btn-secondary" data-action="' + action + '" data-anyway="1">Show it now</button></div></div>';
    }
    return '<div class="btn-row"><button class="btn btn-secondary" data-action="' + action + '">' + esc(r.label) + "</button></div>";
  }
  function resetRow(action) {
    return '<p class="reset-row"><button type="button" class="btn-link" data-action="reset" data-target="' + action + '">Start this step over</button></p>';
  }

  var NEXT_LABEL = ["See a common interpretation", "Look at the assumptions", "Check the logic", "Ask what’s missing", "See the fuller picture", "Say it more carefully"];

  var STAGE_RENDER = [
    // 1. Scenario
    function (c) {
      return {
        main: provenanceChip() + '<p class="stage-kicker">Stage 1 · Scenario</p>' + h1("What an observer sees") +
          c.scenario.paragraphs.map(function (p) { return '<p class="scenario-text">' + rich(p) + "</p>"; }).join("") +
          '<p class="key-idea">' + rich(c.scenario.note) + "</p>",
        margin: "<div><h2>Why a constructed scenario?</h2><p>This project doesn’t quote survivors or speak for them. The scenarios are written for learning, and every detail in them reflects patterns documented in research. <a href=\"#/about\">More about this choice</a>.</p></div>"
      };
    },
    // 2. Claim
    function (c, cs) {
      var pre = cs.pre || {};
      return {
        main: '<p class="stage-kicker">Stage 2 · Claim</p>' + h1("A commonly heard claim") +
          "<p>" + rich(c.claimStage.intro) + "</p>" +
          '<p class="claim-label">A reader might conclude:</p>' +
          '<p class="claim-display">“' + claimHTML(c.claim) + "”</p>" +
          '<div class="panel" data-form="pre">' +
          ratingFieldset("pre-support", "How well does the information in the scenario support this conclusion?", pre.support) +
          confidenceFieldset("pre-conf", pre.conf) + localNote() + "</div>" +
          "<p>" + rich(c.claimStage.normalize) + " The next question is: <strong>what is this interpretation assuming?</strong></p>",
        margin: "<div><h2>There’s no wrong answer here</h2><p>This rating is a starting point. You’ll be asked again at the end, and it’s fine if your answer changes or doesn’t.</p></div>"
      };
    },
    // 3. Assumptions
    function (c, cs) {
      var sorted = cs.sort || {};
      var revealed = !!cs.sortRevealed;
      var items = c.sort.items.map(function (it) {
        var chosen = sorted[it.id];
        var opts = ["stated", "assumed", "unknown"].map(function (k) {
          return '<label class="choice"><input type="radio" name="sort-' + it.id + '" value="' + k + '"' +
            (chosen === k ? " checked" : "") + "> " + ICONS[k] + " " + esc(CATS[k].label) + "</label>";
        }).join("");
        var note = revealed ? '<div class="reading-note reveal ' + CATS[it.answer].note + '"><span class="cat-label">One reading: ' + catTag(it.answer) + "</span> " +
          rich(it.reason) + ' <span class="meta">' + (chosen ? "You chose: " + esc(CATS[chosen].label) + "." : "You didn’t sort this one.") + "</span></div>" : "";
        return '<li class="sort-item"><fieldset><legend class="sort-statement" style="font-family:var(--serif);font-weight:400;font-size:1.125rem">' + esc(it.text) + "</legend>" +
          '<div class="sort-options">' + opts + "</div></fieldset>" + note + "</li>";
      }).join("");
      return {
        main: '<p class="stage-kicker">Stage 3 · Assumptions</p>' + h1("What’s stated, and what’s assumed?") +
          "<p>" + rich(c.sort.intro) + "</p>" +
          '<div class="legend-row">' + catTag("stated") + catTag("assumed") + catTag("unknown") + "</div>" +
          '<ol class="sort-list" data-form="sort">' + items + "</ol>" +
          '<p class="meta" id="sort-count">' + (c.sort.items.length - remainingSort(c, cs)) + " of " + c.sort.items.length + " sorted</p>" +
          (revealed
            ? '<p class="key-idea reveal">' + rich(c.sort.takeaway) + "</p><p class=\"meta\">Where the scenario is ambiguous, reasonable people can sort differently.</p>" + resetRow("reveal-sort")
            : revealRow(c, cs, "reveal-sort")),
        margin: "<div><h2>Observation vs. conclusion</h2><p>An observed behavior doesn’t necessarily give complete information about the circumstances, motivations, or constraints around it.</p></div>"
      };
    },
    // 4. Logic
    function (c, cs) {
      var L = c.logic, chosen = cs.premise, revealed = !!cs.premiseRevealed, key = keyOption(c);
      var slot = revealed ? '<span>' + esc(key.text) + "</span>" : '<span class="slot-empty">Something is missing here</span>';
      var options = L.options.map(function (o) {
        return '<label class="choice"><input type="radio" name="premise" value="' + o.id + '"' + (chosen === o.id ? " checked" : "") +
          '> <span class="choice-text">' + esc(o.text) + "</span></label>";
      }).join("");
      var feedback = revealed ? '<ul class="feedback-list reveal">' + L.options.map(function (o) {
        return '<li class="' + (o.key ? "is-key" : "") + '"><span class="opt">“' + esc(o.text) + "”" +
          (chosen === o.id ? '<span class="you">Your pick</span>' : "") + "</span>" + rich(o.why) + "</li>";
      }).join("") + "</ul>" : "";
      function formulaWell(lines) {
        return '<div class="formula-well">' + lines.map(function (ln) {
          return '<p class="formula" translate="no"><span aria-hidden="true">' + ln.f + '</span><span class="sr-only">' + esc(ln.r) + "</span></p>" +
            '<p class="formula-reading" aria-hidden="true">' + esc(ln.r) + "</p>";
        }).join("") + "</div>";
      }
      var sym = L.symbols;
      var symbols = !sym ? "" : '<details class="more"><summary>Show it in symbols</summary><div class="more-body">' +
        '<p class="symbol-key">' + sym.key.map(function (k) { return "<strong>" + k[0] + "</strong> = " + esc(k[1]); }).join("<br>") +
        "<br><strong>→</strong> means “if … then …”. <strong>¬</strong> means “not.” <strong>∨</strong> means “or.” <strong>∴</strong> means “therefore.”</p>" +
        sym.steps.map(function (st) {
          return "<h3>" + esc(st.label) + "</h3>" + formulaWell(st.lines) + "<p>" + rich(st.note) + "</p>";
        }).join("") + "</div></details>";
      var beyond = !L.beyond ? "" : '<aside class="beyond" aria-labelledby="beyond-h"><div class="beyond-head">' + ICONS.beyond + '<span id="beyond-h">Beyond truth values</span></div>' +
        "<p>Take a related sentence: “" + (L.deepDive ? esc(L.beyond.sentence).replace(esc(L.beyond.trigger), '<a href="#because-detail">' + esc(L.beyond.trigger) + "</a>") : esc(L.beyond.sentence)) + "”</p>" +
        "<p>" + rich(L.beyond.text) + '</p><p class="not-false">This does not mean the statement is false.</p></aside>';
      var deep = !L.deepDive ? "" : '<details class="more" id="because-detail"><summary>Go deeper: why truth tables can’t settle “because”</summary><div class="more-body">' +
        "<p>An operator is <strong>truth-functional</strong> when the truth of the whole sentence is fully determined by the truth of its parts. “And” is truth-functional: “A and B” is true exactly when both parts are true.</p>" +
        "<p>Try filling in a table for “She stayed <em>because</em> she wanted to.”</p>" +
        '<table><caption>“S because W”</caption><thead><tr><th scope="col">S: she stayed</th><th scope="col">W: she wanted to</th><th scope="col">S because W</th></tr></thead><tbody>' +
        '<tr><td>True</td><td>True</td><td class="q">Can’t tell</td></tr><tr><td>True</td><td>False</td><td>False</td></tr><tr><td>False</td><td>True</td><td>False</td></tr><tr><td>False</td><td>False</td><td>False</td></tr></tbody></table>' +
        "<p>Every row is settled except the first. Even when both parts are true, we can’t tell from truth values alone whether one explains the other. The same goes for words about minds (<em>believes, wants, chose, consented</em>), time (<em>after</em>), and possibility and necessity (<em>possible, could, must</em>): they need evidence about the world, not just truth values.</p></div></details>";
      return {
        main: '<p class="stage-kicker">Stage 4 · Logic</p>' + h1("Does the conclusion follow?") +
          (L.warmup ? '<div class="panel"><p class="panel-title">Warm-up</p><p><em>“' + esc(L.warmup.claim) + "”</em></p><p>" + rich(L.warmup.text) + "</p></div>" : "") +
          "<h2>Now the claim about " + esc(c.person) + "</h2>" +
          '<ol class="proof" aria-label="The argument"><li><span class="lbl">P1<span class="sr-only">, stated premise</span></span><span>' + esc(L.stated) + '<span class="tag">Stated</span></span></li>' +
          '<li class="unstated"><span class="lbl">P2<span class="sr-only">, unstated premise</span></span><span>' + slot + '<span class="tag">Unstated</span></span></li>' +
          '<li class="conclusion"><span class="lbl">∴<span class="sr-only"> Conclusion</span></span><span>' + esc(L.conclusion) + '<span class="tag">Conclusion</span></span></li></ol>' +
          '<fieldset data-form="premise"><legend>' + esc(L.prompt) + '</legend><div class="choice-stack">' + options + "</div></fieldset>" +
          (revealed ? feedback + '<p class="reveal">This premise does the real work. Without it, the conclusion doesn’t follow.</p>' + resetRow("reveal-premise")
            : revealRow(c, cs, "reveal-premise")) +
          (revealed ? '<div class="reveal"><h2>Two separate questions</h2>' +
            "<h3>1. Does it follow?</h3><p>" + rich(L.follows) + "</p>" +
            "<h3>2. Are the premises true?</h3><p>" + rich(L.isTrue) + "</p>" +
            '<p class="key-idea">' + rich(L.keyIdea) + "</p>" + symbols +
            (L.equivocation ? '<details class="more" open><summary>' + esc(L.equivocation.title) + '</summary><div class="more-body"><p>' + rich(L.equivocation.text) + "</p></div></details>" : "") +
            (L.extra || []).map(function (x) {
              return '<div class="panel"><p class="panel-title">' + esc(x.title) + "</p>" + (x.lines ? formulaWell(x.lines) : "") + "<p>" + rich(x.text) + "</p></div>";
            }).join("") +
            beyond + deep +
            (L.inverse || []).map(function (x) { return '<div class="panel"><p class="panel-title">' + esc(x.title) + "</p><p>" + rich(x.text) + "</p></div>"; }).join("") +
            "</div>" : ""),
        margin: "<div><h2>Words used here</h2><p><strong>Premise:</strong> a statement offered as a reason.</p><p><strong>Conclusion:</strong> what the reasons are supposed to show.</p>" +
          "<p><strong>Valid:</strong> if the premises were true, the conclusion would have to be true. Validity is about structure, not truth.</p>" +
          "<p><strong>Sound:</strong> valid, and the premises really are true.</p></div>"
      };
    },
    // 5. Evidence
    function (c, cs) {
      var E = c.evidence, picks = cs.cards || [], revealed = !!cs.cardsRevealed;
      var cards = E.cards.map(function (k) {
        var on = picks.indexOf(k.id) >= 0;
        var why = revealed ? '<p class="card-why reveal">' + (k.relevant ? '<span class="cat cat-stated">' + ICONS.stated + esc(E.relevantLabel || "Bears on the question") + "</span>" : '<span class="cat cat-unknown">' + ICONS.unknown + "Less helpful here</span>") + " " + rich(k.why) + "</p>" : "";
        return '<li><label class="choice"><input type="checkbox" name="card" value="' + k.id + '"' + (on ? " checked" : "") +
          '> <span class="choice-text">' + esc(k.text) + why + "</span></label></li>";
      }).join("");
      return {
        main: '<p class="stage-kicker">Stage 5 · Evidence</p>' + h1("What would we need to know?") +
          "<p>" + rich(E.intro) + "</p>" +
          '<fieldset data-form="cards"><legend>Choose up to ' + E.pick + ' <span class="meta" id="pick-count" aria-live="polite">(' + picks.length + " chosen)</span></legend>" +
          '<ul class="cards">' + cards + "</ul></fieldset>" +
          (revealed ? '<p class="key-idea reveal">' + rich(E.compareNote) + "</p>" + resetRow("reveal-cards")
            : revealRow(c, cs, "reveal-cards")) +
          (E.rivals ? "<h2>" + esc(E.rivals.title) + "</h2><p>" + rich(E.rivals.text) + "</p><ul>" +
            E.rivals.list.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") + "</ul><p>" + rich(E.rivals.after) + "</p>" : ""),
        margin: (E.legal ? "<div><h2>What the law says</h2><p>" + rich(E.legal) + "</p></div>" : "") +
          "<div><h2>Three kinds of claims</h2><p>" + catTag("stated") + "<br>What the scenario establishes.</p><p>" + catTag("assumed") + "<br>What a reader is assuming.</p><p>" + catTag("unknown") + "<br>What remains unknown.</p></div>"
      };
    },
    // 6. Fuller picture
    function (c, cs) {
      var F = c.fuller;
      return {
        main: provenanceChip(F.label) + '<p class="stage-kicker">Stage 6 · Fuller picture</p>' + h1("What the observer couldn’t see") +
          F.paragraphs.map(function (p) { return '<p class="scenario-text">' + rich(p) + "</p>"; }).join("") +
          "<h2>The constraints, and the systems behind them</h2>" +
          '<ul class="mechanisms">' + F.mechanisms.map(function (m) {
            return '<li><span class="m-name">' + esc(m.name) + '</span><span class="m-system">' + esc(m.system) + "</span>" + rich(m.text) + "</li>";
          }).join("") + "</ul>" +
          '<p class="key-idea">' + rich(F.agency) + "</p>" +
          (F.lenses ? "<h2>Personhood and agency</h2><p>How should we think about " + esc(c.person) + "’s choices? " + (F.lenses.length === 1 ? "Here is a perspective" : "Here are " + F.lenses.length + " perspectives") + " to weigh.</p>" +
          '<div class="lenses">' + F.lenses.map(function (l) {
            return '<div class="lens"><h3>' + esc(l.name) + '</h3><p class="src">' + esc(l.src) + " " + l.src_ids.map(function (id) { return rich("[[" + id + "]]"); }).join(" ") + "</p><p>" + rich(l.text) + "</p><p><em>" + esc(l.q) + "</em></p></div>";
          }).join("") + "</div>" +
          (F.lensNote ? '<p class="meta">' + rich(F.lensNote) + "</p>" : "") : "") +
          (F.idealVictim ? '<div class="panel"><p class="panel-title">The “ideal victim”</p><p>' + rich(F.idealVictim) + "</p></div>" : "") +
          (F.cards || []).map(function (x) { return '<div class="panel"><p class="panel-title">' + esc(x.title) + "</p><p>" + rich(x.text) + "</p></div>"; }).join("") +
          "<h2>Back to the claim</h2><p>" + rich(F.returnPrompt) + "</p>" +
          '<label for="return-notes" class="meta">Your notes (optional, stays in this browser)</label>' +
          '<textarea id="return-notes" data-field="returnNotes" maxlength="1000">' + esc(cs.returnNotes || "") + "</textarea>",
        margin: '<div><h2>Hear it from survivors</h2><p>' + rich(F.survivors) + "</p></div>" +
          '<div><h2>Why this happens</h2><p>These constraints come from larger systems. <a href="#/why">Read about the systems behind them</a>.</p></div>'
      };
    },
    // 7. Reframe
    function (c, cs) {
      var R = c.reframe, shown = !!cs.reframeShown, post = cs.post || {}, pre = cs.pre || {};
      var shift = "";
      if (shown && pre.support && post.support) {
        var fmt = function (v) { return v === "cant" ? "“can’t tell”" : v + " of 5"; };
        shift = '<p class="shift">At the start you rated the support as ' + fmt(pre.support) + ". Now: " + fmt(post.support) +
          ". Changing your rating, or not, is fine either way. What matters is the reasoning behind it.</p>";
      }
      var checks = cs.checks || [];
      return {
        main: '<p class="stage-kicker">Stage 7 · Reframe</p>' + h1("Say it more carefully") +
          "<p>" + rich(R.prompt) + "</p>" +
          '<label for="rewrite" class="sr-only">Your version</label>' +
          '<textarea id="rewrite" data-field="rewrite" maxlength="600" placeholder="Write your version here">' + esc(cs.rewrite || "") + "</textarea>" +
          '<p class="field-note">Please don’t include names or personal experiences. This stays in your browser.</p>' +
          (shown ? "" : revealRow(c, cs, "show-reframe")) +
          (shown ? '<div class="reveal"><div class="compare"><div class="before"><span class="label">Instead of</span><p>“' + esc(c.claim) + '”</p></div>' +
            '<div class="after"><span class="label">One careful version</span><p>“' + esc(R.model) + "”</p></div></div>" +
            "<h2>Why it’s more precise</h2><ul>" + R.why.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ul>" +
            "<p>This isn’t the one correct opinion. It shows more careful reasoning and language.</p>" + resetRow("show-reframe") +
            '<fieldset data-form="checks"><legend>Check your own version</legend><div class="choice-stack">' +
            R.selfcheck.map(function (s, i) {
              return '<label class="choice"><input type="checkbox" value="' + i + '"' + (checks.indexOf(i) >= 0 ? " checked" : "") + '> <span class="choice-text">' + esc(s) + "</span></label>";
            }).join("") + "</div></fieldset>" +
            '<div class="panel" data-form="post">' + ratingFieldset("post-support", "Now: how well does the information in the scenario support the original claim?", post.support) +
            confidenceFieldset("post-conf", post.conf) + localNote() + "</div>" + shift +
            '<details class="more"><summary>Reflect (optional)</summary><div class="more-body">' +
            [["r1", "What assumption did you notice?"], ["r2", "What information was missing?"], ["r3", "Did the fuller picture change how you understood the situation?"], ["r4", "How could you discuss a situation like this more carefully in the future?"]].map(function (q) {
              return '<label for="' + q[0] + '"><strong>' + esc(q[1]) + '</strong></label><textarea id="' + q[0] + '" data-field="' + q[0] + '" maxlength="600">' + esc(cs[q[0]] || "") + "</textarea>";
            }).join("") + '<p class="field-note">No names or identifying details, please. These stay in your browser.</p></div></details>' +
            renderCTA(R.actions) + "</div>" : ""),
        margin: "<div><h2>A careful statement…</h2><p>keeps the observation, names what’s unknown, and doesn’t trade one certainty for another.</p></div>"
      };
    }
  ];

  function renderCTA(actions) {
    return '<section class="cta" aria-labelledby="cta-h"><h2 id="cta-h">Before you draw a conclusion about someone’s choices</h2><ol>' +
      "<li><strong>Pause.</strong></li><li><strong>Identify the assumption.</strong></li><li><strong>Ask what evidence supports it.</strong></li>" +
      "<li><strong>Consider what the person’s own account tells you,</strong> if they’ve shared one, and what you don’t know.</li>" +
      "<li><strong>Choose language that does not turn incomplete information into certainty.</strong></li></ol>" +
      "<h3>Then act</h3><ul>" + actions.map(function (a) { return "<li><strong>" + esc(a.lead) + "</strong> " + rich(a.text) + "</li>"; }).join("") + "</ul></section>";
  }

  // ---------- Other pages ----------
  function renderHow() {
    return page(h1("How it works") +
      '<p class="lede">This tool doesn’t tell you what to think about trafficking. It helps you check the reasoning behind conclusions about other people’s choices.</p>' +
      "<h2>Seven stages per case</h2><ol>" +
      ["<strong>Scenario:</strong> what an outside observer can see.", "<strong>Claim:</strong> a conclusion someone might draw, and how well you think it’s supported.",
       "<strong>Assumptions:</strong> sort what’s stated from what’s assumed and what’s unknown.", "<strong>Logic:</strong> find the hidden premise, and separate “does it follow?” from “is it true?”",
       "<strong>Evidence:</strong> what we’d need to know, and what else could explain the behavior.", "<strong>Fuller picture:</strong> the constraints the observer couldn’t see, the systems behind them, and the person’s own agency.",
       "<strong>Reframe:</strong> say it more carefully, then decide what to do."].map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ol>" +
      "<h2>A 60-second example</h2><p><em>“She went back, so she wanted to.”</em></p>" +
      "<p>The fact is that she went back. The conclusion is that she wanted to. Between them sits an unstated rule: <em>anyone who goes back wanted to.</em> Is that rule true? Someone might go back because of a threat, a debt, or having nowhere else to stay. So going back alone doesn’t tell us why.</p>" +
      "<p>That doesn’t mean the opposite is true, either. It means we need more information before concluding anything.</p>" +
      "<h2>About the scenarios</h2><p>Every scenario is constructed. None is a real person’s account, and none quotes a survivor. <a href=\"#/about\">Why?</a></p>" +
      '<div class="btn-row"><a class="btn btn-primary" href="' + (state.noteAck ? "#/cases" : "#/note") + '">Explore a case</a></div>');
  }

  function renderWhy() {
    var items = [
      ["Gendered and devalued work", "Domestic work is one of the sectors where forced labor is documented. [[ilo]] Pat Mainardi showed how housework is treated as women’s job and dismissed as not quite “real work.” Paid domestic work inherits that devaluation. [[mainardi]]"],
      ["Immigration law and fear of enforcement", "When a work visa or legal status depends on an employer, or when someone fears arrest and deportation, leaving becomes dangerous. [[brennan]]"],
      ["Economic inequality and debt", "Recruitment fees and debts that can’t be repaid turn a job into an obligation. [[ilo]] [[tvpa]]"],
      ["Criminalization", "The criminal legal system falls hardest on poor women and women of color, including through prostitution laws. [[davis]] People who were trafficked can be arrested and left with records that block housing and jobs."],
      ["Overlapping systems", "Gender, race, immigration status, and class compound each other. Looking at one at a time misses the people most affected. [[crenshaw]]"],
      ["Stories about victims and saviors", "Popular images of the helpless victim waiting for rescue make it harder to recognize people who don’t fit them, and easier to overlook their agency. [[mohanty]] [[abulughod]] [[christie]]"]
    ];
    return page(h1("Why this happens") +
      '<p class="lede">The constraints in each case aren’t random bad luck. They come from systems of power that make some people easier to exploit and harder to believe.</p>' +
      items.map(function (x) { return "<h2>" + esc(x[0]) + "</h2><p>" + rich(x[1]) + "</p>"; }).join("") +
      "<h2>Why language matters</h2><p>In the short term, assuming “she chose it” can mean a person isn’t recognized, believed, or offered help. Over time, the same assumptions shape how institutions, policies, and the public respond.</p>" +
      '<div class="btn-row"><a class="btn btn-secondary" href="#/sources">See all sources</a></div>');
  }

  function renderAbout() {
    return page(h1("About this project") +
      "<p><strong>Beyond the Label</strong> is an advocacy project for WGS 200 (Women’s, Gender, and Sexuality Studies), North Carolina State University, Fall 2026.</p>" +
      '<div class="placeholder"><strong>Placeholder: creator’s name.</strong> To be added by the project author.</div>' +
      "<h2>Why I made this</h2>" +
      '<div class="placeholder"><strong>Placeholder: in the creator’s own words.</strong> Why this issue, and how it connects to your experiences, values, or goals. (This doubles as the Personal Connection section of the process paper.)</div>' +
      "<h2>Who it’s for</h2><p>College students and young adults who run into conversations about trafficking on social media, in the news, in entertainment, in class, and in everyday talk. No background in logic is needed.</p>" +
      "<h2>Why there are no survivor quotes</h2><p>This project doesn’t quote survivors, and it doesn’t speak for them. The scenarios are constructed by a student for learning. Each detail reflects patterns documented in research and law, and the sources are listed. To hear survivors directly, start with survivor-led work: " + rich("[[nsn]] [[lloyd]]") + "</p>" +
      "<h2>Scope</h2><p>The project focuses on how people talk about trafficked women, because that’s where these assumptions are most often aimed. Trafficking also affects men, boys, and trans and nonbinary people, and it happens in labor as well as in the sex trade.</p>" +
      "<h2>Limits</h2><ul><li>Logic can show whether a conclusion follows. It can’t settle what’s true about a real person’s life. That takes evidence.</li>" +
      "<li>A constructed scenario is not anyone’s real experience, and no single case represents all survivors.</li>" +
      "<li>Questioning “she chose it” doesn’t mean assuming the opposite. Adults can and do consent to sex work. For adults, U.S. law defines trafficking by force, fraud, or coercion. Anyone under 18 who is involved in commercial sex counts as a trafficking victim under U.S. law, with no force, fraud, or coercion required. " + rich("[[tvpa]] [[giragrant]]") + "</li></ul>" +
      "<h2>Privacy</h2><p>Nothing you enter is sent anywhere. There are no accounts, cookies, or analytics. Your progress and answers are saved only in this browser, and you can clear them at any time from the bottom of the page.</p>");
  }

  // One copy of the hotline: the support page, the handout, and the footer (filled in below) all use it.
  var HOTLINE = "National Human Trafficking Hotline (U.S.): call 1-888-373-7888 or text 233733";
  // The questions on the Final screen and the printed handout.
  var ASK = ["What do I know?", "What am I assuming?", "What evidence am I missing?", "What does the person’s own account tell me, if they’ve shared one?", "How can I describe this more carefully?"];
  function listItems(xs) { return xs.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join(""); }

  function resourcesHTML() {
    return '<ul><li>' + esc(HOTLINE) + '</li>' +
      '<li>National Domestic Violence Hotline (U.S.): call 1-800-799-7233 or text START to 88788</li>' +
      '<li>988 Suicide &amp; Crisis Lifeline (U.S.): call or text 988</li>' +
      '<li>If you’re in immediate danger, call 911.</li>' +
      '<li class="placeholder" style="list-style:none">Placeholder: NC State campus counseling and the Women’s Center. Look up their current details on official NC State pages.</li></ul>';
  }

  function renderBreak() {
    var back = state.lastRoute && state.lastRoute !== "#/break" ? state.lastRoute : "#/";
    return page(h1("Take a break") +
      '<p class="lede">You can stop here, and come back anytime. Your progress is saved on this device.</p>' +
      "<p>If this topic brought something up for you, you don’t have to work through it alone.</p>" +
      "<h2>Support</h2>" + resourcesHTML() +
      '<div class="btn-row"><a class="btn btn-secondary" href="' + esc(back) + '">Return to where you were</a></div>');
  }

  function renderFinal() {
    return '<div class="page final"><div class="reading">' +
      '<h1 tabindex="-1">Think before you label.</h1>' +
      '<p class="sub">A person’s behavior is only one part of a story.</p>' +
      "<p>Before drawing conclusions about someone’s choices, ask:</p><ol>" + listItems(ASK) + "</ol>" +
      "<h2>And then</h2><ul><li>Question “she could have left” when you hear it, kindly and out loud.</li><li>Follow and support survivor-led organizations.</li><li>Support labor protections for domestic workers and record relief for survivors.</li><li>Share this tool with someone who scrolls past these stories.</li></ul>" +
      '<div class="btn-row"><button class="btn btn-secondary" data-action="print">Print or save this card</button><a class="btn btn-quiet" href="#/cases">Back to cases</a></div>' +
      "</div></div>";
  }

  function renderSources() {
    return page(h1("Sources") +
      "<p>Every source the project relies on is listed here in APA format. Course readings come from <em>The Portable Feminist Reader</em> (Gay, 2025).</p>" +
      SOURCES.map(function (g) {
        return '<section class="source-group"><h2>' + esc(g.group) + "</h2>" + (g.note ? '<p class="meta">' + esc(g.note) + "</p>" : "") +
          '<ul class="source-list">' + g.items.map(function (it) {
            return '<li id="src-' + it.id + '" tabindex="-1">' + esc(it.text) +
              (it.status === "verify" ? ' <span class="verify">verify before launch</span>' : it.status === "placeholder" ? ' <span class="verify">to be added</span>' : "") +
              (it.url ? ' <a href="' + esc(it.url) + '" rel="noopener" target="_blank">Visit ' + esc(it.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "")) + '<span class="sr-only"> (opens in a new tab)</span></a>' : "") +
              (it.note ? '<span class="note">' + esc(it.note) + "</span>" : "") + "</li>";
          }).join("") + "</ul></section>";
      }).join(""));
  }

  // ---------- Showcase path (about 3 minutes, for the gallery table) ----------
  // Uses one case's content. Answers live in memory only and reset for each visitor.
  var SHOWCASE_CASE = 1;
  // Public address. The QR image (img/qr.svg) encodes this; regenerate it if the address changes.
  var SITE_URL = "https://topographic-oceans.com";
  function qrCard(lead) {
    return '<div class="qr-card"><img class="qr-img" src="img/qr.svg" width="132" height="132" alt="QR code for ' + esc(SITE_URL.replace("https://", "")) + '">' +
      "<p><strong>" + esc(lead) + '</strong><br><span class="qr-url">' + esc(SITE_URL.replace("https://", "")) + "</span></p></div>";
  }
  var show = { step: 1, rating: null, pick: null, revealed: false };

  function renderShowcase() {
    var c = findCase(SHOWCASE_CASE);
    if (!c || !c.ready) return renderNotFound();
    var steps = 4, n = show.step, body = "";
    if (n === 1) {
      body = provenanceChip() + '<p class="stage-kicker">What an observer sees</p>' +
        c.scenario.paragraphs.map(function (p) { return '<p class="scenario-text">' + rich(p) + "</p>"; }).join("") +
        '<p class="claim-label">A reader might conclude:</p><p class="claim-display">“' + claimHTML(c.claim) + "”</p>" +
        '<fieldset data-show="rating"><legend>Does the scenario support that?</legend><div class="scale">' +
        [["yes", "Yes"], ["unsure", "Not sure"], ["no", "No"]].map(function (o) {
          return '<label class="choice"><input type="radio" name="show-rating" value="' + o[0] + '"' + (show.rating === o[0] ? " checked" : "") + "> " + o[1] + "</label>";
        }).join("") + "</div></fieldset>" +
        "<p>" + rich(c.claimStage.normalize) + "</p>";
    } else if (n === 2) {
      var key = keyOption(c);
      body = '<p class="stage-kicker">What is it assuming?</p><h2 style="margin-top:0">' + esc(c.logic.prompt) + "</h2>" +
        '<fieldset data-show="pick"><legend class="sr-only">Pick the hidden premise</legend><div class="choice-stack">' +
        c.logic.options.map(function (o) {
          return '<label class="choice"><input type="radio" name="show-pick" value="' + o.id + '"' + (show.pick === o.id ? " checked" : "") +
            '> <span class="choice-text">' + esc(o.text) + "</span></label>";
        }).join("") + "</div></fieldset>" +
        (show.revealed
          ? '<div class="reveal"><p class="key-idea">The hidden premise: “' + esc(key.text) + "”</p><p>" + rich(c.logic.isTrue) + "</p></div>"
          : '<div class="btn-row"><button class="btn btn-secondary" data-action="sc-reveal">Show the hidden premise</button></div>');
    } else if (n === 3) {
      body = provenanceChip(c.fuller.label) + '<p class="stage-kicker">What the observer couldn’t see</p>' +
        c.fuller.paragraphs.map(function (p) { return '<p class="scenario-text">' + rich(p) + "</p>"; }).join("") +
        '<p class="key-idea">' + rich(c.fuller.agency) + "</p>";
    } else {
      body = '<p class="stage-kicker">Say it more carefully</p>' +
        '<div class="compare"><div class="before"><span class="label">Instead of</span><p>“' + esc(c.claim) + '”</p></div>' +
        '<div class="after"><span class="label">Try</span><p>“' + esc(c.reframe.model) + "”</p></div></div>" +
        renderCTA(c.reframe.actions) +
        qrCard("Try all five cases on your phone.");
    }
    var nav = '<div class="stage-nav">' +
      (n > 1 ? '<button class="btn btn-quiet" data-action="sc-back">Back</button>' : '<span></span>') +
      (n < steps ? '<button class="btn btn-primary" data-action="sc-next">' + ["", "What is it assuming?", "What couldn’t we see?", "Say it more carefully"][n] + "</button>"
        : '<button class="btn btn-primary" data-action="sc-restart">Start over for the next visitor</button>') + "</div>";
    return '<div class="page showcase"><div class="reading">' +
      '<p class="eyebrow">Beyond the Label · ' + n + " of " + steps + "</p>" + h1(n === 1 ? "Three minutes, one claim" : n === 2 ? "Find the hidden step" : n === 3 ? "The fuller picture" : "Think before you label") +
      body + nav + "</div></div>";
  }

  // ---------- Printable handout for the showcase table ----------
  function renderHandout() {
    return '<div class="page handout"><div class="reading">' + h1("Beyond the Label") +
      '<p class="lede">How language and reasoning shape the way we understand trafficking narratives.</p>' +
      "<h2>The issue</h2><p>People often judge trafficked women’s choices from what they can see: she stayed, she went back, she participated, she didn’t leave. What’s visible rarely explains why. Those assumptions shape who gets believed, helped, or blamed.</p>" +
      "<h2>Who it’s for</h2><p>College students and young adults who meet these stories on social media, in the news, and in everyday conversation.</p>" +
      "<h2>Before you label, ask</h2><ol>" + listItems(ASK) + "</ol>" +
      "<h2>Then act</h2><ul><li>Question “she could have left” when you hear it.</li><li>Follow and support survivor-led organizations.</li><li>Support labor protections for domestic workers and record relief for survivors.</li></ul>" +
      qrCard("Try the interactive cases.") +
      '<p class="meta">WGS 200 · NC State University · Fall 2026. Need support? ' + esc(HOTLINE) + '.</p>' +
      '<div class="btn-row no-print"><button class="btn btn-secondary" data-action="print">Print</button></div></div></div>';
  }

  function renderNotFound() {
    return page(h1("Page not found") + '<p>That page doesn’t exist. <a href="#/">Go to the home page</a> or <a href="#/cases">see the cases</a>.</p>');
  }

  // ---------- Router ----------
  var app = document.getElementById("app");
  var live = document.getElementById("live");
  var first = true;

  function route() {
    var hash = location.hash || "#/";
    var parts = hash.replace(/^#\/?/, "").split("/");
    var html, title = "Beyond the Label", focusId = null, current = parts[0] || "home";

    if (hash !== "#/break") { state.lastRoute = hash; save(); }

    if (!parts[0]) { html = renderHome(); }
    else if (parts[0] === "cases") { html = renderCases(); title = "Cases · " + title; }
    else if (parts[0] === "case") {
      var c = findCase(parts[1]), n = parseInt(parts[2], 10) || 1;
      if (!c || !c.ready || n < 1 || n > 7) { html = renderNotFound(); }
      else { html = renderCase(c, n); title = "Case " + c.id + ", " + STAGES[n - 1] + " · " + title; current = "cases"; }
    }
    else if (parts[0] === "how") { html = renderHow(); title = "How it works · " + title; }
    else if (parts[0] === "why") { html = renderWhy(); title = "Why this happens · " + title; }
    else if (parts[0] === "about") { html = renderAbout(); title = "About · " + title; }
    else if (parts[0] === "note") { html = renderNote(); title = "Content note · " + title; }
    else if (parts[0] === "break") { html = renderBreak(); title = "Take a break · " + title; }
    else if (parts[0] === "final") { html = renderFinal(); title = "Think before you label · " + title; }
    else if (parts[0] === "showcase") { html = renderShowcase(); title = "Showcase · " + title; }
    else if (parts[0] === "handout") { html = renderHandout(); title = "Handout · " + title; }
    else if (parts[0] === "sources") { html = renderSources(); title = "Sources · " + title; if (parts[1]) focusId = "src-" + parts[1]; }
    else { html = renderNotFound(); }

    app.innerHTML = html;
    document.title = title;
    document.querySelectorAll(".nav-list a, .menu a").forEach(function (a) {
      var target = a.getAttribute("href").replace("#/", "") || "home";
      if (target === current) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    var menu = document.querySelector(".menu"); if (menu) menu.open = false;

    if (!first || focusId) {
      // getElementById, not querySelector: a hand-typed id can't throw.
      var el = (focusId && document.getElementById(focusId)) || app.querySelector("h1");
      if (el) { el.focus({ preventScroll: true }); el.scrollIntoView({ block: focusId ? "center" : "start" }); }
      if (!focusId) window.scrollTo(0, 0);
    }
    live.textContent = title.split(" · ")[0];
    first = false;
  }

  // ---------- Events ----------
  function currentCase() {
    var p = (location.hash || "").replace(/^#\/?/, "").split("/");
    return p[0] === "case" ? findCase(p[1]) : null;
  }

  app.addEventListener("change", function (e) {
    var t = e.target, c = currentCase();
    if (t.name === "show-rating") { show.rating = t.value; return; }
    if (t.name === "show-pick") { show.pick = t.value; return; }
    var form = t.closest("[data-form]");
    if (!c || !form) return;
    var cs = caseState(c.id), kind = form.getAttribute("data-form");
    if (kind === "pre" || kind === "post") {
      cs[kind] = cs[kind] || {};
      if (/-support$/.test(t.name)) cs[kind].support = t.value;
      if (/-conf$/.test(t.name)) cs[kind].conf = t.value;
      save();
      if (kind === "post" && cs.reframeShown) rerenderKeepingFocus(t);
    } else if (kind === "sort") {
      cs.sort = cs.sort || {}; cs.sort[t.name.replace("sort-", "")] = t.value; save();
      if (cs.sortRevealed || nudges["reveal-sort"]) rerenderKeepingFocus(t);
      else {
        var sc = document.getElementById("sort-count");
        if (sc) sc.textContent = (c.sort.items.length - remainingSort(c, cs)) + " of " + c.sort.items.length + " sorted";
      }
    } else if (kind === "premise") {
      cs.premise = t.value; save();
      if (cs.premiseRevealed || nudges["reveal-premise"]) rerenderKeepingFocus(t);
    } else if (kind === "cards") {
      var picks = Array.prototype.map.call(form.querySelectorAll("input:checked"), function (i) { return i.value; });
      var max = c.evidence.pick;
      if (picks.length > max) { t.checked = false; picks = picks.filter(function (v) { return v !== t.value; }); live.textContent = "You can choose up to " + max + ". Uncheck one to pick another."; }
      cs.cards = picks; save();
      if (nudges["reveal-cards"]) { nudges["reveal-cards"] = false; rerenderKeepingFocus(t); }
      else { var count = document.getElementById("pick-count"); if (count) count.textContent = "(" + picks.length + " chosen)"; }
    } else if (kind === "checks") {
      cs.checks = Array.prototype.map.call(form.querySelectorAll("input:checked"), function (i) { return parseInt(i.value, 10); }); save();
    }
  });

  app.addEventListener("input", function (e) {
    var t = e.target, c = currentCase(), f = t.getAttribute && t.getAttribute("data-field");
    if (!c || !f) return;
    caseState(c.id)[f] = t.value; save();
  });

  function rerenderKeepingFocus(t) {
    var sel = t.id ? "#" + t.id : t.name ? 'input[name="' + t.name + '"][value="' + t.value + '"]' : null;
    var y = window.scrollY;
    first = true; route(); window.scrollTo(0, y);
    var el = sel && app.querySelector(sel); if (el) el.focus({ preventScroll: true });
  }

  app.addEventListener("click", function (e) {
    var b = e.target.closest("[data-action]");
    if (!b) return;
    var action = b.getAttribute("data-action"), c = currentCase();
    if (action === "ack-note") { state.noteAck = true; save(); location.hash = "#/cases"; return; }
    if (action === "print") { window.print(); return; }
    if (action.indexOf("sc-") === 0) {
      if (action === "sc-next") show.step = Math.min(4, show.step + 1);
      if (action === "sc-back") show.step = Math.max(1, show.step - 1);
      if (action === "sc-reveal") show.revealed = true;
      if (action === "sc-restart") {
        show = { step: 1, rating: null, pick: null, revealed: false };
        // Shared laptop: also clear anything a visitor saved in the full cases.
        state = { theme: state.theme }; nudges = {}; save();
      }
      first = false; route();
      return;
    }
    if (action === "finish-case") { var fc = findCase(b.getAttribute("data-case")); if (fc) { caseState(fc.id).done = true; save(); } return; }
    if (!c) return;
    var cs = caseState(c.id), focusAfter = null, message = "";
    var r = REVEALS[action];
    if (r) {
      if (!r.ready(c, cs) && !b.hasAttribute("data-anyway")) {
        nudges[action] = true; focusAfter = ".nudge"; message = r.nudge(c, cs);
      } else {
        cs[r.flag] = true; nudges[action] = false; focusAfter = r.focus; message = "Explanation shown.";
      }
    } else if (action === "reset") {
      var target = REVEALS[b.getAttribute("data-target")];
      if (!target) return;
      cs[target.flag] = false; target.reset(cs);
      nudges[b.getAttribute("data-target")] = false;
      focusAfter = ".stage h1"; message = "This step has been cleared.";
    } else {
      return;
    }
    save();
    var y = window.scrollY; first = true; route(); window.scrollTo(0, y);
    var el = focusAfter && app.querySelector(focusAfter);
    if (el) { if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1"); el.focus({ preventScroll: false }); }
    live.textContent = message;
  });

  // Footer: theme and clear progress
  function applyTheme(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
    document.querySelectorAll(".theme-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-theme") === (t || "auto")));
    });
  }
  document.addEventListener("click", function (e) {
    var tb = e.target.closest(".theme-switch button");
    if (tb) { state.theme = tb.getAttribute("data-theme"); save(); applyTheme(state.theme); }
    if (e.target.closest("[data-action='clear']")) {
      var theme = state.theme;
      state = { theme: theme }; save();
      live.textContent = "Your progress has been cleared.";
      first = true; route();
    }
  });

  applyTheme(state.theme);
  document.getElementById("footer-hotline").textContent = HOTLINE;
  // Same-page anchors (the skip link, "because") share the hash with the router.
  // Handle them without changing the route.
  function jumpTo(id) {
    var el = document.getElementById(id);
    if (!el) return false;
    if (el.tagName === "DETAILS") el.open = true;
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: "start" });
    return true;
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute("href");
    if (href.indexOf("#/") === 0 || href === "#") return;
    e.preventDefault();
    jumpTo(href.slice(1));
  });
  window.addEventListener("hashchange", function () {
    var h = location.hash;
    if (h && h.indexOf("#/") !== 0) {
      // A bare #anchor arrived some other way (typed, or an old link): jump, then restore the route.
      var back = state.lastRoute || "#/";
      history.replaceState(null, "", back);
      route();
      jumpTo(h.slice(1));
      return;
    }
    route();
  });
  route();
})();
