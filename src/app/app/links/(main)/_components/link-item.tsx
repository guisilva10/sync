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
import { Trash2Icon } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteLinkById } from "../../new/actions";
import { EditLinkSheet } from "./edit-link-sheet";
import { toast } from "@/app/_components/ui/use-toast";

interface LinkItemProps {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  socialLinksJson: string[];
}

export function LinkItem({
  id,
  title,
  slug,
  description,
  socialLinksJson,
}: LinkItemProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

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
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between border-b pb-2 last:border-b-0">
      <div>
        <Link href={`/app/links/${id}`}>
          <p className="font-medium">{title || "Sem título"}</p>
        </Link>
      </div>
      <div className="flex space-x-2">
        <EditLinkSheet
          id={id}
          title={title}
          slug={slug}
          description={description}
          socialLinksJson={socialLinksJson}
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isDeleting}>
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
