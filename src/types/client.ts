export type ClientStatus = "NEW" | "IN_PROGRESS" | "DONE";

export type ClientNote = {
  id: string;
  description: string;
};

export type ClientNoteResponse = {
  id: number;
  description: string;
};

export type Client = {
  id?: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  notes: string;
  status: ClientStatus;
  userId?: string;

  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateClientDto = {
  name: string;
  email: string;
  phone?: string;
  comment?: string;
};

export type UpdateClientDto = Partial<CreateClientDto> & {
  status?: ClientStatus;
};

export type ClientFilters = {
  search?: string;
  status?: ClientStatus | "all";
  createdById?: string;
};
