/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/app/_components/ui/use-toast";
import { updateLinkTheme } from "@/app/app/links/new/actions";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import Link from "next/link";
import { themes } from "@/app/_components/theme/constants";

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
  const [selectedTheme, setSelectedTheme] = useState(
    currentTheme || "light-normal",
  );
  const [activeTab, setActiveTab] = useState("light");
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

  // Encontrar qual categoria (light/dark) contém o tema atual
  const findActiveTabFromTheme = () => {
    if (!currentTheme) return "light";

    if (currentTheme.startsWith("light-")) return "light";
    if (currentTheme.startsWith("dark-")) return "dark";

    return "light"; // Padrão para light se não encontrar
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>Editar Tema</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto px-4 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Editar Tema</SheetTitle>
          <SheetDescription>Personalize o tema do seu link.</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-6">
          {hasSubscription ? (
            <>
              <Tabs
                defaultValue={findActiveTabFromTheme()}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="light">Claro</TabsTrigger>
                  <TabsTrigger value="dark">Escuro</TabsTrigger>
                </TabsList>
                <TabsContent value="light" className="mt-4">
                  <RadioGroup
                    value={selectedTheme}
                    onValueChange={setSelectedTheme}
                    className="grid grid-cols-1 gap-3"
                  >
                    {themes.light.map((theme) => (
                      <div
                        key={theme.value}
                        className="hover:bg-accent relative flex items-center rounded-md border p-3"
                      >
                        <RadioGroupItem
                          value={theme.value}
                          id={theme.value}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={theme.value}
                          className="flex flex-1 cursor-pointer items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                              <div
                                className={`h-6 w-6 rounded-full ${theme.styles.buttonBg}`}
                              ></div>
                              <div
                                className={`h-6 w-6 rounded-full ${theme.styles.nameBg}`}
                              ></div>
                            </div>
                            <span>{theme.label}</span>
                          </div>
                          <div
                            className={`h-4 w-4 rounded-full ${selectedTheme === theme.value ? "bg-primary" : "bg-muted"}`}
                          ></div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </TabsContent>
                <TabsContent value="dark" className="mt-4">
                  <RadioGroup
                    value={selectedTheme}
                    onValueChange={setSelectedTheme}
                    className="grid grid-cols-1 gap-3"
                  >
                    {themes.dark.map((theme) => (
                      <div
                        key={theme.value}
                        className="hover:bg-accent relative flex items-center rounded-md border p-3"
                      >
                        <RadioGroupItem
                          value={theme.value}
                          id={theme.value}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={theme.value}
                          className="flex flex-1 cursor-pointer items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                              <div
                                className={`h-6 w-6 rounded-full ${theme.styles.buttonBg}`}
                              ></div>
                              <div
                                className={`h-6 w-6 rounded-full ${theme.styles.nameBg}`}
                              ></div>
                            </div>
                            <span>{theme.label}</span>
                          </div>
                          <div
                            className={`h-4 w-4 rounded-full ${selectedTheme === theme.value ? "bg-primary" : "bg-muted"}`}
                          ></div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </TabsContent>
              </Tabs>
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
                <Link href="/app/plans">Ver Planos</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
