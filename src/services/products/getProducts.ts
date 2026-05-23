import { supabaseServerClient } from "@/shared/lib/supabase/supabaseServer";
import { Product } from "@/types";

export const getProductsService = async (): Promise<Product[]> => {
  const supabase = await supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return data ?? [];
};
