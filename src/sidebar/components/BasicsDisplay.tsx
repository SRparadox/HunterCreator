import { Center, Grid, Stack, Text, Title } from "@mantine/core"
import { Character } from "../../data/Character"

export type BasicsProps = {
    character: Character
}

const BasicsDisplay = ({ character }: BasicsProps) => {
    return (
        <Stack>
            <Center>
                <Title order={2}>{character.name}</Title>
            </Center>
            {character.playerName && (
                <Text c="dimmed" ta="center">
                    <b>Player:</b> {character.playerName}
                </Text>
            )}
            {character.concept && (
                <Text c="dimmed" ta="center">
                    <b>Concept:</b> {character.concept}
                </Text>
            )}
            {character.chronicle && (
                <Text c="dimmed" ta="center">
                    <b>Chronicle:</b> {character.chronicle}
                </Text>
            )}
            {character.pack && (
                <Text c="dimmed" ta="center">
                    <b>Pack:</b> {character.pack}
                </Text>
            )}
            {character.description && <Text c="dimmed">{character.description}</Text>}
            {character.appearance && (
                <Text>
                    <b>Appearance:</b> {character.appearance}
                </Text>
            )}
            {character.history && (
                <Text>
                    <b>History:</b> {character.history}
                </Text>
            )}
            {character.notes && (
                <Text>
                    <b>Notes:</b> {character.notes}
                </Text>
            )}
            {character.redemption && (
                <Text>
                    <b>Redemption:</b> {character.redemption}
                </Text>
            )}

            <Grid>
                <Grid.Col span={6}>
                    <Text>
                        <b>Ambition:</b>
                    </Text>
                    <Text>{character.ambition}</Text>
                </Grid.Col>

                <Grid.Col span={6}>
                    <Text>
                        <b>Desire:</b>
                    </Text>
                    <Text>{character.desire}</Text>
                </Grid.Col>
            </Grid>
        </Stack>
    )
}

export default BasicsDisplay
