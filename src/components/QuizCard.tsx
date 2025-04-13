import React, { useEffect, useState } from "react";
import { Question } from "../types";
import ForwardIcon from "../assets/Svg/ForwardIcon";

type Props = {
    questionSentence: Question,
    onNext: (filled: string[], isCorrect: boolean) => void,
    questionIndex: number;
    timer: number,
    setTimer: React.Dispatch<React.SetStateAction<number>>
    

};

export default function QuestionCard({ questionSentence, setTimer, onNext, questionIndex }: Props) {
    const [parts, setParts] = useState<string[]>([]);
    const [numberOfBlanks, setNumberOfBlanks] = useState(0);

    const [selected, setSelected] = useState<(string | null)[]>([]);
    useEffect(() => {
        if (!questionSentence) return;

        const blankParts = questionSentence.question.split(/_+/g);
        const blankCount = (questionSentence.question.match(/_+/g) || []).length;

        setParts(blankParts);
        setNumberOfBlanks(blankCount);

        if (questionSentence.answerType === "options") {
            if (blankCount !== questionSentence.correctAnswer.length) {
                console.warn("Mismatch between blanks and correct answers.");
            }
            setSelected(Array(blankCount).fill(null));
        } else {
            setSelected([]);
        }

        setTimer(10);
    }, [questionSentence]);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    handleAutoNext();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSelect = (word: string) => {
        const firstEmptyIndex = selected.findIndex(item => item === null);
        if (firstEmptyIndex !== -1) {
            const updated = [...selected];
            updated[firstEmptyIndex] = word;
            setSelected(updated);
        }
    };

    const handleUnselect = (idx: number) => {
        const updated = [...selected];
        updated[idx] = null;
        setSelected(updated);
    };

    const handleNext = () => {
        const isCorrect = JSON.stringify(selected) === JSON.stringify(questionSentence?.correctAnswer);
        onNext(selected.filter((item): item is string => item !== null), isCorrect);

    };

    const handleAutoNext = () => {
        onNext(selected.filter((item): item is string => item !== null), false);
    };

    if (!questionSentence) {
        return (
            <div className="p-4 text-center text-gray-500">
                Loading question...
            </div>
        );
    }

    return (
        <div className="p-4 text-black ">
            <h2 className="text-xl font-bold mb-2">Question {questionIndex + 1}</h2>
            <p className="text-xl text-center leading-relaxed">
                {parts.map((part, idx) => (
                    <React.Fragment key={idx}>
                        <span className="">{part}</span>
                        {idx < numberOfBlanks && (
                            selected[idx] ? <span onClick={() => handleUnselect(idx)} className="inline-block  min-w-[100px] border-1 p-1 border rounded-lg mx-1 text-center">
                                {selected[idx]}
                            </span> : <span onClick={() => handleUnselect(idx)} className="inline-block  min-w-[100px] border-b-2 border-[#000000] mx-1 text-center">

                            </span>
                        )}
                    </React.Fragment>
                ))}
            </p>

            <div className="grid grid-cols-4 gap-4 mb-4 mt-6">
                {questionSentence.options?.map((opt, idx) => {
                    const optionCount = questionSentence.options?.filter(o => o === opt).length || 1;
                    const selectedCount = selected.filter(s => s === opt).length;

                    const isHidden = selectedCount >= optionCount;

                    return (
                        <button
                            key={`${opt}-${idx}`} 
                            onClick={() => handleSelect(opt)}
                            className={`${isHidden ? 'hidden' : ''} p-2 border border-[#BFC6C6] rounded-lg`}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
            <button
                disabled={selected.includes(null)}
                onClick={handleNext}
                className="p-4 bg-blue-500 text-white flex justify-self-end rounded disabled:opacity-50"
            >
                <ForwardIcon />
            </button>
        </div>
    );
}
