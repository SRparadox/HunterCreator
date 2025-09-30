export type MeritOrFlaw = { name: string; cost: number[]; summary: string }

export type MeritsAndFlaws = {
    title: string
    merits: MeritOrFlaw[]
    flaws: MeritOrFlaw[]
}

// Linguistics Merits & Flaws
export const linguisticsMeritsAndFlaws: MeritsAndFlaws = {
    title: "🗣️ Linguistics",
    merits: [
        { name: "Linguistics", cost: [1, 2, 3, 4, 5], summary: "Each dot of Linguistics allows the character to read, write and speak fluently in another language outside of the default two they already know, which is their native language and the dominant language of the chronicle setting." },
        { name: "Dead Tongues", cost: [2], summary: "The character adds 2 bonus dice when attempting to translate an extinct language." }
    ],
    flaws: [
        { name: "Illiterate", cost: [2], summary: "The Character cannot read nor write and their Science and Academics Skills may not go beyond 1 dot. The character also cannot have a specialty that incorporates modern knowledge." },
        { name: "El Mala Educación", cost: [2], summary: "Requires the Dead Tongues merit. The character makes some mistakes because of their lackluster education in the language. The Danger rating increases by 1 on total failures or critical results when they attempt to translate any extinct language." }
    ]
}

// The World of Academia Merits & Flaws
export const theWorldOfAcademiaMeritsAndFlaws: MeritsAndFlaws = {
    title: "🎓 The World of Academia",
    merits: [
        { name: "Forbidden Texts", cost: [2], summary: "The character has acquired writings from an expert. Upon choosing this merit, the character picks a monster type, and gains a 2 dice bonus on all research tests on the subject of that monster. The subject in question will most likely want the writings back." },
        { name: "Thesis", cost: [2], summary: "The character chooses an additional Specialty, though not tied to any Skill but applying to any of them when used in a research test. The Storyteller needs to approve this specialty, which must be tied to academics and not the supernatural." },
        { name: "Part of the Furniture", cost: [3], summary: "Once per session, when interacting with campus staff, or while on campus, the character may add 2 dice to any single pool." }
    ],
    flaws: [
        { name: "Falling Grades", cost: [1], summary: "Reduce social pools by two when dealing with campus staff." },
        { name: "Dangerous Knowledge", cost: [2], summary: "Upon purchasing this merit, the Storyteller chooses a monster type. When making research or perception-related tests on that monster type, if the result is a total failure or a critical, the Danger rating increases by 1." }
    ]
}

// Looks Merits & Flaws
export const looksMeritsAndFlaws: MeritsAndFlaws = {
    title: "👤 Looks",
    merits: [
        { name: "Beautiful", cost: [2], summary: "Add one die to related Social pools" },
        { name: "Stunning", cost: [4], summary: "Add two dice to related Social pools" }
    ],
    flaws: [
        { name: "Ugly", cost: [1], summary: "Lose one die from related Social pools" },
        { name: "Repulsive", cost: [2], summary: "Lose two dice from related Social pools" }
    ]
}

// Nutritionist Merits & Flaws
export const nutritionistMeritsAndFlaws: MeritsAndFlaws = {
    title: "🍳 Nutritionist",
    merits: [
        { name: "Solo Cooking", cost: [1], summary: "Heal one extra Superficial Health at the beginning of a session if the Hunter has time to prepare a meal before the session begins." },
        { name: "Cell Chef", cost: [2], summary: "The entire cell heals one extra Superficial Health at the beginning of a session if the Hunter has time to prepare a meal before the session begins. Any Hunters separated from the cell at the start of session would not receive this benefit." }
    ],
    flaws: [
        { name: "Malnourished", cost: [2], summary: "The character is too busy, poor or inept to eat properly, and their Health is calculated as Stamina + 2 instead of Stamina + 3." }
    ]
}

// Mental Feats Merits & Flaws
export const mentalFeatsMeritsAndFlaws: MeritsAndFlaws = {
    title: "🧠 Mental Feats",
    merits: [
        { name: "Always Prepared", cost: [2], summary: "The character is efficient and practical, and adds 2 bonus dice to Preparedness dice pools (seen on page 28 of Alma Maters)." },
        { name: "Eidetic Memory", cost: [2], summary: "The character benefits from photographic memory, only requiring a bit of study before they can recall a text or details verbatim. They gain 2 bonus dice on any test related to recall for things such as codes, directions, maps, facial recognition, formulae, and rote behaviors." }
    ],
    flaws: [
        { name: "Disordered Sleep", cost: [2], summary: "Sleep catches the character at the least convenient time possible, due to their messy sleep schedule. In situations where they are studying, waiting, or keeping watch, they must roll a die, and fall asleep if the result is a failure. It is up to the Storyteller to define the impact, but it generally means the character can't complete a task, misses a detail, or is easy to ambush." }
    ]
}

// Psychologist Traits Flaws
export const psychologistTraitsFlaws: MeritsAndFlaws = {
    title: "🧑‍⚕️ Psychologist Traits",
    merits: [],
    flaws: [
        { name: "Living on the Edge", cost: [2], summary: "When confronted with a risky temptation that the character hasn't done before, they suffer a two-dice penalty for all actions till they participate or the scene ends." },
        { name: "Weak-Willed", cost: [3], summary: "Even when they are aware that someone is attempting to sway they may not use the active resistance systems to avoid the attempts." }
    ]
}

// Substance Abuse Flaws
export const substanceAbuseFlaws: MeritsAndFlaws = {
    title: "🍷 Substance Abuse",
    merits: [],
    flaws: [
        { name: "Addiction", cost: [1], summary: "Unless the action is to immediately gain their drug, lose one die to all pools if the character did not indulge in their substance of choice during the last scene." },
        { name: "Severe Addiction", cost: [2], summary: "Unless the action is to immediately gain their drug, lose two dice to all pools if the character did not indulge in their substance of choice during the last scene." }
    ]
}

// Supernatural Situations Merits & Flaws
export const supernaturalSituationsMeritsAndFlaws: MeritsAndFlaws = {
    title: "🌙 Supernatural Situations",
    merits: [
        { name: "Unseemly Aura", cost: [2], summary: "Monsters will occasionally believe the Hunter to be one of their own or another supernatural creature entirely." }
    ],
    flaws: [
        { name: "Crone's Curse", cost: [3], summary: "The character appears at least a decade older than they actually are which reduces their health tracker by one." },
        { name: "Stigmata", cost: [2], summary: "Select either Health or Willpower damage at character creation, this Flaw may also be taken a second time for the other type of damage. The Hunter bleeds from open wounds on their hands, feet and forehead whenever they suffer physical or Willpower damage. However, this does not trigger when they spend Willpower." }
    ]
}

// Allies Merits & Flaws
export const alliesMeritsAndFlaws: MeritsAndFlaws = {
    title: "🤝 Allies",
    merits: [
        { name: "Allies", cost: [1, 2, 3, 4, 5, 6], summary: "A group who will support or aid the Hunter. Family, friends, or an organization that has loyalty. Build them between (• - ••••) Effectiveness and (•-•••) Reliability, the maximum amount of total points is 6. Effectiveness defines how proficient they are at a task. Reliability determines how dependable they are." }
    ],
    flaws: [
        { name: "Enemy", cost: [1, 2, 3, 4, 5], summary: "The opposite to Allies, and are rated two dots less than their effectiveness." }
    ]
}

// Contacts Merits
export const contactsMerits: MeritsAndFlaws = {
    title: "📞 Contacts",
    merits: [
        { name: "Contacts", cost: [1, 2, 3], summary: "These are people who can get the character information, items or other things of value." }
    ],
    flaws: []
}

// Fame Merits & Flaws
export const fameMeritsAndFlaws: MeritsAndFlaws = {
    title: "⭐ Fame",
    merits: [
        { name: "Fame", cost: [1, 2, 3, 4, 5], summary: "The character might be a pop singer, actress, or other celebrity. The level of fame can subtract from tests against fans and can be used inplace of a another Trait in Social tests as allowed by the Storyteller. However, this can also be a dangerous trait as tailing a target unnoticed may become difficult with fans spotting the character." }
    ],
    flaws: [
        { name: "Infamy", cost: [2], summary: "They've done something atrocious and others know." },
        { name: "Dark Secret", cost: [1], summary: "What they've done is still a secret, except to one or two very motivated enemies." },
        { name: "Infamous Partner", cost: [1], summary: "A spouse, lover or someone else significant to the character has Infamy that will sometimes tarnish the reputation of the Hunter by association." }
    ]
}

// Influence Merits & Flaws
export const influenceMeritsAndFlaws: MeritsAndFlaws = {
    title: "💪 Influence",
    merits: [
        { name: "Influence", cost: [1, 2, 3, 4, 5], summary: "They have sway in communities, be they political, through financial status and prestige, or manipulation. By default, this merit usually applies to a specific group or region of the city." }
    ],
    flaws: [
        { name: "Disliked", cost: [1], summary: "Subtract one die from Social tests involving groups outside of the character's loyal followers." },
        { name: "Despised", cost: [2], summary: "One group/region of the city goes out of its way to thwart the character's plans." }
    ]
}

// Mask Merits & Flaws
export const maskMeritsAndFlaws: MeritsAndFlaws = {
    title: "🎭 Mask",
    merits: [
        { name: "Mask", cost: [1, 2], summary: "A fake identity that allows the Hunter to keep their true selves away from the law or rival orgs, this might include bank accounts, a birth certificate and everything else a Hunter might need to hide their identity." },
        { name: "Zeroed", cost: [1], summary: "All of the character's past self has been purged from all systems as if they never existed. The character must have a 2-dot mask in order to take this." },
        { name: "Cobbler", cost: [1], summary: "The ability to create or source out masks. Making a mask takes 3 days per dot. The character must have a 2-dot mask in order to take this." },
        { name: "Faked Death", cost: [2], summary: "As long as you keep a low profile and a new identity nobody from your old life is going to be looking for yo including Enemies, Stalkers, and orgs. You do maintain a limited relationship with any Contacts. The character must have a 2-dot mask in order to take this. Unless you buy a separate Mask Merit you have the same penalties as the Serial Error Flaw." }
    ],
    flaws: [
        { name: "Serial Error", cost: [1], summary: "A mistake has been made in the characters background checks showing that they'd recently died, are on a dangerous watchlist, or otherwise likely to be called or detained by the police. This also applies to any database lookups on their identity." },
        { name: "Person of Interest", cost: [2], summary: "The Hunter has become a person of interest and with their biometrics and information having been logged as a potential terrorist in agency databases." }
    ]
}

// Mentor Merits & Flaws
export const mentorMeritsAndFlaws: MeritsAndFlaws = {
    title: "👨‍🏫 Mentor",
    merits: [
        { name: "Mentor", cost: [1, 2, 3, 4, 5], summary: "Another Hunter or group of Hunters who has taken the character under their wing." },
        { name: "Generous", cost: [1, 2, 3], summary: "You can call upon your mentor for a valuable favor once per story. This does not run the usual risk of offending your mentor but you lose a dot from this background each time you do." },
        { name: "Spirit Guide (Arcanum)", cost: [2], summary: "Your mentor is some kind of ghost or unearthly being that you studied and formed a rapport with. You have the ability to summon them. They are unable to aid with corporeal matters like law enforcement or politics but they do have reliable knowledge on ghosts." }
    ],
    flaws: [
        { name: "Adversary", cost: [1, 2, 3], summary: "A rival Hunter who wants to do the Hunter or their cell harm." },
        { name: "Credit Hungry (Arcanum)", cost: [1], summary: "On any Hunt where you call upon your mentor for aid, they will take credit for all achievements but not negative consequences." }
    ]
}

// Resources Merits & Flaws
export const resourcesMeritsAndFlaws: MeritsAndFlaws = {
    title: "💰 Resources",
    merits: [
        { name: "Resources", cost: [1, 2, 3, 4, 5], summary: "Cash flow, be it from stock trading or equipment to working as a barista at night." }
    ],
    flaws: [
        { name: "Destitute", cost: [1], summary: "No money and no home." }
    ]
}

// Retainers Merits & Flaws
export const retainersMeritsAndFlaws: MeritsAndFlaws = {
    title: "� Retainers",
    merits: [
        { name: "Retainers", cost: [1, 2, 3], summary: "Loyal followers who will accomplish a request for the Hunter." }
    ],
    flaws: [
        { name: "Stalkers", cost: [1], summary: "Something about the character tends to attract others who get a little bit too attached and just won't let go. Be it a former retainer or a past lover, should they get rid of them, another soon appears." }
    ]
}

// Safe House Merits & Flaws
export const safeHouseMeritsAndFlaws: MeritsAndFlaws = {
    title: "🏠 Safe House",
    merits: [
        { name: "Safe House", cost: [1, 2, 3], summary: "Each dot adds +1 to the Difficulty or 1 die to the pools for resisting spotting, penetrating and surveilling the Hunter's home. Also add one dice per dot to notice danger while in the Safe House." },
        { name: "Hidden Armory", cost: [1, 2, 3, 4, 5], summary: "Each dot adds one pistol and one long firearm inside the safe house, safely concealed. These aren't as strong as those earned from the Arsenal Edge, nor do they automatically replenish if misplaced." },
        { name: "Panic Room", cost: [1, 2, 3, 4, 5], summary: "The ability to house to individuals and breaching this requires a base Difficulty of 5, this can also be applied to those held captive. Each extra dot allows either twice as many individuals with a cap of 32 in large safe houses or adds +1 to the breach/escape Difficulty. This is not available to 1 dot safe houses." },
        { name: "Watchmen", cost: [1, 2, 3, 4, 5], summary: "Each dot supplies 4 Average Mortals and one Gifted Mortal to watch over the safe house." },
        { name: "Laboratory", cost: [1, 2, 3, 4, 5], summary: "Each dot of this merit contributes to dice rolls related to one Science or Technology specialty. Not available in one dot safe houses." },
        { name: "Luxury", cost: [1], summary: "Rich and full of value, the safe house is well decorated with high-end décor and items. +2 dice bonus to Social tests when mortals are inside the safe house. Without at least 3 dots in Resources, these items are stolen or illegally obtained." },
        { name: "Postern", cost: [1, 2, 3, 4, 5], summary: "The safe house has some kind of secret exit that allows them a safe passage out. For each dot of this merit add one die to pools of evasion or escaping surveillance near the safe house." },
        { name: "Security System", cost: [1, 2, 3, 4, 5], summary: "For each dot of this merit, add one die to pools to resist (or to alert the Hunter to) unwelcome guests into the safe house." },
        { name: "Surgery", cost: [1], summary: "Add two die to relevant pools for relevant tests performed in safe houses." },
        { name: "Bolt Hole", cost: [1], summary: "Whenever hiding or attempting to move from one safe place to another undetected, receive a 2 dice bonus." }
    ],
    flaws: [
        { name: "No Safe House", cost: [1], summary: "The character has no expectation of security while at home." },
        { name: "Creepy", cost: [1], summary: "Take a two-dice penalty on Social pools in the safe house with human guests." },
        { name: "Haunted", cost: [1, 2, 3, 4, 5], summary: "There is a supernatural manifestation taking hold over the safe house with the penalties defined by the Storyteller. It should at least give a one-die penalty or bonus to affected pools used in the safe house per dot of Haunted." },
        { name: "Compromised", cost: [2], summary: "This safe house is on a watchlist and may have been raided at some point, adding two dice to pools to penetrate or watch the safe house." },
        { name: "Interfering Roommate", cost: [1], summary: "The safe house isn't private, with someone else also using it for legitimate purpose, keeping an eye on the character. Suspicious or outright criminal activity will be reported to relevant authorities." }
    ]
}

// Status Merits & Flaws
export const statusMeritsAndFlaws: MeritsAndFlaws = {
    title: "📊 Status",
    merits: [
        { name: "Status", cost: [1, 2, 3, 4, 5], summary: "The character has built a name for themselves with a group of Hunters." }
    ],
    flaws: [
        { name: "Suspect", cost: [1], summary: "Breaking the rules or weaseling out of something owed has netted this character the ire of this Hunter group. Stay out of sight and mind and nothing will happen until they prove their worth again but until then take a 2 dice penalty to Social tests with the offended Hunters." },
        { name: "Shunned", cost: [2], summary: "Despised by a Hunter group, a line was crossed that never should have been, and now members of this group actively work against them at any opportunity." }
    ]
}

// Main merits and flaws array
export const meritsAndFlaws: MeritsAndFlaws[] = [
    linguisticsMeritsAndFlaws,
    theWorldOfAcademiaMeritsAndFlaws,
    looksMeritsAndFlaws,
    nutritionistMeritsAndFlaws,
    mentalFeatsMeritsAndFlaws,
    psychologistTraitsFlaws,
    substanceAbuseFlaws,
    supernaturalSituationsMeritsAndFlaws,
    alliesMeritsAndFlaws,
    contactsMerits,
    fameMeritsAndFlaws,
    influenceMeritsAndFlaws,
    maskMeritsAndFlaws,
    mentorMeritsAndFlaws,
    resourcesMeritsAndFlaws,
    retainersMeritsAndFlaws,
    safeHouseMeritsAndFlaws,
    statusMeritsAndFlaws
]
