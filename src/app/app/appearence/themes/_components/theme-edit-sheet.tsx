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
import { Label } from "@/app/_components/ui/label";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/app/_components/ui/use-toast";
import { updateLinkTheme } from "@/app/app/links/new/actions";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import Link from "next/link";

// Definição dos temas disponíveis
const themes = [
  { value: "light", label: "Claro", className: "bg-white text-black" },
  { value: "dark", label: "Escuro", className: "bg-gray-900 text-white" },
  { value: "blue", label: "Azul", className: "bg-blue-500 text-white" },
  { value: "green", label: "Verde", className: "bg-green-500 text-white" },
];

interface ThemeEditorSheetProps {
  linkId: string;
  currentTheme: string | null;
  hasSubscription: boolean;
}

export function ThemeEditorSheet({
  linkId,
  currentTheme,
  hasSubscription,
}: ThemeEditorSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || "light");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSaveTheme = async () => {
    if (!hasSubscription) return;

    setIsSubmitting(true);
    try {
      await updateLinkTheme(linkId, selectedTheme);
      setIsOpen(false);
      router.refresh();
      toast?.({
        title: "Sucesso",
        description: "Tema atualizado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao atualizar tema:", error);
      toast?.({
        title: "Erro",
        description: "Falha ao atualizar o tema.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>Editar Tema</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Tema</SheetTitle>
          <SheetDescription>Personalize o tema do seu link.</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-6">
          {hasSubscription ? (
            <>
              <RadioGroup
                value={selectedTheme}
                onValueChange={setSelectedTheme}
                className="space-y-2"
              >
                {themes.map((theme) => (
                  <div
                    key={theme.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={theme.value} id={theme.value} />
                    <Label htmlFor={theme.value} className="flex items-center">
                      <span
                        className={`mr-2 h-5 w-5 rounded-full ${theme.className}`}
                      />
                      {theme.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Button
                onClick={handleSaveTheme}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Salvando..." : "Salvar Tema"}
              </Button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                A edição de temas está disponível apenas para usuários com um
                plano de assinatura ativo.
              </p>
              <Button asChild>
                <Link href="/app/billing">Ver Planos</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
