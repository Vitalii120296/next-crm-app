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
