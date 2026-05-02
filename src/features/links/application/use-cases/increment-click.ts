import { linkRepository } from "../../infrastructure/repositories/prisma-link.repository";

export async function incrementClick(linkId: string, url: string) {
  return linkRepository.incrementClick(linkId, url);
}
