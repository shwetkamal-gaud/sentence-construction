import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../../types";

interface Answer {
    answer: string[];
    isCorrect: boolean;
}

interface Attempt {
    answers: Answer[];
    que: Question[]
}

interface QuizState {
    currentAttempt: Attempt | null;
}

const initialState: QuizState = {
    currentAttempt: null,
};

export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        startQuiz: (state, action: PayloadAction<Question[]>) => {
            state.currentAttempt = {
                answers: [],
                que: action.payload
            };
        },
        answerQuestion: (state, action: PayloadAction<Answer>) => {
            
            if (state.currentAttempt) {
                state.currentAttempt.answers.push(action.payload);
            }
        },
        resetQuiz: () => initialState,
    },
});

export const { startQuiz, answerQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
