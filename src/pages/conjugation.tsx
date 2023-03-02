import Header from "@/components/Header"
import ProgressBar from "@/components/ProgressBar";
import { useEffect, useState } from "react";
import { IVerb } from "typings";
import { supabase } from "../../lib/supabaseClient"
import { useRouter } from "next/router";
import pronouns from "lib/pronouns";

interface IinitialState {
    currentQuestion: number,
    numberOfQuestions: number,
    selectedVerbs: string[],
    questions: IverbQuestion[],
    possibleAnswers: IverbQuestion[],
    selectedAnswer: string
}

interface IverbQuestion {
    pronoun: {
        cz: string,
        en: string
    },
    theConjugatedVerbIs: {
        cz: string,
        en: string
    }
}

interface IgameSettings {
    numberOfQuestions: number,
    selectedVerbs: string[]
}


const Conjugation = ({ verbs, query }: { verbs: IverbQuestion[], query: any }) => {
    const router = useRouter();
    const gameSettings = router.query as unknown as IgameSettings;
    console.log("QUERY ", verbs);


    const initialState: IinitialState = {
        currentQuestion: 0,
        numberOfQuestions: gameSettings.numberOfQuestions,
        selectedVerbs: gameSettings.selectedVerbs,
        questions: verbs,
        possibleAnswers: [],
        selectedAnswer: ""
    }

    const [state, setState] = useState(initialState);
    let { currentQuestion, numberOfQuestions, selectedVerbs, questions, possibleAnswers, selectedAnswer } = state;

    console.log(selectedVerbs);
    let progress = Math.round(currentQuestion / numberOfQuestions * 100)

    useEffect(() => {
        const getMultipleRandom = (arr: IverbQuestion[], num: number, answer: IverbQuestion) => {
            const shuffled = [...arr, answer].sort(() => 0.5 - Math.random());
            const possibleAnswers = shuffled.slice(0, num);
            //you may get same option twice sometimes.
            console.log(possibleAnswers);
            setState({ ...state, possibleAnswers })
            //FIX THIS
        };
        getMultipleRandom(questions, 5, questions[currentQuestion])
    }, [currentQuestion])

    const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1)

    console.log(questions[currentQuestion].theConjugatedVerbIs.cz);

    return (
        <div className="flex flex-col h-screen bg-duo-eel">
            <Header />
            <div className="py-2 bg-duo-eel">
                <ProgressBar progress={progress} />
            </div>
            <div className="">
                {/* QUESTION */}
                <div className="p-4 bg-duo-greenMiddle">
                    {questions.length > 0 &&
                        <div className="text-white font-bold">
                            Translate: {questions[currentQuestion].pronoun.en} {questions[currentQuestion].theConjugatedVerbIs.en}
                        </div>
                    }
                </div>
                <div className="h-20 bg-duo-eel text-white font-bold flex items-center ml-5">
                    {questions.length > 0 &&
                        <>
                            <div>{capitalize(questions[currentQuestion].pronoun.cz)}</div>
                            <div></div>
                        </>
                    }
                </div>
                <div className="h-20 bg-duo-humpback flex justify-center items-center space-x-2">
                    {questions.length > 0 &&
                        possibleAnswers.map((question, i) =>
                            <button key={i} className="button bg-black text-white"
                                onClick={() => setState({ ...state, selectedAnswer: question.theConjugatedVerbIs.cz })}
                            >{question.theConjugatedVerbIs.cz}</button>
                        )
                    }
                </div>
            </div>
            {/* Answer pops up */}
            <div className="h-20 bg-duo-eel hidden">
                {/* ONLY SHOW ONCE ANSWER IS SUBMITTED */}
                {questions.length > 0 &&
                    <div className="text-white font-bold">
                        The Answer is: {questions[currentQuestion].pronoun.cz} {questions[currentQuestion].theConjugatedVerbIs.cz}
                    </div>
                }
            </div>
            {/* <div className='flex flex-col space-y-2 bg-blue-600 rounded-xl mx-2 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 py-9 px-3 md:px-9 bg-duo-hare border-b-4 border-b-duo-wolf'>
                    verbs
                </div> */}
            <div className="flex justify-center align-middle p-4">
                <button className="button bg-duo-greenMiddle" onClick={() => setState({ ...state, currentQuestion: ++currentQuestion })}>Check</button>
            </div>
        </div >
    )
}

export async function getServerSideProps({ query }: { query: any }) {
    let { data }: { data: any } = await supabase.from('verbs').select()

    let numberOfQuestions = query.numberOfQuestions
    let selectedVerbs = query.selectedVerbs
    let selectedVerbsArray: string[];
    let verbsArray: any[] = [];
    if (typeof selectedVerbs === "string") { selectedVerbs = [selectedVerbs] };
    selectedVerbsArray = selectedVerbs.map((selectedVerb: string) => data.find((verb: { infinitive: { cz: string; }; }) => verb.infinitive.cz === selectedVerb));
    const random = (arrayLength: number) => Math.floor(Math.random() * arrayLength);
    for (let i = 0; verbsArray.length < numberOfQuestions; i++) {
        const verb = selectedVerbsArray[random(selectedVerbs.length)]
        const amountArray = ["singular", "plural"] as const
        const personArray = ["first", "second", "third"] as const
        const amount = amountArray[random(2)];
        const person = personArray[random(3)];
        const pronoun = pronouns[amount][person]
        const theConjugatedVerbIs = verb?.positive[amount][person]
        const newQuestion = { pronoun, theConjugatedVerbIs };
        const index = verbsArray.findIndex(x => x.theConjugatedVerbIs.cz === theConjugatedVerbIs?.cz)
        index === -1 ? verbsArray.push(newQuestion) : console.log("This item already exists");
    }

    return {
        props: {
            verbs: verbsArray,
            query,
        },
    }
}

export default Conjugation