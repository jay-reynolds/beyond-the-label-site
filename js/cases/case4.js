/* Case 4: Not leaving. See cases/case1.js for the full content schema. */
window.BTL_CASES = window.BTL_CASES || [];
window.BTL_CASES.push({
    id: 4,
    ready: true,
    title: "Not leaving",
    claim: "She didn’t leave, so she wasn’t being coerced.",
    focus: "Absence of action → assumed absence of coercion",
    minutes: 6,
    person: "D.",

    scenario: {
      paragraphs: [
        "D. works at a business where the doors are not locked. She has a phone. She goes out to shop on her own.",
        "In all the time she has worked there, she has never run away, and she has never called the police."
      ],
      note: "That is everything an outside observer can see. Hold on to it. We’ll come back to what it leaves out."
    },

    claimStage: {
      intro: "Here is a conclusion someone might draw from that scenario. It’s an example of an interpretation, not a fact.",
      normalize: "Many readers find this convincing at first: if the door is open, why stay? That’s exactly why it’s worth slowing down on."
    },

    sort: {
      intro: "For each statement, decide whether the scenario actually says it. Something it doesn’t say might still be true. You just can’t get it from the scenario.",
      items: [
        { id: "s1", text: "The doors at D.’s workplace are not locked.", answer: "stated",
          reason: "The scenario says this directly." },
        { id: "s2", text: "D. has never called the police.", answer: "stated",
          reason: "Stated. What it means is a separate question." },
        { id: "s3", text: "If D. were in danger, she would have run or called for help.", answer: "notstated", tag: "leans",
          reason: "This is the bridge many readers cross without noticing: it turns her staying put into proof that she is safe. People stay put for many reasons, including fear of what happens next." },
        { id: "s4", text: "Nobody has threatened D. or anyone she cares about.", answer: "notstated", tag: "ask",
          reason: "The scenario doesn’t say. Threats, if there were any, would leave no mark an observer could see." },
        { id: "s5", text: "D. is free to leave without anything bad happening.", answer: "notstated", tag: "leans",
          reason: "An open door shows that leaving is physically possible, not that it is safe. Assuming it is safe makes “she didn’t leave” look like a free decision to stay." }
      ],
      takeaway: "Two of these are stated, and neither one says why D. stays. The conclusion “she wasn’t coerced” rests on things the scenario doesn’t say."
    },

    logic: {
      deepDive: false,
      stated: "She didn’t leave.",
      conclusion: "So she wasn’t being coerced.",
      prompt: "Something has to connect the stated fact to the conclusion. Which sentence is the argument quietly relying on?",
      options: [
        { id: "b", text: "The doors at D.’s workplace are not locked.", key: false,
          why: "This is part of the scenario, not a link between staying and coercion. It matters later, as a different reading of the argument." },
        { id: "c", text: "Some people who are coerced do leave.", key: false,
          why: "True, but too weak. “Some” doesn’t let us move from one person’s staying to her not being coerced." },
        { id: "a", text: "If someone is being coerced, she leaves.", key: true,
          why: "This is the hidden premise. With it, “she didn’t leave” does lead to “she wasn’t coerced.” Without it, the step is missing." }
      ],
      follows: "With the hidden premise added, the argument is valid. If both premises were true, the conclusion would have to be true. Logicians call this form modus tollens: if C (she is coerced) then L (she leaves); not L; therefore not C.",
      isTrue: "But is the hidden premise true? Coercion works by making leaving costly or dangerous, so people who are coerced often stay. People who are content stay too. Staying alone can’t settle which applies. [[stark]] The argument is valid, but the premise is a myth, not a fact. So this is not a fallacy in the usual sense. Once the hidden premise is filled in, the form is fine. The belief it is built on is not.",
      keyIdea: "Valid arguments can carry myths in their premises. When an argument is valid but the conclusion still feels off, check the premises. That is a question about evidence, not logic.",
      symbols: {
        key: [ ["C", "She is being coerced."], ["L", "She leaves."] ],
        steps: [
          { label: "With the hidden premise", lines: [
              { f: "<var>C</var> <span class=op>→</span> <var>L</var>", r: "If C, then L." },
              { f: "<span class=op>¬</span><var>L</var>", r: "Not L: she didn’t leave." },
              { f: "<span class=op>∴</span> <span class=op>¬</span><var>C</var>", r: "Therefore, not C." } ],
            note: "Valid. The structure is fine; the premise C → L is the problem." }
        ]
      },
      equivocation: {
        title: "Two meanings of “could have left”",
        text: "“She could have left” can mean the door was not locked and nothing physically stopped her. Or it can mean that leaving was a realistic option, one she could take without losing something she can’t afford to lose. The first can be true while the second is false. Arguments about coercion often slide from one to the other without saying so. [[wertheimer]]"
      },
      extra: [
        { title: "Another reading: “the door wasn’t locked”",
          lines: [
            { f: "<var>K</var> <span class=op>→</span> <var>C</var>", r: "If she were locked in, she would be coerced." },
            { f: "<span class=op>¬</span><var>K</var>", r: "She wasn’t locked in." },
            { f: "<span class=op>∴</span> <span class=op>¬</span><var>C</var>", r: "Therefore, she wasn’t coerced." }
          ],
          text: "(¬ means “not.”) Here K means “she was locked in.” This version is not valid. It denies the antecedent. Being locked in is one way of coercing someone. It isn’t the only way. This time the form itself fails, for a different reason than before." },
        { title: "A third reading: “held or free”",
          lines: [
            { f: "<var>P</var> <span class=op>∨</span> <var>F</var>", r: "Either she was physically prevented from leaving, or she stayed freely." },
            { f: "<span class=op>¬</span><var>P</var>", r: "She wasn’t physically prevented." },
            { f: "<span class=op>∴</span> <var>F</var>", r: "Therefore, she stayed freely." }
          ],
          text: "(∨ means “or.”) This form is valid, but the first line is a false dilemma. It leaves out threats against family, unpayable debt, held documents, fear of police, and having nowhere to go. One sentence, three readings, three different problems: a premise that fails, a faulty form, and a missing option. Only the second is a fallacy in the formal sense." }
      ],
      inverse: [
        { title: "Not following doesn’t make it false", text: "Showing that the argument fails is not the same as showing D. is coerced. She might be working freely. The point is that staying, by itself, can’t tell us." },
        { title: "The opposite overreach", text: "It would be just as unsupported to conclude, from this scenario alone, that D. is being coerced. Careful reasoning applies in both directions." }
      ]
    },

    evidence: {
      relevantLabel: "Bears on whether leaving is realistic",
      intro: "What would we need to know before saying anything about why D. stays? Pick the three questions you think matter most.",
      pick: 3,
      cards: [
        { id: "e1", text: "Has anyone threatened her, or people she cares about, if she leaves?", relevant: true,
          why: "Threats against family are a recognized form of coercion, and they work without any locked door. [[tvpa]] [[ilo]]" },
        { id: "e2", text: "What has she been told would happen if she went to the police?", relevant: true,
          why: "Being told you will be arrested or reported to immigration keeps many people from seeking help, whether or not it is true. [[brennan]]" },
        { id: "e3", text: "Is her phone, or her time, monitored by anyone?", relevant: true,
          why: "Surveillance means an open door and a phone don’t add up to real freedom to act. [[stark]]" },
        { id: "e4", text: "Does she have money, a safe place to go, and a way to ask for help in a language she is comfortable in?", relevant: true,
          why: "Leaving needs somewhere to go and someone who can understand her. Isolation shapes which options are real." },
        { id: "e5", text: "Is the building in a busy part of town?", relevant: false,
          why: "Coercion happens in every kind of place. This doesn’t help us tell explanations apart." },
        { id: "e6", text: "Does she seem calm when she shops?", relevant: false,
          why: "Calm can mean many things. Looking at ease tells us little either way." }
      ],
      compareNote: "Four of these bear directly on whether leaving is realistic. Picking any three of them is a good choice. Your picks don’t need to match anyone else’s.",
      rivals: {
        title: "What else would produce the same behavior?",
        text: "Not leaving could be explained by:",
        list: [
          "satisfaction with the job",
          "threats against family",
          "fear of being arrested or reported",
          "monitoring of her phone and movements"
        ],
        after: "Satisfaction is on the list on purpose. The point isn’t to rule it out. It’s that not leaving, by itself, can’t tell these explanations apart."
      },
      legal: "U.S. law defines coercion broadly: it includes threats of serious harm and abuse of the legal process, not only physical restraint. [[tvpa]] The law sets a threshold for prosecution. It doesn’t capture everything a person lives through."
    },

    fuller: {
      label: "Still constructed. Each detail reflects a pattern documented in research on coercion and trafficking. This is one possible fuller picture: a different one, in which D. is working freely, would fit the same observations.",
      paragraphs: [
        "The person who runs the business knows where D.’s mother and young son live, and has made clear what could happen to them if she leaves. D. has been told that if she goes to the police, she will be arrested, and her immigration status will be reported. Whether or not that is accurate, she believes it. Her phone is checked every night. She speaks limited English, which makes it harder to find help she can use.",
        "D. is not passive. She keeps going to work and keeps her head down because that is how she keeps her son safe. Staying is her strategy."
      ],
      mechanisms: [
        { name: "Threats to family", system: "Coercion beyond physical restraint", text: "Danger to people she loves can keep a person in place more firmly than a lock. [[tvpa]] [[ilo]]" },
        { name: "Fear of criminalization and abuse of the legal process", system: "Criminal law, immigration enforcement", text: "U.S. law lists the abuse or threatened abuse of the legal process as a form of coercion, and a threat of arrest or deportation can be one. When police seem like a risk, calling them isn’t a realistic option. [[tvpa]]" },
        { name: "Surveillance", system: "Coercive control", text: "Research on coercive control in abusive relationships describes monitoring and limits on social contact. [[stark]] For D., having her phone checked makes every outside contact a risk." },
        { name: "Language isolation", system: "Services that assume English", text: "When hotlines, shelters, and police work mainly in English, limited English narrows who she can ask, and what she can ask for." }
      ],
      agency: "D. is making deliberate choices inside tight limits. Recognizing constraint doesn’t mean treating her as helpless. D. is constrained, not powerless.",
      idealVictim: "D. doesn’t match the popular image of a coercion victim. No one has her locked in, and she goes out on her own. Sociologist Nils Christie called this the “ideal victim” problem: we recognize harm most easily in people who fit a familiar story, and overlook others. [[christie]]",
      returnPrompt: "Look back at the claim: “She didn’t leave, so she wasn’t being coerced.” What did it leave out?",
      survivors: "To hear from survivors in their own words, start with survivor-led work. [[nsn]]"
    },

    reframe: {
      short: "Her not leaving, by itself, doesn’t tell us whether she was coerced.",
      prompt: "Rewrite “She didn’t leave, so she wasn’t being coerced” in a way that keeps what we know and doesn’t claim more than we know.",
      model: "That D. hasn’t left doesn’t, by itself, tell us whether she is free to. To understand her situation, we’d need to know whether she or her family has been threatened, what she believes would happen if she asked for help, and whether leaving is a realistic option for her.",
      why: [
        "It keeps the observation (she hasn’t left).",
        "It doesn’t claim a reason the scenario never gives.",
        "It names what we would need to know.",
        "It doesn’t swap in the opposite certainty."
      ],
      selfcheck: [
        "My version keeps what was actually stated.",
        "My version doesn’t treat staying as proof of freedom.",
        "My version points to what we’d need to know."
      ],
      actions: [
        { lead: "Look past the open door.", text: "When you hear “the door wasn’t even locked,” ask what else could keep someone in place." },
        { lead: "Know the signs.", text: "Monitored phones, threats to family, and fear of police are warning signs even when nothing is locked. If you’re worried about someone, contact the National Human Trafficking Hotline for advice rather than confronting anyone yourself. [[hotline]]" },
        { lead: "Follow survivor-led work.", text: "Support and share organizations led by survivors, not only stories told about them. [[nsn]]" },
        { lead: "Push for structural change.", text: "Support policies that let people ask police and courts for help without fear of being arrested or reported themselves, and that fund services in languages people speak." }
      ]
    }
  });
