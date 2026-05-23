import { supabaseServerClient } from "@/shared/lib/supabase/supabaseServer";
import { Business } from "@/types";

export const getBusinessService = async (): Promise<Business | null> => {
  const supabase = await supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("business")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching business:", error.message);
    return null;
  }

  return data;
};
