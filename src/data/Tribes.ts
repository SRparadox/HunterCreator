import { z } from "zod"
import blackFuriesLogo from "../resources/tribeIcons/BlackFuries.webp"
import boneGnawersLogo from "../resources/tribeIcons/BoneGnawers.webp"
import childrenOfGaiaLogo from "../resources/tribeIcons/ChildrenofGaia.webp"
import galestalkersLogo from "../resources/tribeIcons/Galestalkers.webp"
import ghostCouncilLogo from "../resources/tribeIcons/GhostCouncil.webp"
import glassWalkersLogo from "../resources/tribeIcons/GlassWalkers.webp"
import hartWardensLogo from "../resources/tribeIcons/HartWardens.webp"
import redTalonsLogo from "../resources/tribeIcons/RedTalons.webp"
import shadowLordsLogo from "../resources/tribeIcons/ShadowLords.webp"
import silentStridersLogo from "../resources/tribeIcons/SilentStriders.webp"
import silverFangsLogo from "../resources/tribeIcons/SilverFangs.webp"
import { TribeName, tribeNameSchema, giftNameSchema } from "./NameSchemas"

export const tribeSchema = z.object({
    name: tribeNameSchema,
    description: z.string(),
    logo: z.string(),
    ban: z.string(),
    favor: z.string(),
    weakness: z.string(),
    patron: z.string(), // Patron spirit/totem
    gifts: giftNameSchema.array(),
    renownType: z.enum(["Glory", "Honor", "Wisdom"]),
    renownDots: z.number(),
})
export type Tribe = z.infer<typeof tribeSchema>
export const tribeKeySchema = tribeSchema.keyof()
export type TribeKey = z.infer<typeof tribeKeySchema>

export const tribes: Record<TribeName, Tribe> = {
    "Black Furies": {
        name: "Black Furies",
        description: "Fierce warrior-women who rage against patriarchal oppression and protect the sacred feminine",
        logo: blackFuriesLogo,
        ban: "Never harm those who are truly innocent or defenseless",
        favor: "Pursue justice at all cost",
        weakness: "Struggle with modern technology and may fly into uncontrollable rage when witnessing injustice",
        patron: "Pegasus, the Divine Stallion of the Moon",
        gifts: ["shadow", "rage"],
        renownType: "Glory",
        renownDots: 2,
    },
    "Bone Gnawers": {
        name: "Bone Gnawers",
        description: "Urban survivors who live among the homeless and forgotten, masters of adaptation",
        logo: boneGnawersLogo,
        ban: "Never ignore the suffering of the downtrodden or homeless",
        favor: "Remain unnoticed to discover secrets",
        weakness: "Often looked down upon by other tribes and struggle with formal social situations",
        patron: "Rat, the Survivor Spirit",
        gifts: ["nature", "wisdom"],
        renownType: "Honor",
        renownDots: 2,
    },
    "Children of Gaia": {
        name: "Children of Gaia",
        description: "Peaceful healers and mediators who seek harmony between all living things",
        logo: childrenOfGaiaLogo,
        ban: "Cannot kill humans except in the most dire circumstances",
        favor: "Pursue higher knowledge and heal wounds",
        weakness: "Sometimes too trusting and may hesitate when decisive action is needed",
        patron: "Unicorn, the Pure Spirit of Healing",
        gifts: ["nature", "wisdom"],
        renownType: "Wisdom",
        renownDots: 2,
    },
    "Galestalkers": {
        name: "Galestalkers",
        description: "Former Get of Fenris who have embraced the modern world while maintaining their warrior spirit",
        logo: galestalkersLogo,
        ban: "Must always face challenges head-on, never retreat from a worthy fight",
        favor: "Relentlessly track your enemies and bring them down",
        weakness: "Struggle with subtlety and may rush into situations without proper planning",
        patron: "Fenris Wolf, the Warrior's Strength",
        gifts: ["technology", "wisdom"],
        renownType: "Honor",
        renownDots: 2,
    },
    "Ghost Council": {
        name: "Ghost Council",
        description: "Mysterious tribe that communes with the spirits of the dead and guards ancient secrets",
        logo: ghostCouncilLogo,
        ban: "Must respect the dead and never disturb ancestral burial grounds",
        favor: "Uncover hidden knowledge and court dangerous allies",
        weakness: "Often appear aloof and may become lost in communion with spirits",
        patron: "Owl, the Silent Watcher of Secrets",
        gifts: ["spirit", "wisdom"],
        renownType: "Wisdom",
        renownDots: 2,
    },
    "Glass Walkers": {
        name: "Glass Walkers",
        description: "Tech-savvy urban werewolves who embrace human civilization and technology",
        logo: glassWalkersLogo,
        ban: "Cannot remain in the wilderness for extended periods without technology",
        favor: "Master technology and human methods of outsmarting enemies",
        weakness: "May become too dependent on technology and lose touch with natural instincts",
        patron: "Cockroach, the Urban Survivor",
        gifts: ["technology", "war"],
        renownType: "Wisdom",
        renownDots: 2,
    },
    "Hart Wardens": {
        name: "Hart Wardens",
        description: "Former Fianna who serve as guardians of sacred groves and keepers of ancient lore",
        logo: hartWardensLogo,
        ban: "Must protect natural sacred sites and cannot refuse hospitality to those in need",
        favor: "Defend and nurture territory",
        weakness: "May become too caught up in revelry and struggle with modern responsibilities",
        patron: "Stag, the Noble Guardian of the Forest",
        gifts: ["nature", "spirit"],
        renownType: "Glory",
        renownDots: 2,
    },
    "Red Talons": {
        name: "Red Talons",
        description: "Fierce lupus-born werewolves who view humanity as a plague upon Gaia",
        logo: redTalonsLogo,
        ban: "Cannot use human technology or live among humans for extended periods",
        favor: "Serve untamed nature with fang and claw",
        weakness: "Struggle to understand human society and may attack humans indiscriminately",
        patron: "Griffin, the Fierce Hunter of the Wild",
        gifts: ["nature", "rage"],
        renownType: "Honor",
        renownDots: 2,
    },
    "Shadow Lords": {
        name: "Shadow Lords",
        description: "Cunning political masterminds who believe they should lead the Garou Nation",
        logo: shadowLordsLogo,
        ban: "Must always seek to be in a position of leadership or influence",
        favor: "Dominate enemies and allies through strength or guile",
        weakness: "Often create enemies through their political machinations and power-hungry nature",
        patron: "Thunder Bird, the Storm of Dominance",
        gifts: ["shadow", "war"],
        renownType: "Glory",
        renownDots: 2,
    },
    "Silent Striders": {
        name: "Silent Striders",
        description: "Nomadic messengers and scouts who roam between the worlds of the living and dead",
        logo: silentStridersLogo,
        ban: "Cannot stay in one place for more than a lunar month",
        favor: "Wander the land and explore the spirit wilderness",
        weakness: "Often feel isolated and may have difficulty forming lasting relationships",
        patron: "Owl, the Silent Messenger of the Night",
        gifts: ["spirit", "wisdom"],
        renownType: "Wisdom",
        renownDots: 2,
    },
    "Silver Fangs": {
        name: "Silver Fangs",
        description: "Noble-born leaders of the Garou, blessed with pure blood but cursed with madness",
        logo: silverFangsLogo,
        ban: "Must maintain their honor and never show cowardice in the face of danger",
        favor: "Assume leadership through ancient pacts with Garou and spirits",
        weakness: "Prone to madness and may become obsessed with bloodline purity",
        patron: "Falcon, the Noble Leader of the Sky",
        gifts: ["war", "wisdom"],
        renownType: "Honor",
        renownDots: 2,
    },
    "": {
        name: "",
        description: "",
        logo: "",
        ban: "",
        favor: "",
        weakness: "",
        patron: "",
        gifts: [],
        renownType: "Honor",
        renownDots: 0,
    },
}
