import Header from "@/components/Header"
import ProgressBar from "@/components/ProgressBar";
import { IVerb } from "typings";
import { supabase } from "../../lib/supabaseClient"


let progress = 50
// let progress = Math.round(currentQuestion / numberOfQuestions * 100)

const verbs = ({ verbs }: { verbs: IVerb[] }) => {
    const initialState = {
        currentQuestion: 0,
    }

    const generateQuestions = (selectedVerbs = ["být", "mít"], numberOfQuestions = 5) => {
        const verbsToTest = selectedVerbs.map(selectedVerb => verbs.find(verb => verb.infinitive.cz === selectedVerb))




        console.log(verbsToTest);

        // console.log("the verbs ", verbs);

    }

    generateQuestions()


    // verbs.find(x => console.log(x.infinitive.cz))

    return (
        <div className="flex flex-col h-screen bg-duo-eel">
            <Header />
            <div className="py-2 bg-duo-eel">
                <ProgressBar progress={progress} />
            </div>
            <div className="">
                {/* QUESTION */}
                <div className="p-4 bg-duo-greenMiddle">
                    <h3 className="text-white font-bold">Conjugate</h3>
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

export default verbs