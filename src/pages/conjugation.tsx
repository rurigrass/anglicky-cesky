import Header from "@/components/Header"
import ProgressBar from "@/components/ProgressBar";
import { useEffect, useState } from "react";
import { IVerb } from "typings";
import { supabase } from "../../lib/supabaseClient"

interface IinitialState {
    currentQuestion: number,
    numberOfQuestions: number,
}

const pronouns = {
    singular: {
        first: {
            en: "I",
            cz: "ja"
        },
        second: {
            en: "you",
            cz: "ty"
        },
        third: {
            en: "he",
            cz: "on"
        }
    },
    plural: {
        first: {
            en: "we",
            cz: "my"
        },
        second: {
            en: "you",
            cz: "vy"
        },
        third: {
            en: "they",
            cz: "oni"
        }
    }
}

let progress = 50
// let progress = Math.round(currentQuestion / numberOfQuestions * 100)

const Conjugation = (
    // { verbs }: { verbs: IVerb[] }
) => {
    const [verbs, setVerbs] = useState<IVerb[]>()
    const initialState: IinitialState = {
        currentQuestion: 0,
        numberOfQuestions: 2,
    }
    const [state, setState] = useState(initialState);
    const [verbsArrayState, setVerbsArrayState] = useState([])
    let { currentQuestion, numberOfQuestions } = state;
    const selectedVerbs = ["být", "mít"]


    useEffect(() => {
        const fetchVerbs = async () => {
            try {
                const { data, error } = await supabase.from('verbs').select()
                if (error) throw error;
                setVerbs(data)
            } catch (error: any) { alert(error.message) }
        }
        fetchVerbs()
    }, [])

    console.log(verbs);

    // const generateQuestions = (selectedVerbs: string[], numberOfQuestions: number) => {
    //     //filters out all the selected verbs
    //     const verbsToTest = selectedVerbs.map(selectedVerb => verbs?.find(verb => verb.infinitive.cz === selectedVerb))
    //     //random function:
    //     const random = (arrayLength: number) => Math.floor(Math.random() * arrayLength);
    //     let verbsArray = []
    //     //selects number of conjucations randomly numberOfQuestions times
    //     for (let i = 0; i < numberOfQuestions; i++) {
    //         const verb = verbsToTest[random(selectedVerbs.length)]
    //         const amountArray = ["singular", "plural"] as const
    //         const personArray = ["first", "second", "third"] as const
    //         const amount = amountArray[random(2)];
    //         const person = personArray[random(3)];
    //         const theConjugatedVerbIs = verb?.positive[amount][person]
    //         const pronoun = pronouns[amount][person]
    //         verbsArray.push({ pronoun, theConjugatedVerbIs })
    //     }
    //     console.log("THERANDOMVERBS ", verbsArray);

    //     // setVerbsArrayState([...verbsArray]);
    // }
    // generateQuestions(selectedVerbs, numberOfQuestions)
    // console.log(verbsArrayState)


    return (
        <div className="flex flex-col h-screen bg-duo-eel">
            <Header />
            <div className="py-2 bg-duo-eel">
                <ProgressBar progress={progress} />
            </div>
            <div className="">
                {/* QUESTION */}
                <div className="p-4 bg-duo-greenMiddle">
                    <div className="text-white font-bold">
                        Translate:
                        {/* {generatedQuestion &&
                            generatedQuestion.pronoun.en
                        } */}
                        {/* {generatedQuestions[currentQuestion].pronoun.en} {generatedQuestions[currentQuestion].theConjugatedVerbIs?.en} */}
                    </div>
                </div>
                {/* OPTIONS */}
                <div className="h-20 bg-duo-macaw">

                </div>
                {/* <div className='flex flex-col space-y-2 bg-blue-600 rounded-xl mx-2 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 py-9 px-3 md:px-9 bg-duo-hare border-b-4 border-b-duo-wolf'>
                    verbs
                </div> */}
                <div className="flex justify-center align-middle p-4">
                    <button className="button bg-duo-greenMiddle">Check</button>
                </div>
            </div >
        </div >
    )
}

// export async function getServerSideProps() {
//     let { data } = await supabase.from('verbs').select()

//     return {
//         props: {
//             verbs: data
//         },
//     }
// }

export default Conjugation