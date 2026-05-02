import { authGuard } from "@/shared/lib/auth-guard";
import { linkRepository } from "../../infrastructure/repositories/prisma-link.repository";
import type { CreateLinkDTO } from "../dtos/create-link.dto";

export async function createLink(data: CreateLinkDTO) {
  const session = await authGuard();
  return linkRepository.create(data, session.user.id);
}
