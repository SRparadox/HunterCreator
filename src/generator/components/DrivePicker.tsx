import { Card, Center, Grid, Image, ScrollArea, Text, Title, useMantineTheme } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useEffect, useRef, useState } from "react"
import ReactGA from "react-ga4"
import { DriveName, driveNameSchema } from "~/data/NameSchemas"
import { Character } from "../../data/Character"
import { drives } from "../../data/Drives"
import { globals } from "../../globals"

type DrivePickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const DrivePicker = ({ character, setCharacter, nextStep }: DrivePickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Drive Picker" })
    }, [])

    const theme = useMantineTheme()
    const [hoveredDrive, setHoveredDrive] = useState<DriveName | null>(null)

    const c1 = "rgba(26, 27, 30, 0.90)"

    // Scrollable text component for descriptions
    const ScrollableDescription = ({ text, drive }: { text: string; drive: DriveName }) => {
        const textRef = useRef<HTMLDivElement>(null)
        const [shouldScroll, setShouldScroll] = useState(false)
        
        useEffect(() => {
            if (textRef.current) {
                const element = textRef.current
                setShouldScroll(element.scrollHeight > element.clientHeight)
            }
        }, [text])
        
        useEffect(() => {
            if (textRef.current && shouldScroll && hoveredDrive === drive) {
                const element = textRef.current
                const scrollHeight = element.scrollHeight - element.clientHeight
                
                if (scrollHeight > 0) {
                    let scrollPosition = 0
                    const scrollSpeed = 30 // pixels per second
                    const pauseTime = 1000 // pause at start/end in ms
                    
                    const scroll = () => {
                        if (hoveredDrive !== drive) return // Stop if no longer hovered
                        
                        element.scrollTop = scrollPosition
                        
                        if (scrollPosition < scrollHeight) {
                            scrollPosition += scrollSpeed / 60 // 60fps
                            requestAnimationFrame(scroll)
                        } else {
                            // Pause at bottom, then reset
                            setTimeout(() => {
                                if (hoveredDrive === drive) {
                                    scrollPosition = 0
                                    element.scrollTop = 0
                                    setTimeout(() => {
                                        if (hoveredDrive === drive) {
                                            requestAnimationFrame(scroll)
                                        }
                                    }, pauseTime)
                                }
                            }, pauseTime)
                        }
                    }
                    
                    // Start scrolling after initial pause
                    setTimeout(() => {
                        if (hoveredDrive === drive) {
                            requestAnimationFrame(scroll)
                        }
                    }, pauseTime)
                }
            }
        }, [hoveredDrive, drive, shouldScroll])
        
        return (
            <div
                ref={textRef}
                style={{
                    height: 75,
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

    const createDrivePick = (drive: DriveName, c2: string) => {
        const bgColor = theme.fn?.linearGradient ? theme.fn.linearGradient(0, c1, c2) : `linear-gradient(0deg, ${c1}, ${c2})`

        return (
            <Grid.Col key={drive} span={4}>
                <Card
                    className="hoverCard"
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    h={320}
                    style={{ background: bgColor, cursor: "pointer" }}
                    onMouseEnter={() => setHoveredDrive(drive)}
                    onMouseLeave={() => setHoveredDrive(null)}
                    onClick={() => {
                        setCharacter({
                            ...character,
                            drive,
                        })

                        ReactGA.event({
                            action: "drive clicked",
                            category: "drives",
                            label: drive,
                        })
                        nextStep()
                    }}
                >
                    <Card.Section>
                        <Center pt={10}>
                            <div style={{ height: 120, width: 120, backgroundColor: theme.colors?.gray?.[6] || '#868e96', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Text size="xl" weight={700}>{drive.charAt(0)}</Text>
                            </div>
                        </Center>
                    </Card.Section>

                    <Center>
                        <Title p="md" order={3}>{drive}</Title>
                    </Center>

                    <ScrollableDescription text={drives[drive].description} drive={drive} />
                    
                    <Text size="xs" ta="center" c="yellow" mt="xs">
                        <b>Redemption:</b> {drives[drive].redemption}
                    </Text>
                </Card>
            </Grid.Col>
        )
    }

    const height = globals.viewportHeightPx
    return (
        <div style={{ height: height - 250 }}>
            <Text fz={"30px"} ta={"center"}>
                Pick your <b>Drive</b>
            </Text>

            <Text ta="center" fz="xl" fw={700} c="orange">
                Drive
            </Text>
            <hr color="#fd7e14" />

            <ScrollArea h={height - 215} w={"100%"} p={20}>
                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors?.blue?.[6] || '#339af0'}>
                    Knowledge-Seeking Drives
                </Text>
                <Grid grow m={0}>
                    {["Curiosity"]
                        .map((d) => driveNameSchema.parse(d))
                        .map((drive) => createDrivePick(drive, theme.fn?.rgba ? theme.fn.rgba(theme.colors?.blue?.[8] || '#1864ab', 0.9) : 'rgba(24, 100, 171, 0.9)'))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors?.red?.[8] || '#c92a2a'}>
                    Retribution Drives
                </Text>
                <Grid grow m={0}>
                    {["Vengeance", "Oath"]
                        .map((d) => driveNameSchema.parse(d))
                        .map((drive) => createDrivePick(drive, theme.fn?.rgba ? theme.fn.rgba(theme.colors?.red?.[8] || '#c92a2a', 0.9) : 'rgba(201, 42, 42, 0.9)'))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors?.green?.[7] || '#51cf66'}>
                    Self-Serving Drives
                </Text>
                <Grid grow m={0}>
                    {["Greed", "Pride", "Envy"]
                        .map((d) => driveNameSchema.parse(d))
                        .map((drive) => createDrivePick(drive, theme.fn?.rgba ? theme.fn.rgba(theme.colors?.green?.[8] || '#37b24d', 0.9) : 'rgba(55, 178, 77, 0.9)'))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors?.purple?.[7] || '#9775fa'}>
                    Redemptive Drives
                </Text>
                <Grid grow m={0}>
                    {["Atonement"]
                        .map((d) => driveNameSchema.parse(d))
                        .map((drive) => createDrivePick(drive, theme.fn?.rgba ? theme.fn.rgba(theme.colors?.purple?.[8] || '#7950f2', 0.9) : 'rgba(121, 80, 242, 0.9)'))}
                </Grid>
            </ScrollArea>
        </div>
    )
}

export default DrivePicker