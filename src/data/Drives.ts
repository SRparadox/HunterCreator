import { z } from "zod"
import { DriveName, driveNameSchema } from "./NameSchemas"

export const driveSchema = z.object({
    name: driveNameSchema,
    description: z.string(),
    logo: z.string(),
    shortDescription: z.string(),
    aspirations: z.string().array(),
})
export type Drive = z.infer<typeof driveSchema>
export const driveKeySchema = driveSchema.keyof()
export type DriveKey = z.infer<typeof driveKeySchema>

export const drives: Record<DriveName, Drive> = {
    "Ambition": {
        name: "Ambition",
        description: "You are driven to achieve greatness, to rise above your station and make your mark on the world. Power, success, and recognition fuel your every action.",
        logo: "", // Will need to add logo paths
        shortDescription: "Driven to achieve greatness and power",
        aspirations: [
            "Gain a position of authority in an organization",
            "Acquire significant wealth or resources",
            "Become recognized as an expert in your field"
        ],
    },
    "Compassion": {
        name: "Compassion",
        description: "You are motivated by empathy and the desire to help others. You cannot stand to see suffering and will go to great lengths to alleviate pain.",
        logo: "",
        shortDescription: "Motivated by empathy and helping others",
        aspirations: [
            "Save someone from a dangerous situation",
            "Establish or support a charity or aid organization",
            "Reconcile enemies or heal old wounds"
        ],
    },
    "Destruction": {
        name: "Destruction",
        description: "You are compelled to tear down what you see as corrupt, false, or harmful. Sometimes destruction is necessary for renewal.",
        logo: "",
        shortDescription: "Compelled to tear down corruption",
        aspirations: [
            "Expose a major conspiracy or cover-up",
            "Destroy a corrupt institution or organization",
            "Eliminate a supernatural threat to humanity"
        ],
    },
    "Justice": {
        name: "Justice",
        description: "You seek to right wrongs and ensure that those who harm others face consequences. The guilty must be punished and the innocent protected.",
        logo: "",
        shortDescription: "Seeks to right wrongs and punish the guilty",
        aspirations: [
            "See a criminal brought to justice",
            "Protect an innocent from harm",
            "Correct a historical injustice"
        ],
    },
    "Knowledge": {
        name: "Knowledge",
        description: "You are driven by curiosity and the need to understand. Truth and understanding are more valuable than comfort or safety.",
        logo: "",
        shortDescription: "Driven by curiosity and need to understand",
        aspirations: [
            "Uncover a significant supernatural secret",
            "Master a new skill or area of expertise",
            "Document important discoveries for future generations"
        ],
    },
    "Protection": {
        name: "Protection",
        description: "You feel compelled to safeguard people, places, or ideals that you hold dear. You are the shield between the innocent and danger.",
        logo: "",
        shortDescription: "Compelled to safeguard what you hold dear",
        aspirations: [
            "Keep your family or friends safe from supernatural threats",
            "Establish a safe haven for other hunters",
            "Preserve an important location or artifact"
        ],
    },
    "Revenge": {
        name: "Revenge",
        description: "You are motivated by the need to get back at those who have wronged you or others. Past injustices drive you forward.",
        logo: "",
        shortDescription: "Motivated by the need for retribution",
        aspirations: [
            "Track down and confront those who wronged you",
            "Make an enemy pay for their crimes",
            "Restore your reputation or honor"
        ],
    },
    "Survival": {
        name: "Survival",
        description: "You are driven by the basic need to survive and protect your way of life. In a world full of monsters, simply staying alive is victory enough.",
        logo: "",
        shortDescription: "Driven by the need to survive",
        aspirations: [
            "Escape from a dangerous situation",
            "Secure resources needed for survival",
            "Eliminate a threat to your continued existence"
        ],
    },
    "": {
        name: "",
        description: "",
        logo: "",
        shortDescription: "",
        aspirations: [],
    },
}