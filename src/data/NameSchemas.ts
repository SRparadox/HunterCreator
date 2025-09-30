import { z } from "zod"

// This file exists to break issues with circular imports

export const clanNameSchema = z.union([
    z.literal("Brujah"),
    z.literal("Gangrel"),
    z.literal("Nosferatu"),
    z.literal("Malkavian"),
    z.literal("Tremere"),
    z.literal("Ventrue"),
    z.literal("Toreador"),

    z.literal("Lasombra"),
    z.literal("Banu Haqim"),
    z.literal("Ministry"),
    z.literal("Ravnos"),
    z.literal("Tzimisce"),
    z.literal("Hecata"),
    z.literal("Salubri"),

    z.literal("Caitiff"),
    z.literal("Thin-blood"),

    z.literal(""),
])
export type ClanName = z.infer<typeof clanNameSchema>

export const tribeNameSchema = z.union([
    z.literal("Black Furies"),
    z.literal("Bone Gnawers"),
    z.literal("Children of Gaia"),
    z.literal("Galestalkers"),
    z.literal("Ghost Council"),
    z.literal("Glass Walkers"),
    z.literal("Hart Wardens"),
    z.literal("Red Talons"),
    z.literal("Shadow Lords"),
    z.literal("Silent Striders"),
    z.literal("Silver Fangs"),
    z.literal(""),
])
export type TribeName = z.infer<typeof tribeNameSchema>

export const disciplineNameSchema = z.union([
    z.literal("animalism"),
    z.literal("auspex"),
    z.literal("celerity"),
    z.literal("dominate"),
    z.literal("fortitude"),
    z.literal("obfuscate"),
    z.literal("potence"),
    z.literal("presence"),
    z.literal("protean"),
    z.literal("blood sorcery"),

    z.literal("oblivion"),
    z.literal("thin-blood alchemy"),

    z.literal(""),
])
export type DisciplineName = z.infer<typeof disciplineNameSchema>

export const giftNameSchema = z.union([
    z.literal("rage"),
    z.literal("wisdom"),
    z.literal("war"),
    z.literal("nature"),
    z.literal("technology"),
    z.literal("spirit"),
    z.literal("shadow"),
    z.literal(""),
])
export type GiftName = z.infer<typeof giftNameSchema>

export const auspiceNameSchema = z.union([
    z.literal("Ragabash"),
    z.literal("Theurge"),
    z.literal("Philodox"),
    z.literal("Galliard"),
    z.literal("Ahroun"),
    z.literal(""),
])
export type AuspiceName = z.infer<typeof auspiceNameSchema>

export const predatorTypeNameSchema = z.union([
    z.literal("Alleycat"),
    z.literal("Extortionist"),
    z.literal("Roadside Killer"),
    z.literal("Montero"),
    z.literal("Cleaver"),
    z.literal("Consensualist"),
    z.literal("Osiris"),
    z.literal("Scene Queen"),
    z.literal("Siren"),
    z.literal("Sandman"),
    z.literal("Grim Reaper"),
    z.literal("Graverobber"),
    z.literal("Pursuer"),
    z.literal("Trapdoor"),
    z.literal("Bagger"),
    z.literal("Blood Leech"),
    z.literal("Farmer"),
    z.literal(""),
])
export type PredatorTypeName = z.infer<typeof predatorTypeNameSchema>

// Hunter: The Reckoning schemas
export const creedNameSchema = z.union([
    z.literal("Entrepreneurial"),
    z.literal("Faithful"),
    z.literal("Inquisitive"),
    z.literal("Martial"),
    z.literal("Underground"),
    z.literal(""),
])
export type CreedName = z.infer<typeof creedNameSchema>

export const driveNameSchema = z.union([
    z.literal("Curiosity"),
    z.literal("Vengeance"),
    z.literal("Oath"),
    z.literal("Greed"),
    z.literal("Pride"),
    z.literal("Envy"),
    z.literal("Atonement"),
    z.literal(""),
])
export type DriveName = z.infer<typeof driveNameSchema>

export const edgeNameSchema = z.union([
    z.literal("Arsenal"),
    z.literal("Fleet"),
    z.literal("Library"),
    z.literal("Experimental Medicine"),
    z.literal("Improvised Gear"),
    z.literal("Global Access"),
    z.literal("Drone Jockey"),
    z.literal("Beast Whisperer"),
    z.literal("Turncoat"),
    z.literal("Sense the Unnatural"),
    z.literal("Repel the Unnatural"),
    z.literal("Artifact"),
    z.literal("Cleanse the Unnatural"),
    z.literal("Great Destiny"),
    z.literal("Unnatural Changes"),
    z.literal(""),
])
export type EdgeName = z.infer<typeof edgeNameSchema>
