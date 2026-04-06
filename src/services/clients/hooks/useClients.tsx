import { Client } from "@/types";
import { useEffect, useState } from "react";
import { getClientsService } from "../getClients";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const useClients = (token: string | null) => {
  const [clientsPayload, setClientsPayload] = useState<Client[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        if (token) {
          setLoading(true);
          const data = await getClientsService();

          setClientsPayload(data);
        }
      } catch (error) {
        throw new Error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [token]);

  return { clientsPayload, loading };
};
