import { supabase } from "@/shared/lib/supabase/supabaseClient";
import { BusinessDTO, Business } from "@/types";

export const updateBusinessService = async (
  businessId: string,
  payload: Partial<BusinessDTO>,
): Promise<Business> => {
  const res = await supabase
    .from("business")
    .update(payload)
    .eq("id", businessId)
    .select()
    .single();

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};
