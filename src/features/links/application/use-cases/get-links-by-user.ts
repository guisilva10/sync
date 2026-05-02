import { authGuard } from "@/shared/lib/auth-guard";
import { linkRepository } from "../../infrastructure/repositories/prisma-link.repository";

export async function getLinksByUser() {
  const session = await authGuard();
  return linkRepository.findAllByUser(session.user.id);
}
