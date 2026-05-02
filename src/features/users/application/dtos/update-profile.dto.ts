import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email(),
});

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
