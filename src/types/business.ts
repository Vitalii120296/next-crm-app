export type Business = {
  id: string;
  name: string;
  description: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  avatar?: string | null;
  created_at: Date;
  updated_at: Date;
};

export type BusinessDTO = {
  name: string;
  description?: string | null;
  type: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  avatar?: string | null;
  updated_at: Date;
};
