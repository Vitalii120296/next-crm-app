import { supabase } from "@/shared/lib/supabase/supabaseClient";
import { Product, UpdateProductDto } from "@/types";

export const updateProductService = async (
  id: string,
  payload: UpdateProductDto,
): Promise<Product> => {
  const res = await supabase
    .from("products")
    .update({ ...payload })
    .eq("id", id)
    .select()
    .single();

  return res.data;
};
