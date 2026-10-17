/* Case 2: Returning. See cases/case1.js for the full content schema. */
window.BTL_CASES = window.BTL_CASES || [];
window.BTL_CASES.push({
    id: 2,
    ready: true,
    title: "Returning",
    claim: "She returned, so she chose to return.",
    focus: "Behavior → assumed unconstrained choice",
    minutes: 7,
    person: "B.",

    scenario: {
      paragraphs: [
        "B. is 20. After a fight, she left the apartment she shared with her boyfriend and stayed with a friend for a week.",
        "Then she went back to him. Friends noticed that she seemed calm when she returned."
      ],
      note: "That is everything an outside observer can see. Hold on to it. We’ll come back to what it leaves out."
    },

    claimStage: {
      intro: "Here is a conclusion someone might draw from that scenario. It’s an example of an interpretation, not a fact.",
      normalize: "This one is partly right, which is why it feels so natural. We’ll look closely at which part."
    },

    sort: {
      intro: "For each statement, decide whether the scenario actually says it, whether a reader would be assuming it, or whether we simply aren’t told.",
      items: [
        { id: "s1", text: "B. stayed with a friend for a week.", answer: "stated",
          reason: "The scenario says this directly." },
        { id: "s2", text: "B. went back to her boyfriend.", answer: "stated",
          reason: "Stated. The scenario doesn’t say anyone physically took her back, so it is fair to say she acted on her own decision." },
        { id: "s3", text: "B. had other good places to live.", answer: "assumed",
          reason: "A common inference from “she had a friend,” but a friend’s place for a week isn’t the same as a lasting option." },
        { id: "s4", text: "B. went back because she wanted the relationship as it was.", answer: "assumed",
          reason: "Possible, but the scenario never gives a reason. People return for many different reasons, often for more than one at once." },
        { id: "s5", text: "B. controls her own money and has her own documents.", answer: "unknown",
          reason: "The scenario doesn’t say. Money and documents shape what leaving can realistically involve." },
        { id: "s6", text: "What B.’s boyfriend said to her while she was away.", answer: "unknown",
          reason: "The scenario doesn’t say. An observer sees the return, not the pressure or promises that may have come before it." }
      ],
      takeaway: "Two of these are stated. The rest are assumed or unknown. What a person does is visible. The options she was weighing usually aren’t."
    },

    logic: {
      deepDive: false,
      stated: "She returned.",
      conclusion: "So she chose to return.",
      prompt: "Something has to connect the stated fact to the conclusion, once “chose” is read to mean “chose freely.” Which sentence is the argument quietly relying on?",
      options: [
        { id: "a", text: "If someone chose to do something, nothing was limiting her options.", key: true,
          why: "This is the hidden step. It treats “she chose” as if it meant “she chose freely, among good options.” Without it, the conclusion says much less than it seems to." },
        { id: "b", text: "She went back after a week.", key: false,
          why: "This repeats the stated fact with more detail. It doesn’t connect returning to choosing freely." },
        { id: "c", text: "People sometimes make choices they later regret.", key: false,
          why: "True, but it doesn’t link returning to free choice. Regret and constraint are different things." },
        { id: "d", text: "People who are controlled can never choose anything.", key: false,
          why: "This is a different claim, and not a true one. People under pressure make real choices all the time. That is the point of this case." }
      ],
      follows: "With the hidden premise added, the argument is valid. That means: if both premises were true, the conclusion would have to be true.",
      isTrue: "But is the hidden premise true? “If she chose it, nothing was limiting her options” is a claim about every choice anyone makes. One counterexample is enough to show it’s false: a person who chooses between two bad options still chooses, but the options were limited. So the argument is valid but not sound.",
      keyIdea: "The simple version of this claim is plausibly true: she made a decision. The problem comes from the word “chose” changing size partway through. Yes, she made a choice. The question is what she was choosing between.",
      symbols: {
        key: [ ["R", "She returned."], ["C", "She made a decision to return."], ["F", "Her decision was free of serious constraint."] ],
        steps: [
          { label: "The plain claim", lines: [
              { f: "<var>R</var> <span class=op>→</span> <var>C</var>", r: "If she returned, she decided to." },
              { f: "<var>R</var>", r: "She returned." },
              { f: "<span class=op>∴</span> <var>C</var>", r: "Therefore, she decided to." } ],
            note: "Valid, and plausibly true. This is not where the problem is." },
          { label: "The hidden step", lines: [
              { f: "<var>C</var> <span class=op>→</span> <var>F</var>", r: "If she decided, the decision was free of serious constraint." } ],
            note: "This is the premise that doesn’t hold. Decisions made among only bad options are still decisions. The word “chose” quietly grew from C to F." }
        ]
      },
      equivocation: {
        title: "Two meanings of “chose”",
        text: "“She chose to return” can mean two different things. In the thin sense, it means she made the decision herself. In the thicker sense, it means she was free to pick among real, acceptable options. The thin claim is plausibly true here. It doesn’t show the thick one. Recall Aristotle’s sailors: they choose to throw the cargo overboard, but the storm set the options. [[aristotle]]"
      },
      beyond: {
        sentence: "She returned because she freely chose to.",
        trigger: "because",
        text: "“Because” claims a reason or a cause. Knowing that she returned and that she decided to still wouldn’t tell us what pushed or pulled her toward that decision. Truth-functional logic alone can’t settle it. In plain terms: knowing what happened isn’t the same as knowing why."
      },
      inverse: [
        { title: "Not following doesn’t make it false", text: "Showing that “she chose freely” isn’t supported is not the same as showing it’s false. Some people who return to a relationship have good, uncomplicated reasons. The scenario alone can’t tell us which applies to B." },
        { title: "The opposite overreach", text: "It would be just as unsupported to conclude, from this scenario alone, that B. was coerced. Careful reasoning applies in both directions." }
      ]
    },

    evidence: {
      relevantLabel: "Bears on what she was choosing between",
      intro: "So what would we need to know before saying anything about why B. went back? Pick the three questions you think matter most.",
      pick: 3,
      cards: [
        { id: "e1", text: "Does B. have her own ID, her own bank account, and access to the money she earns?", relevant: true,
          why: "Control over a partner’s money and papers is a recognized feature of coercive control, and it limits what leaving can mean in practice. [[stark]]" },
        { id: "e2", text: "Where could B. live after the week was over, and for how long?", relevant: true,
          why: "A temporary couch is not a lasting alternative. Housing is one of the most practical limits on leaving." },
        { id: "e3", text: "What did he say to her during the week she was gone?", relevant: true,
          why: "Alternating apologies and promises with warnings is a documented pattern in controlling relationships. It can make returning feel like the only way to calm things down. [[stark]] [[lloyd]]" },
        { id: "e4", text: "Does he have a hold over her with her family, such as threats to tell them things?", relevant: true,
          why: "Cutting someone off from family, then using that against her, is another way control works without any physical restraint. [[stark]]" },
        { id: "e5", text: "What reasons does B. herself give for going back?", relevant: true,
          why: "Her own account matters. She may name more than one reason, including real feelings for him. Both can be true at once." },
        { id: "e6", text: "What was the fight about?", relevant: false,
          why: "It may matter to the story, but it doesn’t tell us about the options she had when deciding to return." },
        { id: "e7", text: "Is the apartment nice?", relevant: false,
          why: "Controlling relationships happen in every kind of home. This doesn’t help us tell explanations apart." }
      ],
      compareNote: "Five of these questions bear directly on what B. was choosing between. Picking any three of them is a good choice. Your picks don’t need to match anyone else’s.",
      rivals: {
        title: "What else would produce the same behavior?",
        text: "Going back after a week could be explained by:",
        list: [
          "genuine affection and a wish to repair the relationship",
          "wanting to retrieve her belongings or documents",
          "having nowhere lasting to stay",
          "fear of what he might say or do",
          "financial dependence",
          "cycles of affection and threat that make leaving harder"
        ],
        after: "Affection is on the list on purpose. The point isn’t to rule it out. It’s that returning, by itself, can’t tell these explanations apart, and several can be true together."
      },
      legal: "U.S. law treats sex trafficking of an adult as requiring force, fraud, or coercion. [[tvpa]] That is a high threshold for prosecution, and sex work by itself doesn’t meet it. The law doesn’t capture everything a person lives through in a controlling relationship."
    },

    fuller: {
      label: "Still constructed. Each detail reflects a pattern documented in research and survivor-led writing on controlling relationships and the “romeo” or “loverboy” dynamic. This is one possible fuller picture: a different one, in which B. returns with few constraints, would fit the same observations.",
      paragraphs: [
        "The relationship began as romance. Over time her boyfriend took over the money from her sex work, and she lost easy access to it. He discouraged her from seeing her family. During the week she was away, he alternated apologies and promises with warnings about what he might tell her family. [[lloyd]] [[stark]]",
        "The friend’s couch was temporary. B. had no ID and no bank account in her own name.",
        "B. is not passive. She has told a counselor she went back partly to get her documents, and partly because she still loves him. Both are real reasons. Loving him is not the same as wanting the situation she’s in."
      ],
      mechanisms: [
        { name: "Cycles of affection and threat", system: "Intimate partner dynamics", text: "Warmth and warnings arriving unpredictably can make leaving harder. This is sometimes called “trauma bonding,” a popular term whose definition is debated. What is documented is the pattern itself. [[stark]]" },
        { name: "Financial control", system: "Economic dependence, gender inequality", text: "When one person controls the money, leaving can mean losing everything at once. [[stark]]" },
        { name: "Isolation from family", system: "Coercive control", text: "Cutting someone off from people who might help is a common part of controlling relationships. [[stark]]" },
        { name: "No stable housing", system: "Housing and income inequality", text: "Without a lasting place to go, every exit is temporary. This is a structural limit, not a personal weakness." },
        { name: "Overlapping vulnerabilities", system: "Intersecting systems: gender, age, class", text: "B. is a young woman with little money, working in a stigmatized trade. Looking at any one of these alone misses how they compound. [[crenshaw]]" }
      ],
      agency: "Going back to get her documents is a decision, and so is telling a counselor about it. B. is making deliberate choices inside tight limits. Recognizing constraint doesn’t mean treating her as helpless. Chandra Talpade Mohanty cautions against writing about women as one generic, powerless group. B. is constrained, not powerless. [[mohanty]]",
      idealVictim: "B. went back, loves him, and works in the sex trade. That doesn’t match the popular image of a victim. Nils Christie called this the “ideal victim” problem: we see harm most easily in people who fit a familiar story. [[christie]] Sex work and trafficking are not the same thing, and this case doesn’t treat them as the same.",
      cards: [
        { title: "Both can be true", text: "B. can love him and be constrained by him. Neither fact cancels the other." }
      ],
      lenses: [
        { name: "Choice under pressure", src: "Aristotle; Serena Olsaretti", src_ids: ["aristotle", "olsaretti"],
          text: "A choice can be real and still not be free in the way that matters, if the alternatives are unacceptable.",
          q: "What were B.’s real alternatives to going back?" },
        { name: "Relational autonomy", src: "Catriona Mackenzie & Natalie Stoljar (eds.)", src_ids: ["mackenzie"],
          text: "Our ability to direct our own lives depends on relationships and social conditions, not only on individual will.",
          q: "Which relationships and conditions shape what B. can do?" }
      ],
      lensNote: "These are two perspectives, not one correct theory. They disagree with each other in places.",
      returnPrompt: "Look back at the claim: “She returned, so she chose to return.” What did it leave out?",
      survivors: "To hear from survivors in their own words, start with survivor-led work. [[nsn]] [[lloyd]]"
    },

    reframe: {
      short: "Yes, she made a choice. The question is what she was choosing between.",
      prompt: "Rewrite “She returned, so she chose to return” in a way that keeps what we know and doesn’t claim more than we know.",
      model: "B. went back, and that was her own decision. That alone doesn’t tell us what options she had when she made it. To understand it, we’d need to know about her money and documents, where else she could live, and what pressures she was under.",
      why: [
        "It keeps the observation (she returned) and grants that she decided.",
        "It doesn’t claim her decision was free or unfree.",
        "It names what we would need to know.",
        "It doesn’t swap in the opposite certainty."
      ],
      selfcheck: [
        "My version keeps what was actually stated.",
        "My version doesn’t say more than we know about her options.",
        "My version points to what we’d need to know."
      ],
      actions: [
        { lead: "Ask the second question.", text: "When you hear “she chose it,” ask what she was choosing between." },
        { lead: "Leave the door open.", text: "If someone you know goes back, keep being someone they can reach without judgment. If you’re worried, the National Human Trafficking Hotline can offer advice. [[hotline]]" },
        { lead: "Follow survivor-led work.", text: "Support and share organizations led by survivors, not only stories told about them." },
        { lead: "Push for structural change.", text: "Support funding for longer-term housing and exit services, and criminal-record relief (vacatur) for survivors, so that leaving has somewhere to lead." }
      ]
    }
  });
