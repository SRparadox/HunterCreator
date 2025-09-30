import { Button, Stack, Text, TextInput, Textarea } from "@mantine/core"
import { useEffect, useState } from "react"
import { Character } from "../../data/Character"
import ReactGA from "react-ga4"

type BasicsPickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const BasicsPicker = ({ character, setCharacter, nextStep }: BasicsPickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Basics Picker" })
    }, [])

    const [name, setName] = useState(character.name)
    const [playerName, setPlayerName] = useState(character.playerName || "")
    const [chronicle, setChronicle] = useState(character.chronicle)
    const [appearance, setAppearance] = useState(character.appearance || "")
    const [history, setHistory] = useState(character.history || "")
    const [notes, setNotes] = useState(character.notes || "")
    const [ambition, setAmbition] = useState(character.ambition || "")
    const [desire, setDesire] = useState(character.desire || "")

    return (
        <div>
            <Text fw={700} fz={"30px"} ta="center">
                Character Details
            </Text>

            <Stack mt={"xl"} align="center" spacing="xl">
                <TextInput
                    style={{ width: "300px" }}
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                    placeholder="Sarah Mitchell"
                    label="Character Name"
                />

                <TextInput
                    style={{ width: "300px" }}
                    value={playerName}
                    onChange={(event) => setPlayerName(event.currentTarget.value)}
                    placeholder="Your Name"
                    label="Player Name"
                    description="Your real name as the player"
                />



                <TextInput
                    style={{ width: "300px" }}
                    value={chronicle}
                    onChange={(event) => setChronicle(event.currentTarget.value)}
                    placeholder="Night Hunt Chronicle"
                    label="Chronicle"
                    description="The name of your story/campaign"
                />

                <TextInput
                    style={{ width: "300px" }}
                    value={ambition}
                    onChange={(event) => setAmbition(event.currentTarget.value)}
                    placeholder="Become the most feared hunter in the city"
                    label="Ambition"
                    description="Your character's long-term goal or aspiration"
                />

                <TextInput
                    style={{ width: "300px" }}
                    value={desire}
                    onChange={(event) => setDesire(event.currentTarget.value)}
                    placeholder="To protect innocent people from supernatural threats"
                    label="Desire"
                    description="What your character wants most deeply"
                />

                <Textarea
                    style={{ width: "300px" }}
                    value={appearance}
                    onChange={(event) => setAppearance(event.currentTarget.value)}
                    placeholder="A tall woman in her thirties with determined eyes and calloused hands, often wearing a worn leather jacket"
                    label="Appearance"
                    description="Physical description of your character"
                    autosize
                    minRows={3}
                />

                <Textarea
                    style={{ width: "300px" }}
                    value={history}
                    onChange={(event) => setHistory(event.currentTarget.value)}
                    placeholder="Former police detective who discovered the supernatural world during a case that went horribly wrong..."
                    label="History"
                    description="Your character's background and past"
                    autosize
                    minRows={3}
                />

                <Textarea
                    style={{ width: "300px" }}
                    value={notes}
                    onChange={(event) => setNotes(event.currentTarget.value)}
                    placeholder="Has trust issues with authority, prefers to work alone, keeps a journal of supernatural encounters..."
                    label="Notes"
                    description="Additional character notes and details"
                    autosize
                    minRows={3}
                />



                <Button
                    color="grape"
                    onClick={() => {
                        setCharacter({ 
                            ...character, 
                            name, 
                            playerName, 
                            chronicle, 
                            appearance, 
                            history, 
                            notes,
                            ambition,
                            desire
                        })
                        nextStep()
                    }}
                >
                    Confirm
                </Button>
            </Stack>
        </div>
    )
}

export default BasicsPicker
