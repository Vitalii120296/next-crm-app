export type UserRole = "owner" | "user";
export type UserStatus = "active" | "inactive";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
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

export interface AuthData {
  token: string;
  user: User;
}
export interface IRegisterRes {
  message: string;
}

export interface ILoginRes {
  access_token: string;
}
