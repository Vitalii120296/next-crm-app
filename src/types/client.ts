import { Product } from "./product";

export type ClientStatus = "NEW" | "IN_PROGRESS" | "DONE";

export type CreatedBy = {
  firstName: string;
  lastName: string;
};

export type Client = {
  id: string;
  name: string;
  surname: string;
  status: ClientStatus;
  phone?: string | null;
  email: string | null;
  notes?: string | null;
  createdBy?: CreatedBy | null;

  products?: Pick<Product, "id" | "name">[] | [];

  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export type ClientResponseDto = {
  id: string;
  name: string;
  surname: string;
  status: ClientStatus;
  phone: string | null;
  email: string | null;
  notes: string | null;
  createdBy: CreatedBy | null;

  products?: Pick<Product, "id" | "name">[] | [];

  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export type ClientCreateDto = {
  name: string;
  surname: string;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
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
