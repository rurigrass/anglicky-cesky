import Header from "@/components/Header"
import ProgressBar from "@/components/ProgressBar";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient"

interface IVerb {
    id: bigint
    infinitive: { cz: string, en: string },
    positive?: {
        plural: {
            1: { en: { verb: string }, cz: { verb: string } }
            2: { en: { verb: string }, cz: { verb: string } }
            3: { en: { verb: string }, cz: { verb: string } }
        }
        singular: {
            1: { en: { verb: string }, cz: { verb: string } }
            2: { en: { verb: string }, cz: { verb: string } }
            3: { en: { verb: string }, cz: { verb: string } }
        }
    },
    negative?: {
        plural: {
            1: { en: { verb: string }, cz: { verb: string } }
            2: { en: { verb: string }, cz: { verb: string } }
            3: { en: { verb: string }, cz: { verb: string } }
        }
        singular: {
            1: { en: { verb: string }, cz: { verb: string } }
            2: { en: { verb: string }, cz: { verb: string } }
            3: { en: { verb: string }, cz: { verb: string } }
        }
    }

}

let progress = 50
// let progress = Math.round(currentQuestion / numberOfQuestions * 100)

const verbs = ({ verbs }: { verbs: IVerb[] }) => {
    console.log("the verbs ", verbs);

    verbs.find(x => console.log(x.infinitive.cz))

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className=" my-2 ">
                <ProgressBar progress={progress} />
            </div>
            <div className="min-h-screen flex flex-grow justify-center items-center bg-duo-eel">
                <div className='flex flex-col space-y-2 bg-blue-600 rounded-xl mx-2 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 py-9 px-3 md:px-9 bg-duo-hare border-b-4 border-b-duo-wolf'>
                    verbs
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