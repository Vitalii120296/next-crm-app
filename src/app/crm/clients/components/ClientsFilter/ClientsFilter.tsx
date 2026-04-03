"use client";

import type React from "react";
import type { Client, ClientFilters, ClientStatus } from "@/types";
// import { ClientCreate } from "../ClientCreate/ClientCreate";

import styles from "./ClientsFilter.module.scss";
import { useState } from "react";

type Props = {
  filters: ClientFilters;
  onChange: (key: string, value: string) => void;
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
};

export const ClientsFilter: React.FC<Props> = ({
  filters,
  onChange,
  // setClients,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    onChange("search", value);
  };

  const handleStatusChange = (status: ClientStatus | "all") => {
    onChange("status", status);
  };
  return (
    <>
      <div className={styles.filters}>
        <h1 className="h2">Clients</h1>

        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search client"
            value={filters.search ?? ""}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          <select
            value={filters.status ?? "all"}
            onChange={(e) =>
              handleStatusChange(e.target.value as ClientStatus | "all")
            }
          >
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>

          <button
            className={styles.add_client}
            onClick={() => setIsModalOpen(true)}
          >
            Add client
          </button>
        </div>
      </div>

      {/* <ClientCreate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setClients={setClients}
      /> */}
    </>
  );
};
