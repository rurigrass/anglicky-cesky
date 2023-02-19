import Header from "@/components/Header"
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

const verbs = ({ verbs }: { verbs: IVerb[] }) => {
    console.log("the verbs ", verbs);

    verbs.find(x => console.log(x.infinitive.cz))

    return (
        <>
            <Header />
            <div className=" h-screen min-h-screen -mt-14 flex justify-center items-center bg-duo-eel">
                <div className='flex flex-col space-y-2 bg-blue-600 rounded-xl mx-2 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 py-9 px-3 md:px-9 bg-duo-hare border-b-4 border-b-duo-wolf'>
                    verbs
                </div>
            </div>
        </>
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