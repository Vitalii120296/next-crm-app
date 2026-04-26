import { Client } from "./client";

export type Product = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  sku?: string;
  clients?: Client[];
  imageUrl?: string | null;

  userId?: string;
  createdAt?: Date;
};

export type CreateProductDto = {
  name: string;
  description?: string | null;
  price?: number | null;
  sku?: string | null;
  clients?: Pick<Client, "id">[] | null;
  imageUrl?: string;
};

export type UpdateProductDto = Partial<CreateProductDto>;
