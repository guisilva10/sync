/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Info,
  Link as LinkIcon,
  Check,
  ExternalLink,
  PlusCircle,
  Trash2,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  Github,
  Globe,
  Loader2,
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
import { saveLink, type LinkFormData } from "./actions";
import { useToast } from "@/app/_components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Tipo para os links sociais
type SocialLink = {
  id: number;
  platform: string;
  title: string;
  url: string;
};

// Mapeamento de plataformas para ícones
const platformIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  facebook: <Facebook className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  github: <Github className="h-5 w-5" />,
  other: <Globe className="h-5 w-5" />,
};

// Lista de plataformas disponíveis
const availablePlatforms = [
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "other", label: "Outro Link" },
];

export default function LinkInBioPage() {
  const router = useRouter();
  const initialLinkData = {
    title: "",
    description: "",
    slug: "",
    socialLinksJson: [], // Ajustado para array vazio de strings
  };

  const initialSocialLinks = [
    { id: 1, platform: "instagram", title: "Instagram", url: "" },
  ];

  const [linkData, setLinkData] = useState(initialLinkData);
  const [socialLinks, setSocialLinks] =
    useState<SocialLink[]>(initialSocialLinks);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Toast para feedback ao usuário
  const { toast } = useToast();

  // Função de validação
  const validateData = () => {
    const errors: { [key: string]: string } = {};

    if (!linkData.title.trim()) {
      errors.title = "Título é obrigatório";
    }

    socialLinks.forEach((link) => {
      if (!link.url.trim()) {
        errors[`url-${link.id}`] = `URL é obrigatória`;
      } else if (
        !link.url.startsWith("http://") &&
        !link.url.startsWith("https://")
      ) {
        errors[`url-${link.id}`] = `URL deve começar com http:// ou https://`;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Função para salvar os dados
  const saveData = async () => {
    if (validateData()) {
      setIsLoading(true);
      try {
        // Criar array de URLs a partir dos socialLinks
        const socialLinksArray = socialLinks.map((link) => link.url);

        const formData: LinkFormData = {
          title: linkData.title,
          slug: linkData.slug,
          description: linkData.description,
          socialLinksJson: socialLinksArray, // Passando apenas as URLs como array de strings
        };

        await saveLink(formData);

        toast({
          title: "Sucesso!",
          description: "Seu Link na Bio foi salvo com sucesso.",
        });

        setLinkData(initialLinkData);
        setSocialLinks(initialSocialLinks);
        setValidationErrors({});
        router.push("/app/links");
      } catch (error) {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao salvar seus dados.",
          variant: "destructive",
        });
        console.error("Erro ao salvar:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Atualização dos campos principais
  const updateLinkData = (
    field: "title" | "description" | "slug",
    value: string,
  ) => {
    setLinkData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Adicionar novo link social
  const addSocialLink = () => {
    setSocialLinks([
      ...socialLinks,
      { id: Date.now(), platform: "other", title: "Outro Link", url: "" },
    ]);
  };

  // Remover link social
  const removeSocialLink = (id: number) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id));
  };

  // Atualizar um link social
  const updateSocialLink = (
    id: number,
    field: keyof SocialLink,
    value: string,
  ) => {
    setSocialLinks((prev) =>
      prev.map((link) => {
        if (link.id === id) {
          if (field === "platform") {
            const platform = availablePlatforms.find((p) => p.value === value);
            return {
              ...link,
              [field]: value,
              title: platform?.label || "Outro Link",
            };
          }
          return { ...link, [field]: value };
        }
        return link;
      }),
    );

    if (field === "url" && validationErrors[`url-${id}`]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`url-${id}`];
        return newErrors;
      });
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
        <div className="mx-auto grid w-full gap-6 lg:max-w-screen-xl lg:grid-cols-2">
          {/* Formulário de edição */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="mb-2 flex items-center space-x-2">
                  <LinkIcon className="h-6 w-6" />
                  <CardTitle>Informações Principais</CardTitle>
                </div>
                <CardDescription>
                  Configure suas informações principais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    value={linkData.title}
                    onChange={(e) => updateLinkData("title", e.target.value)}
                    className={
                      validationErrors.title ? "border-destructive" : ""
                    }
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
                    value={linkData.description}
                    onChange={(e) =>
                      updateLinkData("description", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="h-6 w-6" />
                    <CardTitle>Links Sociais</CardTitle>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSocialLink}
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Adicionar Link
                  </Button>
                </div>
                <CardDescription>
                  Adicione links para suas redes sociais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((link, index) => (
                  <Card key={link.id} className="border-muted border">
                    <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
                      <div className="flex items-center gap-2">
                        {platformIcons[link.platform]}
                        <CardTitle className="text-base">
                          {link.title}
                        </CardTitle>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={socialLinks.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remover link</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remover Link</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja remover este link? Esta
                              ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => removeSocialLink(link.id)}
                            >
                              Confirmar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardHeader>
                    <CardContent className="space-y-3 p-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor={`platform-${link.id}`}>
                          Plataforma
                        </Label>
                        <select
                          id={`platform-${link.id}`}
                          value={link.platform}
                          onChange={(e) =>
                            updateSocialLink(
                              link.id,
                              "platform",
                              e.target.value,
                            )
                          }
                          className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                        >
                          {availablePlatforms.map((platform) => (
                            <option key={platform.value} value={platform.value}>
                              {platform.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`title-${link.id}`}>Título</Label>
                        <Input
                          id={`title-${link.id}`}
                          value={link.title}
                          onChange={(e) =>
                            updateSocialLink(link.id, "title", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`url-${link.id}`}>URL</Label>
                        <Input
                          id={`url-${link.id}`}
                          placeholder="https://instagram.com/seunome"
                          type="url"
                          value={link.url}
                          onChange={(e) =>
                            updateSocialLink(link.id, "url", e.target.value)
                          }
                          className={
                            validationErrors[`url-${link.id}`]
                              ? "border-destructive"
                              : ""
                          }
                        />
                        {validationErrors[`url-${link.id}`] && (
                          <p className="text-destructive text-xs">
                            {validationErrors[`url-${link.id}`]}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardFooter className="flex justify-end p-4">
                <Button
                  onClick={saveData}
                  className="flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      Salvar Link na Bio
                      <Check className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Preview do Link na Bio */}
          <div className="h-fit lg:sticky lg:top-6">
            <Card className="h-fit">
              <CardHeader>
                <div className="mb-2 flex items-center space-x-2">
                  <ExternalLink className="h-6 w-6" />
                  <CardTitle>Prévia do Link na Bio</CardTitle>
                </div>
                <CardDescription>
                  Veja como seu Link na Bio ficará para seus visitantes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mx-auto max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
                  <div className="px-6 py-8 text-center">
                    {/* Avatar placeholder */}
                    <div className="bg-primary mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full text-white">
                      S
                    </div>

                    {/* Preview do título */}
                    <h2 className="mb-2 text-xl font-bold text-black">
                      {linkData.title || "Seu Nome ou Marca"}
                    </h2>

                    {/* Preview da descrição */}
                    <p className="mb-6 text-gray-600">
                      {linkData.description || "Sua descrição aparecerá aqui"}
                    </p>

                    {/* Links sociais */}
                    <div className="mt-6 space-y-3">
                      {socialLinks.length > 0 ? (
                        socialLinks.map((link) => (
                          <div
                            key={link.id}
                            className="bg-primary flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-3 transition-colors"
                          >
                            <Link href={link.url} className="mb-2">
                              <span className="flex items-center gap-2 text-white">
                                {platformIcons[link.platform]}
                                <span className="font-medium text-white">
                                  {link.title}
                                </span>
                              </span>
                            </Link>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-md bg-gray-100 px-4 py-3 text-center text-gray-400">
                          Adicione links para aparecerem aqui
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  );
}
