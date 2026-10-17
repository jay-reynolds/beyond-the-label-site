/* Case 3: Participation. See cases/case1.js for the full content schema. */
window.BTL_CASES = window.BTL_CASES || [];
window.BTL_CASES.push({
    id: 3,
    ready: true,
    title: "Participation",
    claim: "She participated, so she consented.",
    focus: "Participation → assumed consent",
    minutes: 7,
    person: "C.",

    scenario: {
      paragraphs: [
        "C. moved to another city for a job she knew would involve sex work.",
        "For several months, she has been seen advertising online and meeting clients. She has never told anyone she wants to stop."
      ],
      note: "That is everything an outside observer can see. Hold on to it. We’ll come back to what it leaves out."
    },

    claimStage: {
      intro: "Here is a conclusion someone might draw from that scenario. It’s an example of an interpretation, not a fact.",
      normalize: "Many readers find this reasonable at first. She knew what the work was, after all. That’s exactly why it’s worth slowing down on."
    },

    sort: {
      intro: "For each statement, decide whether the scenario actually says it, whether a reader would be assuming it, or whether we simply aren’t told.",
      items: [
        { id: "s1", text: "C. knew the job would involve sex work.", answer: "stated",
          reason: "The scenario says this directly. Her decision to take the job was hers." },
        { id: "s2", text: "C. has been advertising and meeting clients for several months.", answer: "stated",
          reason: "Stated. What it shows about her consent is a separate question." },
        { id: "s3", text: "C. agreed to the conditions she is working under now.", answer: "assumed",
          reason: "This is the bridge many readers cross without noticing. Agreeing to a kind of work is not the same as agreeing to every condition that comes with it later." },
        { id: "s4", text: "C. was forced into sex work.", answer: "assumed",
          reason: "Some readers assume this from the fact of sex work alone. The scenario doesn’t say it, and it does say she knew what the work would be. This is the opposite leap, and it goes just as far past the facts." },
        { id: "s5", text: "C. keeps the share of her earnings she was promised.", answer: "unknown",
          reason: "The scenario doesn’t say. Whether the terms stayed the same matters a great deal here." },
        { id: "s6", text: "C. owes money to the people who arranged the job.", answer: "unknown",
          reason: "The scenario doesn’t say. A debt can turn a job someone chose into one she can’t leave." }
      ],
      takeaway: "Two of these are stated. The claim “she consented” rests on one assumption, and the opposite claim, “she was forced,” rests on another. Both go past what an observer can see."
    },

    logic: {
      deepDive: false,
      stated: "She participated.",
      conclusion: "So she consented.",
      prompt: "Something has to connect the stated fact to the conclusion. Which sentence is the argument quietly relying on?",
      options: [
        { id: "a", text: "Anyone who takes part in something has consented to it, including everything that comes with it.", key: true,
          why: "This is the hidden premise. With it, the conclusion follows. Without it, “she participated” doesn’t lead anywhere." },
        { id: "b", text: "She participated for several months.", key: false,
          why: "This repeats the stated fact with more detail. It doesn’t connect taking part to consenting." },
        { id: "c", text: "She agreed to do sex work before she moved.", key: false,
          why: "This is stated, and it matters: her first decision was real. But agreeing to the work at the start doesn’t reach conditions she was never told about." },
        { id: "d", text: "No one would freely choose sex work.", key: false,
          why: "This is a different claim, and it points toward the opposite conclusion. Feminists disagree about it, and many sex workers say they did choose their work. Either way, it doesn’t connect participation to consent." }
      ],
      follows: "With the hidden premise added, the argument is valid. That means: if both premises were true, the conclusion would have to be true.",
      isTrue: "But is the hidden premise true? “Anyone who takes part in something has consented to everything that comes with it” is a claim about everyone. One clear counterexample is enough to show it’s false: a person who agreed to one arrangement and is now being held to a different one, through a debt she never agreed to or threats against her family. She keeps taking part, but she never consented to those terms. So the argument is valid but not sound.",
      keyIdea: "Making an argument valid is easy: just add “if this, then that.” The hard question is whether that added premise is true, and that’s a question about evidence, not logic. Notice, too, that “consented” can shift meaning. More on that below.",
      symbols: {
        key: [ ["P", "She participated."], ["A", "She consented."] ],
        steps: [
          { label: "As people usually say it", lines: [ { f: "<var>P</var> <span class=op>∴</span> <var>A</var>", r: "P, therefore A." } ],
            note: "Not valid: P can be true while A is false." },
          { label: "With the hidden premise", lines: [
              { f: "<var>P</var> <span class=op>→</span> <var>A</var>", r: "If P, then A." },
              { f: "<var>P</var>", r: "P." },
              { f: "<span class=op>∴</span> <var>A</var>", r: "Therefore, A." } ],
            note: "Valid. This form is called modus ponens. Here P → A stands in for the general rule “anyone who takes part has consented.” The structure is fine; that rule is the problem." }
        ]
      },
      equivocation: {
        title: "Two meanings of “consented”",
        text: "“She consented” can mean two different things. It can mean she went along with something: she showed up and did the work. Or it can mean she gave valid consent, the kind that makes an arrangement fair to hold her to. Valid consent is generally understood to require at least three things: no coercion, no deception about what is being agreed to, and the capacity to consent, which includes being old enough. Participation is evidence, at most, of the first meaning. The claim sounds true because of the first meaning and sounds important because of the second. Consent also has an object. C. consented to something specific: a kind of work, on certain terms. That doesn’t stretch to cover terms that were changed on her later."
      },
      extra: [
        { title: "What valid consent requires",
          lines: [ { f: "<var>V</var> <span class=op>→</span> (<span class=op>¬</span><var>C</var> <span class=op>∧</span> <span class=op>¬</span><var>D</var> <span class=op>∧</span> <var>K</var>)", r: "If V, then not C, and not D, and K." } ],
          text: "Here V means “she gave valid consent,” C means “she was coerced,” D means “she was deceived about what she agreed to,” and K means “she had the capacity to consent.” The symbol ¬ means “not” and ∧ means “and.” Participation can be true while C or D is also true. So the premise P → A is believable only if A means “went along.” The conclusion matters only if A means V." },
        { title: "If C. were under 18",
          text: "The analysis changes completely. Under U.S. law, a commercial sex act involving anyone under 18 is sex trafficking. No force, fraud, or coercion has to be shown. [[tvpa]] The Palermo Protocol likewise requires no coercive means when the person is a child. [[palermo]] For a minor, whether she “went along” doesn’t enter into it." }
      ],
      beyond: {
        sentence: "She agreed because she believed the terms were fair.",
        trigger: "believed",
        text: "“Believed” reports what was in someone’s mind, and “because” claims a reason. Knowing that she agreed and that she held some belief still wouldn’t tell us that the belief explains the agreement, or that the belief was accurate. This statement involves a relationship that requires additional information or evidence. Formal truth-functional logic alone cannot determine the entire claim. In plain terms: knowing what someone did isn’t the same as knowing what she agreed to, or why."
      },
      inverse: [
        { title: "Not following doesn’t make it false", text: "Showing that a conclusion doesn’t follow is not the same as showing it’s false. C. may be working under exactly the terms she agreed to. The point is that participation alone can’t tell us." },
        { title: "The opposite overreach", text: "It would be equally unsupported to conclude, from the observer’s view alone, that C. was trafficked. What changes the analysis is evidence of fraud and coercion, not the fact of sex work." }
      ]
    },

    evidence: {
      relevantLabel: "Bears on what she consented to",
      intro: "So what would we need to know before drawing any conclusion about what C. consented to? Pick the three questions you think matter most.",
      pick: 3,
      cards: [
        { id: "e1", text: "What exactly did she agree to before she moved: her share of the earnings, which clients, and whether she could leave?", relevant: true,
          why: "Consent has a scope. To know whether she consented to her current situation, we first need to know what she actually agreed to." },
        { id: "e2", text: "Did her travel or housing costs turn into a debt she has to work off?", relevant: true,
          why: "A debt that keeps someone working, especially one she never agreed to, is a recognized means of control. U.S. law names it debt bondage. [[tvpa]]" },
        { id: "e3", text: "Has anyone threatened her, or someone she loves, if she stops?", relevant: true,
          why: "U.S. law counts threats of serious harm, to her or to anyone else, as coercion. [[tvpa]]" },
        { id: "e4", text: "Who controls her phone, her money, and her ID?", relevant: true,
          why: "Control over communication, money, and documents shapes whether stopping is a real option." },
        { id: "e5", text: "Has she been told she’d be the one arrested if she went to the police?", relevant: true,
          why: "Threatening to misuse the legal system against someone is listed as a form of coercion in U.S. law. [[tvpa]] Where selling sex is itself a crime, the threat is easy to believe." },
        { id: "e6", text: "Is the work she’s doing sex work?", relevant: false,
          why: "We already know it is. That fact alone tells us neither that she consented to her current terms nor that she was trafficked." },
        { id: "e7", text: "Do her online ads make her seem confident?", relevant: false,
          why: "How someone presents in an ad is part of the work. It tells us little about the terms she is working under." }
      ],
      compareNote: "Five of these questions bear directly on what C. consented to. Picking any three of them is a good choice. Your picks don’t need to match anyone else’s.",
      rivals: {
        title: "What else would produce the same behavior?",
        text: "Months of advertising and meeting clients could be explained by:",
        list: [
          "an arrangement she chose and still accepts",
          "a choice she made whose terms were later changed by deception",
          "a debt she is being made to work off",
          "threats against her or her family",
          "fear of being arrested if she reports anything",
          "having no other way to earn enough"
        ],
        after: "The first explanation is on the list on purpose. The point isn’t to rule it out. It’s that participation, by itself, can’t tell these explanations apart."
      },
      legal: "The Palermo Protocol, Article 3, defines trafficking as an act (such as recruiting or transporting someone), carried out by a means (such as threat, force, fraud, deception, or abuse of a position of vulnerability), for the purpose of exploitation. Article 3(b) says a victim’s consent is irrelevant where any of those means were used. [[palermo]] That does not mean adults can’t consent to sex work. It means consent obtained through coercion or deception doesn’t count. U.S. law likewise defines sex trafficking of adults by force, fraud, or coercion. [[tvpa]] The law sets a threshold for prosecution. It doesn’t capture everything a person lives through."
    },

    fuller: {
      label: "Still constructed. Each detail reflects a pattern documented in research on trafficking and the sex trade. This is one possible fuller picture: a different one, in which C. works under the terms she agreed to, would fit the same observations.",
      paragraphs: [
        "Before she moved, C. agreed to a specific arrangement with the people who offered her the job. She would keep a set share of what she earned, choose her own clients, and be free to leave. She knew what the work was. That decision was real, and it was hers.",
        "After she arrived, the terms changed. Her travel and housing costs became a “debt,” and her share of the earnings shrank to almost nothing while it was “paid down.” Someone checks her phone. She has been told that if she leaves, the debt will pass to her younger sister, and that if she goes to the police, she will be the one arrested. Because selling sex is a crime in most of the U.S., that threat is easy to believe.",
        "C. is not passive. She negotiates over money and conditions every day, turns down clients she judges unsafe, and keeps a hidden record of every payment she has made toward the “debt.”"
      ],
      mechanisms: [
        { name: "Deception about the terms", system: "Recruitment practices, unequal bargaining power", text: "She agreed to one arrangement and is being held to another. U.S. law and the Palermo Protocol both treat fraud and deception as means of trafficking. [[tvpa]] [[palermo]]" },
        { name: "Debt bondage", system: "Economic precarity", text: "A debt that never shrinks turns work she chose into work she can’t stop. [[tvpa]]" },
        { name: "Threats against family", system: "Family obligation, gendered responsibility for kin", text: "A threat aimed at her sister keeps her working without anyone locking a door. U.S. law counts threats of serious harm to any person as coercion. [[tvpa]]" },
        { name: "Monitoring", system: "Control over communication", text: "Checking her phone cuts her off from help and shows the people controlling her who she talks to. Research on coercive control describes the same tactic in abusive relationships. [[stark]]" },
        { name: "Criminalization and stigma", system: "Criminal law, sexual hierarchy", text: "Where selling sex is a crime, reporting exploitation can mean risking arrest. Gayle Rubin described a social hierarchy that ranks sexual behavior from respectable to deviant, with sex workers among its most stigmatized groups. [[rubin]] That stigma can make it harder for someone in the sex trade to be believed when she reports harm." }
      ],
      agency: "Negotiating, refusing clients, and keeping records are decisions. C. chose sex work, and she is still making choices inside conditions she never agreed to. Recognizing the coercion doesn’t erase her choices. Recognizing her choices doesn’t erase the coercion. Her hidden record is also evidence of the fraud, kept by her own hand.",
      idealVictim: "C. doesn’t match the popular image of a trafficking victim. She knew what the work was, she agreed to it, and she keeps working. Sociologist Nils Christie called this the “ideal victim” problem: we recognize harm most easily in people who seem blameless and fit a familiar story, and overlook others. [[christie]] Someone who chose sex work can still be deceived and coerced, and her claim to protection is no weaker for that choice.",
      lenses: [
        { name: "Coercion and valid consent", src: "Alan Wertheimer", src_ids: ["wertheimer"],
          text: "Wertheimer distinguishes coercive threats, which leave a person worse off than she has a right to be if she refuses, from offers and hard bargains, which don’t. Agreement extracted by a threat doesn’t carry the moral weight of consent.",
          q: "Was the original job an offer or a threat? What about the warning about her sister?" },
        { name: "Sex work as work", src: "Melissa Gira Grant", src_ids: ["giragrant"],
          text: "Grant, a former sex worker, argues that sorting women into the “chosen” and the “forced,” workers and victims, is too narrow to describe anyone’s working life. People in the sex trade make the same ordinary choices about earning a living that other workers do, and they have grievances about their working conditions, as other workers do.",
          q: "What would it mean to take both C.’s choice and her grievances seriously?" }
      ],
      lensNote: "These are two perspectives, not one correct theory. They ask different questions, and neither settles the wider debate about sex work.",
      cards: [
        { title: "Contested terrain",
          text: "Feminists disagree sharply about sex work. Some, often called abolitionists, argue that the sex trade grows out of gender and economic inequality, so that choices inside it are never fully free. Many in this camp support decriminalizing people who sell sex while penalizing buyers. Others, including many sex workers and sex worker-led organizations, argue that sex work is work, that treating all of it as trafficking harms both sex workers and trafficking survivors, and that labor rights are the better answer. [[giragrant]] [[kempadoo]] Many people hold positions in between. This case doesn’t settle that debate. Its question is narrower: what can and can’t be inferred from participation." },
        { title: "Who gets to tell the story",
          text: "Grant describes anti-trafficking campaigners who speak about sex workers’ lives without asking them, and who take a sex worker’s disagreement as proof that she must be a victim. She argues that campaigns to “save” sex workers can remove the options they rely on for safety and income. [[giragrant]] Lila Abu-Lughod, writing about a different context, warns that the urge to save women can drown out what they say about their own lives. [[abulughod]] In C.’s case, the person best placed to say which terms she agreed to is C." },
        { title: "What changed the analysis",
          text: "Notice what did the work in this fuller picture: the changed terms, the debt, the threats, and the monitoring. Not the fact of sex work. If C. were working under the terms she agreed to, the same observations would fit, and nothing here would show she was trafficked." }
      ],
      returnPrompt: "Look back at the claim: “She participated, so she consented.” Consented to what?",
      survivors: "To hear from trafficking survivors in their own words, start with survivor-led work. [[nsn]] [[lloyd]] For sex workers’ own accounts, start with writing by sex workers, such as Grant’s. [[giragrant]] The two groups don’t always agree, and both are worth hearing."
    },

    reframe: {
      short: "Taking part doesn’t tell us what she agreed to.",
      prompt: "Rewrite “She participated, so she consented” in a way that keeps what we know and doesn’t claim more than we know.",
      model: "C. chose to do sex work, and that choice was real. But her taking part doesn’t, by itself, show that she agreed to the conditions she is working under now. To know that, we’d need to know what terms she agreed to, whether those terms changed, and whether she is free to stop.",
      why: [
        "It keeps the observation (she took part) and respects her original choice.",
        "It doesn’t treat agreeing to the work as agreeing to everything that follows.",
        "It names what we would need to know.",
        "It doesn’t swap in the opposite certainty that she was trafficked."
      ],
      selfcheck: [
        "My version keeps what was actually stated.",
        "My version doesn’t treat participation as consent to every condition.",
        "My version doesn’t claim she was forced, either."
      ],
      actions: [
        { lead: "Ask “consented to what?”", text: "When you hear “she knew what she was getting into,” ask whether what she is in now is what she agreed to." },
        { lead: "Don’t treat sex work as proof of trafficking.", text: "The reverse shortcut is just as unsupported. What matters is fraud, force, and coercion. If you’re worried about someone, contact the National Human Trafficking Hotline for advice rather than confronting anyone yourself." },
        { lead: "Listen to the people involved.", text: "Seek out writing and organizations led by sex workers and by trafficking survivors, not only stories told about them." },
        { lead: "Push for structural change.", text: "Support policies that let people report exploitation, violence, or trafficking without being arrested themselves, and criminal-record relief (vacatur) for trafficking survivors." }
      ]
    }
  });
