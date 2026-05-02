"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLinksByUser,
  getLinkById,
  saveLink,
  updateLinkById,
  deleteLinkById,
  updateLinkTheme,
} from "../actions";
import type { CreateLinkDTO } from "../../application/dtos/create-link.dto";
import type { UpdateLinkDTO } from "../../application/dtos/update-link.dto";

export const linkKeys = {
  all: ["links"] as const,
  detail: (id: string) => ["links", id] as const,
};

export function useLinks() {
  return useQuery({
    queryKey: linkKeys.all,
    queryFn: () => getLinksByUser(),
  });
}

export function useLinkById(id: string) {
  return useQuery({
    queryKey: linkKeys.detail(id),
    queryFn: () => getLinkById(id),
    enabled: !!id,
  });
}

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLinkDTO) => saveLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.all });
    },
  });
}

export function useUpdateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLinkDTO }) =>
      updateLinkById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.all });
    },
  });
}

export function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteLinkById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linkKeys.all });
    },
  });
}

export function useUpdateLinkTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, theme }: { id: string; theme: string }) =>
      updateLinkTheme(id, theme),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: linkKeys.detail(variables.id),
      });
    },
  });
}
