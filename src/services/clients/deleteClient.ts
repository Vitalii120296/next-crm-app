import { supabase } from "@/shared/lib/supabase/supabaseClient";

export const deleteClientsService = async (clientId: string) => {
  const res = await supabase.from("clients").delete().eq("id", clientId);

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};
