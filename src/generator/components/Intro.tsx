import { faFileArrowUp, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ActionIcon, Alert, Button, FileButton, Stack, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconBrandGithub, IconBrandReddit, IconBrandTwitter } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import LoadModal from "../../components/LoadModal"
import { Character, getEmptyCharacter } from "../../data/Character"
import ReactGA from "react-ga4"
import { globals } from "../../globals"

type IntroProps = {
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const Intro = ({ setCharacter, nextStep }: IntroProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Intro" })
    }, [])

    const [loadedFile, setLoadedFile] = useState<File | null>(null)
    const [loadModalOpened, { open: openLoadModal, close: closeLoadModal }] = useDisclosure(false)

    const handleResetAllData = () => {
        // Clear localStorage
        localStorage.removeItem("character")
        localStorage.removeItem("selectedStep")

        // Reset character to empty state
        setCharacter(getEmptyCharacter())

        // Show confirmation notification
        notifications.show({
            title: "Data Reset Complete",
            message: "All locally saved character data has been cleared. You can now start fresh!",
            color: "green",
            autoClose: 5000,
        })

        // Track analytics event
        ReactGA.event({
            action: "reset_all_data",
            category: "user_action",
        })
    }

    return (
        <Alert mt={globals.isPhoneScreen ? "75px" : "50px"} color="grape" variant="outline" bg={"rgba(0, 0, 0, 0.6)"}>
            <Text fz={globals.largeFontSize} ta={"center"} mb={"lg"}>
                This is a &apos;Werewolf: the Apocalypse&apos; 5th Edition character creation tool for beginners
            </Text>
            <Text fz={globals.smallerFontSize} mb={"xs"}>
                It is intentionally streamlined and limited to creating a common type of Garou character following the rules from the source book.
            </Text>
            <Text fz={globals.smallerFontSize} mb={"xs"}>
                You can download your character into a printable PDF when you&apos;re done and also save it to a local file that you can load into this web app to continue editing.
            </Text>
            <Text fz={globals.smallerFontSize} mb={"xl"}>
                Note that none of your data will be sent to or stored on a server and you may lose your character if you don&apos;t download it!
            </Text>

            <Text fz={globals.smallerFontSize} mb={"xl"}>
                For feature requests, bug reports and general feedback, message me on:&nbsp;
                <ActionIcon display={"inline"} component="a" href="https://www.reddit.com/user/ProgenyDev/" variant="default" c={"#ff6314"}>
                    <IconBrandReddit />
                </ActionIcon>
                &nbsp;
                <ActionIcon display={"inline"} component="a" href="https://twitter.com/Odin68092534" variant="default" c={"#1DA1F2"}>
                    <IconBrandTwitter />
                </ActionIcon>
            </Text>
            <Stack align="center" spacing="xl">
                <Button leftIcon={<FontAwesomeIcon icon={faPlay} />} size="xl" color="grape" onClick={nextStep}>
                    Get Started!
                </Button>

                <FileButton
                    onChange={async (payload: File | null) => {
                        if (!payload) return

                        setLoadedFile(payload)
                        openLoadModal()
                    }}
                    accept="application/json"
                >
                    {(props) => (
                        <Button leftIcon={<FontAwesomeIcon icon={faFileArrowUp} />} size="md" color="yellow" variant="light" {...props}>
                            Load from file
                        </Button>
                    )}
                </FileButton>

                <Button 
                    leftIcon={<FontAwesomeIcon icon={faTrash} />} 
                    size="md" 
                    color="red" 
                    variant="outline"
                    onClick={handleResetAllData}
                >
                    Reset All Saved Data
                </Button>

                <Button
                    component="a"
                    href="https://github.com/Odin94/Progeny-vtm-v5-character-creator"
                    target="_blank"
                    rel="noreferrer"
                    leftIcon={<IconBrandGithub />}
                    size="xs"
                    color="gray"
                    variant="filled"
                >
                    View Source Code
                </Button>
                <Button
                    component="a"
                    href="https://ko-fi.com/odin_dev"
                    target="_blank"
                    rel="noreferrer"
                    leftIcon={<span>☕</span>}
                    size="xs"
                    color="gray"
                    variant="light"
                >
                    Support me on Ko-Fi
                </Button>
                <Button
                    component="a"
                    href="https://odin-matthias.de"
                    target="_blank"
                    rel="noreferrer"
                    size="xs"
                    color="gray"
                    variant="subtle"
                >
                    <Text color="rgb(190,190,190)">View My Website</Text>
                </Button>
                <Button
                    leftIcon={<FontAwesomeIcon icon={faTrash} />}
                    size="md"
                    color="red"
                    variant="outline"
                    onClick={handleResetAllData}
                >
                    Reset All Data
                </Button>
            </Stack>

            <LoadModal
                loadedFile={loadedFile}
                setCharacter={setCharacter}
                loadModalOpened={loadModalOpened}
                closeLoadModal={closeLoadModal}
            />
        </Alert>
    )
}

export default Intro
