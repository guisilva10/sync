import { supabase } from "./index";

export async function uploadImage(file: File, userId: string) {
  const fileName = `${userId}-${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Erro ao fazer upload da imagem:", error.message);
    return null;
  }

  console.log("Upload realizado com sucesso:", data);
  return data.path;
}
