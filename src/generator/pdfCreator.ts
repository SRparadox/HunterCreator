import { notifications } from "@mantine/notifications"
import fontkit from "@pdf-lib/fontkit"
import { PDFBool, PDFDocument, PDFFont, PDFForm, PDFName } from "pdf-lib"
import { Character } from "../data/Character"
import { SkillsKey, skillsKeySchema } from "../data/Skills"
import { attributesKeySchema } from "../data/Attributes"
import { Power, Ritual } from "../data/Disciplines"
import { Gift } from "../data/Gifts"
import base64Pdf_hunter from "../resources/HtR5e_ENG_Sheet_2pMINI.base64?raw"
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
        // Try Hunter fields first, then werewolf fields, fallback to vampire fields for compatibility
        try {
            form.getTextField("Creed")?.setText("")
            form.getTextField("Player")?.setText("")
            form.getTextField("Drive")?.setText("")
            form.getTextField("Chronicle")?.setText("")
        } catch (e) {
            try {
                form.getTextField("Tribe")?.setText("")
                form.getTextField("Patron")?.setText("")
            } catch (e2) {
                // Hunter/Werewolf fields don't exist in this PDF, try vampire fallbacks
                try {
                    form.getTextField("Clan")?.setText("")
                    form.getTextField("Sire")?.setText("")
                } catch (e3) {
                    // No suitable fields found
                }
            }
        }
    } catch (err) {
        return {
            success: false,
            error: new Error("PDF doesn't contain required fields - is it the correct Hunter character sheet?"),
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
    const bytes = base64ToArrayBuffer(base64Pdf_hunter)

    const pdfDoc = await initPDFDocument(bytes)
    const form = pdfDoc.getForm()

    // Attributes
    const attributes = character.attributes
    ;["strength", "dexterity", "stamina", "charisma", "manipulation", "composure", "intelligence", "wits", "resolve"]
        .map((a) => attributesKeySchema.parse(a))
        .forEach((attr) => {
            const lvl = attributes[attr]
            for (let i = 1; i <= lvl; i++) {
                try {
                    form.getCheckBox(`${upcase(attr).slice(0, 3)}-${i}`)?.check()
                } catch (e) {
                    // Skip if checkbox doesn't exist
                }
            }
        })

    // Skills
    const setSpecialty = (skillName: SkillsKey, textFieldKey: string) => {
        try {
            const specialties = (character.skillSpecialties || [])
                .filter((s) => s.skill === skillName)
                .filter((s) => s.name !== "")
                .map((s) => s.name)

            if (specialties.length > 0) {
                form.getTextField(textFieldKey)?.setText(specialties.join(", "))
            }
        } catch (e) {
            // Skip if specialty field can't be set
        }
    }

    const skills = character.skills
    ;["athletics", "brawl", "craft", "drive", "melee", "larceny", "survival"]
        .map((s) => skillsKeySchema.parse(s))
        .forEach((skill) => {
            const lvl = skills[skill]
            for (let i = 1; i <= lvl; i++) {
                try {
                    form.getCheckBox(`${upcase(skill).slice(0, 3)}-${i}`)?.check()
                } catch (e) {
                    // Skip if checkbox doesn't exist
                }
            }
            setSpecialty(skill, `spec${upcase(skill).slice(0, 3)}`)
        })

    const aniKenLvl = skills["animal ken"]
    for (let i = 1; i <= aniKenLvl; i++) {
        try {
            form.getCheckBox(`AniKen-${i}`)?.check()
        } catch (e) {
            // Skip if checkbox doesn't exist
        }
    }
    setSpecialty("animal ken", "specAniKen")

    // PDF-issue: Lead-1, but specLea  (4 letters vs 3 letters)
    const leadLvl = skills["leadership"]
    for (let i = 1; i <= leadLvl; i++) {
        try {
            form.getCheckBox(`Lead-${i}`)?.check()
        } catch (e) {
            // Skip if checkbox doesn't exist
        }
    }
    setSpecialty("leadership", "specLea")

    const stealthLvl = skills["stealth"]
    for (let i = 1; i <= stealthLvl; i++) {
        try {
            form.getCheckBox(`Ste-${i}`)?.check()
        } catch (e) {
            // Skip if checkbox doesn't exist
        }
    }
    setSpecialty("stealth", "specStea")

    // PDF-issue: "Fri-1" instead of "Fir-1"
    const fireLvl = skills["firearms"]
    for (let i = 1; i <= fireLvl; i++) {
        try {
            form.getCheckBox(`Fri-${i}`)?.check()
        } catch (e) {
            // Skip if checkbox doesn't exist
        }
    }
    setSpecialty("firearms", "specFir")

    // PDF-issue: Stre-1-1, but specStree  (4 letters vs 5 letters)
    const streeLvl = skills["streetwise"]
    for (let i = 1; i <= streeLvl; i++) {
        try {
            form.getCheckBox(`Stre-${i}`)?.check()
        } catch (e) {
            // Skip if checkbox doesn't exist
        }
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
                try {
                    form.getCheckBox(`${upcase(skill).slice(0, 4)}-${i}`)?.check()
                } catch (e) {
                    // Skip if checkbox doesn't exist
                }
            }

            setSpecialty(skill, `spec${upcase(skill).slice(0, 4)}`)
        })

    // Health - Hunter health calculation (Stamina + 3)
    const health = 3 + character.attributes["stamina"]
    for (let i = 1; i <= health; i++) {
        try {
            form.getCheckBox(`Health-${i}`)?.check()
        } catch (e) {
            // Skip if checkbox doesn't exist
        }
    }

    // Willpower - Hunter willpower calculation (Composure + Resolve)
    const willpower = character.attributes["composure"] + character.attributes["resolve"]
    for (let i = 1; i <= willpower; i++) {
        try {
            form.getCheckBox(`WP-${i}`)?.check()
        } catch (e) {
            // Skip if checkbox doesn't exist
        }
    }

    // Conviction (using rage field for Hunter)
    const conviction = character.rage || 1
    for (let i = 1; i <= conviction; i++) {
        try {
            form.getCheckBox(`Rage-${i}`).check()
        } catch (e) {
            try {
                form.getCheckBox(`Conviction-${i}`).check()
            } catch (e2) {
                // If neither field exists, skip
            }
        }
    }

    // Desperation (using gnosis field for Hunter)
    const desperation = character.gnosis || 1
    for (let i = 1; i <= desperation; i++) {
        try {
            form.getCheckBox(`Gnosis-${i}`).check()
        } catch (e) {
            try {
                form.getCheckBox(`Desperation-${i}`).check()
            } catch (e2) {
                // If neither field exists, skip
            }
        }
    }

    // Top fields - Hunter character info
    // Name
    try {
        form.getTextField("Name")?.setText(character.name)
    } catch (e) {
        console.warn("Could not set Name field:", e)
    }
    
    // Player Name
    try {
        form.getTextField("Player")?.setText(character.playerName || "")
    } catch (e) {
        // Fallback if Player field doesn't exist
        try {
            form.getTextField("pcDescription")?.setText(character.playerName || "")
        } catch (e2) {
            // Neither field exists
        }
    }
    
    // Creed (Hunter's spiritual calling)
    try {
        form.getTextField("Creed")?.setText(character.creed || "")
    } catch (e) {
        // Fallback for older PDF forms that might expect tribe field
        try {
            form.getTextField("Tribe")?.setText(character.creed || "")
        } catch (e2) {
            try {
                form.getTextField("Clan")?.setText(character.creed || "")
            } catch (e3) {
                // None of the fields exist
            }
        }
    }

    // Drive (Hunter's motivation)
    try {
        form.getTextField("Drive")?.setText(character.drive || "")
    } catch (e) {
        // Drive field doesn't exist, try alternative names
        try {
            form.getTextField("Nature")?.setText(character.drive || "")
        } catch (e2) {
            try {
                form.getTextField("Demeanor")?.setText(character.drive || "")
            } catch (e3) {
                // No suitable field found
            }
        }
    }
    
    // Chronicle
    try {
        form.getTextField("Chronicle")?.setText(character.chronicle || "")
    } catch (e) {
        // Chronicle field doesn't exist in this PDF
    }

    // Concept
    try {
        form.getTextField("Concept")?.setText(character.concept || "")
    } catch (e) {
        // Concept field doesn't exist in this PDF
    }
    
    // Pack info (Hunter cell)
    try {
        form.getTextField("Pack")?.setText(character.pack || "")
    } catch (e) {
        try {
            form.getTextField("Cell")?.setText(character.pack || "")
        } catch (e2) {
            try {
                form.getTextField("Coterie")?.setText(character.pack || "")
            } catch (e3) {
                // No suitable field found
            }
        }
    }

    // Edges and Powers - Hunter-specific abilities
    const getEdgeText = (power: any) => {
        let text = power.name + ": "
        
        // Handle different power types and their summary/description fields
        if (power.summary) {
            text += power.summary
        } else if (power.description) {
            text += power.description
        }
        
        // Handle Edge-specific cost information
        if (power.cost) {
            // It's an Edge with a cost
            text += ` // Cost: ${power.cost}`
        } else if (power.system) {
            // It's an Edge with system info
            text += ` // ${power.system}`
        }

        return text
    }

    const getEdgeDicePoolText = (power: any) => {
        return power.dicePool || power.dicePools || power.pool || power.edgePool || ""
    }

    // Combine edges and any legacy powers into a single array for unified numbering
    const allEdgesAndPowers = [
        ...(character.edges || []),
        ...(character.disciplines || []),
        ...(character.rituals || [])
    ]

    // Fill edge/power names and dice pools using the specified field pattern
    allEdgesAndPowers.forEach((power, index) => {
        try {
            // Edge name goes into Edge/Gift fields (reusing werewolf gift fields for edges)
            const edgeNameField = `0.${index}.Gift_Name-1`
            form.getTextField(edgeNameField)?.setText(getEdgeText(power))
            form.getTextField(edgeNameField)?.disableRichFormatting()
            
            // Dice pool goes into corresponding dice pool field
            const dicePoolField = `1.${index}.Gift_Name-1`
            const dicePoolText = getEdgeDicePoolText(power)
            if (dicePoolText) {
                form.getTextField(dicePoolField)?.setText(dicePoolText)
                form.getTextField(dicePoolField)?.disableRichFormatting()
            }
        } catch (e) {
            // If the specific field doesn't exist, try alternative naming
            try {
                const altEdgeField = `Edge${index + 1}`
                form.getTextField(altEdgeField)?.setText(getEdgeText(power))
                form.getTextField(altEdgeField)?.disableRichFormatting()
            } catch (e2) {
                // Continue with next if no suitable field found
            }
        }
    })

    // Fallback for discipline-based system (keep for compatibility with vampire sheets)
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
                form.getTextField(`Disc${di}_Ability${pi}`)?.setText(getEdgeText(power))
                form.getTextField(`Disc${di}_Ability${pi}`)?.disableRichFormatting()
                form.getCheckBox(`Disc${di}-${pi}`)?.check()
            }
        } catch (e) {
            // If discipline fields don't exist, skip
        }
    }

    // Merits & Flaws - Hunter-specific format
    const meritsAndFlaws = [...character.merits, ...character.flaws]
    meritsAndFlaws.forEach(({ name, level, summary }, i) => {
        const fieldNum = i + 1
        try {
            // Try Hunter/Werewolf merit field format first
            form.getTextField(`Merit${fieldNum}`)?.setText(`${name}: ${summary}`)
            // Mark the appropriate level dots
            for (let l = 1; l <= level; l++) {
                try {
                    form.getCheckBox(`Merit${fieldNum}-${l}`)?.check()
                } catch (e) {
                    // If checkbox doesn't exist, skip
                }
            }
        } catch (e) {
            // Try alternative field naming
            try {
                form.getTextField(`Background${fieldNum}`)?.setText(`${name}: ${summary}`)
                for (let l = 1; l <= level; l++) {
                    try {
                        form.getCheckBox(`Background${fieldNum}-${l}`)?.check()
                    } catch (e2) {
                        // If checkbox doesn't exist, skip
                    }
                }
            } catch (e2) {
                // No suitable merit/background field found
            }
        }
    })

    // Touchstones & Convictions - Hunter-specific format
    const touchstonesText = (character.touchstones || []).map(({ name, description, conviction }) => 
        `${name}: ${conviction}\n${description}`
    ).join("\n\n")
    
    try {
        form.getTextField("Convictions")?.setText(touchstonesText)
    } catch (e) {
        // Try alternative field names for convictions
        try {
            form.getTextField("Touchstones")?.setText(touchstonesText)
        } catch (e2) {
            try {
                form.getTextField("Motivations")?.setText(touchstonesText)
            } catch (e3) {
                // No suitable field found
            }
        }
    }

    // Character details - map to appropriate PDF fields
    let additionalInfoText = ""
    
    // Appearance
    try {
        form.getTextField("sge")?.setText(character.appearance || "")
    } catch (e) {
        try {
            form.getTextField("Appearance")?.setText(character.appearance || "")
        } catch (e2) {
            try {
                form.getTextField("pcDescription")?.setText(character.appearance || "")
            } catch (e3) {
                if (character.appearance) {
                    additionalInfoText += `Appearance: ${character.appearance}\n\n`
                }
            }
        }
    }
    
    // History/Background
    try {
        form.getTextField("pcConcept")?.setText(character.history || "")
    } catch (e) {
        try {
            form.getTextField("History")?.setText(character.history || "")
        } catch (e2) {
            try {
                form.getTextField("Background")?.setText(character.history || "")
            } catch (e3) {
                if (character.history) {
                    additionalInfoText += `History: ${character.history}\n\n`
                }
            }
        }
    }
    
    // Notes
    try {
        form.getTextField("PC_Notes")?.setText(character.notes || "")
    } catch (e) {
        try {
            form.getTextField("Notes")?.setText(character.notes || "")
        } catch (e2) {
            try {
                form.getTextField("CharacterNotes")?.setText(character.notes || "")
            } catch (e3) {
                if (character.notes) {
                    additionalInfoText += `Notes: ${character.notes}\n\n`
                }
            }
        }
    }

    // Ambition and Desire (Hunter-specific goals)
    let goalsText = ""
    if (character.ambition) {
        goalsText += `Ambition: ${character.ambition}\n`
    }
    if (character.desire) {
        goalsText += `Desire: ${character.desire}\n`
    }
    
    if (goalsText) {
        try {
            form.getTextField("Goals")?.setText(goalsText)
        } catch (e) {
            try {
                form.getTextField("Ambitions")?.setText(goalsText)
            } catch (e2) {
                additionalInfoText += goalsText + "\n"
            }
        }
    }
    
    // Put any remaining info in a notes field
    if (additionalInfoText.trim()) {
        try {
            form.getTextField("touchstoneNotes")?.setText(additionalInfoText.trim())
        } catch (e) {
            try {
                form.getTextField("AdditionalNotes")?.setText(additionalInfoText.trim())
            } catch (e2) {
                // Append to convictions as last resort
                const combinedText = touchstonesText + (additionalInfoText ? `\n\n--- Additional Info ---\n${additionalInfoText.trim()}` : "")
                try {
                    form.getTextField("Convictions")?.setText(combinedText)
                } catch (e3) {
                    // No suitable field found
                }
            }
        }
    }

    // Experience - use character experience value directly
    const experience = character.experience || 0
    try {
        form.getTextField("tEXP")?.setText(`${experience} XP`)
    } catch (e) {
        // Experience field doesn't exist or has issues
    }

    // Disable rich formatting on all text fields to prevent rich text errors
    const disableRichFormattingOnAllFields = () => {
        try {
            const fields = form.getFields()
            fields.forEach(field => {
                try {
                    const fieldName = field.getName()
                    // Skip known problematic rich text fields
                    const problematicFields = ['chronicleTenets', 'chronicleTenents']
                    if (problematicFields.includes(fieldName)) {
                        console.warn(`Skipping problematic rich text field: ${fieldName}`)
                        return
                    }
                    
                    if (field.constructor.name === 'PDFTextField') {
                        (field as any).disableRichFormatting?.()
                    }
                } catch (e) {
                    // Skip fields that can't be processed
                    console.warn(`Could not process field: ${e}`)
                }
            })
        } catch (e) {
            // If we can't iterate fields, skip this step
            console.warn("Could not iterate form fields:", e)
        }
    }

    disableRichFormattingOnAllFields()

    // Fixes bug where text that is too long for field doesn't show until clicked
    // see https://github.com/Hopding/pdf-lib/issues/569#issuecomment-1087328416 and https://stackoverflow.com/questions/73058238/some-pdf-textfield-content-not-visible-until-clicked
    try {
        form.acroForm.dict.set(PDFName.of("NeedAppearances"), PDFBool.True)
    } catch (e) {
        // Skip if this fails
    }

    // Fixes embedded font not being applied on form fields
    // Wrap in try-catch to handle rich text field errors
    try {
        form.updateFieldAppearances(customFont)
    } catch (e) {
        console.warn("Could not update field appearances due to rich text fields:", e)
        // Try without custom font
        try {
            form.updateFieldAppearances()
        } catch (e2) {
            console.warn("Could not update field appearances at all:", e2)
            // Continue without updating appearances
        }
    }

    return await pdfDoc.save({ updateFieldAppearances: true })
}

export const downloadCharacterSheet = async (character: Character) => {
    const pdfBytes = await createPdf_nerdbert(character)
    notifications.show({
        title: "Hunter Character Sheet Generated!",
        message: "PDF base kindly provided by Nerdbert - https://linktr.ee/nerdbert",
        autoClose: 10000,
        color: "orange",
    })

    downloadPdf(`hunter_${character.name || 'character'}.pdf`, pdfBytes)
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
        try {
            const type = field.constructor.name
            const name = field.getName()
            outFields[name] = type
        } catch (e) {
            // Skip fields that can't be read
            console.warn("Could not read field:", e)
        }
    })

    return outFields
}

export const printFieldNames = async () => {
    const basePdf = base64Pdf_hunter
    const bytes = base64ToArrayBuffer(basePdf)

    const pdfDoc = await initPDFDocument(bytes)
    const form = pdfDoc.getForm()

    console.log(JSON.stringify(getFields(form), null, 2))
}
