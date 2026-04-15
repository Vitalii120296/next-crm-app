import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import Modal from "../Modal";
import { ClientDetails } from "../ClientDetails";
import { Client } from "@/types";
import { statusFormat } from "@/utils/statusFormat";

type Props = {
  clients: Client[] | null | undefined;
};

export default function ClientsTable({ clients }: Props) {
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(
    null,
  );

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "16px",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "2px",
                borderColor: "background.default",
                borderStyle: "solid",
              }}
            >
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Creator</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clients?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="textSecondary">
                    No clients found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              clients?.map((client, index) => (
                <TableRow
                  key={client.id}
                  hover
                  onClick={() => setSelectedClient(client)}
                  sx={{
                    cursor: "pointer",
                    borderBottom: "unset",
                    borderBottomColor: "background.default",
                    borderBottomStyle: "solid",
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.surname}</TableCell>
                  <TableCell>{client.phone ?? "—"}</TableCell>
                  <TableCell>{client.notes ?? "—"}</TableCell>
                  <TableCell>
                    <span style={{ display: "inline-block" }}>
                      <Typography
                        variant="body2"
                        sx={(theme) => ({
                          textWrap: "nowrap",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          backgroundColor:
                            client.status === "NEW"
                              ? theme.palette.success.light
                              : client.status === "DONE"
                                ? theme.palette.error.light
                                : theme.palette.warning.light,
                          color:
                            client.status === "NEW"
                              ? theme.palette.success.contrastText
                              : client.status === "DONE"
                                ? theme.palette.error.contrastText
                                : theme.palette.warning.contrastText,
                        })}
                      >
                        {statusFormat(client.status)}
                      </Typography>
                    </span>
                  </TableCell>
                  <TableCell>{client.userId}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedClient && (
        <Modal
          open={!!selectedClient}
          onClose={() => setSelectedClient(null)}
          title="Client details"
        >
          <ClientDetails
            client={selectedClient}
            onClose={() => setSelectedClient(null)}
          />
        </Modal>
      )}
    </Box>
  );
}
