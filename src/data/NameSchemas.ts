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
    z.literal("arsenal"),
    z.literal("fleet"),
    z.literal("ordnance"),
    z.literal("library"),
    z.literal("experimental-medicine"),
    z.literal("improvised-gear"),
    z.literal("global-access"),
    z.literal("drone-jockey"),
    z.literal("beast-whisperer"),
    z.literal("turncoat"),
    z.literal("sense-the-unnatural"),
    z.literal("repel-the-unnatural"),
    z.literal("thwart-the-unnatural"),
    z.literal("artifact"),
    z.literal("cleanse-the-unnatural"),
    z.literal("great-destiny"),
    z.literal("unnatural-changes"),
    z.literal(""),
])
export type EdgeName = z.infer<typeof edgeNameSchema>
