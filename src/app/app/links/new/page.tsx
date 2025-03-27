"use client";

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/app/_components/page-dashboard";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Progress } from "@/app/_components/ui/progress";

import { Textarea } from "@/app/_components/ui/textarea";
import {
  Info,
  PlusCircle,
  Trash2,
  Link as LinkIcon,
  Edit2,
  Check,
} from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
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

export default function LinkInBioPage() {
  // State management for multi-step form
  const [currentStep, setCurrentStep] = useState(1);
  const [mainLink, setMainLink] = useState({
    title: "",
    description: "",
  });
  const [sublinks, setSublinks] = useState([
    { id: 1, title: "", description: "", url: "" },
  ]);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  // Validation function
  const validateStep = () => {
    const errors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!mainLink.title.trim()) {
        errors.title = "Título é obrigatório";
      }
    }

    if (currentStep === 2) {
      sublinks.forEach((link, index) => {
        if (!link.title.trim()) {
          errors[`sublink-title-${link.id}`] =
            `Título do link ${index + 1} é obrigatório`;
        }
        if (!link.url.trim()) {
          errors[`sublink-url-${link.id}`] =
            `URL do link ${index + 1} é obrigatória`;
        }
      });
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Navigation between steps
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(Math.min(currentStep + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  // Sublink management functions
  const addSublink = () => {
    setSublinks([
      ...sublinks,
      { id: Date.now(), title: "", description: "", url: "" },
    ]);
  };

  const removeSublink = (id: number) => {
    if (sublinks.length > 1) {
      setSublinks(sublinks.filter((link) => link.id !== id));
    }
  };

  // Update functions
  const updateMainLink = (field: "title" | "description", value: string) => {
    setMainLink((prev) => ({ ...prev, [field]: value }));
  };

  const updateSublink = (
    id: number,
    field: keyof (typeof sublinks)[0],
    value: string,
  ) => {
    setSublinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
    );
  };

  // Render step-specific content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="main-title">
                Título Principal
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="text-muted-foreground ml-2 h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Seu nome, marca ou identidade principal
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="main-title"
                placeholder="Seu nome ou marca"
                value={mainLink.title}
                onChange={(e) => updateMainLink("title", e.target.value)}
                className={validationErrors.title ? "border-destructive" : ""}
              />
              {validationErrors.title && (
                <p className="text-destructive text-xs">
                  {validationErrors.title}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="main-description">Descrição (opcional)</Label>
              <Textarea
                id="main-description"
                placeholder="Uma breve bio ou descrição"
                className="min-h-[80px]"
                value={mainLink.description}
                onChange={(e) => updateMainLink("description", e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Adicione seus Links</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSublink}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                Adicionar Link
              </Button>
            </div>

            {sublinks.map((link, index) => (
              <Card key={link.id} className="border-muted border">
                <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
                  <CardTitle className="text-base">Link {index + 1}</CardTitle>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled={sublinks.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remover link</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remover Link</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja remover este link? Esta ação
                          não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => removeSublink(link.id)}
                        >
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardHeader>
                <CardContent className="space-y-3 p-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor={`sublink-title-${link.id}`}>Título</Label>
                    <Input
                      id={`sublink-title-${link.id}`}
                      placeholder="Instagram, YouTube, etc."
                      value={link.title}
                      onChange={(e) =>
                        updateSublink(link.id, "title", e.target.value)
                      }
                      className={
                        validationErrors[`sublink-title-${link.id}`]
                          ? "border-destructive"
                          : ""
                      }
                    />
                    {validationErrors[`sublink-title-${link.id}`] && (
                      <p className="text-destructive text-xs">
                        {validationErrors[`sublink-title-${link.id}`]}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`sublink-description-${link.id}`}>
                      Descrição (opcional)
                    </Label>
                    <Input
                      id={`sublink-description-${link.id}`}
                      placeholder="Siga-me no Instagram"
                      value={link.description}
                      onChange={(e) =>
                        updateSublink(link.id, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`sublink-url-${link.id}`}>URL</Label>
                    <Input
                      id={`sublink-url-${link.id}`}
                      placeholder="https://instagram.com/seunome"
                      type="url"
                      value={link.url}
                      onChange={(e) =>
                        updateSublink(link.id, "url", e.target.value)
                      }
                      className={
                        validationErrors[`sublink-url-${link.id}`]
                          ? "border-destructive"
                          : ""
                      }
                    />
                    {validationErrors[`sublink-url-${link.id}`] && (
                      <p className="text-destructive text-xs">
                        {validationErrors[`sublink-url-${link.id}`]}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 text-center">
            <div className="mb-4 flex justify-center">
              <Check className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">Quase Pronto!</h2>
            <p className="text-muted-foreground">
              Revise suas informações antes de salvar:
            </p>
            <Card className="text-left">
              <CardContent className="space-y-2 p-4">
                <div>
                  <p className="font-semibold">Título Principal</p>
                  <p>{mainLink.title}</p>
                </div>
                {mainLink.description && (
                  <div>
                    <p className="font-semibold">Descrição</p>
                    <p>{mainLink.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-4 p-4">
                <h3 className="text-lg font-semibold">Seus Links</h3>
                {sublinks.map((link, index) => (
                  <div key={link.id} className="border-b pb-2 last:border-b-0">
                    <p className="font-medium">Link {index + 1}</p>
                    <p>{link.title}</p>
                    <p className="text-muted-foreground text-sm">{link.url}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>
          Crie seu Link na Bio
        </DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain className="py-6">
        <Card className="mx-auto w-full lg:max-w-screen-md">
          <CardHeader>
            <div className="mb-2 flex items-center space-x-2">
              <LinkIcon className="h-6 w-6" />
              <CardTitle>Configuração de Link na Bio</CardTitle>
            </div>
            <CardDescription>
              Crie seu link principal e adicione links para suas redes sociais
              em 3 passos simples.
            </CardDescription>
            <Progress value={(currentStep - 1) * 50} className="mt-2" />
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Voltar
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                className="ml-auto flex items-center gap-2"
              >
                Próximo Passo
                <PlusCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button className="ml-auto flex items-center gap-2">
                Salvar Link na Bio
                <Check className="h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </DashboardPageMain>
    </DashboardPage>
  );
}
