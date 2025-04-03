import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateBigFiveScores } from "../services/Services";

export const useNormalSurveyStore = create(
  persist(
    (set, get) => ({
      phone: "", // Store user phone number
      answers: {}, // Store answers in a sectioned format { "Section A": { "1": 5, "2": 0 }, "Section B": { "3": 4 } }
      scores: {}, // Store computed scores
      responses: {},
      setPhone: (phone) => set({ phone }),

      setAnswer: (section, questionIndex, value) =>
        set((state) => {
          const updatedAnswers = {
            ...state.answers,
            [section]: {
              ...(state.answers[section] || {}), // Preserve previous section answers
              [questionIndex]: Number(value), // Store values as numbers
            },
          };

          console.log("Updated Answers:", updatedAnswers); // Debugging
          return { answers: updatedAnswers };
        }),

      setResponse: (endpoint, responseData) =>
        set((state) => ({
          responses: {
            ...state.responses,
            [endpoint]: responseData,
          },
        })),

      updateScores: () => {
        const allAnswers = get().answers.questions;
        console.log("ALL ANSWERS ->", allAnswers);

        if (Object.keys(allAnswers).length === 0) {
          console.error("No answers provided!");
          return;
        }

        const scores = calculateBigFiveScores(allAnswers);
        console.log("SCORES -> ", scores);
        set({ scores });
      },

      getSurveyData: () => {
        const { phone, answers, scores } = get();
        return { phone, answers, scores };
      },
    }),
    {
      name: "Normal-survey-storage",
      getStorage: () => localStorage,
    }
  )
);
