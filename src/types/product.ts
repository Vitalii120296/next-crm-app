import { Client } from "./client";

export type Product = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  sku?: number;
  clients?: Client[];

  userId?: string;
  createdAt?: Date;
};

export type CreateProductDto = {
  name: string;
  description?: string;
  price?: string;
  sku?: number;
  userId: string;
  clientIds?: string[];
};

export type UpdateProductDto = Partial<CreateProductDto>;
