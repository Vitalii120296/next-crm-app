import { Client } from "@/types";
import { useEffect, useState } from "react";
import { getClientsService } from "../getClients";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useClientStore } from "@/store/client";

export const useClients = (token: string | null) => {
  const [clientsPayload, setClientsPayload] = useState<Client[] | null>(null);
  const [loading, setLoading] = useState(false);
  const clients = useClientStore((state) => state.clients);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        if (token && !clients) {
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
  }, [token, clients]);

  return { clientsPayload, loading };
};
