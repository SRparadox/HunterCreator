import { Accordion, Button, Card, Center, Grid, Group, ScrollArea, Text, Title, useMantineTheme, Stack, Box } from "@mantine/core"
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
    const maxEdges = 3

    useEffect(() => {
        // Initialize selected edges from character
        if (character.edges && character.edges.length > 0) {
            setSelectedEdges(character.edges.map(edge => edge.discipline as EdgeName))
        }
    }, [character.edges])

    const handleEdgeToggle = (edgeName: EdgeName) => {
        let newSelected = [...selectedEdges]
        
        if (selectedEdges.includes(edgeName)) {
            // Remove the edge
            newSelected = newSelected.filter(e => e !== edgeName)
        } else {
            // Add the edge if we haven't reached the limit
            if (selectedEdges.length < maxEdges) {
                newSelected.push(edgeName)
            } else {
                // Show notification that limit is reached
                notifications.show({
                    title: "Edge Limit Reached",
                    message: `You can only select ${maxEdges} edges. Remove one first.`,
                    color: "orange"
                })
                return
            }
        }

        setSelectedEdges(newSelected)
        
        // Convert to power format for consistency
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

    const createEdgeCard = (edgeName: EdgeName, categoryColor: string) => {
        const isSelected = selectedEdges.includes(edgeName)
        const isAvailable = character.availableEdgeNames.includes(edgeName)
        
        return (
            <Card
                key={edgeName}
                className="hoverCard"
                shadow="sm"
                padding="md"
                radius="md"
                style={{ 
                    cursor: isAvailable ? "pointer" : "not-allowed",
                    opacity: isAvailable ? 1 : 0.5,
                    border: isSelected ? `3px solid ${theme.colors?.green?.[5] || '#69db7c'}` : "2px solid transparent",
                    backgroundColor: isSelected 
                        ? (theme.colors?.green?.[1] || '#ebfbee')
                        : (theme.colorScheme === 'dark' ? theme.colors?.dark?.[6] || '#2c2e33' : theme.white)
                }}
                onClick={() => {
                    if (isAvailable) {
                        handleEdgeToggle(edgeName)
                    }
                }}
            >
                <Stack spacing="xs">
                    <Group position="apart" align="center">
                        <Title order={5} style={{ color: categoryColor }}>
                            {edgeName.charAt(0).toUpperCase() + edgeName.slice(1)}
                        </Title>
                        {isSelected && (
                            <Box
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    backgroundColor: theme.colors?.green?.[6] || '#51cf66',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text size="xs" color="white" weight={700}>✓</Text>
                            </Box>
                        )}
                    </Group>
                    
                    <Text size="sm" style={{ minHeight: 60 }}>
                        {edges[edgeName].description}
                    </Text>
                    
                    {!isAvailable && (
                        <Text size="xs" c="red" style={{ fontStyle: 'italic' }}>
                            Not available for your creed
                        </Text>
                    )}
                </Stack>
            </Card>
        )
    }

    // Categorize edges based on the new system
    const availableEdges = Object.keys(edges).filter(edge => edge !== "") as EdgeName[]
    
    // Assets: Physical resources and equipment
    const assetEdges = availableEdges.filter(edge => 
        ['arsenal', 'fleet', 'ordnance'].includes(edge)
    )
    
    // Aptitudes: Mental abilities and knowledge
    const aptitudeEdges = availableEdges.filter(edge => 
        ['library', 'pursuit', 'stake'].includes(edge)
    )
    
    // Endowments: Supernatural abilities and connections
    const endowmentEdges = availableEdges.filter(edge => 
        ['blessed', 'net'].includes(edge)
    )
    
    // Catchall for any other edges
    const otherEdges = availableEdges.filter(edge => 
        !assetEdges.includes(edge) && 
        !aptitudeEdges.includes(edge) && 
        !endowmentEdges.includes(edge)
    )

    const height = globals.viewportHeightPx
    
    return (
        <div style={{ height: height - 250 }}>
            <Text fz={"30px"} ta={"center"} mb="md">
                Choose Your <b>Edges</b>
            </Text>

            <Text ta="center" fz="xl" fw={700} c="orange" mb="xs">
                Selected: {selectedEdges.length}/{maxEdges}
            </Text>
            
            <Text ta="center" size="sm" c="dimmed" mb="lg">
                Edges represent your character's special resources, abilities, and advantages in the hunt.
            </Text>

            <Center mb="lg">
                <Button 
                    disabled={selectedEdges.length === 0}
                    onClick={nextStep}
                    color="green"
                    size="md"
                    style={{ minWidth: 200 }}
                >
                    Continue with {selectedEdges.length} Edge{selectedEdges.length !== 1 ? 's' : ''}
                </Button>
            </Center>

            <ScrollArea h={height - 400} w={"100%"}>
                <Accordion multiple defaultValue={['assets', 'aptitudes', 'endowments']}>
                    
                    {assetEdges.length > 0 && (
                        <Accordion.Item value="assets">
                            <Accordion.Control>
                                <Group>
                                    <Title order={4} color={theme.colors?.red?.[6] || '#fa5252'}>
                                        Assets
                                    </Title>
                                    <Text size="sm" c="dimmed">
                                        Physical resources, equipment, and material advantages
                                    </Text>
                                </Group>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Grid>
                                    {assetEdges.map((edge) => (
                                        <Grid.Col key={edge} span={6}>
                                            {createEdgeCard(edge, theme.colors?.red?.[6] || '#fa5252')}
                                        </Grid.Col>
                                    ))}
                                </Grid>
                            </Accordion.Panel>
                        </Accordion.Item>
                    )}

                    {aptitudeEdges.length > 0 && (
                        <Accordion.Item value="aptitudes">
                            <Accordion.Control>
                                <Group>
                                    <Title order={4} color={theme.colors?.blue?.[6] || '#339af0'}>
                                        Aptitudes
                                    </Title>
                                    <Text size="sm" c="dimmed">
                                        Mental abilities, knowledge, and specialized skills
                                    </Text>
                                </Group>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Grid>
                                    {aptitudeEdges.map((edge) => (
                                        <Grid.Col key={edge} span={6}>
                                            {createEdgeCard(edge, theme.colors?.blue?.[6] || '#339af0')}
                                        </Grid.Col>
                                    ))}
                                </Grid>
                            </Accordion.Panel>
                        </Accordion.Item>
                    )}

                    {endowmentEdges.length > 0 && (
                        <Accordion.Item value="endowments">
                            <Accordion.Control>
                                <Group>
                                    <Title order={4} color={theme.colors?.grape?.[6] || '#9775fa'}>
                                        Endowments
                                    </Title>
                                    <Text size="sm" c="dimmed">
                                        Supernatural abilities and mystical connections
                                    </Text>
                                </Group>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Grid>
                                    {endowmentEdges.map((edge) => (
                                        <Grid.Col key={edge} span={6}>
                                            {createEdgeCard(edge, theme.colors?.grape?.[6] || '#9775fa')}
                                        </Grid.Col>
                                    ))}
                                </Grid>
                            </Accordion.Panel>
                        </Accordion.Item>
                    )}

                    {otherEdges.length > 0 && (
                        <Accordion.Item value="other">
                            <Accordion.Control>
                                <Group>
                                    <Title order={4} color={theme.colors?.gray?.[6] || '#868e96'}>
                                        Other Edges
                                    </Title>
                                    <Text size="sm" c="dimmed">
                                        Additional advantages and unique abilities
                                    </Text>
                                </Group>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Grid>
                                    {otherEdges.map((edge) => (
                                        <Grid.Col key={edge} span={6}>
                                            {createEdgeCard(edge, theme.colors?.gray?.[6] || '#868e96')}
                                        </Grid.Col>
                                    ))}
                                </Grid>
                            </Accordion.Panel>
                        </Accordion.Item>
                    )}

                </Accordion>
            </ScrollArea>
        </div>
    )
}

export default EdgePicker