import { z } from "zod"
import { EdgeName, edgeNameSchema } from "./NameSchemas"

export const edgeSchema = z.object({
    name: edgeNameSchema,
    description: z.string(),
    logo: z.string(),
    type: z.enum(["Physical", "Mental", "Social", "Supernatural"]),
    examples: z.string().array(),
})
export type Edge = z.infer<typeof edgeSchema>
export const edgeKeySchema = edgeSchema.keyof()
export type EdgeKey = z.infer<typeof edgeKeySchema>

export const edges: Record<EdgeName, Edge> = {
    "arsenal": {
        name: "arsenal",
        description: "Access to weapons, equipment, and military-grade gear that most civilians can't obtain",
        logo: "", // Will need to add logo paths
        type: "Physical",
        examples: [
            "Firearms and ammunition",
            "Body armor and protective gear", 
            "Explosives and demolition equipment",
            "Surveillance and communication devices"
        ],
    },
    "blessed": {
        name: "blessed",
        description: "Divine protection or supernatural immunity that shields you from certain supernatural effects",
        logo: "",
        type: "Supernatural",
        examples: [
            "Resistance to supernatural fear",
            "Protection from mind control",
            "Immunity to certain supernatural attacks",
            "Enhanced intuition about supernatural threats"
        ],
    },
    "fleet": {
        name: "fleet",
        description: "Fast transportation and the ability to move quickly across distances",
        logo: "",
        type: "Physical", 
        examples: [
            "High-performance vehicles",
            "Aircraft or watercraft access",
            "Knowledge of shortcuts and routes",
            "Enhanced reflexes and speed"
        ],
    },
    "library": {
        name: "library",
        description: "Access to extensive knowledge and research capabilities about the supernatural",
        logo: "",
        type: "Mental",
        examples: [
            "Occult texts and forbidden knowledge",
            "Historical records and archives",
            "Academic contacts and resources",
            "Research databases and information networks"
        ],
    },
    "net": {
        name: "net",
        description: "Connections to networks of people who can provide information, resources, or assistance",
        logo: "",
        type: "Social",
        examples: [
            "Contacts in law enforcement",
            "Government connections",
            "Underground information networks",
            "Other hunter organizations"
        ],
    },
    "ordnance": {
        name: "ordnance",
        description: "Access to heavy weapons, explosives, and military-grade destructive capabilities",
        logo: "",
        type: "Physical",
        examples: [
            "Heavy weapons and artillery",
            "Military-grade explosives",
            "Specialized ammunition",
            "Demolition expertise and equipment"
        ],
    },
    "pursuit": {
        name: "pursuit",
        description: "Enhanced ability to track, hunt, and follow supernatural targets",
        logo: "",
        type: "Mental",
        examples: [
            "Advanced tracking skills",
            "Investigation and forensics knowledge",
            "Supernatural sensing abilities",
            "Persistence and determination in the hunt"
        ],
    },
    "stake": {
        name: "stake",
        description: "Knowledge of supernatural weaknesses and the tools to exploit them",
        logo: "",
        type: "Mental",
        examples: [
            "Knowledge of monster weaknesses",
            "Specialized weapons for specific creatures",
            "Protective wards and barriers",
            "Counter-supernatural techniques"
        ],
    },
    "": {
        name: "",
        description: "",
        logo: "",
        type: "Physical",
        examples: [],
    },
}