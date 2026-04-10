import { Client } from "./client";

export type Product = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  sku?: string;
  clients?: Client[];

  userId?: string;
  createdAt?: Date;
};

export type CreateProductDto = {
  name: string;
  description?: string | null;
  price?: number | null;
  sku?: string | null;
  userId: string;
  clients?: Pick<Client, "id">[] | null;
};

export type UpdateProductDto = Partial<CreateProductDto>;
