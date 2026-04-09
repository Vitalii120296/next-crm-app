import { Client } from "./client";

export type Product = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  sku?: number;
  clients?: Pick<Client, "id" | "name" | "surname" | "status">[];

  userId?: string;
  createdAt?: Date;
};
