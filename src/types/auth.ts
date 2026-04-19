export type UserRole = "owner" | "user";
export type UserStatus = "active" | "inactive";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;

  phone?: string | null;
  location?: string | null;
  birthDate?: string | null;

  avatar?: string | null;

  role?: UserRole | null;
  status?: UserStatus | null;
  createdAt?: Date | null;
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
