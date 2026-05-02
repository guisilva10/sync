"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createLink as createLinkUseCase } from "../../application/use-cases/create-link";
import {
  getLinkById as getLinkByIdUseCase,
  getLinkForEdit as getLinkForEditUseCase,
} from "../../application/use-cases/get-link-by-id";
import { getLinkBySlug as getLinkBySlugUseCase } from "../../application/use-cases/get-link-by-slug";
import { getLinksByUser as getLinksByUserUseCase } from "../../application/use-cases/get-links-by-user";
import { updateLink as updateLinkUseCase } from "../../application/use-cases/update-link";
import { deleteLink as deleteLinkUseCase } from "../../application/use-cases/delete-link";
import { updateLinkTheme as updateLinkThemeUseCase } from "../../application/use-cases/update-link-theme";
import { updateLinkCustomization as updateLinkCustomizationUseCase } from "../../application/use-cases/update-link-customization";

import { incrementClick as incrementClickUseCase } from "../../application/use-cases/increment-click";
import type { CreateLinkDTO } from "../../application/dtos/create-link.dto";
import type {
  UpdateLinkDTO,
  UpdateCustomizationDTO,
} from "../../application/dtos/update-link.dto";

// Re-export DTO type for consumers
export type { CreateLinkDTO as LinkFormData } from "../../application/dtos/create-link.dto";

export async function saveLink(data: CreateLinkDTO) {
  const link = await createLinkUseCase(data);
  revalidatePath("/app/links");
  return link;
}

export async function getLinkById(id: string) {
  return getLinkByIdUseCase(id);
}

export async function getLink(id: string) {
  return getLinkForEditUseCase(id);
}

export async function getLinkBySlug(slug: string) {
  return getLinkBySlugUseCase(slug);
}

export async function getLinksByUser() {
  return getLinksByUserUseCase();
}

export async function updateLinkById(id: string, data: UpdateLinkDTO) {
  const link = await updateLinkUseCase(id, data);
  revalidatePath("/app");
  revalidatePath("/app/links");
  return link;
}

export async function updateLinkTheme(id: string, theme: string) {
  return updateLinkThemeUseCase(id, theme);
}

export async function deleteLinkById(id: string) {
  const link = await deleteLinkUseCase(id);
  revalidatePath("/app");
  revalidatePath("/app/links");
  return link;
}

export async function updateLinkCustomization(
  id: string,
  data: UpdateCustomizationDTO,
) {
  const link = await updateLinkCustomizationUseCase(id, data);
  revalidatePath("/app");
  revalidatePath("/app/appearence/customize");
  return link;
}

export async function incrementLinkClick(linkId: string, url: string) {
  await incrementClickUseCase(linkId, url);
  revalidateTag("clicks", "default");
}
