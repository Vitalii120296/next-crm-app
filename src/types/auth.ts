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

export type IRegisterFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
export type ILoginFormData = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
};

export type LoginResponse = {
  access_token: string;
};
