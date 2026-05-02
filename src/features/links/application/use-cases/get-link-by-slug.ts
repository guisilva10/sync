import { linkRepository } from "../../infrastructure/repositories/prisma-link.repository";

export async function getLinkBySlug(slug: string) {
  return linkRepository.findBySlug(slug);
}
