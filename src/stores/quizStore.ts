import { create } from "zustand";

type QuizState = {
  selectedAnswers: Record<number, number>;
  setAnswer: (questionId: number, answerId: number) => void;
  resetAnswers: () => void;
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
  (set) => ({
    selectedAnswers: {},
    setAnswer: (questionId, answerId) =>
      set((state) => ({
        selectedAnswers: { ...state.selectedAnswers, [questionId]: answerId },
      })),
    resetAnswers: () => set({ selectedAnswers: {} }),
    
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
);