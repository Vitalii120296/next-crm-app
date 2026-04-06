import { getTokenService } from "../getToken";

import { useState, useEffect } from "react";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function useGetToken() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        const res = await getTokenService();

        setToken(res.token);
      } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return { token, loading };
}
