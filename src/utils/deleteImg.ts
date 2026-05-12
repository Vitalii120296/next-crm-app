import { supabase } from "@/shared/lib/supabase/supabaseClient";

export const deleteImg = async (fileName: string) => {
  const res = await supabase.storage.from("products_img").remove([fileName]);

  if (res.error) {
    throw res.error;
  }

  return res.data;
};
