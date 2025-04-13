import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import NavComponent from "../components/NavComponent";
import { useEffect, useState } from "react";
import DownArrow from "../assets/Svg/DownArrow";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { currentAttempt } = useSelector((state: RootState) => state.quiz);
  const [percentage, setPercentage] = useState(0);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (currentAttempt) {
      const score = currentAttempt.answers.filter((item) => item.isCorrect).length;
      setPercentage((score / currentAttempt.answers.length) * 100);
    }
  }, [currentAttempt]);

  useEffect(() => {
    setOffset(circumference - (percentage / 100) * circumference);
  }, [percentage]);

  // Fill in correct sentence
  const filledQuestions = currentAttempt?.que.map((q) => {
    let answerIndex = 0;
    const filledSentence = q.question.replace(/_____________/g, () => {
      const word = q.correctAnswer[answerIndex];
      answerIndex++;
      return word;
    });

    return filledSentence;
  });

  const filledAttempt = currentAttempt?.que.map((q, id) => {
    let answerIndex = 0;
    const userAnswers = currentAttempt?.answers[id]?.answer.length > 0 ? currentAttempt?.answers[id]?.answer:''
    const filledSentence = q.question.replace(/_____________/g, () => {
      const word = userAnswers[answerIndex];
      answerIndex++;
      return word || '_____________';
    });
    return filledSentence;
  });

  const getFeedback = () => {
    if (percentage === 100) return "Outstanding! Perfect score. You nailed it!";
    if (percentage >= 80) return "Impressive! Your skills are shining through.";
    if (percentage >= 50) return "Good job! A bit more practice and you'll master it.";
    return "Don't worry! Keep practicing and you'll improve!";
  };

  if (!currentAttempt) {
    return <p>Loading....</p>;
  } 
  return (
    <div className="flex flex-col h-full">
      <NavComponent />
      <div className="flex flex-col gap-8 flex-grow h-full items-center justify-center">
        <div className="flex flex-col items-center">
          <svg className="w-36 h-36" viewBox="0 0 150 150">
            <circle
              className="text-gray-200"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="75"
              cy="75"
            />
            <circle
              className={percentage < 50 ? "text-red-500" : "text-green-500"}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="75"
              cy="75"
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="text-3xl fill-black font-bold"
            >
              {
                currentAttempt.answers.filter((item) => item.isCorrect)
                  .length
              }
            </text>
            <text
              x="50%"
              y="65%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="text-sm fill-gray-600"
            >
              Overall Score
            </text>
          </svg>
          <p className="mt-6 text-center text-gray-800 max-w-md">{getFeedback()}</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="border-[#453FE1] border py-2 px-6 rounded-lg text-[#453FE1]"
          >
            Go to Dashboard
          </button>
          <DownArrow />
        </div>

        <div className="flex flex-col gap-6 w-full max-w-3xl px-4">
          {currentAttempt.que.map((item, id) => (
            <div
              key={id}
              className="flex flex-col gap-4 bg-white  shadow-md rounded-lg"
            >
              <div className="flex justify-between p-4 items-center">
                <span className="bg-[#F0F0F0] rounded-lg px-2 py-1 text-[#616464] text-sm">
                  Prompt
                </span>
                <span className="text-sm text-black">
                  {id + 1}/<span className="text-[#7C8181]">{currentAttempt.que.length}</span>
                </span>
              </div>

              <p className="text-[#414343] px-4 ">{filledQuestions?.[id]}</p>

              <div className="px-3 py-4 bg-[#F6F9F9] flex flex-col gap-3 ">
                <p className="text-gray-800">
                  Your Response:{" "}
                  <span
                    className={
                      currentAttempt.answers[id]?.isCorrect
                        ? "text-green-500 font-semibold bg-green-300 rounded p-1 bg-opacity-5"
                        : "text-red-500 font-semibold bg-red-300 rounded p-1 bg-opacity-5"
                    }
                  >
                    {currentAttempt.answers[id]?.answer?.length > 0 ?currentAttempt.answers[id]?.isCorrect ? "Correct" : "Incorrect" : 'Not answered'}
                  </span>

                </p>
                {currentAttempt.answers[id]?.answer?.length>0 &&<p className="text-[#2A2D2D]">
                  {filledAttempt?.[id]}
                </p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
