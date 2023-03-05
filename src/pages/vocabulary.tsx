import Header from "@/components/Header"
import ProgressBar from "@/components/ProgressBar"
import { useState } from "react";

interface IinitialState {
    currentQuestion: number,
    numberOfQuestions: number,
    // selectedVerbs: string[],
    // questions: IverbQuestion[],
    // possibleAnswers: IverbQuestion[],
    selectedAnswer: string,
    selectedAnswers: boolean[]
}

const Vocabulary = () => {

    const initialState = {
        currentQuestion: 0,
        numberOfQuestions: 5,
        // selectedVerbs: gameSettings.selectedVerbs,
        // questions: verbs,
        // possibleAnswers: [],
        selectedAnswer: "",
        selectedAnswers: []
    }

    const [state, setState] = useState(initialState);
    let { currentQuestion, numberOfQuestions, selectedAnswer, selectedAnswers } = state;
    const [showAnswer, setShowAnswer] = useState<boolean>(false)


    let progress = Math.round(currentQuestion / numberOfQuestions * 100)


    return (
        <div className="absolute inset-0 flex flex-col items-stretch bg-duo-eel">
            <Header />
            <div className="py-2 bg-duo-eel">
                <ProgressBar progress={progress} />
            </div>
            {!showAnswer ?
                <div className="flex flex-col flex-1">
                </div>
                :
                <div className="flex flex-col justify-center items-center flex-1 bg-duo-eel">
                </div>
            }
        </div>
    )
}

export default Vocabulary