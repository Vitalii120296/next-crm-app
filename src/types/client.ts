import { Product } from "./product";

export type ClientStatus = "new" | "in_progress" | "done";

export type Client = {
  id: string;
  user_id: string;

  first_name: string;
  last_name: string;
  status: ClientStatus;
  phone?: string | null;
  email: string | null;
  note?: string | null;

  products?: Pick<Product, "id">[] | [];

  created_at?: Date | null;
  updatedAt?: Date | null;
};

export type ClientCreateDto = {
  user_id: string;

  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  note?: string | null;
  status: ClientStatus;

  products?: Pick<Product, "id">[];
};

export type ClientUpdateDto = Partial<Client> & {
  status: ClientStatus;
};

export type ClientFilters = {
  search?: string;
  status?: ClientStatus | "all";
  createdById?: string;
};
