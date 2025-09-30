import { Button, Card, Center, Grid, Group, ScrollArea, Text, Title, useMantineTheme, Stack } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { EdgeName, edgeNameSchema } from "~/data/NameSchemas"
import { Character } from "../../data/Character"
import { edges } from "../../data/Edges"
import { globals } from "../../globals"
import { powerSchema } from "../../data/Disciplines"

type EdgePickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const EdgePicker = ({ character, setCharacter, nextStep }: EdgePickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Edge Picker" })
    }, [])

    const theme = useMantineTheme()
    const [selectedEdges, setSelectedEdges] = useState<EdgeName[]>([])
    const maxEdges = 3 // Typical starting number for Hunter

    useEffect(() => {
        // Initialize selected edges from character
        if (character.edges && character.edges.length > 0) {
            setSelectedEdges(character.edges.map(edge => edge.discipline as EdgeName))
        }
    }, [character.edges])

    const handleEdgeToggle = (edgeName: EdgeName) => {
        const isSelected = selectedEdges.includes(edgeName)
        let newSelected: EdgeName[]

        if (isSelected) {
            newSelected = selectedEdges.filter(e => e !== edgeName)
        } else {
            if (selectedEdges.length < maxEdges) {
                newSelected = [...selectedEdges, edgeName]
            } else {
                notifications.show({
                    title: "Maximum Edges Reached",
                    message: `You can only select ${maxEdges} edges`,
                    color: "yellow",
                })
                return
            }
        }

        setSelectedEdges(newSelected)
        
        // Convert to power format for consistency with gifts/disciplines
        const edgePowers = newSelected.map(edge => ({
            name: `${edge.charAt(0).toUpperCase() + edge.slice(1)} Edge`,
            description: edges[edge].description,
            summary: edges[edge].description,
            dicePool: "Variable",
            level: 1,
            discipline: edge,
            rouseChecks: 0,
            amalgamPrerequisites: [],
        }))

        setCharacter({
            ...character,
            edges: edgePowers,
        })
    }

    const createEdgePick = (edgeName: EdgeName, color: string) => {
        const isSelected = selectedEdges.includes(edgeName)
        const isAvailable = character.availableEdgeNames.includes(edgeName)
        const bgColor = isSelected 
            ? (theme.fn?.linearGradient ? theme.fn.linearGradient(0, color, theme.colors?.green?.[7] || '#51cf66') : `linear-gradient(0deg, ${color}, #51cf66)`)
            : (theme.fn?.linearGradient ? theme.fn.linearGradient(0, "rgba(26, 27, 30, 0.90)", color) : `linear-gradient(0deg, rgba(26, 27, 30, 0.90), ${color})`)

        return (
            <Grid.Col key={edgeName} span={6}>
                <Card
                    className="hoverCard"
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    h={280}
                    style={{ 
                        background: bgColor, 
                        cursor: isAvailable ? "pointer" : "not-allowed",
                        opacity: isAvailable ? 1 : 0.5,
                        border: isSelected ? `2px solid ${theme.colors?.green?.[5] || '#69db7c'}` : "2px solid transparent"
                    }}
                    onClick={() => {
                        if (isAvailable) {
                            handleEdgeToggle(edgeName)
                        }
                    }}
                >
                    <Card.Section>
                        <Center pt={10}>
                            <div style={{ 
                                height: 80, 
                                width: 80, 
                                backgroundColor: isSelected ? (theme.colors?.green?.[6] || '#51cf66') : (theme.colors?.gray?.[6] || '#868e96'), 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}>
                                <Text size="lg" weight={700}>{edgeName.charAt(0).toUpperCase()}</Text>
                            </div>
                        </Center>
                    </Card.Section>

                    <Center>
                        <Title order={4} p="sm">{edgeName.charAt(0).toUpperCase() + edgeName.slice(1)}</Title>
                    </Center>

                    <Stack spacing="xs">
                        <Text size="sm" ta="center" style={{ minHeight: 60 }}>
                            {edges[edgeName].description}
                        </Text>
                        
                        <Text size="xs" ta="center" c="blue">
                            <b>Type:</b> {edges[edgeName].type}
                        </Text>
                        
                        {!isAvailable && (
                            <Text size="xs" ta="center" c="red">
                                Not available for your creed
                            </Text>
                        )}
                    </Stack>
                </Card>
            </Grid.Col>
        )
    }

    const availableEdges = Object.keys(edges).filter(edge => edge !== "") as EdgeName[]
    const physicalEdges = availableEdges.filter(edge => edges[edge].type === "Physical")
    const mentalEdges = availableEdges.filter(edge => edges[edge].type === "Mental")
    const socialEdges = availableEdges.filter(edge => edges[edge].type === "Social")
    const supernaturalEdges = availableEdges.filter(edge => edges[edge].type === "Supernatural")

    const height = globals.viewportHeightPx
    return (
        <div style={{ height: height - 250 }}>
            <Text fz={"30px"} ta={"center"}>
                Pick your <b>Edges</b>
            </Text>

            <Text ta="center" fz="xl" fw={700} c="orange">
                Edges ({selectedEdges.length}/{maxEdges})
            </Text>
            <hr color="#fd7e14" />

            <Center mb="md">
                <Group>
                    <Text size="sm" c="dimmed">
                        Select {maxEdges} edges that represent your character's special abilities and resources
                    </Text>
                    <Button 
                        disabled={selectedEdges.length === 0}
                        onClick={nextStep}
                        color="green"
                        size="sm"
                    >
                        Continue ({selectedEdges.length}/{maxEdges})
                    </Button>
                </Group>
            </Center>

            <ScrollArea h={height - 300} w={"100%"} p={20}>
                {physicalEdges.length > 0 && (
                    <>
                        <Text ta="center" fz="lg" fw={700} mb={"sm"} mt={"md"} c={theme.colors?.red?.[6] || '#fa5252'}>
                            Physical Edges
                        </Text>
                        <Grid grow m={0}>
                            {physicalEdges.map((edge) => createEdgePick(edge, theme.fn?.rgba ? theme.fn.rgba(theme.colors?.red?.[8] || '#c92a2a', 0.9) : 'rgba(201, 42, 42, 0.9)'))}
                        </Grid>
                    </>
                )}

                {mentalEdges.length > 0 && (
                    <>
                        <Text ta="center" fz="lg" fw={700} mb={"sm"} mt={"md"} c={theme.colors?.blue?.[6] || '#339af0'}>
                            Mental Edges
                        </Text>
                        <Grid grow m={0}>
                            {mentalEdges.map((edge) => createEdgePick(edge, theme.fn?.rgba ? theme.fn.rgba(theme.colors?.blue?.[8] || '#1864ab', 0.9) : 'rgba(24, 100, 171, 0.9)'))}
                        </Grid>
                    </>
                )}

                {socialEdges.length > 0 && (
                    <>
                        <Text ta="center" fz="lg" fw={700} mb={"sm"} mt={"md"} c={theme.colors?.green?.[6] || '#51cf66'}>
                            Social Edges
                        </Text>
                        <Grid grow m={0}>
                            {socialEdges.map((edge) => createEdgePick(edge, theme.fn?.rgba ? theme.fn.rgba(theme.colors?.green?.[8] || '#37b24d', 0.9) : 'rgba(55, 178, 77, 0.9)'))}
                        </Grid>
                    </>
                )}

                {supernaturalEdges.length > 0 && (
                    <>
                        <Text ta="center" fz="lg" fw={700} mb={"sm"} mt={"md"} c={theme.colors?.grape?.[6] || '#9775fa'}>
                            Supernatural Edges
                        </Text>
                        <Grid grow m={0}>
                            {supernaturalEdges.map((edge) => createEdgePick(edge, theme.fn?.rgba ? theme.fn.rgba(theme.colors?.grape?.[8] || '#7950f2', 0.9) : 'rgba(121, 80, 242, 0.9)'))}
                        </Grid>
                    </>
                )}
            </ScrollArea>
        </div>
    )
}

export default EdgePicker