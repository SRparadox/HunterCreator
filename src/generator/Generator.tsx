import { Center, Text } from "@mantine/core"
import { Character } from "../data/Character"
import AttributePicker from "./components/AttributePicker"
import BasicsPicker from "./components/BasicsPicker"
import TribePicker from "./components/TribePicker"
import GiftsPicker from "./components/GiftsPicker"
import RitesPicker from "./components/RitesPicker"
import Final from "./components/Final"
import AuspicePicker from "./components/AuspicePicker"
import Intro from "./components/Intro"
import MeritsAndFlawsPicker from "./components/MeritsAndFlawsPicker"

import SkillsPicker from "./components/SkillsPicker"
import TouchstonePicker from "./components/TouchstonePicker"
import ErrorBoundary from "../components/ErrorBoundary"

export type GeneratorProps = {
    character: Character
    setCharacter: (character: Character) => void

    selectedStep: number
    setSelectedStep: (step: number) => void
}

const Generator = ({ character, setCharacter, selectedStep, setSelectedStep }: GeneratorProps) => {
    const getStepComponent = () => {
        switch (selectedStep) {
            case 0:
                return (
                    <Intro
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 1:
                return (
                    <TribePicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 2:
                return (
                    <AttributePicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 3:
                return (
                    <SkillsPicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 4:
                return (
                    <AuspicePicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 5:
                return (
                    <BasicsPicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 6:
                return (
                    <GiftsPicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 7:
                return (
                    <RitesPicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 8:
                return (
                    <TouchstonePicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 9:
                return (
                    <MeritsAndFlawsPicker
                        character={character}
                        setCharacter={setCharacter}
                        nextStep={() => {
                            setSelectedStep(selectedStep + 1)
                        }}
                    />
                )
            case 10:
                return <Final character={character} setCharacter={setCharacter} setSelectedStep={setSelectedStep} />
            default:
                return <Text size={"xl"}>{`Error: Step ${selectedStep} is not implemented`}</Text>
        }
    }

    return (
        <Center h={"100%"}>
            <ErrorBoundary key={selectedStep}>{getStepComponent()}</ErrorBoundary>
        </Center>
    )
}

export default Generator
