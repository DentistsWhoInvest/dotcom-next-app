// stores/quizStore.ts
import { create } from "zustand";

type QuizState = {
  selectedAnswers: Record<number, number>; // Maps question ID to selected answer ID
  setAnswer: (questionId: number, answerId: number) => void;
  resetAnswers: () => void;
};

export const useQuizStore = create<QuizState>((set) => ({
  selectedAnswers: {},
  setAnswer: (questionId, answerId) =>
    set((state) => ({
      selectedAnswers: { ...state.selectedAnswers, [questionId]: answerId },
    })),
  resetAnswers: () => set({ selectedAnswers: {} }),
}));
