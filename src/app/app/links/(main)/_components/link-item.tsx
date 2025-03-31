// _components/link-item.tsx
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
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteLinkById, updateLinkPrimaryStatus } from "../../new/actions";

import { toast } from "@/app/_components/ui/use-toast";
import { Switch } from "@/app/_components/ui/switch";

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
  isPrimary: boolean; // Adicione isPrimary como prop
  userId: string; // Adicione userId para identificar o usuário
}

export function LinkItem({ id, title, isPrimary, userId }: LinkItemProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPrimaryState, setIsPrimaryState] = useState(isPrimary);

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
      if (checked) {
        await updateLinkPrimaryStatus(id, userId); // Marca como primário
        setIsPrimaryState(true);
        toast({
          title: "Link ativado",
          description: `O link "${title || "Sem título"}" agora é o ativo para compartilhar.`,
        });
      } else {
        // Desativa todos os links do usuário como não primários
        await updateLinkPrimaryStatus(id, userId); // Passa o userId para desativar todos
        setIsPrimaryState(false);
        toast({
          title: "Link desativado",
          description: `O link "${title || "Sem título"}" não é mais o ativo para compartilhar.`,
        });
      }
      router.refresh(); // Atualiza a página para refletir o novo estado
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
    <div className="flex items-center justify-between border-b pb-2 last:border-b-0">
      <div className="flex items-center gap-4">
        <Switch
          checked={isPrimaryState}
          onCheckedChange={handleTogglePrimary}
          aria-label={`Ativar/desativar link "${title || "Sem título"}" como primário`}
        />
        <Link href={`/app/links/${id}`}>
          <p className="font-medium">{title || "Sem título"}</p>
        </Link>
      </div>
      <div className="flex space-x-2">
        <div>
          <Button asChild variant="ghost">
            <Link href={`/app/links/edit/${id}`} className="flex items-center">
              Editar
              <PencilIcon className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isDeleting}>
              Excluir
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o link &quot;
                {title || "Sem título"}&quot;? Esta ação não pode ser desfeita.
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
