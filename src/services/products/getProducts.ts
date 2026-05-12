import { supabase } from "@/shared/lib/supabase/supabaseClient";
import { Product } from "@/types";

export const getProductsService = async (): Promise<Product[]> => {
  const res = await supabase.from("products").select("*");

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data as Product[];
};
