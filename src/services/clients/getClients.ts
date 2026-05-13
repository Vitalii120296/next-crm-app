import { supabase } from "@/shared/lib/supabase/supabaseClient";
import { Client } from "@/types";

export const getClientsService = async (): Promise<Client[]> => {
  const res = await supabase.from("clients").select("*");

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};
