// stores/quizStore.ts
import { create } from "zustand";

type QuizState = {
  correctAnswers: number;
  incrementCorrectAnswers: () => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizState>((set) => ({
  correctAnswers: 0,
  incrementCorrectAnswers: () =>
    set((state) => ({ correctAnswers: state.correctAnswers + 1 })),
  resetQuiz: () => set({ correctAnswers: 0 }),
}));
