import { create } from "zustand";
import { persist } from "zustand/middleware";

type QuizState = {
  selectedAnswers: Record<number, number>;
  setAnswer: (questionId: number, answerId: number) => void;
  resetAnswers: () => void;
  reflectionAnswers:
  | { questionId: number; question: string; answer: string }[]
  | [];
  setReflectionAnswers: (
    questionId: number,
    question: string,
    answer: string
  ) => void;
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      selectedAnswers: {},
      setAnswer: (questionId, answerId) =>
        set((state) => ({
          selectedAnswers: { ...state.selectedAnswers, [questionId]: answerId },
        })),
      resetAnswers: () => set({ selectedAnswers: {} }),
      reflectionAnswers: [],
      setReflectionAnswers: (questionId, question, answer) =>
        set((state) => {
          const index = state.reflectionAnswers.findIndex(
            (item) => item.questionId === questionId
          );
          if (index >= 0) {
            const updated = [...state.reflectionAnswers];
            updated[index] = { questionId, question, answer };
            return { reflectionAnswers: updated };
          } else {
            return {
              reflectionAnswers: [
                ...state.reflectionAnswers,
                { questionId, question, answer },
              ],
            };
          }
        }),
    }),
    {
      name: "quiz-storage",
    }
  )
);
