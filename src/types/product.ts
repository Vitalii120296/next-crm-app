import { Client } from "./client";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  sku: string;
  createdAt: Date;
  clients: Pick<Client, "id" | "first_name" | "last_name" | "status">[];
  file?: File;
};
