import { authGuard } from "@/shared/lib/auth-guard";
import { linkRepository } from "../../infrastructure/repositories/prisma-link.repository";

export async function deleteLink(id: string) {
  const session = await authGuard();
  return linkRepository.delete(id, session.user.id);
}
