import { authGuard } from "@/shared/lib/auth-guard";
import { linkRepository } from "../../infrastructure/repositories/prisma-link.repository";
import type { UpdateCustomizationDTO } from "../dtos/update-link.dto";

export async function updateLinkCustomization(
  id: string,
  data: UpdateCustomizationDTO,
) {
  const session = await authGuard();
  return linkRepository.updateCustomization(id, session.user.id, data);
}
