/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
  PlusCircle,
  Trash2,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  Github,
  Loader2,
  PaperclipIcon,
  X,
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
import { updateLinkById } from "../../new/actions";
import { useToast } from "@/app/_components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { uploadImage } from "@/services/supabase/actions";
import Loading from "../loading";
import { FaWhatsapp } from "react-icons/fa";

interface SocialLink {
  id: number;
  platform: string;
  title: string;
  url: string;
}

interface EditLinkFormProps {
  id: string;
  initialData: {
    title?: string;
    slug?: string;
    description?: string;
    socialLinksJson: { title: string; url: string }[];
    image?: string;
  };
}

const platformIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  facebook: <Facebook className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  github: <Github className="h-5 w-5" />,
  whatsapp: <FaWhatsapp className="h-5 w-5" />,
  portfolio: <PaperclipIcon className="h-5 w-5" />,
  other: <PaperclipIcon className="h-5 w-5" />,
};

const availablePlatforms = [
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "whatsapp", label: "Whatsapp" },
  { value: "portfolio", label: "Portfólio" },
  { value: "other", label: "Outro Link" },
];

export function EditLinkForm({ id, initialData }: EditLinkFormProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();

  // Inicializa os dados do formulário e links sociais
  const [linkData, setLinkData] = useState({
    title: initialData.title || "",
    slug: initialData.slug || "",
    description: initialData.description || "",
    image: initialData.image || "",
  });
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    initialData.socialLinksJson.map((link, index) => ({
      id: index + 1,
      platform:
        availablePlatforms.find((p) => link.url.includes(p.value))?.value ||
        "other",
      title: link.title,
      url: link.url,
    })) || [{ id: 1, platform: "instagram", title: "Instagram", url: "" }],
  );
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Verifica autenticação
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
    return null;
  }

  const userId = session?.user?.id;

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (validateData()) {
      setIsLoading(true);
      try {
        let imagePath = linkData.image;
        if (imageFile && userId) {
          const uploadedImagePath = await uploadImage(imageFile, userId);
          if (!uploadedImagePath)
            throw new Error("Falha ao fazer upload da imagem");
          imagePath = uploadedImagePath;
        }

        const socialLinksArray = socialLinks.map((link) => ({
          title: link.title,
          url: link.url,
        }));

        await updateLinkById(id, {
          title: linkData.title,
          slug: linkData.slug,
          description: linkData.description,
          socialLinksJson: socialLinksArray,
          image: imagePath,
        });

        toast({
          title: "Sucesso!",
          description: "Seu Link na Bio foi atualizado com sucesso.",
          action: <Check className="size-4 text-emerald-500" />,
        });

        router.push("/app/links");
      } catch (error) {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao atualizar seus dados.",
          variant: "destructive",
          action: <X className="size-4 text-red-500" />,
        });
        console.error("Erro ao atualizar:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateLinkData = (
    field: "title" | "description" | "slug" | "image",
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

  const addSocialLink = () => {
    setSocialLinks([
      ...socialLinks,
      { id: Date.now(), platform: "other", title: "Outro Link", url: "" },
    ]);
  };

  const removeSocialLink = (id: number) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id));
  };

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
    <div>
      <div className="py-6">
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
                  <Label htmlFor="image">Imagem do Link (opcional)</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imageFile ? (
                    <p className="text-muted-foreground text-sm">
                      Imagem selecionada: {imageFile.name}
                    </p>
                  ) : linkData.image ? (
                    <p className="text-muted-foreground text-sm">
                      Imagem atual: {linkData.image}
                    </p>
                  ) : null}
                </div>

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
                {socialLinks.map((link) => (
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
          </div>

          {/* Preview do Link na Bio */}
          <div className="h-fit lg:sticky lg:top-6">
            <Card className="h-fit">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between space-x-2">
                  <LinkIcon className="h-6 w-6" />
                  <CardTitle>Prévia do Link na Bio</CardTitle>
                  <Button
                    onClick={handleSubmit}
                    className="flex items-center gap-2"
                    disabled={isLoading || !userId}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        Salvar Alterações
                        <Check className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <CardDescription>
                  Veja como seu Link na Bio ficará para seus visitantes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`mx-auto max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white text-black shadow-md`}
                >
                  <div className="px-6 py-8 text-center">
                    {imageFile ? (
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Prévia da imagem"
                        className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                      />
                    ) : linkData.image ? (
                      <img
                        src={linkData.image}
                        alt="Imagem do link"
                        className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`bg-primary mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full text-white`}
                      >
                        {linkData.title.charAt(0).toUpperCase() || "S"}
                      </div>
                    )}
                    <h2 className={`mb-2 text-xl font-bold text-black`}>
                      {linkData.title || "Seu Nome ou Marca"}
                    </h2>
                    <p className={`text-muted-foreground mb-6`}>
                      {linkData.description || "Sua descrição aparecerá aqui"}
                    </p>
                    <div className="mt-6 space-y-3">
                      {socialLinks.length > 0 ? (
                        socialLinks.map((link) => (
                          <div
                            key={link.id}
                            className={`bg-primary flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-3 text-white transition-colors`}
                          >
                            <span className="flex items-center gap-2">
                              {platformIcons[link.platform]}
                              <span className="font-medium">{link.title}</span>
                            </span>
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
      </div>
    </div>
  );
}
