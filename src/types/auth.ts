export type UserRole = "owner" | "user";
export type UserStatus = "active" | "inactive";

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;

  phone?: string | null;
  location?: string | null;
  birth_date?: string | null;

  avatar?: string | null;

  role?: UserRole | null;
  status?: UserStatus | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type IRegisterFormData = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};
export type ILoginFormData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
};

export type LoginResponseWithGoogle = {
  user: User;
  access_token: string;
};
