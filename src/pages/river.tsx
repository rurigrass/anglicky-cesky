// const River = () => {

//     const levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

//     return (
//         <div className="flex flex-col items-center">
//             {levels.map((level) =>
//                 <div
//                     key={level}
//                     className="w-14 h-14 bg-duo-humpback rounded-full border-b-4 border-duo-macaw text-center">
//                     {level}
//                 </div>
//             )}
//         </div>
//     )

// }

// export default River


const River = () => {
    const levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    return (
        <div className="flex flex-col items-center">
            <div className="mx-auto">
                {levels.map((level) => (
                    <div
                        key={level}
                        className={`w-14 h-14 bg-duo-humpback rounded-full border-b-4 border-duo-macaw text-center ${level % 2 === 0 ? "ml-28" : ""
                            }`}
                    >
                        {level}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default River;
