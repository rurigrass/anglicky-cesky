import { AnimatePresence, motion } from "framer-motion"
import React from "react";
import useMeasure from "react-use-measure";


const ResizeablePanel = ({ isVisible = true, children, delayTime = 0.5, durationTime = 0.5 }: { isVisible?: boolean, children: React.ReactNode, delayTime?: number, durationTime?: number }) => {
    let [ref, { height }] = useMeasure();

    return (
        <AnimatePresence>
            {isVisible &&
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height }}
                    exit={{ height: 0 }}
                    transition={{ duration: durationTime, delay: delayTime }}
                    className="overflow-hidden"
                >
                    <div ref={ref}>
                        {children}
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default ResizeablePanel
