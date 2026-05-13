import { supabase } from "@/shared/lib/supabase/supabaseClient";

export const deleteImg = async (fileName: string, path: string) => {
  const res = await supabase.storage.from(path).remove([fileName]);

  if (res.error) {
    throw res.error;
  }

  return res.data;
};
