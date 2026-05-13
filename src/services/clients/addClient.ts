import { supabase } from "@/shared/lib/supabase/supabaseClient";
import { Client, ClientCreateDto } from "@/types";

export const addClientService = async (
  payload: ClientCreateDto,
): Promise<Client> => {
  const res = await supabase.from("clients").insert(payload).select().single();

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};
