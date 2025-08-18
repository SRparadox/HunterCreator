import { Card, Center, Grid, Image, ScrollArea, Text, Title, useMantineTheme } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useEffect } from "react"
import ReactGA from "react-ga4"
import { TribeName, tribeNameSchema, DisciplineName } from "~/data/NameSchemas"
import { Character } from "../../data/Character"
import { tribes } from "../../data/Tribes"
import { globals } from "../../globals"
import { notDefault } from "../utils"

type TribePickerProps = {
    character: Character
    setCharacter: (character: Character) => void
    nextStep: () => void
}

const TribePicker = ({ character, setCharacter, nextStep }: TribePickerProps) => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: "Tribe Picker" })
    }, [])

    const theme = useMantineTheme()

    const c1 = "rgba(26, 27, 30, 0.90)"

    const createTribePick = (tribe: TribeName, c2: string) => {
        const bgColor = theme.fn.linearGradient(0, c1, c2)

        return (
            <Grid.Col key={tribe} span={4}>
                <Card
                    className="hoverCard"
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    h={320}
                    style={{ background: bgColor, cursor: "pointer" }}
                    onClick={() => {
                        if ((notDefault(character, "gifts") || notDefault(character, "auspice")) && tribe !== character.tribe) {
                            notifications.show({
                                title: "Reset Gifts",
                                message: "Because you changed your tribe",
                                autoClose: 7000,
                                color: "yellow",
                            })

                            setCharacter({
                                ...character,
                                tribe,
                                clan: tribe, // For backward compatibility
                                gifts: [],
                                disciplines: [], // For backward compatibility
                                availableGiftNames: tribes[tribe].gifts,
                                availableDisciplineNames: tribes[tribe].gifts as string[] as DisciplineName[], // For compatibility
                                auspice: character.auspice,
                                predatorType: character.predatorType, // For compatibility
                            })
                        } else {
                            setCharacter({
                                ...character,
                                tribe,
                                clan: tribe, // For backward compatibility 
                                availableGiftNames: tribes[tribe].gifts,
                                availableDisciplineNames: tribes[tribe].gifts as string[] as DisciplineName[], // For compatibility
                            })
                        }

                        ReactGA.event({
                            action: "tribe clicked",
                            category: "tribes",
                            label: tribe,
                        })
                        nextStep()
                    }}
                >
                    <Card.Section>
                        <Center pt={10}>
                            <Image fit="contain" withPlaceholder src={tribes[tribe].logo} height={120} width={120} alt={tribe} />
                        </Center>
                    </Card.Section>

                    <Center>
                        <Title p="md">{tribe}</Title>
                    </Center>

                    <Text h={55} size="sm" color="dimmed" ta="center">
                        {tribes[tribe].description}
                    </Text>
                    
                    <Text size="xs" ta="center" c="yellow" mt="xs">
                        <b>Favor:</b> {tribes[tribe].favor}
                    </Text>
                    
                    <Text size="xs" ta="center" c="blue" mt="xs">
                        +2 {tribes[tribe].renownType} Renown
                    </Text>
                </Card>
            </Grid.Col>
        )
    }

    const height = globals.viewportHeightPx
    return (
        <div style={{ height: height - 250 }}>
            <Text fz={"30px"} ta={"center"}>
                Pick your <b>Tribe</b>
            </Text>

            <Text ta="center" fz="xl" fw={700} c="red">
                Tribe
            </Text>
            <hr color="#e03131" />

            <ScrollArea h={height - 215} w={"100%"} p={20}>
                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors.blue[6]}>
                    Guardians & Protectors
                </Text>
                <Grid grow m={0}>
                    {["Silver Fangs", "Children of Gaia", "Hart Wardens"]
                        .map((t) => tribeNameSchema.parse(t))
                        .map((tribe) => createTribePick(tribe, theme.fn.rgba(theme.colors.blue[8], 0.9)))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors.red[8]}>
                    Warriors & Fighters
                </Text>
                <Grid grow m={0}>
                    {["Black Furies", "Galestalkers", "Red Talons"]
                        .map((t) => tribeNameSchema.parse(t))
                        .map((tribe) => createTribePick(tribe, theme.fn.rgba(theme.colors.red[8], 0.9)))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c={theme.colors.grape[7]}>
                    Mystics & Speakers
                </Text>

                <Grid grow m={0}>
                    {["Ghost Council", "Silent Striders"]
                        .map((t) => tribeNameSchema.parse(t))
                        .map((tribe) => createTribePick(tribe, theme.fn.rgba(theme.colors.grape[8], 0.9)))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c="green">
                    Urban Adapters
                </Text>
                <Grid grow m={0}>
                    {["Glass Walkers", "Bone Gnawers"]
                        .map((t) => tribeNameSchema.parse(t))
                        .map((tribe) => createTribePick(tribe, theme.fn.rgba(theme.colors.green[9], 0.9)))}
                </Grid>

                <Text ta="center" fz="xl" fw={700} mb={"sm"} mt={"md"} c="rgb(175,175,175)">
                    Political Powers
                </Text>
                <Grid grow m={0}>
                    {["Shadow Lords"]
                        .map((t) => tribeNameSchema.parse(t))
                        .map((tribe) => createTribePick(tribe, theme.fn.rgba(theme.colors.gray[6], 0.9)))}
                </Grid>
            </ScrollArea>
        </div>
    )
}

export default TribePicker
