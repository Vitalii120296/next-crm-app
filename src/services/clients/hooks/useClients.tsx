import { Client } from "@/types";
import { useEffect, useState } from "react";
import { getClientsService } from "../getClients";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const useClients = () => {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const data = await getClientsService();

        setClients(data);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, loading };
};
