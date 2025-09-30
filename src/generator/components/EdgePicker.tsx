import { Accordion, Button, Card, Center, Grid, Group, ScrollArea, Text, Title, useMantineTheme, Stack, Box, Checkbox } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useEffect, useState } from "react"
import ReactGA from "react-ga4"
import { EdgeName, edgeNameSchema } from "~/data/NameSchemas"
import { Character } from "../../data/Character"
import { edges, EdgePerk } from "../../data/Edges"
import { globals } from "../../globals"
import { powerSchema } from "../../data/Disciplines"

type SelectedEdgePower = {
    edgeName: EdgeName
    perkName: string
    perk: EdgePerk
}

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
    const [selectedEdgePowers, setSelectedEdgePowers] = useState<SelectedEdgePower[]>([])
    const maxEdgePowers = 3

    useEffect(() => {
        // Initialize selected edge powers from character if needed
        // For now, start with empty selection
        setSelectedEdgePowers([])
    }, [character.edges])

    const handleEdgePowerToggle = (edgeName: EdgeName, perkName: string, perk: EdgePerk) => {
        const powerKey = `${edgeName}-${perkName}`
        const existingIndex = selectedEdgePowers.findIndex(
            selected => selected.edgeName === edgeName && selected.perkName === perkName
        )
        
        let newSelected = [...selectedEdgePowers]
        
        if (existingIndex >= 0) {
            // Remove the edge power
            newSelected.splice(existingIndex, 1)
        } else {
            // Add the edge power if we haven't reached the limit
            if (selectedEdgePowers.length < maxEdgePowers) {
                newSelected.push({ edgeName, perkName, perk })
            } else {
                // Show notification that limit is reached
                notifications.show({
                    title: "Edge Power Limit Reached",
                    message: `You can only select ${maxEdgePowers} edge powers. Remove one first.`,
                    color: "orange"
                })
                return
            }
        }

        setSelectedEdgePowers(newSelected)
        
        // Convert to power format for character storage
        const edgePowers = newSelected.map(selected => ({
            name: selected.perkName,
            description: selected.perk.description,
            summary: selected.perk.description,
            dicePool: edges[selected.edgeName].edgePool,
            level: 1,
            discipline: selected.edgeName,
            rouseChecks: 0,
            amalgamPrerequisites: [],
        }))

        setCharacter({
            ...character,
            edges: edgePowers,
        })
    }

    // Each edge is now its own category containing powers
    const availableEdges = Object.keys(edges).filter(edge => edge !== "") as EdgeName[]
    
    const createEdgeSection = (edgeName: EdgeName) => {
        const edge = edges[edgeName]
        const selectedPowersFromThisEdge = selectedEdgePowers.filter(selected => selected.edgeName === edgeName)
        
        // Color coding based on original categories for visual distinction
        let categoryColor = theme.colors?.gray?.[6] || '#868e96'
        if (['arsenal', 'fleet', 'ordnance'].includes(edgeName)) {
            categoryColor = theme.colors?.red?.[6] || '#fa5252' // Assets - Red
        } else if (['library', 'experimental-medicine', 'improvised-gear', 'global-access', 'drone-jockey', 'beast-whisperer', 'turncoat'].includes(edgeName)) {
            categoryColor = theme.colors?.blue?.[6] || '#339af0' // Aptitudes - Blue
        } else if (['sense-the-unnatural', 'repel-the-unnatural', 'thwart-the-unnatural', 'artifact', 'cleanse-the-unnatural', 'great-destiny', 'unnatural-changes'].includes(edgeName)) {
            categoryColor = theme.colors?.grape?.[6] || '#9775fa' // Endowments - Purple
        }
        
        return (
            <Accordion.Item key={edgeName} value={edgeName}>
                <Accordion.Control>
                    <Group position="apart" align="center">
                        <Group>
                            <Title order={4} style={{ color: categoryColor }}>
                                {edgeName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Title>
                            {selectedPowersFromThisEdge.length > 0 && (
                                <Box
                                    style={{
                                        width: 25,
                                        height: 20,
                                        borderRadius: '10px',
                                        backgroundColor: theme.colors?.green?.[6] || '#51cf66',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text size="xs" color="white" weight={700}>{selectedPowersFromThisEdge.length}</Text>
                                </Box>
                            )}
                        </Group>
                        <Text size="sm" c="dimmed">
                            {edge.edgePool}
                        </Text>
                    </Group>
                </Accordion.Control>
                <Accordion.Panel>
                    <Stack spacing="md">
                        <Text size="sm">
                            <strong>Description:</strong> {edge.description}
                        </Text>
                        <Text size="sm">
                            <strong>Edge Pool:</strong> {edge.edgePool}
                        </Text>
                        <Text size="sm">
                            <strong>System:</strong> {edge.system}
                        </Text>
                        
                        {edge.perks.length > 0 && (
                            <div>
                                <Text size="sm" weight={600} mb="xs">Available Powers:</Text>
                                <Stack spacing="xs">
                                    {edge.perks.map((perk, index) => {
                                        const isSelected = selectedEdgePowers.some(
                                            selected => selected.edgeName === edgeName && selected.perkName === perk.name
                                        )
                                        const canSelect = selectedEdgePowers.length < maxEdgePowers || isSelected
                                        
                                        return (
                                            <Card 
                                                key={index} 
                                                padding="sm" 
                                                style={{ 
                                                    backgroundColor: isSelected 
                                                        ? (theme.colors?.green?.[1] || '#ebfbee')
                                                        : (theme.colorScheme === 'dark' ? theme.colors?.dark?.[7] : theme.colors?.gray?.[1]),
                                                    border: isSelected ? `2px solid ${theme.colors?.green?.[5] || '#69db7c'}` : "1px solid transparent",
                                                    cursor: canSelect ? "pointer" : "not-allowed",
                                                    opacity: canSelect ? 1 : 0.6
                                                }}
                                                onClick={() => {
                                                    if (canSelect) {
                                                        handleEdgePowerToggle(edgeName, perk.name, perk)
                                                    }
                                                }}
                                            >
                                                <Group position="apart" align="flex-start">
                                                    <Stack spacing="xs" style={{ flex: 1 }}>
                                                        <Group>
                                                            <Checkbox
                                                                checked={isSelected}
                                                                readOnly
                                                                size="sm"
                                                            />
                                                            <Text size="sm" weight={500}>{perk.name}</Text>
                                                        </Group>
                                                        <Text size="xs" c="dimmed">{perk.description}</Text>
                                                    </Stack>
                                                </Group>
                                            </Card>
                                        )
                                    })}
                                </Stack>
                            </div>
                        )}
                        
                        {edge.perks.length === 0 && (
                            <Text size="sm" c="dimmed" style={{ fontStyle: 'italic' }}>
                                Powers for this edge will be available soon.
                            </Text>
                        )}
                    </Stack>
                </Accordion.Panel>
            </Accordion.Item>
        )
    }

    const height = globals.viewportHeightPx
    
    return (
        <div style={{ height: height - 250 }}>
            <Text fz={"30px"} ta={"center"} mb="md">
                Choose Your <b>Edge Powers</b>
            </Text>

            <Text ta="center" fz="xl" fw={700} c="orange" mb="xs">
                Selected: {selectedEdgePowers.length}/{maxEdgePowers}
            </Text>
            
            <Text ta="center" size="sm" c="dimmed" mb="lg">
                Select specific powers from different edge categories to customize your hunter's abilities.
            </Text>

            <Center mb="lg">
                <Button 
                    disabled={selectedEdgePowers.length === 0}
                    onClick={nextStep}
                    color="green"
                    size="md"
                    style={{ minWidth: 200 }}
                >
                    Continue with {selectedEdgePowers.length} Power{selectedEdgePowers.length !== 1 ? 's' : ''}
                </Button>
            </Center>

            <ScrollArea h={height - 400} w={"100%"}>
                <Accordion multiple defaultValue={[]}>
                    {availableEdges.map(edge => createEdgeSection(edge))}
                </Accordion>
            </ScrollArea>
        </div>
    )
}

export default EdgePicker