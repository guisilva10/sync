/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Textarea } from "@/app/_components/ui/textarea"; // Adicione este componente
import { PencilRulerIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { useToast } from "@/app/_components/ui/use-toast";
import { updateLinkById } from "../../new/actions";

interface EditLinkSheetProps {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  socialLinksJson: string[];
}

export function EditLinkSheet({
  id,
  title,
  slug,
  description,
  socialLinksJson,
}: EditLinkSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: title || "",
    slug: slug || "",
    description: description || "",
    socialLinksJson: socialLinksJson || [],
  });
  const [newSocialLink, setNewSocialLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateLinkById(id, {
        title: formData.title || undefined,
        slug: formData.slug || undefined,
        description: formData.description || undefined,
        socialLinksJson: formData.socialLinksJson,
      });
      setIsOpen(false);
      router.refresh();
      toast?.({
        title: "Sucesso",
        description: "Link atualizado com sucesso!",
      });
    } catch (error: any) {
      console.error("Erro ao atualizar link:", error);
      toast?.({
        title: "Erro",
        description: error.message || "Falha ao atualizar o link.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSocialLink = () => {
    if (newSocialLink.trim()) {
      setFormData({
        ...formData,
        socialLinksJson: [...formData.socialLinksJson, newSocialLink.trim()],
      });
      setNewSocialLink("");
    }
  };

  const removeSocialLink = (index: number) => {
    setFormData({
      ...formData,
      socialLinksJson: formData.socialLinksJson.filter((_, i) => i !== index),
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <PencilRulerIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Link</SheetTitle>
          <SheetDescription>
            Altere os detalhes do seu link abaixo.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 px-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Digite o título do link"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="Digite o slug (único)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Digite a descrição do link"
            />
          </div>
          <div className="space-y-2">
            <Label>Links Sociais</Label>
            <div className="flex flex-col space-y-2 space-x-2">
              {formData.socialLinksJson.map((link, index) => (
                <div key={index} className="flex items-center gap-x-4">
                  <Input value={link} readOnly />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSocialLink(index)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center gap-x-2">
                <Input
                  value={newSocialLink}
                  onChange={(e) => setNewSocialLink(e.target.value)}
                  placeholder="Adicionar novo link social"
                />
                <Button type="button" onClick={addSocialLink}>
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
