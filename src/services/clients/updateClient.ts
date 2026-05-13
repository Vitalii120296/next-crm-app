import { supabase } from "@/shared/lib/supabase/supabaseClient";
import { Client } from "@/types";

export const updateClientService = async (
  clientId: string,
  payload: Partial<Client>,
): Promise<Client> => {
  const res = await supabase
    .from("clients")
    .update(payload)
    .eq("id", clientId)
    .select()
    .single();

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};
