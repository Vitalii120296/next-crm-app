import { Client } from "./client";

export type Product = {
  id: string;
  user_id: string;

  name: string;
  description?: string;
  price?: number;
  sku?: string;
  clients?: Client[];
  image_url?: string | null;

  created_at?: Date;
  updated_at?: Date;
};

export type CreateProductDto = {
  user_id: string;
  name: string;
  description?: string | null;
  price?: number | null;
  sku?: string | null;
  clients?: Pick<Client, "id">[] | null;
  image_url?: string | null;
};

export type UpdateProductDto = Partial<CreateProductDto>;
