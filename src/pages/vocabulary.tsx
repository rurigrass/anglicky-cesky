import Header from "@/components/Header";
import SlidePanel from "@/components/motion/SlidePanel";
import ProgressBar from "@/components/ProgressBar";
import capitalize from "@/helpers/functions";
import { supabase } from "lib/supabaseClient";
import { useEffect, useState } from "react";

interface IinitialState {
  currentQuestion: number;
  numberOfQuestions: number;
  // selectedVerbs: string[],
  questions: any[];
  possibleAnswers: Inoun[];
  selectedAnswer: string;
  selectedAnswers: boolean[];
}

interface Inoun {
  gender: string;
  singular: {
    cz: string;
    en: string;
  };
  plural: {
    cz: string;
    en: string;
  };
}

const Vocabulary = ({ nouns }: { nouns: Inoun[] }) => {
  const initialState: IinitialState = {
    currentQuestion: 0,
    numberOfQuestions: 5,
    // selectedVerbs: gameSettings.selectedVerbs,
    questions: nouns,
    possibleAnswers: [],
    selectedAnswer: "",
    selectedAnswers: [],
  };

  const [state, setState] = useState(initialState);

  let {
    currentQuestion,
    numberOfQuestions,
    questions,
    possibleAnswers,
    selectedAnswer,
    selectedAnswers,
  } = state;
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  let progress = Math.round((currentQuestion / numberOfQuestions) * 100);

  useEffect(() => {
    //this function gets random possible answers
    const getMultipleRandom = (arr: Inoun[], num: number, answer: Inoun) => {
      const shuffled = [...arr, answer].sort(() => 0.5 - Math.random());
      const uniqueShuffled = [...new Set(shuffled)];
      const possibleAnswers = uniqueShuffled.slice(0, num);
      setState({ ...state, possibleAnswers });
    };
    getMultipleRandom(questions, 5, questions[currentQuestion]);
  }, [currentQuestion]);

  const checkAnswer = () => {
    setShowAnswer(true);
    setState({
      ...state,
      selectedAnswers: [
        ...state.selectedAnswers,
        state.selectedAnswer === questions[currentQuestion].singular.cz,
      ],
    });
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setState({
      ...state,
      currentQuestion: ++currentQuestion,
      selectedAnswer: "",
    });
  };

  const isAnswerCorrect = (answer: boolean) => {
    return (
      <>
        {answer ? (
          <h2 className=" text-duo-greenMiddle text-4xl font-bold">Correct!</h2>
        ) : (
          <h2 className="text-duo-red text-4xl font-bold">Incorrect</h2>
        )}
      </>
    );
  };

  return (
    <div className="absolute inset-0 flex flex-col items-stretch bg-duo-eel">
      <Header />
      <div className="py-2 bg-duo-eel">
        <ProgressBar progress={progress} />
      </div>
      {/* MAIN CENTRAL BIT */}
      <div className="flex flex-col flex-1">
        <div className="p-4 bg-duo-greenMiddle">
          <div className="text-white text-2xl font-bold">
            How do you say: "{capitalize(questions[currentQuestion].singular.en)}"{" "}
            {`(${questions[currentQuestion].gender})`}
          </div>
        </div>
        <div className=" bg-duo-eel text-white font-bold flex items-center justify-center  flex-1">
          {questions.length > 0 && (
            <div className="flex items-center m-2 text-4xl">
              {selectedAnswer !== "" && (
                <span className="p-2 px-4 rounded-lg border-b-4 bg-black border-duo-wolf ml-2">{` ${selectedAnswer}`}</span>
              )}
            </div>
          )}
        </div>
        <div className=" bg-duo-eel flex justify-center items-center flex-wrap p-3">
          {questions.length > 0 &&
            possibleAnswers.map((question, i) => (
              <button
                key={i}
                className={`button bg-black text-white m-1 ${
                  question.singular.cz === selectedAnswer && "bg-duo-eel"
                }`}
                onClick={() =>
                  setState({
                    ...state,
                    selectedAnswer: question.singular.cz,
                  })
                }
              >
                {question.singular.cz}
              </button>
            ))}
        </div>
      </div>
      <div className="flex flex-col justify-center align-middle bg-duo-wolf  p-4">
        <SlidePanel isVisible={showAnswer}>
          <div className="text-center pb-4">
            {isAnswerCorrect(selectedAnswers[currentQuestion])}
            The Answer is: {questions[currentQuestion].singular.cz}
          </div>
        </SlidePanel>
        {!showAnswer ? (
          <button
            className="button bg-duo-featherGreen disabled:bg-duo-greenMiddle hover:bg-duo-maskGreen"
            disabled={selectedAnswer ? false : true}
            onClick={() => checkAnswer()}
          >
            {" "}
            Check
          </button>
        ) : (
          <button
            className="button bg-duo-greenMiddle"
            onClick={() => nextQuestion()}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Vocabulary;

export async function getServerSideProps({ query }: { query: any }) {
  //this takes the nouns and filters them by category
  let { data }: { data: any } = await supabase
    .from("random_nouns")
    .select(`singular, plural, gender`)
    .contains("category", { cz: "profese" })
    .limit(5);

  return {
    props: {
      nouns: data,
    },
  };
}
