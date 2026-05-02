import { authGuard } from "@/shared/lib/auth-guard";
import { userRepository } from "../../infrastructure/repositories/prisma-user.repository";
import type { UpdateProfileDTO } from "../dtos/update-profile.dto";

export type { UpdateProfileDTO };

export async function updateProfile(input: UpdateProfileDTO) {
  const session = await authGuard();
  return userRepository.updateName(session.user.id, input.name);
}
