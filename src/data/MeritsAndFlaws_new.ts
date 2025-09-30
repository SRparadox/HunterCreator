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

// Physical Merits & Flaws
export const physicalMeritsAndFlaws: MeritsAndFlaws = {
    title: "🏃 Physical",
    merits: [
        { name: "Ambidextrous", cost: [3], summary: "No off-hand penalty when using two weapons or tools simultaneously" },
        { name: "Catlike Balance", cost: [1], summary: "+2 dice to balance-related rolls" },
        { name: "Double-Jointed", cost: [1], summary: "+2 dice to escape bonds or fit through tight spaces" },
        { name: "Early Riser", cost: [1], summary: "Always wake up at first light, +1 die to morning activities" },
        { name: "Efficient Digestion", cost: [3], summary: "Need half as much food; can survive on minimal rations" },
        { name: "Fleet of Foot", cost: [1, 2, 3], summary: "Movement speed increased by Merit rating" },
        { name: "Giant", cost: [4], summary: "+1 Health level, +1 die to intimidation, -2 dice to stealth" },
        { name: "Graceful", cost: [2], summary: "+2 dice to Dexterity + Athletics for fluid movement" },
        { name: "Iron Stomach", cost: [2], summary: "Immune to ingested toxins and spoiled food" },
        { name: "Natural Swimmer", cost: [1], summary: "+2 dice to swimming rolls" },
        { name: "Perfect Balance", cost: [1], summary: "+3 dice to maintain balance in precarious situations" },
        { name: "Tough", cost: [3], summary: "+1 Health level" }
    ],
    flaws: [
        { name: "Bad Sight", cost: [1, 2], summary: "+1/+2 difficulty to perception rolls beyond arm's reach" },
        { name: "Diminutive", cost: [4], summary: "-1 Health level, +2 dice to hide, -2 dice to intimidate" },
        { name: "Hard of Hearing", cost: [1], summary: "+2 difficulty to hearing-based perception rolls" },
        { name: "Lame", cost: [3], summary: "Movement speed halved, +1 difficulty to physical actions" },
        { name: "Monstrous", cost: [3], summary: "Appear obviously inhuman, -3 dice to social rolls with humans" },
        { name: "Mute", cost: [4], summary: "Cannot speak, must rely on other forms of communication" },
        { name: "One Arm", cost: [3], summary: "Missing an arm, cannot perform two-handed actions" },
        { name: "One Eye", cost: [2], summary: "No depth perception, +1 difficulty to ranged attacks" },
        { name: "Short", cost: [1], summary: "-1 die to intimidation, +1 die to hide" },
        { name: "Slow Healing", cost: [3], summary: "All healing times doubled" },
        { name: "Weak", cost: [3], summary: "-1 die to all Strength rolls" }
    ]
}

// Mental Merits & Flaws  
export const mentalMeritsAndFlaws: MeritsAndFlaws = {
    title: "🧠 Mental",
    merits: [
        { name: "Common Sense", cost: [1], summary: "Storyteller warns you before obviously dangerous actions" },
        { name: "Computer Aptitude", cost: [2], summary: "+2 dice to all computer-related rolls" },
        { name: "Concentration", cost: [1], summary: "+2 dice to resist distraction" },
        { name: "Danger Sense", cost: [2], summary: "Roll Wits + Alertness to sense immediate danger" },
        { name: "Eidetic Memory", cost: [2], summary: "Perfect recall of anything experienced" },
        { name: "Iron Will", cost: [3], summary: "+3 dice to resist mental domination or emotional manipulation" },
        { name: "Language", cost: [1], summary: "Fluent in an additional language per dot" },
        { name: "Lightning Calculator", cost: [1], summary: "Perform complex math instantly in your head" },
        { name: "Natural Linguist", cost: [2], summary: "Learn new languages in half the time" },
        { name: "Photographic Memory", cost: [3], summary: "Perfect visual recall, +2 dice to remember visual details" },
        { name: "Time Sense", cost: [1], summary: "Always know the current time and track time passage perfectly" }
    ],
    flaws: [
        { name: "Amnesia", cost: [2], summary: "No memory of life before the Awakening" },
        { name: "Absent-Minded", cost: [3], summary: "Frequently forget important details and appointments" },
        { name: "Confused", cost: [2], summary: "+1 difficulty to all mental rolls" },
        { name: "Nightmares", cost: [1], summary: "Disturbing dreams prevent restful sleep" },
        { name: "Phobia", cost: [1, 2, 3], summary: "Paralyzing fear of specific object or situation" },
        { name: "Short Fuse", cost: [2], summary: "+2 difficulty to resist frenzy from anger" },
        { name: "Soft-Hearted", cost: [1], summary: "Cannot ignore others' suffering, -2 dice to callous actions" },
        { name: "Territorial", cost: [2], summary: "Must defend your territory aggressively" },
        { name: "Vengeance", cost: [2], summary: "Obsessed with revenge against specific enemy" },
        { name: "Ward", cost: [3], summary: "Must protect a mortal who depends on you" }
    ]
}

// Social Merits & Flaws
export const socialMeritsAndFlaws: MeritsAndFlaws = {
    title: "👥 Social",
    merits: [
        { name: "Animal Magnetism", cost: [1], summary: "+1 die to social rolls to attract others" },
        { name: "Charming", cost: [1], summary: "+1 die to social rolls involving charm or persuasion" },
        { name: "Diplomatic Immunity", cost: [2], summary: "Legal immunity due to political status" },
        { name: "Fame", cost: [1, 2, 3], summary: "Well-known in specific field, +1 die per dot to relevant social rolls" },
        { name: "Intimidating", cost: [1], summary: "+2 dice to intimidation rolls" },
        { name: "Natural Leader", cost: [1], summary: "+1 die to leadership and inspiring rolls" },
        { name: "Reputation", cost: [2], summary: "+2 dice to social rolls within specific community" },
        { name: "Soothing Voice", cost: [2], summary: "+2 dice to calm others or reduce aggression" },
        { name: "Trustworthy", cost: [1], summary: "Others instinctively trust you, +1 die to social rolls" }
    ],
    flaws: [
        { name: "Dark Secret", cost: [1], summary: "Devastating secret that would ruin you if revealed" },
        { name: "Hunted", cost: [4], summary: "Actively pursued by dangerous enemy" },
        { name: "Intolerance", cost: [1], summary: "-2 dice to social rolls with specific group you despise" },
        { name: "Notoriety", cost: [3], summary: "Bad reputation precedes you, -1 to social rolls" },
        { name: "Persistent Parents", cost: [2], summary: "Human parents constantly interfere in your life" },
        { name: "Shy", cost: [1], summary: "+1 difficulty to social rolls with strangers" },
        { name: "Social Outcast", cost: [3], summary: "Rejected by Garou society, -2 dice to social rolls with Garou" },
        { name: "Speech Impediment", cost: [1], summary: "+1 difficulty to verbal social rolls" },
        { name: "Twisted Upbringing", cost: [1], summary: "Unusual childhood affects your worldview" }
    ]
}

// Supernatural Merits & Flaws
export const supernaturalMeritsAndFlaws: MeritsAndFlaws = {
    title: "🌙 Supernatural",
    merits: [
        { name: "Calm Heart", cost: [3], summary: "+2 dice to resist frenzy" },
        { name: "Dual Nature", cost: [2], summary: "Have two Nature archetypes, can regain Willpower from either" },
        { name: "Fae Sight", cost: [3], summary: "Can see through supernatural illusions and glamour" },
        { name: "Healing Touch", cost: [1], summary: "+2 dice to First Aid rolls" },
        { name: "Higher Purpose", cost: [1], summary: "+1 die to rolls directly related to your higher purpose" },
        { name: "Luck", cost: [3], summary: "Once per session, re-roll any failed roll" },
        { name: "Magic Resistance", cost: [2], summary: "+2 dice to resist supernatural powers" },
        { name: "Medium", cost: [2], summary: "Can see and communicate with ghosts" },
        { name: "Natural Channel", cost: [3], summary: "+2 dice to all spirit-related rolls" },
        { name: "Psychic", cost: [2], summary: "Minor psychic abilities, can sense supernatural presences" },
        { name: "Spirit Mentor", cost: [3], summary: "Powerful spirit guide provides advice and occasional aid" },
        { name: "True Faith", cost: [7], summary: "Genuine religious faith provides protection against supernatural evil" }
    ],
    flaws: [
        { name: "Cursed", cost: [1, 2, 3, 4, 5], summary: "Subject to a supernatural curse of varying severity" },
        { name: "Foe from the Past", cost: [1, 2, 3], summary: "Enemy from past life seeks revenge" },
        { name: "Haunted", cost: [3], summary: "Followed by troublesome ghost" },
        { name: "Jinxed", cost: [4], summary: "Technology malfunctions around you more than normal for Garou" },
        { name: "Mark of the Predator", cost: [2], summary: "Animals fear you, technology fails more often" },
        { name: "Primal Marks", cost: [3], summary: "Permanent physical marks of your Crinos form show in human form" },
        { name: "Sign of the Wolf", cost: [2], summary: "Wolves and wolf-dogs react aggressively to you" },
        { name: "Slip Sideways", cost: [1], summary: "Randomly slip into the Umbra during stress" },
        { name: "Taint of Corruption", cost: [1, 2, 3, 4, 5], summary: "Corrupted by Wyrm influence" },
        { name: "Forced Transformation", cost: [1, 2, 4], summary: "Transform involuntarily under specific conditions" }
    ]
}

// Backgrounds
export const backgroundsData: BackgroundsData = {
    title: "📚 Backgrounds",
    backgrounds: [
        { name: "Allies", cost: [1, 2, 3, 4, 5], summary: "Human or Garou who will help you" },
        { name: "Ancestors", cost: [1, 2, 3, 4, 5], summary: "Guidance from ancestral spirits" },
        { name: "Contacts", cost: [1, 2, 3, 4, 5], summary: "Network of information sources" },
        { name: "Fate", cost: [1, 2, 3, 4, 5], summary: "Destiny guides and protects you" },
        { name: "Fetish", cost: [1, 2, 3, 4, 5], summary: "Spirit-inhabited magical item" },
        { name: "Kinfolk", cost: [1, 2, 3, 4, 5], summary: "Human or wolf relatives who know the truth" },
        { name: "Mentor", cost: [1, 2, 3, 4, 5], summary: "Older Garou who teaches and guides you" },
        { name: "Past Life", cost: [1, 2, 3, 4, 5], summary: "Memories from previous incarnations" },
        { name: "Pure Breed", cost: [1, 2, 3, 4, 5], summary: "Strong connection to wolf or human ancestry" },
        { name: "Resources", cost: [1, 2, 3, 4, 5], summary: "Wealth and material possessions" },
        { name: "Rites", cost: [1, 2, 3, 4, 5], summary: "Knowledge of Garou rituals" },
        { name: "Totem", cost: [1, 2, 3, 4, 5], summary: "Shared pack totem spirit" }
    ]
}

// Main merits and flaws array
export const meritsAndFlaws: MeritsAndFlaws[] = [
    physicalMeritsAndFlaws,
    mentalMeritsAndFlaws,
    socialMeritsAndFlaws,
    supernaturalMeritsAndFlaws
]
