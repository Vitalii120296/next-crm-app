export type UserRole = "owner" | "user";
export type UserStatus = "active" | "inactive";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;

  role?: UserRole;
  status?: UserStatus;
};

export type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
