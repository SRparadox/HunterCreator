import { z } from "zod"
import entrepreneurialLogo from "../resources/creedIcons/Entrepreneurial.jpg"
import faithfulLogo from "../resources/creedIcons/Faithful.jpg"
import inquisitiveLogo from "../resources/creedIcons/Inquisitive.jpg"
import martialLogo from "../resources/creedIcons/Martial.jpg"
import undergroundLogo from "../resources/creedIcons/Underground.jpg"
import { CreedName, creedNameSchema } from "./NameSchemas"

export const creedSchema = z.object({
    name: creedNameSchema,
    description: z.string(),
    logo: z.string(),
    drive: z.string(),
    desperation: z.string(),
    approach: z.string(),
    weakness: z.string(),
})
export type Creed = z.infer<typeof creedSchema>
export const creedKeySchema = creedSchema.keyof()
export type CreedKey = z.infer<typeof creedKeySchema>

export const creeds: Record<CreedName, Creed> = {
    "Entrepreneurial": {
        name: "Entrepreneurial",
        description: "Business-minded hunters who use resources, connections, and influence to fight the supernatural",
        logo: entrepreneurialLogo,
        drive: "Build networks and acquire resources to fund the hunt",
        desperation: "Will sacrifice morals and relationships for profit and power",
        approach: "Systematic, well-funded operations with professional equipment",
        weakness: "May prioritize profit over protecting innocents",
    },
    "Faithful": {
        name: "Faithful",
        description: "Religious hunters who see their mission as a holy war against evil and darkness",
        logo: faithfulLogo,
        drive: "Serve their faith and protect the innocent from supernatural corruption",
        desperation: "Will use increasingly extreme measures to 'save' people",
        approach: "Ritualistic methods, blessed weapons, and divine protection",
        weakness: "Rigid thinking and potential for fanaticism",
    },
    "Inquisitive": {
        name: "Inquisitive",
        description: "Academic hunters who seek to understand and document supernatural phenomena",
        logo: inquisitiveLogo,
        drive: "Uncover the truth about the supernatural world",
        desperation: "Will risk everything, including lives, for knowledge",
        approach: "Research, investigation, and scientific methodology",
        weakness: "May hesitate to act while gathering more information",
    },
    "Martial": {
        name: "Martial",
        description: "Military-trained hunters who approach the supernatural as enemy combatants",
        logo: martialLogo,
        drive: "Eliminate supernatural threats through superior tactics and firepower",
        desperation: "Will escalate to extreme violence and collateral damage",
        approach: "Direct confrontation with military precision and heavy weapons",
        weakness: "May see all supernatural beings as enemies to be destroyed",
    },
    "Underground": {
        name: "Underground",
        description: "Street-smart hunters who work from the shadows using criminal networks",
        logo: undergroundLogo,
        drive: "Protect their community from supernatural predators",
        desperation: "Will break laws and hurt innocents to achieve their goals",
        approach: "Stealth, street contacts, and unconventional tactics",
        weakness: "May become criminals themselves in pursuit of their mission",
    },
    "": {
        name: "",
        description: "",
        logo: "",
        drive: "",
        desperation: "",
        approach: "",
        weakness: "",
    },
}