"use client";

import { useEffect, useMemo, useState } from "react";
import type { Client, ClientFilters, ClientStatus } from "@/types";

import { ClientsFilter } from "./components/ClientsFilter/ClientsFilter";
import { ClientsTable } from "./components/ClientsTable/ClientsTable";
import { Loader } from "@/components/Loader/Loader";

import s from "./ClientsPage.module.scss";
import { useQueryParams } from "@/hooks/useQueryParams";
import { getClientsTestApi } from "@/api/test-api/clients.test-api";

export const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const queryParams = useQueryParams();
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ClientFilters>({
    search: "",
    status: "all",
  });

  useEffect(() => {
    setFilters({
      search: queryParams.get("search") || "",
      status: (queryParams.get("status") as ClientStatus) || "all",
    });
  }, [queryParams]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await getClientsTestApi();
        setClients(res);
        console.log(res);
      } catch (error) {
        console.error("Failed to load clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = useMemo(() => {
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
    <div className="w-full">
      <div className={s.wrapper}>
        <ClientsFilter
          filters={filters}
          onChange={(key: string, value: string) =>
            queryParams.set({ [key]: value } as ClientFilters)
          }
          setClients={setClients}
        />
        {loading ? (
          <Loader />
        ) : (
          <ClientsTable setClients={setClients} clients={filteredClients} />
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
