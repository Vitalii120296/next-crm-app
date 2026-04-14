import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Actions = {
  toggleBurgerMenu: () => void;
};

type State = {
  isActive: boolean;
} & Actions;

export const useBurgerMenu = create<State>()(
  devtools((set) => ({
    isActive: false,

    toggleBurgerMenu: () => {
      set((state) => ({
        isActive: !state.isActive,
      }));
    },
  })),
);
