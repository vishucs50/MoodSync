import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const useMoodStore = create(
  devtools(
    persist(
      (set) => ({
        moods: [],
        setMoods: (moods) => set({ moods }),
        toggleMood: (mood, max = 3) =>
          set((state) => {
            if (state.moods.includes(mood)) {
              return { moods: state.moods.filter((m) => m !== mood) };
            } else {
              if (state.moods.length < max) {
                return { moods: [...state.moods, mood] };
              } else {
                return state;
              }
            }
          }),
        resetMoods: () => set({ moods: [] }),
      }),
      {
        name: "mood-storage",
      }
    )
  )
);

export default useMoodStore;
