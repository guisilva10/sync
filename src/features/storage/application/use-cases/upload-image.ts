import { supabase } from "@/services/supabase";

export async function uploadImage(file: File, userId: string) {
  const fileName = `${userId}-${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Erro ao fazer upload: ${error.message}`);
  }

  return data.path;
}
