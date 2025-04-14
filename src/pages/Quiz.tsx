import { useEffect, useState } from "react"
import StarterComponent from "../components/StarterComponent"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuizCard";
import { Question } from "../types";
import { answerQuestion } from "../store/slice/quizSlice";

const Quiz = () => {
    const [isQuizStart, setIsQuizStart] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [timer, setTimer] = useState(30);
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        if (questions?.length === 0) {
            const isLocal = window.location.hostname === "localhost";
            const dataURL = isLocal
                ? "http://localhost:3001/data"
                : "/questions.json";
            fetch(dataURL)
                .then((res) => res.json())
                .then((data) => setQuestions(data.questions))
                .catch((err) => console.error("Fetch error:", err))
        }
    }, [dispatch, questions?.length]);

    const handleNext = (answer: string[], isCorrect: boolean) => {
        dispatch(answerQuestion({ answer, isCorrect }));
        if (currentIndex + 1 < questions.length) {
            console.log("navi", currentIndex)
            setCurrentIndex(prev => prev + 1);
        }
    };
    useEffect(() => {
        if (questions?.length > 0 && currentIndex === questions?.length) {
            navigate('/result');
        }
    }, [currentIndex, questions.length]);

    return (
        <div className="min-h-screen ">
            {
                !isQuizStart ? <StarterComponent que={questions} setIsQuizStart={setIsQuizStart} /> : questions.length > currentIndex && (
                    <div className={`h-[100vh] w-full flex items-center justify-center px-3 `}>
                        <div className="rounded-xl flex flex-col gap-3 shadow-md w-full max-w-3xl p-3">
                            <div className="flex items-center w-full justify-between">
                                <p className="mb-4 text-black">Time Left: {timer}s</p>
                                <button className="border rounded-lg p-1 text-black" onClick={() => setIsOpen((prev) => !prev)}>Quit</button>
                            </div>
                            <div className="flex flex-col ">
                                <ProgressBar current={currentIndex + 1} total={questions?.length} />
                                <QuestionCard
                                    timer={timer}
                                    isOpen={isOpen}
                                    setTimer={setTimer}
                                    questionSentence={questions[currentIndex]}
                                    questionIndex={currentIndex}
                                    onNext={handleNext}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            {isOpen &&
                <div id="default-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-300 bg-opacity-5 ">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">

                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Quit
                                </h3>
                                <button onClick={() => setIsOpen((prev) => !prev)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="p-4 md:p-5 space-y-4">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Do you want to quit the quiz
                                </p>
                            </div>

                            <div className="flex items-center px-4 py-2 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={() => {
                                    setIsOpen((prev) => !prev);
                                    setIsQuizStart((prev) => !prev)
                                    setCurrentIndex(0)
                                }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Yes</button>
                                <button onClick={() => setIsOpen((prev) => !prev)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>


    )
}

export default Quiz