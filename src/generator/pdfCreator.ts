import { notifications } from "@mantine/notifications"
import fontkit from "@pdf-lib/fontkit"
import { PDFBool, PDFDocument, PDFFont, PDFForm, PDFName } from "pdf-lib"
import { Character } from "../data/Character"
import { SkillsKey, skillsKeySchema } from "../data/Skills"
import { attributesKeySchema } from "../data/Attributes"
import { Power, Ritual } from "../data/Disciplines"
import { Gift } from "../data/Gifts"
import base64Pdf_werewolf from "../resources/WtA5e_ENG_Sheet_2pMINI.base64?raw"
import { upcase } from "./utils"
import { DisciplineName } from "~/data/NameSchemas"

let customFont: PDFFont

const initPDFDocument = async (bytes: ArrayBufferLike): Promise<PDFDocument> => {
    const pdfDoc = await PDFDocument.load(bytes as ArrayBuffer)

    pdfDoc.registerFontkit(fontkit)
    const fontBytes = await fetch("fonts/Roboto-Regular.ttf").then((res) => res.arrayBuffer())
    customFont = await pdfDoc.embedFont(fontBytes) // enables writing characters like "старый"

    return pdfDoc
}

export const testTemplate = async (basePdf: string) => {
    let form
    try {
        const bytes = base64ToArrayBuffer(basePdf)
        const pdfDoc = await initPDFDocument(bytes)

        form = pdfDoc.getForm()
    } catch (err) {
        return { success: false, error: new Error("Can't get form from pdf - is it a fillable pdf?") }
    }
    try {
        form.getTextField("Name").setText("")
        // Try werewolf fields first, fallback to vampire fields for compatibility
        try {
            form.getTextField("Auspice").setText("")
            form.getTextField("Player").setText("")
            form.getTextField("Tribe").setText("")
            form.getTextField("Chronicle").setText("")
            form.getTextField("Patron").setText("")
        } catch (e) {
            // Werewolf fields don't exist in this PDF
        }
    } catch (err) {
        return {
            success: false,
            error: new Error("PDF doesn't contain required fields - is it the correct Werewolf character sheet?"),
        }
    }

    return { success: true, error: null }
}

const downloadPdf = (fileName: string, bytes: Uint8Array) => {
    const blob = new Blob([bytes as any], { type: "application/pdf" })
    const link = document.createElement("a")

    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
}

const createPdf_nerdbert = async (character: Character): Promise<Uint8Array> => {
    const bytes = base64ToArrayBuffer(base64Pdf_werewolf)

    const pdfDoc = await initPDFDocument(bytes)
    const form = pdfDoc.getForm()

    // Attributes
    const attributes = character.attributes
    ;["strength", "dexterity", "stamina", "charisma", "manipulation", "composure", "intelligence", "wits", "resolve"]
        .map((a) => attributesKeySchema.parse(a))
        .forEach((attr) => {
            const lvl = attributes[attr]
            for (let i = 1; i <= lvl; i++) {
                form.getCheckBox(`${upcase(attr).slice(0, 3)}-${i}`).check()
            }
        })

    // Skills
    const setSpecialty = (skillName: SkillsKey, textFieldKey: string) => {
        const specialties = (character.skillSpecialties || [])
            .filter((s) => s.skill === skillName)
            .filter((s) => s.name !== "")
            .map((s) => s.name)

        if (specialties.length > 0) form.getTextField(textFieldKey).setText(specialties.join(", "))
    }

    const skills = character.skills
    ;["athletics", "brawl", "craft", "drive", "melee", "larceny", "survival"]
        .map((s) => skillsKeySchema.parse(s))
        .forEach((skill) => {
            const lvl = skills[skill]
            for (let i = 1; i <= lvl; i++) {
                form.getCheckBox(`${upcase(skill).slice(0, 3)}-${i}`).check()
            }
            setSpecialty(skill, `spec${upcase(skill).slice(0, 3)}`)
        })

    const aniKenLvl = skills["animal ken"]
    for (let i = 1; i <= aniKenLvl; i++) {
        form.getCheckBox(`AniKen-${i}`).check()
    }
    setSpecialty("animal ken", "specAniKen")

    // PDF-issue: Lead-1, but specLea  (4 letters vs 3 letters)
    const leadLvl = skills["leadership"]
    for (let i = 1; i <= leadLvl; i++) {
        form.getCheckBox(`Lead-${i}`).check()
    }
    setSpecialty("leadership", "specLea")

    const stealthLvl = skills["stealth"]
    for (let i = 1; i <= stealthLvl; i++) {
        form.getCheckBox(`Ste-${i}`).check()
    }
    setSpecialty("stealth", "specStea")

    // PDF-issue: "Fri-1" instead of "Fir-1"
    const fireLvl = skills["firearms"]
    for (let i = 1; i <= fireLvl; i++) {
        form.getCheckBox(`Fri-${i}`).check()
    }
    setSpecialty("firearms", "specFir")

    // PDF-issue: Stre-1-1, but specStree  (4 letters vs 5 letters)
    const streeLvl = skills["streetwise"]
    for (let i = 1; i <= streeLvl; i++) {
        form.getCheckBox(`Stre-${i}`).check()
    }
    setSpecialty("streetwise", "specStree")
    ;[
        "etiquette",
        "insight",
        "intimidation",
        "performance",
        "persuasion",
        "subterfuge",
        "academics",
        "awareness",
        "finance",
        "investigation",
        "medicine",
        "occult",
        "politics",
        "science",
        "technology",
    ]
        .map((s) => skillsKeySchema.parse(s))
        .forEach((skill) => {
            const lvl = skills[skill]
            for (let i = 1; i <= lvl; i++) {
                form.getCheckBox(`${upcase(skill).slice(0, 4)}-${i}`).check()
            }

            setSpecialty(skill, `spec${upcase(skill).slice(0, 4)}`)
        })

    // Health - Werewolf health calculation
    const health = 3 + character.attributes["stamina"]
    for (let i = 1; i <= health; i++) {
        form.getCheckBox(`Health-${i}`).check()
    }

    // Willpower
    const willpower = character.attributes["composure"] + character.attributes["resolve"]
    for (let i = 1; i <= willpower; i++) {
        form.getCheckBox(`WP-${i}`).check()
    }

    // Rage (Werewolf stat)
    const rage = character.rage || 1
    for (let i = 1; i <= rage; i++) {
        try {
            form.getCheckBox(`Rage-${i}`).check()
        } catch (e) {
            // If Rage fields don't exist in PDF, skip
        }
    }

    // Gnosis (Werewolf stat) 
    const gnosis = character.gnosis || 1
    for (let i = 1; i <= gnosis; i++) {
        try {
            form.getCheckBox(`Gnosis-${i}`).check()
        } catch (e) {
            // If Gnosis fields don't exist in PDF, skip
        }
    }

    // Top fields - Werewolf character info
    // Name
    form.getTextField("Name").setText(character.name)
    
    // Auspice
    const auspiceName = character.auspice
    try {
        form.getTextField("Auspice")?.setText(auspiceName || "")
    } catch (e) {
        // Auspice field doesn't exist in this PDF
    }
    
    // Player Name
    try {
        form.getTextField("Player")?.setText(character.playerName || "")
    } catch (e) {
        // Fallback if Player field doesn't exist
        form.getTextField("pcDescription")?.setText(character.playerName || "")
    }
    
    // Tribe
    const tribeName = character.tribe || character.clan
    try {
        form.getTextField("Tribe")?.setText(tribeName)
    } catch (e) {
        form.getTextField("Clan")?.setText(tribeName)
    }
    
    // Chronicle
    try {
        form.getTextField("Chronicle").setText(character.chronicle || "")
    } catch (e) {
        // Chronicle field doesn't exist in this PDF
    }
    
    // Patron (simplified for Hunter)
    let patronName = ""
    try {
        form.getTextField("Patron")?.setText(patronName)
    } catch (e) {
        // Patron field doesn't exist in this PDF
    }
    
    // For Hunter, we don't have tribe-specific ban/favor data
    // These fields may be used for Hunter-specific information later
    try {
        form.getTextField("TribeBan")?.setText("")
        form.getTextField("TribeFavor")?.setText("")
        form.getTextField("Patron")?.setText("")
    } catch (e) {
        // Fallback to original clan fields if werewolf sheet isn't ready
        try {
            form.getTextField("ClanBane")?.setText("")
            form.getTextField("ClanCompulsion")?.setText("")
        } catch (e2) {
            // If neither work, just continue
        }
    }

    // Pack info
    try {
        form.getTextField("Pack").setText(character.pack || "")
    } catch (e) {
        // Pack field doesn't exist in this PDF
    }

    // Gifts and Rites - using new field naming pattern
    const getGiftText = (power: any) => {
        let text = power.name + ": "
        
        // Handle different power types and their summary/description fields
        if (power.summary) {
            text += power.summary
        } else if (power.description) {
            text += power.description
        }
        
        // Handle different cost/system information
        if (power.cost) {
            // It's a Gift
            text += ` // ${power.cost}`
        } else if (power.rouseChecks && power.rouseChecks > 0) {
            // It's a Discipline Power
            text += ` // ${power.rouseChecks} rouse check${power.rouseChecks > 1 ? "s" : ""}`
        }

        if (power.system && power.ingredients) {
            // It's a ritual
            text += ` // requires: ${power.ingredients}; ${power.system}`
        }

        return text
    }

    const getDicePoolText = (power: any) => {
        return power.dicePool || power.dicePools || power.pool || ""
    }

    // Combine gifts and rites into a single array for unified numbering
    const allGiftsAndRites = [
        ...(character.disciplines || []),
        ...(character.rituals || []),
        ...(character.gifts || []),
        ...(character.rites || [])
    ]

    // Fill gift/rite names and dice pools using the specified field pattern
    allGiftsAndRites.forEach((power, index) => {
        try {
            // Gift name goes into 0.X.Gift_Name-1 pattern
            const giftNameField = `0.${index}.Gift_Name-1`
            form.getTextField(giftNameField)?.setText(getGiftText(power))
            form.getTextField(giftNameField)?.disableRichFormatting()
            
            // Dice pool goes into 1.X.Gift_Name-1 pattern  
            const dicePoolField = `1.${index}.Gift_Name-1`
            const dicePoolText = getDicePoolText(power)
            if (dicePoolText) {
                form.getTextField(dicePoolField)?.setText(dicePoolText)
                form.getTextField(dicePoolField)?.disableRichFormatting()
            }
        } catch (e) {
            // If the specific field doesn't exist, continue with next
        }
    })

    // Fallback for older discipline-based system (keep for compatibility)
    const powersByDiscipline = (character.disciplines || []).reduce(
        (acc: any, p: any) => {
            if (!acc[p.discipline]) acc[p.discipline] = []
            acc[p.discipline].push(p)
            return acc
        },
        {} as any
    )
    for (const [disciplineIndex, powers] of Object.values(powersByDiscipline).entries()) {
        const di = disciplineIndex + 1
        const powersArray = powers as any[]
        try {
            form.getTextField(`Disc${di}`)?.setText(upcase(powersArray[0].discipline))
            for (const [powerIndex, power] of powersArray.entries()) {
                const pi = powerIndex + 1
                form.getTextField(`Disc${di}_Ability${pi}`)?.setText(getGiftText(power))
                form.getTextField(`Disc${di}_Ability${pi}`)?.disableRichFormatting()
                form.getCheckBox(`Disc${di}-${pi}`)?.check()
            }
            if (powersArray[0].discipline === "blood sorcery") {
                for (const [ritualIndex, ritual] of (character.rituals || []).entries()) {
                    const ri = powersArray.length + ritualIndex + 1
                    form.getTextField(`Disc${di}_Ability${ri}`)?.setText(getGiftText(ritual))
                    form.getTextField(`Disc${di}_Ability${ri}`)?.disableRichFormatting()
                }
            }
        } catch (e) {
            // If discipline fields don't exist, skip
        }
    }

    // Merits & flaws - simplified for Werewolf
    const meritsAndFlaws = [...character.merits, ...character.flaws]
    meritsAndFlaws.forEach(({ name, level, summary }, i) => {
        const fieldNum = i + 1
        form.getTextField(`Merit${fieldNum}`).setText(name + ": " + summary)
        for (let l = 1; l <= level; l++) {
            try {
                form.getCheckBox(`Merit${fieldNum}-${l}`).check()
            } catch (e) {
                // If checkbox doesn't exist, skip
            }
        }
    })

    // Touchstones & Convictions - Enhanced with all details
    const touchstonesText = (character.touchstones || []).map(({ name, description, conviction }) => 
        `${name}: ${conviction}\n${description}`
    ).join("\n\n")
    
    form.getTextField("Convictions").setText(touchstonesText)

    // Flavor and Bans - Add to touchstoneNotes field
    let flavorAndBansText = ""
    
    // Add Hunter-specific information if available
    // Note: This could be expanded to include Creed-specific information later
    
    // Map specific fields according to PDF structure
    
    // Appearance goes to sge field and also to pcDescription
    try {
        form.getTextField("sge")?.setText(character.appearance || "")
    } catch (e) {
        // Fallback if sge doesn't exist
        if (character.appearance) {
            flavorAndBansText += `Appearance:\n${character.appearance}\n\n`
        }
    }
    
    // Also put appearance in pcDescription
    try {
        form.getTextField("pcDescription")?.setText(character.appearance || "")
    } catch (e) {
        // pcDescription doesn't exist
    }
    
    // History goes to pcConcept field
    try {
        form.getTextField("pcConcept")?.setText(character.history || "")
    } catch (e) {
        // Fallback if pcConcept doesn't exist
        if (character.history) {
            flavorAndBansText += `History:\n${character.history}\n\n`
        }
    }
    
    // Notes goes to PC_Notes field
    try {
        form.getTextField("PC_Notes")?.setText(character.notes || "")
    } catch (e) {
        // Fallback if PC_Notes doesn't exist
        if (character.notes) {
            flavorAndBansText += `Character Notes:\n${character.notes}\n\n`
        }
    }
    
    try {
        form.getTextField("touchstoneNotes")?.setText(flavorAndBansText.trim())
    } catch (e) {
        // If touchstoneNotes doesn't exist, try alternative field names
        try {
            form.getTextField("Notes")?.setText(flavorAndBansText.trim())
        } catch (e2) {
            // If no notes field exists, append to convictions
            const combinedText = touchstonesText + (flavorAndBansText ? `\n\n--- Additional Info ---\n${flavorAndBansText.trim()}` : "")
            form.getTextField("Convictions").setText(combinedText)
        }
    }

    // Experience - use character experience value directly
    const experience = character.experience || 0
    form.getTextField("tEXP").setText(`${experience} XP`)

    // Fixes bug where text that is too long for field doesn't show until clicked
    // see https://github.com/Hopding/pdf-lib/issues/569#issuecomment-1087328416 and https://stackoverflow.com/questions/73058238/some-pdf-textfield-content-not-visible-until-clicked
    // TODO: This breaks embedding the png in humanity-tracker!
    form.acroForm.dict.set(PDFName.of("NeedAppearances"), PDFBool.True)

    // Fixes embedded font not being applied on form fields
    form.updateFieldAppearances(customFont)

    return await pdfDoc.save({ updateFieldAppearances: true })
}

export const downloadCharacterSheet = async (character: Character) => {
    const pdfBytes = await createPdf_nerdbert(character)
    notifications.show({
        title: "PDF base kindly provided by Nerdbert!",
        message: "https://linktr.ee/nerdbert",
        autoClose: 10000,
        color: "grape",
    })

    downloadPdf(`firstchange_${character.name}.pdf`, pdfBytes)
}

function base64ToArrayBuffer(base64: string) {
    const binary_string = window.atob(base64)
    const len = binary_string.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i)
    }
    return bytes.buffer
}

const getFields = (form: PDFForm): Record<string, string> => {
    const fields = form.getFields()

    const outFields: Record<string, string> = {}
    fields.forEach((field) => {
        const type = field.constructor.name
        const name = field.getName()

        outFields[name] = type
    })

    return outFields
}

export const printFieldNames = async () => {
    const basePdf = base64Pdf_werewolf
    const bytes = base64ToArrayBuffer(basePdf)

    const pdfDoc = await initPDFDocument(bytes)
    const form = pdfDoc.getForm()

    console.log(JSON.stringify(getFields(form), null, 2))
}
