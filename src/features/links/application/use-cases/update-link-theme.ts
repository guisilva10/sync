import { authGuard } from "@/shared/lib/auth-guard";
import { linkRepository } from "../../infrastructure/repositories/prisma-link.repository";

export async function updateLinkTheme(id: string, theme: string) {
  const session = await authGuard();
  return linkRepository.updateTheme(id, session.user.id, theme);
}
