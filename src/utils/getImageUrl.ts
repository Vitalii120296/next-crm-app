import { supabase } from "@/shared/lib/supabase/supabaseClient";

export const getImageUrl = async (
  file: File,
  oldFileName: string | null = null,
): Promise<string> => {
  const fileName = oldFileName
    ? oldFileName
    : `${crypto.randomUUID()}.${file?.name.split(".").pop()}`;

  const { error } = await supabase.storage
    .from("products_img")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage.from("products_img").getPublicUrl(fileName);

  return data.publicUrl;
};
