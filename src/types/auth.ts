export type UserRole = "owner" | "user";
export type UserStatus = "active" | "inactive";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;

  role?: UserRole;
  status?: UserStatus;
  createdAt?: Date;
};

export type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
