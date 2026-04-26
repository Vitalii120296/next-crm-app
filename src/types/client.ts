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
  phone?: string;
  email: string;
  notes?: string;
  createdBy?: CreatedBy;

  createdAt?: Date;
};

export type ClientResponseDto = {
  id: string;
  name: string;
  surname: string;
  status: ClientStatus;
  phone: string | null;
  email: string | null;
  notes: string | null;
  createdBy: CreatedBy;

  createdAt: Date;
};

export type ClientCreateDto = {
  name: string;
  surname: string;
  email?: string;
  phone?: string;
  notes?: string;
  status: ClientStatus;
  createdBy: CreatedBy;

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
