import Header from "@/components/Header"
import { supabase } from "../../lib/supabaseClient"

interface IVerb {
    id: string
}

const verbs = ({ verbs }: { verbs: IVerb[] }) => {
    console.log(verbs);

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
    let { data } = await supabase.from('countries').select()

    return {
        props: {
            verbs: data
        },
    }
}

export default verbs