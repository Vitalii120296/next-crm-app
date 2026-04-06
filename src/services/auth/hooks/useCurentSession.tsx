import { useState, useEffect } from "react";
import { User } from "@/types";
import { getCurrentUser } from "../getCurrentUser";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function useCurrentSession(token: string | null) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          setLoading(true);
          const user = await getCurrentUser(token);
          setCurrentUser(user);
        }
      } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return { currentUser, loading };
}
