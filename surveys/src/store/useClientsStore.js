import { create } from "zustand";
import { persist } from "zustand/middleware";

const useClientsStore = create(
  persist(
    (set, get) => ({
      clients: [],

      setClients: (newClients) => set({ clients: newClients }),

      addUser: (user) =>
        set((state) => ({
          clients: [...state.clients, user],
        })),

      updateUser: (updatedUser) =>
        set((state) => ({
          clients: state.clients.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          ),
        })),

      removeUser: (userId) =>
        set((state) => ({
          clients: state.clients.filter((user) => user._id !== userId),
        })),

      getUserById: (id) => {
        const state = get();
        return state.clients.find((user) => user._id === id);
      },
    }),
    {
      name: "clients-storage", // LocalStorage key
    }
  )
);

export default useClientsStore;
