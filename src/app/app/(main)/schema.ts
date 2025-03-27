import { z } from "zod";

export const linkSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export const deleteLinkSchema = z.object({
  id: z.string(),
});
