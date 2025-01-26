import { create } from "zustand";

type QuizState = {
  selectedAnswers: Record<number, number>; // Maps question ID to selected answer ID
  setAnswer: (questionId: number, answerId: number) => void;
  resetAnswers: () => void;
  reflectionAnswers: Record<number, string>; // Store answers keyed by question ID
  setReflectionAnswers: (questionId: number, answer: string) => void;
};

export const useQuizStore = create<QuizState>((set) => ({
  selectedAnswers: {},
  setAnswer: (questionId, answerId) =>
    set((state) => ({
      selectedAnswers: { ...state.selectedAnswers, [questionId]: answerId },
    })),
  resetAnswers: () => set({ selectedAnswers: {} }),
  reflectionAnswers: {},
  setReflectionAnswers: (questionId, answer) =>
    set((state) => ({
      reflectionAnswers: { ...state.reflectionAnswers, [questionId]: answer },
    })),
}));
