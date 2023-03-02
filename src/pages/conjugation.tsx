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

const Conjugation = ({ verbs }: { verbs: IVerb[] }) => {
    const router = useRouter();
    const gameSettings = router.query as unknown as IgameSettings;

    const initialState: IinitialState = {
        currentQuestion: 0,
        numberOfQuestions: gameSettings.numberOfQuestions,
        selectedVerbs: gameSettings.selectedVerbs,
        questions: [],
        selectedAnswer: ""
    }
    const [state, setState] = useState(initialState);
    // const [questions, setQuestions] = useState<IverbQuestion[]>([])
    let { currentQuestion, numberOfQuestions, selectedVerbs, questions } = state;
    let progress = Math.round(currentQuestion / numberOfQuestions * 100)

    useEffect(() => {
        const sortQuestions = (selectedVerbs: string[], numberOfQuestions: number) => {
            let selectedVerbsArray;
            let verbsArray: any[] = [];
            if (typeof selectedVerbs === "string") { selectedVerbs = [selectedVerbs] };
            selectedVerbsArray = selectedVerbs.map(selectedVerb => verbs.find(verb => verb.infinitive.cz === selectedVerb));
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
            setState({ ...state, questions: verbsArray })
        }
        sortQuestions(selectedVerbs, numberOfQuestions)
    }, [])

    console.log(questions ? questions[currentQuestion] : "nothing");

    function getMultipleRandom(arr: IverbQuestion[], num: number, answer: IverbQuestion) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
        //you may get same option twice sometimes.
    }

    const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1)

    //



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
                    <div>{capitalize(questions[currentQuestion].pronoun.cz)}</div>
                    <div></div>
                </div>
                <div className="h-20 bg-duo-humpback flex justify-center items-center space-x-2">
                    {questions.length > 0 &&
                        getMultipleRandom(questions, 5, questions[currentQuestion]).map((question, i) =>
                            <button className="button bg-black text-white " key={i}>{question.theConjugatedVerbIs.cz}</button>
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
            <div className="flex justify-center align-middle p-4">
                <button className="button bg-duo-greenMiddle" onClick={() => setState({ ...state, currentQuestion: ++currentQuestion })}>Check</button>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    let { data } = await supabase.from('verbs').select()


    return {
        props: {
            verbs: data
        },
    }
}

export default Conjugation