import { supabase } from "@/shared/lib/supabase/supabaseClient";

export const deleteProductService = async (
  productId: string,
): Promise<void> => {
  const res = await supabase.from("products").delete().eq("id", productId);

  if (res.error) {
    throw res.error;
  }
};
