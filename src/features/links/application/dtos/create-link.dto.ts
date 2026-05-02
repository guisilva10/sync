import { z } from "zod";

export const createLinkSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string(),
  slug: z.string().optional(),
  socialLinksJson: z.array(
    z.object({
      title: z.string(),
      url: z.string().url("URL inválida"),
    }),
  ),
  theme: z.string().default("light"),
  image: z.string(),
});

export type CreateLinkDTO = z.infer<typeof createLinkSchema>;
