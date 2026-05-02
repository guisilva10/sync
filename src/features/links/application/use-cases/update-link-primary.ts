import { authGuard } from "@/shared/lib/auth-guard";
import { linkRepository } from "../../infrastructure/repositories/prisma-link.repository";

export async function updateLinkPrimary(linkId: string) {
  const session = await authGuard();
  return linkRepository.updatePrimaryStatus(linkId, session.user.id);
}
