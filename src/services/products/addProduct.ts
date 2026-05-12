import { supabase } from "@/shared/lib/supabase/supabaseClient";
import { CreateProductDto, Product } from "@/types";

export const addProductService = async (
  payload: CreateProductDto,
): Promise<Product> => {
  const res = await supabase.from("products").insert(payload).select().single();

  if (res.error) throw res.error;

  return res.data as Product;
};
