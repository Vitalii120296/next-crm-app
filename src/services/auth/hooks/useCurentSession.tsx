import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "@/types";
import { getCurrentUser } from "../getCurrentUser";

export function useCurrentSession(token: string | null) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const user = await getCurrentUser(token);
          setCurrentUser(user);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return { currentUser, loading };
}
