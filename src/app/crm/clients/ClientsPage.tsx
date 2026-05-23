"use client";

import { useEffect, useMemo } from "react";
import type { ClientFilters, ClientStatus } from "@/types";

import { ClientsFilter } from "../../../components/ClientsFilter";

import { useQueryParams } from "@/hooks/useQueryParams";
import { useClients } from "@/services/clients/hooks/useClients";
import { useClientStore } from "@/store/client";
import { useAuthStore } from "@/store/user";
import { Progress } from "@/components/Progress";
import ClientsTable from "@/components/ClientsTable";
import { Box } from "@mui/system";

export const ClientsPage = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { clientsPayload } = useClients(currentUser);
  const clients = useClientStore((state) => state.clients);
  const setClients = useClientStore((state) => state.setClients);
  const queryParams = useQueryParams();

  useEffect(() => {
    if (!clients && clientsPayload) {
      setClients(clientsPayload);
    }
  }, [clientsPayload, setClients, clients]);

  const filters: ClientFilters = {
    search: queryParams.get("search") || "",
    status: (queryParams.get("status") as ClientStatus) || "all",
  };

  const filteredClients = useMemo(() => {
    if (!clients) return;
    return clients.filter((client) => {
      const search = (filters.search || "").toLowerCase();

      const fullName =
        `${client.first_name ?? ""} ${client.last_name ?? ""}`.toLowerCase();
      const matchesName = fullName.includes(search);

      const matchesStatus =
        filters.status === "all" || client.status === filters.status;

      return matchesName && matchesStatus;
    });
  }, [clients, filters.search, filters.status]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <ClientsFilter
        filters={filters}
        onChange={(key: string, value: string) =>
          queryParams.set({ [key]: value } as ClientFilters)
        }
      />
      {!clients ? <Progress /> : <ClientsTable clients={filteredClients} />}
    </Box>
  );
};

export default ClientsPage;
