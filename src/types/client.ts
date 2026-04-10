import { Product } from "./product";

export type ClientStatus = "NEW" | "IN_PROGRESS" | "DONE";

export type Client = {
  id: string;
  name: string;
  surname: string;
  phone?: string;
  email: string;
  notes?: string;
  status: ClientStatus;
  userId: string;

  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateClientDto = {
  name: string;
  surname: string;
  email?: string;
  phone?: string;
  notes?: string;
  status: ClientStatus;
  userId: string;
  products?: Pick<Product, "id">[];
};

export type UpdateClientDto = Partial<Client> & {
  status: ClientStatus;
};

export type ClientFilters = {
  search?: string;
  status?: ClientStatus | "all";
  createdById?: string;
};
