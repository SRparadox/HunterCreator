import { Character } from "./Character"

export type MeritOrFlaw = { name: string; cost: number[]; summary: string }

export type MeritsAndFlaws = {
    title: string
    merits: MeritOrFlaw[]
    flaws: MeritOrFlaw[]
}

export type BackgroundsData = {
    title: string
    backgrounds: MeritOrFlaw[]
}

// Linguistics
export const linguisticsMeritsAndFlaws: MeritsAndFlaws = {
    title: "🗣️ Linguistics",
    merits: [
        { name: "Linguistics", cost: [1], summary: "Each dot allows fluency in another language outside of native and chronicle setting languages" },
        { name: "Dead Tongues", cost: [2], summary: "Add 2 bonus dice when attempting to translate an extinct language" }
    ],
    flaws: [
        { name: "Illiterate", cost: [2], summary: "Cannot read nor write; Science and Academics Skills may not go beyond 1 dot" },
        { name: "El Mala Educación", cost: [2], summary: "Requires Dead Tongues merit. Danger rating increases by 1 on total failures or critical results when translating extinct languages" }
    ]
}

// The World of Academia
export const academicMeritsAndFlaws: MeritsAndFlaws = {
    title: "🎓 The World of Academia",
    merits: [
        { name: "Forbidden Texts", cost: [2], summary: "Gain 2 dice bonus on research tests for chosen monster type. Subject will want writings back" },
        { name: "Thesis", cost: [2], summary: "Choose additional Specialty tied to academics, applying to any Skill in research tests" },
        { name: "Part of the Furniture", cost: [3], summary: "Once per session, add 2 dice to any single pool when interacting with campus staff or on campus" }
    ],
    flaws: [
        { name: "Falling Grades", cost: [1], summary: "Reduce social pools by two when dealing with campus staff" },
        { name: "Dangerous Knowledge", cost: [2], summary: "On total failure or critical with research/perception tests on chosen monster type, Danger rating increases by 1" }
    ]
}

// Looks
export const looksMeritsAndFlaws: MeritsAndFlaws = {
    title: "✨ Looks",
    merits: [
        { name: "Beautiful", cost: [2], summary: "Add one die to related Social pools" },
        { name: "Stunning", cost: [4], summary: "Add two dice to related Social pools" }
    ],
    flaws: [
        { name: "Ugly", cost: [1], summary: "Lose one die from related Social pools" },
        { name: "Repulsive", cost: [2], summary: "Lose two dice from related Social pools" }
    ]
}

// Nutritionist
export const nutritionistMeritsAndFlaws: MeritsAndFlaws = {
    title: "🍽️ Nutritionist",
    merits: [
        { name: "Solo Cooking", cost: [1], summary: "Heal one extra Superficial Health at session start if time to prepare a meal" },
        { name: "Cell Chef", cost: [2], summary: "Entire cell heals one extra Superficial Health at session start if time to prepare a meal" }
    ],
    flaws: [
        { name: "Malnourished", cost: [2], summary: "Health calculated as Stamina + 2 instead of Stamina + 3" }
    ]
}

// Mental Feats
export const mentalFeatsMeritsAndFlaws: MeritsAndFlaws = {
    title: "🧠 Mental Feats",
    merits: [
        { name: "Always Prepared", cost: [2], summary: "Add 2 bonus dice to Preparedness dice pools" },
        { name: "Eidetic Memory", cost: [2], summary: "Gain 2 bonus dice on recall tests for codes, directions, maps, facial recognition, formulae, and rote behaviors" }
    ],
    flaws: [
        { name: "Disordered Sleep", cost: [2], summary: "Must roll die when studying/waiting/keeping watch; fall asleep on failure" }
    ]
}

// Psychologist Traits
export const psychologistTraitsMeritsAndFlaws: MeritsAndFlaws = {
    title: "🧑‍⚕️ Psychologist Traits",
    merits: [],
    flaws: [
        { name: "Living on the Edge", cost: [2], summary: "Suffer two-dice penalty for all actions until participating in risky temptation or scene ends" },
        { name: "Weak-Willed", cost: [3], summary: "Cannot use active resistance systems to avoid mental influence attempts even when aware" }
    ]
}

// Substance Abuse
export const substanceAbuseMeritsAndFlaws: MeritsAndFlaws = {
    title: "💊 Substance Abuse",
    merits: [],
    flaws: [
        { name: "Addiction", cost: [1], summary: "Unless action is to gain drug, lose one die to all pools if didn't indulge last scene" },
        { name: "Severe Addiction", cost: [2], summary: "Unless action is to gain drug, lose two dice to all pools if didn't indulge last scene" }
    ]
}

// Supernatural Situations
export const supernaturalSituationsMeritsAndFlaws: MeritsAndFlaws = {
    title: "🌙 Supernatural Situations",
    merits: [
        { name: "Unseemly Aura", cost: [2], summary: "Monsters occasionally believe Hunter to be one of their own or another supernatural creature" }
    ],
    flaws: [
        { name: "Crone's Curse", cost: [3], summary: "Appear at least a decade older, reduces health tracker by one" },
        { name: "Stigmata", cost: [2], summary: "Bleed from open wounds when suffering Health or Willpower damage (select type at creation)" }
    ]
}

// Allies
export const alliesMeritsAndFlaws: MeritsAndFlaws = {
    title: "🤝 Allies",
    merits: [
        { name: "Allies", cost: [1, 2, 3, 4, 5, 6], summary: "A group who will support or aid the Hunter. Build between (1-4) Effectiveness and (1-3) Reliability, max 6 total points" }
    ],
    flaws: [
        { name: "Enemy", cost: [1], summary: "Opposite to Allies, rated two dots less than their effectiveness" }
    ]
}

// Contacts
export const contactsMeritsAndFlaws: MeritsAndFlaws = {
    title: "📞 Contacts",
    merits: [
        { name: "Contacts", cost: [1, 2, 3], summary: "People who can get the character information, items or other things of value" }
    ],
    flaws: []
}

// Fame
export const fameMeritsAndFlaws: MeritsAndFlaws = {
    title: "⭐ Fame",
    merits: [
        { name: "Fame", cost: [1, 2, 3, 4, 5], summary: "Public celebrity. Level can subtract from tests against fans and replace other Traits in Social tests" }
    ],
    flaws: [
        { name: "Infamy", cost: [2], summary: "Done something atrocious and others know" },
        { name: "Dark Secret", cost: [1], summary: "Atrocious deed still secret, except to one or two motivated enemies" },
        { name: "Infamous Partner", cost: [1], summary: "Spouse/lover/significant other has Infamy that tarnishes Hunter's reputation" }
    ]
}

// Influence
export const influenceMeritsAndFlaws: MeritsAndFlaws = {
    title: "💼 Influence",
    merits: [
        { name: "Influence", cost: [1, 2, 3, 4, 5], summary: "Sway in communities through political, financial status, prestige, or manipulation" }
    ],
    flaws: [
        { name: "Disliked", cost: [1], summary: "Subtract one die from Social tests involving groups outside loyal followers" },
        { name: "Despised", cost: [2], summary: "One group/region goes out of its way to thwart character's plans" }
    ]
}

// Mask
export const maskMeritsAndFlaws: MeritsAndFlaws = {
    title: "🎭 Mask",
    merits: [
        { name: "Mask", cost: [1, 2], summary: "Fake identity to keep true self away from law or rival orgs" },
        { name: "Zeroed", cost: [1], summary: "All past self purged from systems as if never existed. Requires 2-dot mask" },
        { name: "Cobbler", cost: [1], summary: "Ability to create or source masks. Making takes 3 days per dot. Requires 2-dot mask" },
        { name: "Faked Death", cost: [2], summary: "Nobody from old life looking for you. Requires 2-dot mask" }
    ],
    flaws: [
        { name: "Serial Error", cost: [1], summary: "Mistake in background checks showing recently died, on watchlist, or likely to be detained" },
        { name: "Person of Interest", cost: [2], summary: "Biometrics logged as potential terrorist in agency databases" }
    ]
}

// Mentor
export const mentorMeritsAndFlaws: MeritsAndFlaws = {
    title: "👨‍🏫 Mentor",
    merits: [
        { name: "Mentor", cost: [1, 2, 3, 4, 5], summary: "Another Hunter or group who has taken character under their wing" },
        { name: "Generous", cost: [1, 2, 3], summary: "Call upon mentor for valuable favor once per story. No risk but lose a dot each time" },
        { name: "Spirit Guide (Arcanum)", cost: [2], summary: "Ghost or unearthly mentor you can summon. Reliable knowledge on ghosts" }
    ],
    flaws: [
        { name: "Adversary", cost: [1, 2, 3], summary: "Rival Hunter who wants to do harm to Hunter or their cell" },
        { name: "Credit Hungry (Arcanum)", cost: [1], summary: "On Hunts where you call mentor for aid, they take credit for achievements" }
    ]
}

// Resources
export const resourcesMeritsAndFlaws: MeritsAndFlaws = {
    title: "💰 Resources",
    merits: [
        { name: "Resources", cost: [1, 2, 3, 4, 5], summary: "Cash flow from stock trading, equipment, or working jobs" }
    ],
    flaws: [
        { name: "Destitute", cost: [1], summary: "No money and no home" }
    ]
}

// Retainers
export const retainersMeritsAndFlaws: MeritsAndFlaws = {
    title: "👥 Retainers",
    merits: [
        { name: "Retainers", cost: [1, 2, 3], summary: "Loyal followers who will accomplish requests for the Hunter" }
    ],
    flaws: [
        { name: "Stalkers", cost: [1], summary: "Attracts others who get too attached and won't let go" }
    ]
}

// Safe House
export const safeHouseMeritsAndFlaws: MeritsAndFlaws = {
    title: "🏠 Safe House",
    merits: [
        { name: "Safe House", cost: [1, 2, 3], summary: "Each dot adds +1 Difficulty/1 die to resist spotting, penetrating, surveilling home. +1 die per dot to notice danger" },
        { name: "Hidden Armory", cost: [1], summary: "Each dot adds one pistol and one long firearm, safely concealed" },
        { name: "Panic Room", cost: [1], summary: "House individuals with breach Difficulty 5. Extra dots allow twice as many or +1 breach Difficulty" },
        { name: "Watchmen", cost: [1], summary: "Each dot supplies 4 Average Mortals and one Gifted Mortal to watch safe house" },
        { name: "Laboratory", cost: [1], summary: "Each dot contributes to dice rolls for one Science or Technology specialty" },
        { name: "Luxury", cost: [1], summary: "+2 dice bonus to Social tests when mortals inside. Requires 3+ Resources or items are stolen" },
        { name: "Postern", cost: [1], summary: "Secret exit. Each dot adds one die to evasion/escaping surveillance pools" },
        { name: "Security System", cost: [1], summary: "Each dot adds one die to resist/alert to unwelcome guests" },
        { name: "Surgery", cost: [1], summary: "Add two dice to relevant medical tests in safe house" },
        { name: "Bolt Hole", cost: [1], summary: "2 dice bonus when hiding or moving between safe places undetected" }
    ],
    flaws: [
        { name: "No Safe House", cost: [1], summary: "No expectation of security while at home" },
        { name: "Creepy", cost: [1], summary: "Two-dice penalty on Social pools in safe house with human guests" },
        { name: "Haunted", cost: [1], summary: "Supernatural manifestation. At least one-die penalty or bonus per dot to affected pools" },
        { name: "Compromised", cost: [2], summary: "On watchlist, may have been raided. +2 dice to penetrate or watch safe house" },
        { name: "Interfering Roommate", cost: [1], summary: "Someone else uses safe house legitimately, reports suspicious activity" }
    ]
}

// Status
export const statusMeritsAndFlaws: MeritsAndFlaws = {
    title: "🏆 Status",
    merits: [
        { name: "Status", cost: [1, 2, 3, 4, 5], summary: "Built a name within specific local community of Hunters" }
    ],
    flaws: [
        { name: "Suspect", cost: [1], summary: "2 dice penalty to Social tests with offended Hunters until proving worth again" },
        { name: "Shunned", cost: [2], summary: "Despised by Hunter group, members actively work against them" }
    ]
}

// Backgrounds
export const backgroundsData: BackgroundsData = {
    title: "📚 Backgrounds",
    backgrounds: [
        { name: "Allies", cost: [1, 2, 3, 4, 5, 6], summary: "Groups who will support or aid the Hunter" },
        { name: "Contacts", cost: [1, 2, 3], summary: "Network of information and item sources" },
        { name: "Fame", cost: [1, 2, 3, 4, 5], summary: "Public notoriety for good or bad" },
        { name: "Influence", cost: [1, 2, 3, 4, 5], summary: "Ability to influence how groups react or act" },
        { name: "Mask", cost: [1, 2], summary: "Status of Hunter's identification" },
        { name: "Mentor", cost: [1, 2, 3, 4, 5], summary: "Relationship with experienced Hunters who offer guidance" },
        { name: "Resources", cost: [1, 2, 3, 4, 5], summary: "Income and material possessions" },
        { name: "Retainers", cost: [1, 2, 3], summary: "Loyal servants or assistants" },
        { name: "Safe House", cost: [1, 2, 3], summary: "Security and distinction beyond basic shelter" },
        { name: "Status", cost: [1, 2, 3, 4, 5], summary: "Reputation within Hunter communities" }
    ]
}

// Main merits and flaws array
export const meritsAndFlaws: MeritsAndFlaws[] = [
    linguisticsMeritsAndFlaws,
    academicMeritsAndFlaws,
    looksMeritsAndFlaws,
    nutritionistMeritsAndFlaws,
    mentalFeatsMeritsAndFlaws,
    psychologistTraitsMeritsAndFlaws,
    substanceAbuseMeritsAndFlaws,
    supernaturalSituationsMeritsAndFlaws,
    alliesMeritsAndFlaws,
    contactsMeritsAndFlaws,
    fameMeritsAndFlaws,
    influenceMeritsAndFlaws,
    maskMeritsAndFlaws,
    mentorMeritsAndFlaws,
    resourcesMeritsAndFlaws,
    retainersMeritsAndFlaws,
    safeHouseMeritsAndFlaws,
    statusMeritsAndFlaws
]
