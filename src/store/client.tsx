import { Client } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Actions = {
  setClients: (clients: Client[]) => void;
  addClient: (client: Client) => void;
  removeClient: (id: string) => void;
  updateClient: (id: string, payload: Client) => void;
};

type State = {
  clients: Client[] | null;
} & Actions;

export const useClientStore = create<State>()(
  devtools((set) => ({
    clients: null,

    setClients: (clients) => set({ clients }),

    addClient: (client) =>
      set((state) => ({
        clients: state.clients ? [...state.clients, client] : [client],
      })),

    removeClient: (id) =>
      set((state) => ({
        clients: state.clients
          ? [...state.clients.filter((cl) => cl.id !== id)]
          : null,
      })),

    updateClient: (id, payload) =>
      set((state) => ({
        clients: state.clients
          ? [
              ...state.clients.map((cl) =>
                cl.id === id ? { ...cl, ...payload } : cl,
              ),
            ]
          : null,
      })),
  })),
);
