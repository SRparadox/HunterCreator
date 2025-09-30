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
                                    element.scrollTop = 0
                                    setTimeout(() => {
                                        if (hoveredCreed === creed) {
                                            requestAnimationFrame(scroll)
                                        }
                                    }, pauseTime)
                                }
                            }, pauseTime)
                        }
                    }
                    
                    // Start scrolling after initial pause
                    setTimeout(() => {
                        if (hoveredCreed === creed) {
                            requestAnimationFrame(scroll)
                        }
                    }, pauseTime)
                }
            }
        }, [hoveredCreed, creed, shouldScroll])
        
        return (
            <div
                ref={textRef}
                style={{
                    height: 55,
                    overflow: 'hidden',
                    fontSize: '14px',
                    color: 'dimmed',
                    textAlign: 'center',
                    lineHeight: '1.2'
                }}
            >
                {text}
            </div>
        )
    }

    const createCreedPick = (creed: CreedName, c2: string) => {
        const bgColor = theme.fn.linearGradient(0, c1, c2)

        return (
            <Grid.Col key={creed} span={4}>
                <Card
                    className="hoverCard"
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    h={320}
                    style={{ background: bgColor, cursor: "pointer" }}
                    onMouseEnter={() => setHoveredCreed(creed)}
                    onMouseLeave={() => setHoveredCreed(null)}
                    onClick={() => {
                        if ((character.edges.length > 0 || character.drive !== "") && creed !== character.creed) {
                            notifications.show({
                                title: "Reset Edges",
                                message: "Because you changed your creed",
                                autoClose: 7000,
                                color: "yellow",
                            })

                            setCharacter({
                                ...character,
                                creed,
                                edges: [],
                                availableEdgeNames: creeds[creed].edges,
                                drive: character.drive,
                            })
                        } else {
                            setCharacter({
                                ...character,
                                creed,
                                availableEdgeNames: creeds[creed].edges,
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
                        <Title p="md">{creed}</Title>
                    </Center>

                    <ScrollableDescription text={creeds[creed].description} creed={creed} />
                    
                    <Text size="xs" ta="center" c="yellow" mt="xs">
                        <b>Virtue:</b> {creeds[creed].virtue}
                    </Text>
                    
                    <Text size="xs" ta="center" c="blue" mt="xs">
                        {creeds[creed].organizationType}
                    </Text>
                </Card>
            </Grid.Col>
        )
    }

    const height = globals.viewportHeightPx
    return (
        <div style={{ height: height - 250 }}>
            <Text fz={"30px"} ta={"center"}>
                Pick your <b>Creed</b>
            </Text>

            <Text ta="center" fz="xl" fw={700} c="red">
                Creed
            </Text>
            <hr color="#e03131" />

            <ScrollArea h={height - 215} w={"100%"} p={20}>
                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors.blue[6]}>
                    Organized Hunters
                </Text>
                <Grid grow m={0}>
                    {["Entrepreneurial", "Martial"]
                        .map((c) => creedNameSchema.parse(c))
                        .map((creed) => createCreedPick(creed, theme.fn.rgba(theme.colors.blue[8], 0.9)))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors.red[8]}>
                    Faith-Based Hunters
                </Text>
                <Grid grow m={0}>
                    {["Faithful"]
                        .map((c) => creedNameSchema.parse(c))
                        .map((creed) => createCreedPick(creed, theme.fn.rgba(theme.colors.red[8], 0.9)))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors.grape[7]}>
                    Knowledge Seekers
                </Text>

                <Grid grow m={0}>
                    {["Inquisitive"]
                        .map((c) => creedNameSchema.parse(c))
                        .map((creed) => createCreedPick(creed, theme.fn.rgba(theme.colors.grape[8], 0.9)))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors.green[7]}>
                    Street Hunters
                </Text>

                <Grid grow m={0}>
                    {["Underground"]
                        .map((c) => creedNameSchema.parse(c))
                        .map((creed) => createCreedPick(creed, theme.fn.rgba(theme.colors.green[8], 0.9)))}
                </Grid>
            </ScrollArea>
        </div>
    )
}

export default CreedPicker