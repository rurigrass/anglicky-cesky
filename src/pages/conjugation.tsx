import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { useEffect, useState } from "react";
import { IVerb } from "typings";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";
import pronouns from "lib/pronouns";
import SlidePanel from "@/components/motion/SlidePanel";
import capitalize from "@/helpers/functions";

interface IinitialState {
  currentQuestion: number;
  numberOfQuestions: number;
  selectedVerbs: string[];
  questions: IverbQuestion[];
  possibleAnswers: IverbQuestion[];
  selectedAnswer: string;
  selectedAnswers: boolean[];
}

interface IverbQuestion {
  pronoun: {
    cz: string;
    en: string;
  };
  theConjugatedVerbIs: {
    cz: string;
    en: string;
  };
}

interface IgameSettings {
  numberOfQuestions: number;
  selectedVerbs: string[];
}

const Conjugation = ({
  verbs,
  query,
}: {
  verbs: IverbQuestion[];
  query: any;
}) => {
  const router = useRouter();
  const gameSettings = router.query as unknown as IgameSettings;
  // console.log("QUERY ", verbs);

  const initialState: IinitialState = {
    currentQuestion: 0,
    numberOfQuestions: gameSettings.numberOfQuestions,
    selectedVerbs: gameSettings.selectedVerbs,
    questions: verbs,
    possibleAnswers: [],
    selectedAnswer: "",
    selectedAnswers: [],
  };

  const [state, setState] = useState(initialState);
  let {
    currentQuestion,
    numberOfQuestions,
    selectedVerbs,
    questions,
    possibleAnswers,
    selectedAnswer,
    selectedAnswers,
  } = state;
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  let progress = Math.round((currentQuestion / numberOfQuestions) * 100);

  useEffect(() => {
    //this function gets random possible answers answers
    const getMultipleRandom = (
      arr: IverbQuestion[],
      num: number,
      answer: IverbQuestion
    ) => {        
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
        state.selectedAnswer ===
          questions[currentQuestion].theConjugatedVerbIs.cz,
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
  // console.log(selectedAnswers);
  //   console.log("QUERY", query);
  //   console.log("VERBS", verbs);
  //   console.log("STATE", state.currentQuestion);

  return (
    <div className="absolute inset-0 flex flex-col items-stretch bg-duo-eel">
      <Header />
      <div className="py-2 bg-duo-eel">
        <ProgressBar progress={progress} />
      </div>
      {/* {!showAnswer ? */}
      <div className="flex flex-col flex-1">
        {/* QUESTION */}
        <div className=" p-4 bg-duo-greenMiddle">
          {questions.length > 0 && (
            <div className="text-white text-2xl font-bold">
              Translate: {questions[currentQuestion].pronoun.en}{" "}
              {questions[currentQuestion].theConjugatedVerbIs.en}
            </div>
          )}
        </div>
        <div className=" bg-duo-eel text-white font-bold flex ml-5 items-center justify-center  flex-1">
          {questions.length > 0 && (
            <div className="flex items-center m-2 text-4xl">
              {capitalize(questions[currentQuestion].pronoun.cz)}
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
                  question.theConjugatedVerbIs.cz === selectedAnswer &&
                  "bg-duo-eel"
                }`}
                onClick={() =>
                  setState({
                    ...state,
                    selectedAnswer: question.theConjugatedVerbIs.cz,
                  })
                }
              >
                {question.theConjugatedVerbIs.cz}
              </button>
            ))}
        </div>
      </div>
      <div className="flex flex-col justify-center align-middle bg-duo-wolf p-4">
        <SlidePanel isVisible={showAnswer}>
          <div className="text-center pb-4">
            {isAnswerCorrect(selectedAnswers[currentQuestion])}
            The Answer is: {questions[currentQuestion].pronoun.cz}{" "}
            {questions[currentQuestion].theConjugatedVerbIs.cz}
          </div>
        </SlidePanel>
        {!showAnswer ? (
          <button
            className="button bg-duo-greenMiddle hover:bg-duo-featherGreen disabled:bg-duo-greenMiddle disabled:hover:opacity-80"
            disabled={state.selectedAnswer === ""}
            onClick={() => checkAnswer()}
          >
            {" "}
            Check
          </button>
        ) : (
          <button
            className="button bg-duo-greenMiddle hover:bg-duo-featherGreen"
            onClick={() => nextQuestion()}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps({ query }: { query: any }) {
  let { data }: { data: any } = await supabase.from("verbs").select();
 
  let numberOfQuestions = query.numberOfQuestions;
  let selectedVerbs = query.selectedVerbs;
  let selectedVerbsArray: IVerb[];
  let verbsArray: any[] = [];
  if (typeof selectedVerbs === "string") {
    selectedVerbs = [selectedVerbs];
  }
  selectedVerbsArray = selectedVerbs.map((selectedVerb: string) =>
    data.find(
      (verb: { infinitive: { cz: string } }) =>
        verb.infinitive.cz === selectedVerb
    )
  );
  const random = (arrayLength: number) =>
    Math.floor(Math.random() * arrayLength);
  for (let i = 0; verbsArray.length < numberOfQuestions; i++) {
    const verb = selectedVerbsArray[random(selectedVerbs.length)];
    const amountArray = ["singular", "plural"] as const;
    const personArray = ["first", "second", "third"] as const;
    const amount = amountArray[random(2)];
    const person = personArray[random(3)];
    const pronoun = pronouns[amount][person];
    const theConjugatedVerbIs = verb?.positive[amount][person];
    const newQuestion = { pronoun, theConjugatedVerbIs };
    const index = verbsArray.findIndex(
      (x) => x.theConjugatedVerbIs.cz === theConjugatedVerbIs?.cz
    );
    index === -1
      ? verbsArray.push(newQuestion)
      : console.log("This item already exists");
  }

  return {
    props: {
      verbs: verbsArray,
      query,
    },
  };
}

export default Conjugation;
