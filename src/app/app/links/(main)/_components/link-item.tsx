"use client";

import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { PencilIcon, Trash2Icon, LinkIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteLinkById, updateLinkPrimaryStatus } from "../../new/actions";

import { toast } from "@/app/_components/ui/use-toast";
import { Switch } from "@/app/_components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

interface SocialLink {
  title: string;
  url: string;
}

interface LinkItemProps {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  socialLinksJson: SocialLink[];
  isPrimary: boolean;
  userId: string;
}

export function LinkItem({
  id,
  title,
  slug,
  isPrimary,
  userId,
}: LinkItemProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPrimaryState, setIsPrimaryState] = useState(isPrimary);
  const displayTitle = title || "Sem título";

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteLinkById(id);
      router.refresh();
      toast({
        title: "Link excluído",
        description: "Seu link foi excluído com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao deletar link:", error);
      toast({
        title: "Erro",
        description: "Falha ao excluir o link.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePrimary = async (checked: boolean) => {
    try {
      await updateLinkPrimaryStatus(id, userId);
      setIsPrimaryState(checked);
      toast({
        title: checked ? "Link ativado" : "Link desativado",
        description: checked
          ? `O link "${displayTitle}" agora é o ativo para compartilhar.`
          : `O link "${displayTitle}" não é mais o ativo para compartilhar.`,
      });
      router.refresh();
    } catch (error) {
      console.error("Erro ao atualizar link primário:", error);
      toast({
        title: "Erro",
        description: "Falha ao atualizar o link ativo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={`flex items-center justify-between rounded-lg p-3 transition-colors ${isPrimaryState ? "bg-background border" : "hover:bg-background/80"}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Switch
                  checked={isPrimaryState}
                  onCheckedChange={handleTogglePrimary}
                  aria-label={`Ativar/desativar link "${displayTitle}" como primário`}
                  className={`${isPrimaryState ? "data-[state=checked]:bg-primary" : ""}`}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              {isPrimaryState
                ? "Link ativo para compartilhamento"
                : "Ativar como link principal"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-2">
            <Link
              href={`/app/links/${id}`}
              className="truncate font-medium hover:underline"
            >
              {displayTitle}
            </Link>
            {isPrimaryState && (
              <Badge>
                <StarIcon className="h-3 w-3" />
                <span>Ativo</span>
              </Badge>
            )}
          </div>

          {slug && (
            <div className="flex items-center gap-1 truncate text-sm text-gray-500 dark:text-gray-400">
              <LinkIcon className="h-3 w-3" />
              <span className="truncate">{slug}</span>
            </div>
          )}
        </div>
      </div>

      <div className="ml-2 flex shrink-0 space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="sm" className="h-8 px-2">
                <Link
                  href={`/app/links/edit/${id}`}
                  className="flex items-center"
                >
                  <PencilIcon className="size-4" />
                  <span className="sr-only md:not-sr-only md:ml-1">Editar</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Editar link</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <AlertDialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={isDeleting}
                    className="h-8 px-2"
                  >
                    <Trash2Icon className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:ml-1">
                      {isDeleting ? "Excluindo..." : "Excluir"}
                    </span>
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">Excluir link</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o link &quot;{displayTitle}
                &quot;? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Excluindo..." : "Excluir"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
