import { z } from "zod"
import { Power, powerSchema, ritualSchema } from "./Disciplines"
import { specialtySchema } from "./Specialties"
import { skillsSchema } from "./Skills"
import { attributesSchema } from "./Attributes"
import { creedNameSchema, driveNameSchema, edgeNameSchema } from "./NameSchemas"

export const meritFlawSchema = z.object({
    name: z.string(),
    level: z.number().min(1).int(),
    summary: z.string(),
    type: z.union([z.literal("merit"), z.literal("flaw")]),
})
export type MeritFlaw = z.infer<typeof meritFlawSchema>

export const touchstoneSchema = z.object({
    name: z.string(),
    description: z.string(),
    conviction: z.string(),
})
export type Touchstone = z.infer<typeof touchstoneSchema>

export const characterSchema = z.object({
    name: z.string(),
    playerName: z.string().optional(), // New field for player name
    description: z.string(),
    appearance: z.string().optional(), // New field for appearance
    history: z.string().optional(), // New field for character history
    notes: z.string().optional(), // New field for character notes
    pack: z.string(), // Replaces 'sire'
    concept: z.string(), // New Werewolf field
    chronicle: z.string(), // New Werewolf field

    // Hunter: The Reckoning 5e specific fields
    creed: creedNameSchema,
    drive: driveNameSchema,
    availableEdgeNames: edgeNameSchema.array(),
    edges: powerSchema.array(), // Using same structure as disciplines for Hunter Edges
    
    // Legacy compatibility fields
    clan: z.string(), // For backward compatibility
    tribe: z.string(), // For backward compatibility
    predatorType: z.object({
        name: z.string(), // For backward compatibility
        pickedDiscipline: z.string().optional().default(""),
        pickedSpecialties: specialtySchema.array(),
        pickedMeritsAndFlaws: meritFlawSchema.array(),
    }),

    touchstones: touchstoneSchema.array(),
    ambition: z.string(),
    desire: z.string(),

    attributes: attributesSchema,
    skills: skillsSchema,
    skillSpecialties: specialtySchema.array(),
    
    // Legacy vampire fields for backward compatibility
    availableDisciplineNames: z.string().array(),
    disciplines: powerSchema.array(),
    rituals: ritualSchema.array(), // Blood Sorcery rituals (for backward compatibility)

    // Hunter stats (using some legacy names for compatibility)
    rage: z.number().min(0).int(), // Used for conviction in Hunter
    gnosis: z.number().min(0).int(), // Used for desperation in Hunter

    // For backward compatibility
    bloodPotency: z.number().min(0).int(),

    maxHealth: z.number().min(0).int(),
    willpower: z.number().min(0).int(),
    experience: z.number().min(0).int(),
    humanity: z.number().min(0).int(), // Will be replaced with harmony later

    merits: meritFlawSchema.array(),
    flaws: meritFlawSchema.array(),
})
export type Character = z.infer<typeof characterSchema>

export const getEmptyCharacter = (): Character => {
    return {
        name: "",
        playerName: "", // New field for player name
        description: "",
        appearance: "", // New field for appearance
        history: "", // New field for character history
        notes: "", // New field for character notes
        pack: "", // Replaces sire
        concept: "", // New Werewolf field
        chronicle: "", // New Werewolf field

        // Hunter fields
        creed: "",
        drive: "",
        availableEdgeNames: [],
        edges: [],
        
        // Legacy compatibility
        clan: "",
        tribe: "",
        predatorType: { name: "", pickedDiscipline: "", pickedSpecialties: [], pickedMeritsAndFlaws: [] },
        
        touchstones: [],
        ambition: "",
        desire: "",

        attributes: {
            strength: 1,
            dexterity: 1,
            stamina: 1,
            charisma: 1,
            manipulation: 1,
            composure: 1,
            intelligence: 1,
            wits: 1,
            resolve: 1,
        },
        skills: {
            athletics: 0,
            brawl: 0,
            craft: 0,
            drive: 0,
            firearms: 0,
            melee: 0,
            larceny: 0,
            stealth: 0,
            survival: 0,
            "animal ken": 0,
            etiquette: 0,
            insight: 0,
            intimidation: 0,
            leadership: 0,
            performance: 0,
            persuasion: 0,
            streetwise: 0,
            subterfuge: 0,
            academics: 0,
            awareness: 0,
            finance: 0,
            investigation: 0,
            medicine: 0,
            occult: 0,
            politics: 0,
            science: 0,
            technology: 0,
        },
        skillSpecialties: [],
        
        // Legacy vampire fields
        availableDisciplineNames: [],
        disciplines: [],
        rituals: [],

        // Hunter stats
        rage: 1, // Used for conviction in Hunter
        gnosis: 1, // Used for desperation in Hunter
        
        // Backward compatibility
        bloodPotency: 0,

        maxHealth: 0,
        willpower: 0,
        experience: 0,
        humanity: 0,

        merits: [],
        flaws: [],
    }
}

export const containsBloodSorcery = (powers: Power[]) => powers.filter((power) => power.discipline === "blood sorcery").length > 0
