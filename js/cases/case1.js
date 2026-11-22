/*
 * Case content. Every scenario is CONSTRUCTED for learning: no real person, no quotations.
 * Each element of a "fuller picture" must trace to a documented pattern (see sources.js).
 * One file per case; each pushes onto window.BTL_CASES. ready: false shows as "In development".
 * Inline citations use [[source-id]] and render as links to the Sources page.
 */
window.BTL_CASES = window.BTL_CASES || [];
window.BTL_CASES.push({
    id: 1,
    ready: true,
    title: "Remaining",
    claim: "She stayed, so she wanted to stay.",
    focus: "Behavior → assumed desire",
    minutes: 13,
    person: "A.",

    scenario: {
      paragraphs: [
        "A. is a live-in housekeeper and nanny for a family. She has lived and worked in their home for three years.",
        "Neighbors see her walk the children to school every morning, on her own. She has a phone. She has never asked the neighbors for help."
      ],
      note: "That is everything an outside observer can see. Hold on to it. We’ll come back to what it leaves out."
    },

    claimStage: {
      intro: "Here is a conclusion someone might draw from that scenario. It’s an example of an interpretation, not a fact.",
      normalize: "Many readers find this reasonable at first. That’s exactly why it’s worth slowing down on."
    },

    sort: {
      intro: "For each statement, decide whether the scenario actually says it. Something it doesn’t say might still be true. You just can’t get it from the scenario.",
      items: [
        { id: "s1", text: "A. has lived in the family’s home for three years.", answer: "stated",
          reason: "The scenario says this directly." },
        { id: "s2", text: "A. walks the children to school on her own.", answer: "stated",
          reason: "Stated. Notice that being alone outside is not the same as being free to go." },
        { id: "s3", text: "A. could leave any time she wanted.", answer: "notstated", tag: "leans",
          reason: "A common inference from “she’s out alone,” but the scenario never says it. Assuming it makes her staying look like proof of what she wants." },
        { id: "s4", text: "A. has never asked the neighbors for help.", answer: "stated",
          reason: "Stated. What it means is a separate question." },
        { id: "s5", text: "If A. needed help, she would have asked for it.", answer: "notstated", tag: "leans",
          reason: "This is the bridge many readers cross without noticing: it turns her silence into a sign that nothing is wrong. People don’t ask for help for many reasons, including fear of what happens if they do." },
        { id: "s6", text: "A. likes her job.", answer: "notstated",
          reason: "She might. But the scenario says nothing about how she feels, and this is close to the claim itself in other words." },
        { id: "s7", text: "A. keeps her own passport and identity documents.", answer: "notstated", tag: "ask",
          reason: "The scenario doesn’t say. In labor trafficking, this detail often matters a great deal." },
        { id: "s8", text: "A. is paid what she was promised and owes no debt.", answer: "notstated", tag: "ask",
          reason: "The scenario doesn’t say. Pay and debt shape whether leaving is a real option." }
      ],
      takeaway: "Three of these are stated. The conclusion “she wanted to stay” rests on things the scenario doesn’t say. What a person does is visible. Why they do it usually isn’t."
    },

    logic: {
      deepDive: true,
      warmup: {
        claim: "The ground is wet, so it rained.",
        text: "Before we look at A., try a neutral example. Does “it rained” have to be true if the ground is wet? No. A sprinkler, a burst pipe, or morning dew would all leave the ground wet. The wet ground is real. The conclusion is one possible explanation among several."
      },
      stated: "She stayed.",
      conclusion: "So she wanted to stay.",
      prompt: "Something has to connect the stated fact to the conclusion. Which sentence is the argument quietly relying on?",
      options: [
        { id: "b", text: "She stayed for three years.", key: false,
          why: "This repeats the stated fact with more detail. It doesn’t connect staying to wanting." },
        { id: "c", text: "Staying is sometimes a choice.", key: false,
          why: "True, but too weak. “Sometimes” leaves room for the times it isn’t, so the conclusion still doesn’t follow." },
        { id: "a", text: "Anyone who stays somewhere wants to be there.", key: true,
          why: "This is the hidden premise. With it, the conclusion follows. Without it, “she stayed” doesn’t lead anywhere." },
        { id: "d", text: "People who are controlled are never allowed outside.", key: false,
          why: "This is a different claim, and a false one. But it does point at a real assumption readers bring: that control looks like being locked in." }
      ],
      follows: "With the hidden premise added, the argument is valid. That means: if both premises were true, the conclusion would have to be true.",
      isTrue: "But is the hidden premise true? “Anyone who stays somewhere wants to be there” is a claim about everyone. One clear counterexample is enough to show it’s false: a person who stays, and doesn’t want to be there, because her employer holds her passport or because she owes a debt she can’t repay. Even “most people who stay want to” would need evidence, and it would still leave A.’s own reasons open. So the argument is valid but not sound.",
      keyIdea: "Making an argument valid is easy: just add “if this, then that.” The hard question is whether that added premise is true, and that’s a question about evidence, not logic. Notice, too, that “wanted” can shift meaning. More on that below.",
      symbols: {
        key: [ ["S", "She stayed."], ["W", "She wanted to stay."] ],
        steps: [
          { label: "As people usually say it", lines: [ { f: "<var>S</var> <span class=op>∴</span> <var>W</var>", r: "S, therefore W." } ],
            note: "Not valid: S can be true while W is false." },
          { label: "With the hidden premise", lines: [
              { f: "<var>S</var> <span class=op>→</span> <var>W</var>", r: "If S, then W." },
              { f: "<var>S</var>", r: "S." },
              { f: "<span class=op>∴</span> <var>W</var>", r: "Therefore, W." } ],
            note: "Valid. This form is called modus ponens. Here S → W stands in for the general rule “anyone who stays wants to be there.” The structure is fine; that rule is the problem." }
        ]
      },
      equivocation: {
        title: "Two meanings of “wanted”",
        text: "“She wanted to stay” can mean two different things. It can mean she preferred staying over the options she actually had. Or it can mean she wanted the situation she was in. The first might even be true, and still not show the second. Aristotle described sailors who throw their cargo overboard in a storm. They choose to do it, but they don’t want the storm. [[aristotle]]"
      },
      beyond: {
        sentence: "She stayed because she wanted to.",
        trigger: "because",
        text: "“Because” claims a reason or a cause. Knowing that “she stayed” is true and “she wanted to” is true still wouldn’t tell us that one explains the other. This statement involves a relationship that requires additional information or evidence. Formal truth-functional logic alone cannot determine the entire claim. In plain terms: knowing what’s true isn’t the same as knowing why."
      },
      inverse: [
        { title: "Not following doesn’t make it false", text: "Showing that a conclusion doesn’t follow is not the same as showing it’s false. A. might be content. The point is that staying alone can’t tell us." },
        { title: "The opposite overreach", text: "It would be just as unsupported to conclude, from this scenario alone, that A. is being coerced. Careful reasoning applies in both directions." }
      ]
    },

    evidence: {
      relevantLabel: "Bears on why she stays",
      intro: "So what would we need to know before drawing any conclusion about why A. stays? Pick the three questions you think matter most.",
      pick: 3,
      cards: [
        { id: "e1", text: "Who holds her passport and identity documents?", relevant: true,
          why: "Employers holding workers’ documents is a recognized sign of forced labor. Without them, leaving can mean losing the papers she needs to travel, work, or get help. [[ilo]]" },
        { id: "e2", text: "Is she paid what she was promised? Does she owe a debt to the people she works for?", relevant: true,
          why: "Debt that can’t be paid off is a way of keeping someone working. When a debt is used this way, U.S. law can treat it as debt bondage. [[tvpa]]" },
        { id: "e3", text: "What does she believe would happen if she went to the police?", relevant: true,
          why: "Being told you’ll be arrested or deported keeps many people from seeking help, whether or not it’s true. [[brennan]]" },
        { id: "e4", text: "Does she have money, a place to go, and people she could call?", relevant: true,
          why: "Leaving requires somewhere to go. Isolation and lack of resources shape what options are real." },
        { id: "e5", text: "Is someone back home depending on her wages?", relevant: true,
          why: "Obligations to family can make leaving feel impossible even when the door is open." },
        { id: "e6", text: "Does she get along with the children?", relevant: false,
          why: "She might love the children, and that could be part of why she stays. But she could love them and still not be free to leave, so it can’t tell the explanations apart." },
        { id: "e7", text: "Is the house in a nice neighborhood?", relevant: false,
          why: "Coercion happens in every kind of neighborhood. This doesn’t help us tell explanations apart." },
        { id: "e8", text: "Did she work as a nanny before this job?", relevant: false,
          why: "Experience in the work tells us little about the conditions of this job." }
      ],
      compareNote: "Five of these questions bear directly on why someone might stay. Picking any three of them is a good choice. Your picks don’t need to match anyone else’s.",
      rivals: {
        title: "What else would produce the same behavior?",
        text: "Staying for three years could be explained by:",
        list: [
          "contentment with the job",
          "an employer holding her documents",
          "a debt she can’t pay off",
          "fear of arrest or deportation",
          "a family depending on her wages",
          "having nowhere else to go"
        ],
        after: "Contentment is on the list on purpose. The point isn’t to rule it out. It’s that staying, by itself, can’t tell these explanations apart."
      },
      legal: "U.S. law treats obtaining someone’s labor through force, fraud, or coercion, for purposes such as involuntary servitude or debt bondage, as trafficking. [[tvpa]] The law sets a threshold for prosecution. It doesn’t capture everything a person lives through."
    },

    fuller: {
      label: "Still constructed. Each detail reflects a pattern documented in research on labor trafficking. This is one possible fuller picture: a different one, in which A. is content, would fit the same observations.",
      paragraphs: [
        "The family holds A.’s passport “for safekeeping.” Her wages go toward paying off a recruitment debt that never seems to shrink. She has been told that if she contacts the police, she will be arrested and deported. She doesn’t know that U.S. law may offer protections, including a special visa (the T visa), to people in her situation. [[tvpa]] Her family back home depends on the money she sends.",
        "A. is not passive. At church, she met another worker and quietly saved her number. She has a plan: wait until the debt “is paid,” then call."
      ],
      mechanisms: [
        { name: "Document confiscation", system: "Immigration and labor systems", text: "Without a passport, leaving can mean losing the papers she needs to travel, work, or get help. [[ilo]]" },
        { name: "Debt bondage", system: "Economic inequality, recruitment practices", text: "A debt that never shrinks turns work into an obligation she can’t end. [[tvpa]]" },
        { name: "Fear of arrest and deportation", system: "Immigration enforcement", text: "Threats work whether or not they’re accurate. [[brennan]]" },
        { name: "Isolation and family obligation", system: "Global economic inequality, gendered care work", text: "Live-in domestic work happens inside private homes, out of public view, and is done mostly by women. Mainardi argued that housework has long been treated as women’s job and dismissed as not quite “real work.” Applied to paid domestic work, that devaluation carries over. [[mainardi]]" },
        { name: "How systems overlap", system: "Intersecting systems: gender, immigration status, class", text: "A. is a woman, a migrant, and a domestic worker at once. Crenshaw showed that laws and services built around one category at a time miss people who stand where categories meet. [[crenshaw]]" }
      ],
      agency: "Saving that number and waiting is a decision. A. is making deliberate choices inside tight limits. Recognizing constraint doesn’t mean treating her as helpless. Chandra Talpade Mohanty criticizes Western feminist writing that pictures “Third World women” as one generic, powerless victim. A. is constrained, not powerless. [[mohanty]]",
      idealVictim: "A. doesn’t match the popular image of a trafficking victim. She isn’t chained or locked in, and she goes outside. Sociologist Nils Christie called this the “ideal victim” problem: we recognize harm most easily in people who fit a familiar story, and overlook others. [[christie]]",
      lenses: [
        { name: "Choice under pressure", src: "Aristotle; Serena Olsaretti", src_ids: ["aristotle", "olsaretti"],
          text: "A choice can be real and still not be free in the way that matters, if the alternatives are unacceptable.",
          q: "What were A.’s real alternatives to staying?" },
        { name: "Relational autonomy", src: "Catriona Mackenzie & Natalie Stoljar (eds.)", src_ids: ["mackenzie"],
          text: "Our ability to direct our own lives depends on relationships and social conditions, not only on individual will.",
          q: "Which relationships and conditions limit what A. can do?" },
        { name: "Adaptive preferences", src: "Serene J. Khader", src_ids: ["khader"],
          text: "People sometimes come to prefer what their circumstances allow. Respecting a person means taking her preferences seriously while also asking what shaped them.",
          q: "If A. said she was fine, how should we take that?" }
      ],
      lensNote: "These are three perspectives, not one correct theory. They disagree with each other in places.",
      returnPrompt: "Look back at the claim: “She stayed, so she wanted to stay.” What did it leave out?",
      survivors: "To hear from survivors in their own words, start with survivor-led work. [[nsn]] [[lloyd]]"
    },

    reframe: {
      short: "Her staying, by itself, doesn’t tell us why she stayed.",
      prompt: "Rewrite “She stayed, so she wanted to stay” in a way that keeps what we know and doesn’t claim more than we know.",
      model: "That A. has stayed for three years doesn’t, by itself, tell us why she stayed. To understand her decision, we’d need to know who holds her documents, whether she owes a debt, what she’s been told about the police, and what options she actually has.",
      why: [
        "It keeps the observation (she stayed).",
        "It doesn’t claim a reason the scenario never gives.",
        "It names what we would need to know.",
        "It doesn’t swap in the opposite certainty."
      ],
      selfcheck: [
        "My version keeps what was actually stated.",
        "My version doesn’t claim a reason we weren’t given.",
        "My version points to what we’d need to know."
      ],
      actions: [
        { lead: "Say it out loud.", text: "When you hear “she could have left,” ask what her options were." },
        { lead: "Know the signs in domestic work.", text: "Held documents, unpayable debt, and fear of police are warning signs, even when someone isn’t locked in. If you’re worried about someone, contact the National Human Trafficking Hotline for advice rather than confronting anyone yourself." },
        { lead: "Follow survivor-led work.", text: "Support and share organizations led by survivors, not only stories told about them." },
        { lead: "Push for structural change.", text: "Support labor protections for domestic workers, and criminal-record relief (such as vacatur, expungement, or sealing) for trafficking survivors." }
      ]
    }
  });
