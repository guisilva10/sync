import { authGuard } from "@/shared/lib/auth-guard";
import { linkRepository } from "../../infrastructure/repositories/prisma-link.repository";
import type { UpdateLinkDTO } from "../dtos/update-link.dto";

export async function updateLink(id: string, data: UpdateLinkDTO) {
  const session = await authGuard();
  return linkRepository.update(id, session.user.id, data);
}
