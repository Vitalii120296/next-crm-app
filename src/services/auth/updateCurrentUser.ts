import { supabase } from "@/shared/lib/supabase/supabaseClient";
import { User } from "@/types";

export const updateCurrentUser = async (
  payload: Partial<User>,
  currentUserId: string,
): Promise<User> => {
  const res = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", currentUserId)
    .select()
    .single();

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};
