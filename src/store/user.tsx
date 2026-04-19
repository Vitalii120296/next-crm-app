import { User } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Actinos = {
  setCurrentUser: (user: User | null) => void;
  removeUser: () => void;
  setToken: (token: string | null) => void;
  removeToken: () => void;
  editUser: (user: User) => void;
};

type State = {
  currentUser: User | null;
  token: string | null;
  isChecked: boolean;
} & Actinos;

export const useAuthStore = create<State>()(
  devtools(
    (set) => ({
      currentUser: null,
      token: null,
      isChecked: false,

      setCurrentUser: (user: User) =>
        set({ currentUser: user }, false, "auth/setCurrentUser"),

      removeUser: () => set({ currentUser: null }, false, "auth/removeUser"),

      setToken: (token: string) => set({ token }, false, "auth/setToken"),

      removeToken: () => set({ token: null }, false, "auth/removeToken"),

      editUser: (user: User) =>
        set({ currentUser: user }, false, "auth/editUser"),
    }),
    {
      name: "AuthStore",
    },
  ),
);
