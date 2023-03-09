import Header from "@/components/Header"
import SlidePanel from "@/components/motion/SlidePanel";
import ProgressBar from "@/components/ProgressBar"
import { supabase } from "lib/supabaseClient";
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

const Vocabulary = ({ nouns }: { nouns: any[] }) => {
    console.log("the nouns: ", nouns);


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


    const checkAnswer = () => {
        setShowAnswer(true)
        // setState({ ...state, selectedAnswers: [...state.selectedAnswers, state.selectedAnswer === questions[currentQuestion].theConjugatedVerbIs.cz] })
    }

    const nextQuestion = () => {
        setShowAnswer(false)
        // setState({ ...state, currentQuestion: ++currentQuestion, })
    }

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
                <div className="flex flex-col flex-1 justify-center items-center  bg-duo-eel">
                </div>
            }

            <div className="flex flex-col justify-center align-middle bg-duo-wolf  p-4">
                <SlidePanel isVisible={showAnswer}>
                    <div className="flex justify-center pb-4">
                        good job
                    </div>
                </SlidePanel>
                {!showAnswer ?
                    <button className="button bg-duo-greenMiddle" onClick={() => checkAnswer()} > Check</button>
                    :
                    <button className="button bg-duo-greenMiddle" onClick={() => nextQuestion()}>Next</button>
                }
            </div>
        </div>
    )
}

export default Vocabulary

export async function getServerSideProps({ query }: { query: any }) {
    //this takes the nouns and filters them by category
    let { data }: { data: any } = await supabase.from('nouns').select(`noun, plural, gender`).contains('category', { cz: "profese" })
    let numberOfQuestions = 5;
    let randomNounsArray: any[] = [];
    for (let i = 0; randomNounsArray.length < numberOfQuestions; i++) {
        const amountArray = ["singular", "plural"] as const
        randomNounsArray.push()
    }


    return {
        props: {
            nouns: data
        },
    }
}