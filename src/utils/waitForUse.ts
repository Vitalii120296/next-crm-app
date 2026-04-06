import { useAuthStore } from "@/store/user";
import { User } from "@/types";

export const waitForUser = async (): Promise<User> => {
  return new Promise((resolve) => {
    const currentUser = useAuthStore.getState().currentUser;

    if (currentUser) {
      resolve(currentUser);
      return;
    }

    const unsub = useAuthStore.subscribe((state) => {
      if (state.currentUser) {
        resolve(state.currentUser);
        unsub();
      }
    });
  });
};
