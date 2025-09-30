import { z } from "zod"
import { Power, powerSchema, ritualSchema } from "./Disciplines"
import { riteSchema } from "./Rites"
import { specialtySchema } from "./Specialties"
import { skillsSchema } from "./Skills"
import { attributesSchema } from "./Attributes"
import { creedNameSchema, auspiceNameSchema, giftNameSchema } from "./NameSchemas"

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

    // Hunter 5e specific fields
    creed: creedNameSchema, // Replaces 'clan'
    auspice: auspiceNameSchema, // Replaces 'predatorType'
    
    // Temporary compatibility - will be removed later
    clan: creedNameSchema, // For backward compatibility, maps to creed
    predatorType: z.object({
        name: auspiceNameSchema, // For backward compatibility, maps to auspice
        pickedDiscipline: giftNameSchema.optional().default(""),
        pickedSpecialties: specialtySchema.array(),
        pickedMeritsAndFlaws: meritFlawSchema.array(),
    }),

    touchstones: touchstoneSchema.array(),
    ambition: z.string(),
    desire: z.string(),

    attributes: attributesSchema,
    skills: skillsSchema,
    skillSpecialties: specialtySchema.array(),
    
    // Werewolf fields
    availableGiftNames: giftNameSchema.array(), // Replaces availableDisciplineNames
    gifts: powerSchema.array(), // Replaces disciplines
    rites: riteSchema.array(), // Werewolf rites (different from rituals)
    rituals: ritualSchema.array(), // Blood Sorcery rituals (for backward compatibility)
    
    // For backward compatibility
    availableDisciplineNames: giftNameSchema.array(),
    disciplines: powerSchema.array(),

    // Werewolf stats
    rage: z.number().min(0).int(), // Replaces bloodPotency
    gnosis: z.number().min(0).int(), // Replaces generation
    renown: z.object({
        glory: z.number().min(0).int(),
        honor: z.number().min(0).int(),
        wisdom: z.number().min(0).int(),
    }),

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
        auspice: "",
        
        // Backward compatibility
        clan: "",
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
        
        // Werewolf fields
        availableGiftNames: [],
        gifts: [],
        rites: [],
        rituals: [],
        
        // Backward compatibility
        availableDisciplineNames: [],
        disciplines: [],

        // Werewolf stats
        rage: 1,
        gnosis: 1,
        renown: {
            glory: 0,
            honor: 0,
            wisdom: 0,
        },
        
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
