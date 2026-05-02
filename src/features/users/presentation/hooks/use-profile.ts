"use client";

import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../actions";
import type { UpdateProfileDTO } from "../../application/use-cases/update-profile";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: UpdateProfileDTO) => updateProfile(data),
  });
}
