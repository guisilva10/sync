import { authGuard } from "@/shared/lib/auth-guard";
import { linkRepository } from "../../infrastructure/repositories/prisma-link.repository";

export async function getLinkById(id: string) {
  const session = await authGuard();
  return linkRepository.findById(id, session.user.id);
}

export async function getLinkForEdit(id: string) {
  const session = await authGuard();
  return linkRepository.findForEdit(id, session.user.id);
}
