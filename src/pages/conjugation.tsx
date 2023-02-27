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
    selectedVerbs: string[]
}

interface IgameSettings {
    numberOfQuestions: number,
    selectedVerbs: string[]
}


// let progress = Math.round(currentQuestion / numberOfQuestions * 100)

const Conjugation = ({ verbs }: { verbs: IVerb[] }) => {
    const router = useRouter();
    const gameSettings = router.query as unknown as IgameSettings;

    const initialState: IinitialState = {
        currentQuestion: 0,
        numberOfQuestions: gameSettings.numberOfQuestions,
        selectedVerbs: gameSettings.selectedVerbs
    }
    const [state, setState] = useState(initialState);
    let { currentQuestion, numberOfQuestions, selectedVerbs } = state;
    let progress = Math.round(currentQuestion / numberOfQuestions * 100)

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
        // console.log("The verbs ", selectedVerbs);
        console.log("the randomly selected questions ", verbsArray);

    }


    sortQuestions(selectedVerbs, numberOfQuestions)




    return (
        <div className="flex flex-col h-screen bg-duo-eel">
            <Header />
            <div className="py-2 bg-duo-eel">
                <ProgressBar progress={progress} />
            </div>
            <div className="">
                {/* QUESTION */}
                <div className="p-4 bg-duo-greenMiddle">
                    {/* {generatedQuestion &&
                        <div className="text-white font-bold">
                            Translate: {generatedQuestion.pronoun.en} {generatedQuestion.theConjugatedVerbIs?.en}
                        </div>
                    } */}
                </div>
                {/* OPTIONS */}
                <div className="h-20 bg-duo-humpback">
                    {/* {generatedQuestion &&
                        <div className="text-white font-bold">
                            <button className="button bg-duo-wolf text-white">{generatedQuestion.pronoun.cz} {generatedQuestion.theConjugatedVerbIs?.cz}</button>
                            <button className="button bg-duo-wolf text-white">{generatedQuestion.pronoun.cz} {generatedQuestion.theConjugatedVerbIs?.cz}</button>
                        </div>
                    } */}

                </div>
                {/* Answer pops up */}
                <div className="h-20 bg-duo-macaw">
                    {/* {generatedQuestion &&
                        <div className="text-white font-bold">
                            The Answer is: {generatedQuestion.pronoun.cz} {generatedQuestion.theConjugatedVerbIs?.cz}
                        </div>
                    } */}

                </div>
                {/* <div className='flex flex-col space-y-2 bg-blue-600 rounded-xl mx-2 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 py-9 px-3 md:px-9 bg-duo-hare border-b-4 border-b-duo-wolf'>
                    verbs
                </div> */}
                <div className="flex justify-center align-middle p-4">
                    <button className="button bg-duo-greenMiddle" onClick={() => setState({ ...state, currentQuestion: ++currentQuestion })}>Check</button>
                </div>
            </div >
        </div >
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