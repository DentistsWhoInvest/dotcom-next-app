import { create } from "zustand";
import { persist } from "zustand/middleware";

type QuizState = {
  selectedAnswers: Record<number, Record<number, number>>;
  setAnswer: (quizId: number, questionId: number, answerId: number) => void;
  resetAnswers: (quizId: number) => void;
  reflectionAnswers: Record<number, { questionId: number; question: string; answer: string }[]>;
  setReflectionAnswers: (
    quizId: number,
    questionId: number,
    question: string,
    answer: string
  ) => void;
  resetReflectionAnswers: (quizId: number) => void;
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      selectedAnswers: {},
      
      setAnswer: (quizId, questionId, answerId) =>
        set((state) => ({
          selectedAnswers: {
            ...state.selectedAnswers,
            [quizId]: {
              ...(state.selectedAnswers[quizId] || {}),
              [questionId]: answerId
            }
          },
        })),
      
      resetAnswers: (quizId) =>
        set((state) => {
          const updated = { ...state.selectedAnswers };
          delete updated[quizId];
          return { selectedAnswers: updated };
        }),

      reflectionAnswers: {},

      setReflectionAnswers: (quizId, questionId, question, answer) =>
        set((state) => {
          const quizAnswers = state.reflectionAnswers[quizId] || [];
          const index = quizAnswers.findIndex(
            (item) => item.questionId === questionId
          );

          let updatedQuizAnswers;
          if (index >= 0) {
            updatedQuizAnswers = [...quizAnswers];
            updatedQuizAnswers[index] = { questionId, question, answer };
          } else {
            updatedQuizAnswers = [...quizAnswers, { questionId, question, answer }];
          }

          return {
            reflectionAnswers: {
              ...state.reflectionAnswers,
              [quizId]: updatedQuizAnswers,
            },
          };
        }),

      resetReflectionAnswers: (quizId) =>
        set((state) => {
          const updated = { ...state.reflectionAnswers };
          delete updated[quizId];
          return { reflectionAnswers: updated };
        }),
    }),
    {
      name: 'quiz-storage',
    }
  )
);