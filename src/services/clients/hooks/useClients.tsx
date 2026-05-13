import { Client, User } from "@/types";
import { useEffect, useState } from "react";
import { getClientsService } from "../getClients";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useClientStore } from "@/store/client";

export const useClients = (currentUser: User | null) => {
  const [clientsPayload, setClientsPayload] = useState<Client[] | null>(null);
  const [loading, setLoading] = useState(false);
  const clients = useClientStore((state) => state.clients);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        if (currentUser && !clients) {
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
  }, [currentUser, clients]);

  return { clientsPayload, loading };
};
