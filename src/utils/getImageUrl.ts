import { supabase } from "@/shared/lib/supabase/supabaseClient";

export const getImageUrl = async (
  file: File,
  path: string,
): Promise<string> => {
  const fileName = `${crypto.randomUUID()}.${file?.name.split(".").pop()}`;

  const { error } = await supabase.storage.from(path).upload(fileName, file, {
    cacheControl: "3600",
    upsert: true,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(path).getPublicUrl(fileName);

  return data.publicUrl;
};
