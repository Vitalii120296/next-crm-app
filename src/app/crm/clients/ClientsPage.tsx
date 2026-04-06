"use client";

import { useEffect, useMemo, useState } from "react";
import type { ClientFilters, ClientStatus } from "@/types";

import { ClientsFilter } from "./components/ClientsFilter/ClientsFilter";
import { ClientsTable } from "./components/ClientsTable/ClientsTable";
import { Loader } from "@/components/Loader/Loader";

import s from "./ClientsPage.module.scss";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useClients } from "@/services/clients/hooks/useClients";
import { useClientStore } from "@/store/client";
import { useAuthStore } from "@/store/user";

export const ClientsPage = () => {
  const token = useAuthStore((state) => state.token);
  const { clientsPayload } = useClients(token);
  const [loading, setLoading] = useState(false);
  const clients = useClientStore((state) => state.clients);
  const setClients = useClientStore((state) => state.setClients);
  const queryParams = useQueryParams();
  const [filters, setFilters] = useState<ClientFilters>({
    search: "",
    status: "all",
  });

  useEffect(() => {
    if (!clientsPayload) return;
    setClients(clientsPayload);
  }, [clientsPayload, setClients]);

  useEffect(() => {
    setFilters({
      search: queryParams.get("search") || "",
      status: (queryParams.get("status") as ClientStatus) || "all",
    });
  }, [queryParams]);

  //   const fetchClients = async () => {
  //     if (!clientsPayload) return;

  //     try {
  //       setLoading(true);
  //       setClients(clientsPayload);
  //     } catch (error) {
  //       console.error("Failed to load clients:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchClients();
  // }, [token, clientsPayload, setClients]);

  const filteredClients = useMemo(() => {
    if (!clients) return;
    return clients.filter((client) => {
      const search = (filters.search || "").toLowerCase();

      const fullName =
        `${client.name ?? ""} ${client.surname ?? ""}`.toLowerCase();
      const matchesName = fullName.includes(search);

      const matchesStatus =
        filters.status === "all" || client.status === filters.status;

      return matchesName && matchesStatus;
    });
  }, [clients, filters.search, filters.status]);

  return (
    <div className="w-full">
      <div className={s.wrapper}>
        <ClientsFilter
          filters={filters}
          onChange={(key: string, value: string) =>
            queryParams.set({ [key]: value } as ClientFilters)
          }
        />
        {!clients ? <Loader /> : <ClientsTable clients={filteredClients} />}
      </div>
    </div>
  );
};

export default ClientsPage;
