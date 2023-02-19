import { motion } from "framer-motion"

const ProgressBar = ({ progress = 0 }: { progress: number }) => {
    return (
        <div
            className='mx-auto w-3/4 bg-duo-yellow h-4 rounded-full outline outline-1 outline-black border-b-duo-wolf border-b-4'>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative bg-duo-humpback h-4 transition rounded-xl" >
                <div className='absolute w-1/3 bg-white opacity-20 h-1 right-2 top-0.5 rounded-full' />
            </motion.div>
        </div>
    )
}

export default ProgressBar