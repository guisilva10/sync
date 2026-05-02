"use server";

import {
  updateProfile as updateProfileUseCase,
  type UpdateProfileDTO,
} from "../../application/use-cases/update-profile";

export async function updateProfile(input: UpdateProfileDTO) {
  return updateProfileUseCase(input);
}
