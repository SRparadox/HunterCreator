import { z } from "zod"
import { CreedName, creedNameSchema, edgeNameSchema } from "./NameSchemas"
import entrepreneurialLogo from "../resources/creedIcons/Entrepreneurial.jpg"
import faithfulLogo from "../resources/creedIcons/Faithful.jpg"
import inquisitiveLogo from "../resources/creedIcons/Inquisitive.jpg"
import martialLogo from "../resources/creedIcons/Martial.jpg"
import undergroundLogo from "../resources/creedIcons/Underground.jpg"

export const creedSchema = z.object({
    name: creedNameSchema,
    description: z.string(),
    logo: z.string(),
})
export type Creed = z.infer<typeof creedSchema>
export const creedKeySchema = creedSchema.keyof()
export type CreedKey = z.infer<typeof creedKeySchema>

export const creeds: Record<CreedName, Creed> = {
    "Entrepreneurial": {
        name: "Entrepreneurial",
        description: "Business-minded hunters who use corporate resources and networks to fund and coordinate the hunt",
        logo: entrepreneurialLogo,
    },
    "Faithful": {
        name: "Faithful",
        description: "Deeply religious hunters who see their calling as a divine mission to cleanse the world of evil",
        logo: faithfulLogo,
    },
    "Inquisitive": {
        name: "Inquisitive",
        description: "Scholars and researchers who seek to understand the supernatural through study and investigation",
        logo: inquisitiveLogo,
    },
    "Martial": {
        name: "Martial",
        description: "Military-trained hunters who approach the supernatural threat with tactical precision and overwhelming force",
        logo: martialLogo,
    },
    "Underground": {
        name: "Underground",
        description: "Street-smart hunters who operate in the shadows, using criminal contacts and urban knowledge",
        logo: undergroundLogo,
    },
    "": {
        name: "",
        description: "",
        logo: "",
    },
}