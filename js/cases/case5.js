/* Case 5: Repeated return. See cases/case1.js for the full content schema. */
window.BTL_CASES = window.BTL_CASES || [];
window.BTL_CASES.push({
    id: 5,
    ready: true,
    title: "Repeated return",
    claim: "She went back more than once, so she must have wanted the situation.",
    focus: "Repeated behavior → assumed desire",
    minutes: 6,
    person: "E.",

    scenario: {
      paragraphs: [
        "E. has left a trafficking situation three times over four years. Once, she left with help from a program. Each time, she ended up back in the same situation.",
        "People who know only this much about her see a pattern: she leaves, and then she returns."
      ],
      note: "That is everything an outside observer can see. Notice that it is a pattern of movements, and says nothing about what stood in her way each time."
    },

    claimStage: {
      intro: "Here is a conclusion someone might draw from that pattern. It’s an example of an interpretation, not a fact.",
      normalize: "Repetition feels like strong evidence, and that is why this reading is so common. It is worth asking what repetition can and can’t show."
    },

    sort: {
      intro: "For each statement, decide whether the scenario actually says it, whether a reader would be assuming it, or whether we simply aren’t told.",
      items: [
        { id: "s1", text: "E. left the situation three times over four years.", answer: "stated",
          reason: "The scenario says this directly. Leaving three times is also worth noticing: each one was an attempt." },
        { id: "s2", text: "Each time she left, she returned to the same situation.", answer: "stated",
          reason: "Stated. What it means is a separate question." },
        { id: "s3", text: "E. went back because she preferred that life.", answer: "assumed",
          reason: "The scenario never gives a reason. This is the bridge from “she returned” to “she wanted it.”" },
        { id: "s4", text: "Once she left, E. had somewhere safe to stay that she could keep.", answer: "unknown",
          reason: "We aren’t told. Whether a person can stay away depends heavily on housing, money, and records." },
        { id: "s5", text: "Whatever was wrong with the situation stopped when she left.", answer: "assumed",
          reason: "Readers often picture leaving as a clean break. The scenario doesn’t say what happened after each exit." }
      ],
      takeaway: "Two things are stated: she left, and she returned. The conclusion needs a reason for the returns, and the scenario doesn’t give one. Repetition is visible. The causes are not."
    },

    logic: {
      deepDive: false,
      stated: "She went back more than once.",
      conclusion: "So she must have wanted the situation.",
      prompt: "Something has to connect the stated fact to the conclusion. Which sentence is the argument quietly relying on?",
      options: [
        { id: "a", text: "If someone keeps going back, she must want the situation she goes back to.", key: true,
          why: "This is the hidden premise. It adds a jump from going back to wanting the whole situation. Without it, “she went back” leads nowhere." },
        { id: "b", text: "She went back three times.", key: false,
          why: "This repeats the stated fact. It doesn’t connect going back to wanting." },
        { id: "c", text: "People sometimes return to situations they would rather leave.", key: false,
          why: "True, but it points the other way. It supports doubt about the conclusion rather than connecting to it." }
      ],
      follows: "With the hidden premise added, the argument is valid. That means: if both premises were true, the conclusion would have to be true.",
      isTrue: "But is the hidden premise true? “If someone keeps going back, she must want the situation” is a claim about everyone. One counterexample is enough: a person who keeps returning because every route out ends at a door closed to her. So the argument is valid but not sound.",
      keyIdea: "Case 1 asked whether staying showed wanting. This case adds three new things: the claim has grown from one choice to a whole situation, repetition feels like extra proof, and the word “must” claims certainty. Each is worth a look below.",
      equivocation: {
        title: "A scope shift: from returning to wanting the situation",
        text: "“She went back” is about where she slept that night. “She wanted the situation” is about everything that comes with it. A person can choose a place to stay without wanting what she has to live with there. The sailors in Aristotle’s example choose to throw cargo overboard, but they do not want the storm. [[aristotle]] The claim quietly widens its scope while the evidence stays as narrow as before."
      },
      extra: [
        {
          title: "Repetition shows a stable cause, not which cause",
          text: "If something happens again and again, a steady cause is probably at work. That much is reasonable. But a steady cause could be a preference, or it could be a wall that is still standing. Three returns look the same either way. The pattern points to something persistent. It doesn’t tell us whether that something is desire or a barrier."
        },
        {
          title: "The word “must”",
          text: "“She must have wanted it” claims necessity: no other explanation is possible. That is a very strong claim, and the scenario can’t carry it. Even if wanting were one possible explanation, “must” rules out every rival at once. A careful version would say “perhaps,” or “we would need to know.”"
        }
      ],
      beyond: {
        sentence: "She must have wanted it.",
        trigger: "must",
        text: "“Must” claims that something is necessarily so. Knowing what happened doesn’t establish that nothing else could have produced it. Claims about necessity need evidence about the world, not only a look at the facts. In plain terms: seeing what happened is different from showing it had to happen that way."
      },
      inverse: [
        { title: "Not following doesn’t make it false", text: "Showing that a conclusion doesn’t follow is not the same as showing it’s false. E. might have wanted some things about her situation. The point is that the pattern alone can’t tell us." },
        { title: "The opposite overreach", text: "It would be just as unsupported to conclude, from this scenario alone, that E. had no wishes of her own, or that every return was forced. Careful reasoning applies in both directions." }
      ]
    },

    evidence: {
      relevantLabel: "Bears on why she returned",
      intro: "What would we need to know before drawing any conclusion about why E. returned? Pick the three questions you think matter most.",
      pick: 3,
      cards: [
        { id: "e1", text: "Where could she sleep the night she left, and for how long?", relevant: true,
          why: "Leaving requires somewhere to go that lasts. A short-term bed can end before a person has other options in place." },
        { id: "e2", text: "Could she rent a place or get a job with her record?", relevant: true,
          why: "Convictions connected to being exploited can show up in housing and job applications, closing doors long after the exploitation ended. Davis and Shaylor describe how punishment of poor women through prostitution laws can become a cycle. [[davis]]" },
        { id: "e3", text: "Did anyone offer her housing at the moment she had none, and who was it?", relevant: true,
          why: "An offer from the person who exploits her can look like generosity on eviction day. It may be the only offer on the table." },
        { id: "e4", text: "Did she have access to ongoing, non-judgmental help for health needs that began during the exploitation?", relevant: true,
          why: "Health needs that develop during exploitation can make every other step harder when they go untreated." },
        { id: "e5", text: "What did the situation look like from the outside?", relevant: false,
          why: "Appearances are where the claim began. They don’t separate one explanation from another." },
        { id: "e6", text: "How many times did she go back?", relevant: false,
          why: "The count is already known. It tells us the pattern is stable, but not why." }
      ],
      compareNote: "Four of these questions bear directly on why someone might return. Picking any three of them is a good choice. Your picks don’t need to match anyone else’s.",
      rivals: {
        title: "What else would produce the same pattern?",
        text: "Going back repeatedly could be explained by:",
        list: [
          "a preference for the situation",
          "no housing she could keep",
          "a record that closed off apartments and jobs",
          "health needs that went untreated",
          "an exploiter who offered what no one else did"
        ],
        after: "Preference is on the list on purpose. The point isn’t to rule it out. It’s that repeated returns can’t tell these explanations apart."
      },
      legal: "U.S. trafficking law treats people compelled into commercial sex through force, fraud, or coercion as victims. [[tvpa]] Many states also let survivors ask a court to clear convictions connected to their trafficking, and how that works depends on where a person lives."
    },

    fuller: {
      label: "Still constructed. Each detail reflects a pattern documented in research and survivor-led work on trafficking and criminalization. This is one possible fuller picture: a different one would fit the same observations.",
      paragraphs: [
        "Each time E. left, she ran into the same walls. Convictions connected to prostitution were on her record, and landlords and employers turned her applications down. The program’s shelter bed had a 30-day limit, which was not long enough to find work or housing she could keep. A substance dependence that began during the exploitation went untreated. On the day she was evicted, the person exploiting her offered her a place to stay. She had no other offer.",
        "Each return was a decision about where to sleep that night, and each exit was an attempt. E. is now applying for record relief. Many states let survivors clear convictions connected to their trafficking. She is working to open a door that stayed shut."
      ],
      mechanisms: [
        { name: "Criminalization and records", system: "Criminal legal system", text: "Laws against prostitution lead to the arrest and conviction of many poor women, and the fines and records that follow can push them back to where they started. [[davis]]" },
        { name: "Short-term exit resources", system: "Social services and housing", text: "Time-limited shelter beds can end before longer-term housing and work are in place. Support that stops at 30 days treats exit as an event instead of a process." },
        { name: "Untreated health needs", system: "Health care access", text: "A dependence that began during exploitation is a health need, not a character flaw. Without care, it makes each step harder." },
        { name: "An exploiter’s offer of housing", system: "Economic power inside exploitation", text: "When housing runs out, the person who exploits her can be the only one who offers it. The offer is both a choice and a pressure. [[lloyd]]" },
        { name: "Overlapping vulnerabilities", system: "Intersecting systems: gender, class, criminal records", text: "A record, a lack of housing, and a health need do not add up separately. Together they close more doors than any one alone. [[crenshaw]]" }
      ],
      agency: "Leaving three times is persistence, and returning to a bed is a decision. E. is making deliberate choices inside tight limits, and applying for record relief is a plan to change those limits. Recognizing constraint doesn’t mean treating her as helpless.",
      idealVictim: "E. doesn’t match the popular image of someone who is “rescued” and stays rescued. Sociologist Nils Christie called this the “ideal victim” problem: we recognize harm most easily in people who fit a familiar story, and we judge those who don’t. [[christie]]",
      lenses: [
        { name: "Choice under pressure", src: "Aristotle; Serena Olsaretti", src_ids: ["aristotle", "olsaretti"],
          text: "A choice can be real and still not be free in the way that matters, if the alternatives are unacceptable.",
          q: "What were E.’s real alternatives on the night she returned?" }
      ],
      lensNote: "This is one perspective, not the only correct theory. Others would add different questions.",
      returnPrompt: "Look back at the claim: “She went back more than once, so she must have wanted the situation.” What did it leave out?",
      survivors: "To hear from survivors in their own words, start with survivor-led work. [[nsn]] [[lloyd]]"
    },

    reframe: {
      short: "Judge the conditions, not just the person.",
      prompt: "Rewrite “She went back more than once, so she must have wanted the situation” in a way that keeps what we know and doesn’t claim more than we know.",
      model: "That E. returned more than once doesn’t, by itself, tell us why. A repeated pattern points to something persistent, and to understand it we’d need to know where she could stay, what her record allowed, and what help was available when she left.",
      why: [
        "It keeps the observation (she returned more than once).",
        "It doesn’t claim a reason the scenario never gives.",
        "It names what we would need to know.",
        "It doesn’t swap in the opposite certainty."
      ],
      selfcheck: [
        "My version keeps what was actually stated.",
        "My version doesn’t say she “must” have wanted it, or must not have.",
        "My version points to the conditions around her exits."
      ],
      actions: [
        { lead: "Ask about the conditions.", text: "When you hear “she keeps going back,” ask what is waiting for her on the other side of leaving. Judge the conditions, not just the person." },
        { lead: "Support record relief.", text: "Back vacatur and similar efforts, which in many states let survivors clear convictions connected to their trafficking. A record shouldn’t keep a person from housing and work." },
        { lead: "Fund the way out, not only the exit.", text: "Support longer-term housing, treatment without judgment, and services that last past the first 30 days. If you’re worried about someone, contact the National Human Trafficking Hotline for advice rather than confronting anyone yourself. [[hotline]]" },
        { lead: "Follow survivor-led work.", text: "Support and share organizations led by survivors, not only stories told about them." }
      ]
    }
  });
