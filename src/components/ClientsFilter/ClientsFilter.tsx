"use client";

import type React from "react";
import type { ClientFilters, ClientStatus } from "@/types";
import styles from "./ClientsFilter.module.scss";
import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@/components/Modal";
import { ClientCreate } from "@/components/ClientCreate";
import { MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";

type Props = {
  filters: ClientFilters;
  onChange: (key: string, value: string) => void;
};

export const ClientsFilter: React.FC<Props> = ({ filters, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleSearchChange = (value: string) => {
  //   onChange("search", value);
  // };

  const handleStatusChange = (status: ClientStatus | "all") => {
    onChange("status", status);
  };
  return (
    <>
      <Box sx={{ display: "flex", gap: 2, height: 34 }}>
        <Button
          variant="outlined"
          onClick={() => setIsModalOpen(true)}
          sx={{
            width: 150,
            height: "100%",
            boxSizing: "border-box",
            display: "flex",
            py: 0,
          }}
        >
          Add Client
        </Button>
        <Select
          defaultValue={filters.status ?? "all"}
          onChange={(e) =>
            handleStatusChange(e.target.value as ClientStatus | "all")
          }
          sx={{ width: 120 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="NEW">New</MenuItem>
          <MenuItem value="IN_PROGRESS">In progress</MenuItem>
          <MenuItem value="DONE">Done</MenuItem>
        </Select>
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create client"
        >
          <ClientCreate />
        </Modal>
      </Box>
    </>
  );
};
