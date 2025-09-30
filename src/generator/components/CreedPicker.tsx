import { Card, Center, Grid, Image, ScrollArea, Text, Title, useMantineTheme } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useEffect, useRef, useState } from "react"
import ReactGA from "react-ga4"
import { CreedName, creedNameSchema } from "~/data/NameSchemas"
import { Character } from "../../data/Character"
import { creeds } from "../../data/Creeds"
import { globals } from "../../globals"
import { notDefault } from "../utils"

type CreedPickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const CreedPicker = ({ character, setCharacter, nextStep }: CreedPickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Creed Picker" })
    }, [])

    const theme = useMantineTheme()
    const [hoveredCreed, setHoveredCreed] = useState<CreedName | null>(null)

    const c1 = "rgba(26, 27, 30, 0.90)"

    // Scrollable text component for descriptions
    const ScrollableDescription = ({ text, creed }: { text: string; creed: CreedName }) => {
        const textRef = useRef<HTMLDivElement>(null)
        const [shouldScroll, setShouldScroll] = useState(false)
        
        useEffect(() => {
            if (textRef.current) {
                const element = textRef.current
                setShouldScroll(element.scrollHeight > element.clientHeight)
            }
        }, [text])
        
        useEffect(() => {
            if (textRef.current && shouldScroll && hoveredCreed === creed) {
                const element = textRef.current
                const scrollHeight = element.scrollHeight - element.clientHeight
                
                if (scrollHeight > 0) {
                    let scrollPosition = 0
                    const scrollSpeed = 30 // pixels per second
                    const pauseTime = 1000 // pause at start/end in ms
                    
                    const scroll = () => {
                        if (hoveredCreed !== creed) return // Stop if no longer hovered
                        
                        element.scrollTop = scrollPosition
                        
                        if (scrollPosition < scrollHeight) {
                            scrollPosition += scrollSpeed / 60 // 60fps
                            requestAnimationFrame(scroll)
                        } else {
                            // Pause at bottom, then reset
                            setTimeout(() => {
                                if (hoveredCreed === creed) {
                                    scrollPosition = 0
                                    setTimeout(scroll, pauseTime)
                                }
                            }, pauseTime)
                        }
                    }
                    
                    setTimeout(scroll, pauseTime)
                }
            }
        }, [shouldScroll, hoveredCreed, creed, text])

        return (
            <div
                ref={textRef}
                style={{
                    height: 55,
                    overflow: 'hidden',
                    fontSize: '14px',
                    lineHeight: '1.3',
                    padding: '0 8px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                }}
            >
                {text}
            </div>
        )
    }

    const createCreedPick = (creed: CreedName, c2: string) => {
        if (creed === "") return null

        return (
            <Card
                key={creed}
                style={{
                    cursor: "pointer",
                    border: character.creed === creed ? `3px solid ${theme.colors.yellow[4]}` : "none",
                    backgroundColor: character.creed === creed ? c1 : c2,
                    minHeight: "350px",
                    display: "flex",
                    flexDirection: "column",
                }}
                onMouseEnter={() => setHoveredCreed(creed)}
                onMouseLeave={() => setHoveredCreed(null)}
                onClick={() => {
                    if (notDefault(character, "creed")) {
                        notifications.show({
                            withCloseButton: true,
                            autoClose: 5000,
                            title: "Creed changed!",
                            message: "Because you changed your creed, your edges have been reset",
                            color: "yellow",
                        })

                        setCharacter({
                            ...character,
                            creed,
                            clan: creed, // For backward compatibility
                            edges: [],
                            disciplines: [], // For backward compatibility
                            auspice: character.auspice,
                            predatorType: character.predatorType, // For compatibility
                        })
                    } else {
                        setCharacter({
                            ...character,
                            creed,
                            clan: creed, // For backward compatibility 
                        })
                    }

                    ReactGA.event({
                        action: "creed clicked",
                        category: "creeds",
                        label: creed,
                    })
                    nextStep()
                }}
            >
                <Card.Section>
                    <Center pt={10}>
                        <Image fit="contain" withPlaceholder src={creeds[creed].logo} height={120} width={120} alt={creed} />
                    </Center>
                </Card.Section>

                <Center>
                    <Title order={3} p="md">{creed}</Title>
                </Center>

                <ScrollableDescription text={creeds[creed].description} creed={creed} />
                
                <Text size="xs" ta="center" c="yellow" mt="xs">
                    <b>Drive:</b> {creeds[creed].drive}
                </Text>
                
                <Text size="xs" ta="center" c="blue" mt="xs">
                    <b>Approach:</b> {creeds[creed].approach}
                </Text>

                <Text size="xs" ta="center" c="red" mt="xs">
                    <b>Weakness:</b> {creeds[creed].weakness}
                </Text>
            </Card>
        )
    }

    const height = globals.isPhoneScreen ? window.innerHeight - 200 : window.innerHeight - 100

    return (
        <div style={{ height: height - 250 }}>
            <Text fz={"30px"} ta={"center"}>
                Pick your <b>Creed</b>
            </Text>

            <Text ta="center" fz="xl" fw={700} mb="md" c="yellow">
                Your creed defines your approach to hunting the supernatural
            </Text>

            <ScrollArea h={height - 350} type="never">
                <Grid>
                    {Object.keys(creeds)
                        .filter((c) => c !== "")
                        .map((c) => creedNameSchema.parse(c))
                        .map((creedName) => (
                            <Grid.Col key={creedName} xs={12} sm={6} md={4} lg={3}>
                                {createCreedPick(creedName, c1)}
                            </Grid.Col>
                        ))}
                </Grid>
            </ScrollArea>
        </div>
    )
}

export default CreedPicker