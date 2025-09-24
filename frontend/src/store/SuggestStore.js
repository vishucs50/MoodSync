import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const PlaylistStore = (set) => ({
  playlists: [],

  setPlaylists: (playlists) => set({ playlists }),

  addPlaylists: async (newPlaylists) => {
    try {
      // Append new playlists to the existing array
      set((state) => ({
        playlists: [...state.playlists, ...newPlaylists],
      }));
    } catch (err) {
      console.error("Failed to add playlists", err);
    }
  },
});

const usePlaylistStore = create(
  devtools(
    persist(PlaylistStore, {
      name: "playlist-storage",
    })
  )
);

export default usePlaylistStore;
