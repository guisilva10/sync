import { z } from "zod";

export const updateLinkSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  socialLinksJson: z
    .array(
      z.object({
        title: z.string(),
        url: z.string().url("URL inválida"),
      }),
    )
    .optional(),
  theme: z.string().optional(),
  image: z.string().optional(),
  headerImage: z.string().nullable().optional(),
  layout: z.enum(["default", "grid"]).optional(),
});

export type UpdateLinkDTO = z.infer<typeof updateLinkSchema>;

export const updateCustomizationSchema = z.object({
  headerImage: z.string().nullable().optional(),
  layout: z.enum(["default", "grid"]).optional(),
});

export type UpdateCustomizationDTO = z.infer<typeof updateCustomizationSchema>;
