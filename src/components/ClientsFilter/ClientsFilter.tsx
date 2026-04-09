"use client";

import type React from "react";
import type { Client, ClientFilters, ClientStatus } from "@/types";
// import { ClientCreate } from "../ClientCreate/ClientCreate";

import styles from "./ClientsFilter.module.scss";
import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@/components/Modal";
import { ClientCreate } from "@/components/ClientCreate";

type Props = {
  filters: ClientFilters;
  onChange: (key: string, value: string) => void;
};

export const ClientsFilter: React.FC<Props> = ({ filters, onChange }) => {
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
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="DONE">Done</option>
          </select>

          <Button
            variant="outlined"
            onClick={() => setIsModalOpen(true)}
            sx={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              py: 0,
            }}
          >
            Add Client
          </Button>
          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Create client"
          >
            <ClientCreate />
          </Modal>
        </div>
      </div>
    </>
  );
};
