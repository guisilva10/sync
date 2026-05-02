/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import {
  Check,
  ImageIcon,
  LayoutGrid,
  LayoutList,
  Loader2,
  Trash2,
  X,
} from "lucide-react";
import { useToast } from "@/app/_components/ui/use-toast";
import { uploadImage } from "@/features/storage/application/use-cases/upload-image";
import { updateLinkCustomization } from "@/features/links/presentation/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { themes } from "@/app/_components/theme/constants";

interface LinkForForm {
  id: string;
  title: string;
  slug: string;
  headerImage: string | null;
  layout: "default" | "grid";
  image: string | null;
  description: string | null;
  theme: string;
  socialLinksJson: { title: string; url: string }[];
}

interface CustomizeFormProps {
  links: LinkForForm[];
}

const getFullImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imagePath}`;
};

export function CustomizeForm({ links }: CustomizeFormProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const [selectedLinkId, setSelectedLinkId] = useState(links[0]?.id ?? "");
  const [headerImageFile, setHeaderImageFile] = useState<File | null>(null);
  const [headerImagePreview, setHeaderImagePreview] = useState<string | null>(
    null,
  );
  const [layout, setLayout] = useState<"default" | "grid">("default");
  const [removeHeaderImage, setRemoveHeaderImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedLink = links.find((l) => l.id === selectedLinkId);

  const handleLinkChange = (linkId: string) => {
    setSelectedLinkId(linkId);
    const link = links.find((l) => l.id === linkId);
    if (link) {
      setLayout(link.layout);
      setHeaderImageFile(null);
      setRemoveHeaderImage(false);
      setHeaderImagePreview(
        link.headerImage ? getFullImageUrl(link.headerImage) : null,
      );
    }
  };

  // Initialize on first render
  useState(() => {
    if (selectedLink) {
      setLayout(selectedLink.layout);
      if (selectedLink.headerImage) {
        setHeaderImagePreview(getFullImageUrl(selectedLink.headerImage));
      }
    }
  });

  const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setHeaderImageFile(file);
      setRemoveHeaderImage(false);
      setHeaderImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveHeaderImage = () => {
    setHeaderImageFile(null);
    setHeaderImagePreview(null);
    setRemoveHeaderImage(true);
  };

  const handleSubmit = async () => {
    if (!selectedLink) return;
    setIsLoading(true);

    try {
      let headerImagePath: string | null | undefined = undefined;

      if (removeHeaderImage) {
        headerImagePath = null;
      } else if (headerImageFile && session?.user?.id) {
        headerImagePath = await uploadImage(headerImageFile, session.user.id);
      }

      await updateLinkCustomization(selectedLink.id, {
        headerImage: headerImagePath,
        layout,
      });

      toast({
        title: "Sucesso!",
        description: "Personalização salva com sucesso.",
        action: <Check className="size-4 text-emerald-500" />,
      });

      router.refresh();
    } catch {
      toast({
        title: "Erro",
        description: "Falha ao salvar personalização.",
        variant: "destructive",
        action: <X className="size-4 text-red-500" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentTheme =
    themes.light.find((t) => t.value === selectedLink?.theme) ||
    themes.dark.find((t) => t.value === selectedLink?.theme) ||
    themes.light[0];

  const avatarUrl = selectedLink?.image
    ? getFullImageUrl(selectedLink.image)
    : null;

  return (
    <div className="mx-auto grid w-full gap-6 lg:max-w-screen-xl lg:grid-cols-2">
      {/* Configuracoes */}
      <div className="space-y-6">
        {/* Seletor de link */}
        {links.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Escolher Link</CardTitle>
              <CardDescription>
                Selecione qual link deseja personalizar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <select
                value={selectedLinkId}
                onChange={(e) => handleLinkChange(e.target.value)}
                className="border-input bg-background ring-offset-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
              >
                {links.map((link) => (
                  <option key={link.id} value={link.id}>
                    {link.title} ({link.slug})
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>
        )}

        {/* Header Background */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ImageIcon className="size-5" />
              <CardTitle className="text-base">
                Imagem de Fundo do Header
              </CardTitle>
            </div>
            <CardDescription>
              Adicione uma imagem de fundo na área do avatar e nome
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="header-image">Imagem</Label>
              <Input
                id="header-image"
                type="file"
                accept="image/*"
                onChange={handleHeaderImageChange}
              />
            </div>
            {headerImagePreview && (
              <div className="space-y-2">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={headerImagePreview}
                    alt="Preview header"
                    className="h-32 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveHeaderImage}
                  className="text-destructive gap-1"
                >
                  <Trash2 className="size-3" />
                  Remover imagem
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Layout */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LayoutGrid className="size-5" />
              <CardTitle className="text-base">Layout dos Links</CardTitle>
            </div>
            <CardDescription>
              Escolha como seus links serão exibidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={layout}
              onValueChange={(v) => setLayout(v as "default" | "grid")}
              className="grid grid-cols-2 gap-4"
            >
              <Label
                htmlFor="layout-default"
                className={`flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                  layout === "default"
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/30"
                }`}
              >
                <RadioGroupItem
                  value="default"
                  id="layout-default"
                  className="sr-only"
                />
                <LayoutList className="text-muted-foreground size-8" />
                <div className="text-center">
                  <p className="font-medium">Lista</p>
                  <p className="text-muted-foreground text-xs">
                    Links em coluna vertical
                  </p>
                </div>
                {/* Mini preview */}
                <div className="flex w-full flex-col gap-1.5">
                  <div className="bg-muted h-3 w-full rounded-full" />
                  <div className="bg-muted h-3 w-full rounded-full" />
                  <div className="bg-muted h-3 w-full rounded-full" />
                </div>
              </Label>

              <Label
                htmlFor="layout-grid"
                className={`flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                  layout === "grid"
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/30"
                }`}
              >
                <RadioGroupItem
                  value="grid"
                  id="layout-grid"
                  className="sr-only"
                />
                <LayoutGrid className="text-muted-foreground size-8" />
                <div className="text-center">
                  <p className="font-medium">Grid</p>
                  <p className="text-muted-foreground text-xs">
                    Cards lado a lado
                  </p>
                </div>
                {/* Mini preview */}
                <div className="grid w-full grid-cols-2 gap-1.5">
                  <div className="bg-muted h-6 rounded" />
                  <div className="bg-muted h-6 rounded" />
                  <div className="bg-muted h-6 rounded" />
                  <div className="bg-muted h-6 rounded" />
                </div>
              </Label>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full gap-2"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Check className="size-4" />
              Salvar Personalização
            </>
          )}
        </Button>
      </div>

      {/* Preview */}
      <div className="h-fit lg:sticky lg:top-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preview</CardTitle>
            <CardDescription>
              Veja como seu link ficará para os visitantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`mx-auto max-w-sm overflow-hidden rounded-2xl border shadow-lg ${currentTheme.styles.background} ${currentTheme.styles.text}`}
            >
              {/* Header com bg image */}
              <div className="relative">
                {headerImagePreview ? (
                  <div className="relative h-36">
                    <img
                      src={headerImagePreview}
                      alt="Header background"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
                  </div>
                ) : (
                  <div
                    className={`h-24 ${currentTheme.styles.avatarBg} opacity-20`}
                  />
                )}

                {/* Avatar overlapping */}
                <div
                  className={`flex flex-col items-center ${headerImagePreview ? "-mt-12" : "-mt-8"} relative z-10 px-6 pb-4`}
                >
                  <div
                    className={`h-20 w-20 overflow-hidden rounded-full border-4 ${currentTheme.styles.background} shadow-md`}
                    style={{ borderColor: "inherit" }}
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className={`flex h-full w-full items-center justify-center ${currentTheme.styles.avatarBg} ${currentTheme.styles.buttonText} text-xl font-bold`}
                      >
                        {selectedLink?.title?.charAt(0).toUpperCase() ?? "S"}
                      </div>
                    )}
                  </div>
                  <h3
                    className={`mt-2 text-lg font-bold ${currentTheme.styles.text}`}
                  >
                    {selectedLink?.title}
                  </h3>
                  {selectedLink?.description && (
                    <p
                      className={`text-center text-sm ${currentTheme.styles.mutedText}`}
                    >
                      {selectedLink.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Links */}
              <div className="px-6 pb-6">
                {layout === "grid" ? (
                  <div className="grid grid-cols-2 gap-2">
                    {(selectedLink?.socialLinksJson ?? []).map((link, i) => (
                      <div
                        key={i}
                        className={`flex flex-col items-center justify-center gap-1 rounded-xl p-3 text-center ${currentTheme.styles.buttonBg} ${currentTheme.styles.buttonText}`}
                      >
                        <span className="text-xs font-medium">
                          {link.title}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {(selectedLink?.socialLinksJson ?? []).map((link, i) => (
                      <div
                        key={i}
                        className={`flex h-10 items-center justify-center rounded-full text-sm font-medium ${currentTheme.styles.buttonBg} ${currentTheme.styles.buttonText}`}
                      >
                        {link.title}
                      </div>
                    ))}
                  </div>
                )}

                {(selectedLink?.socialLinksJson ?? []).length === 0 && (
                  <p
                    className={`text-center text-sm ${currentTheme.styles.mutedText}`}
                  >
                    Nenhum link social
                  </p>
                )}
              </div>

              {/* Footer */}
              <div
                className={`border-t px-6 py-3 text-center text-xs ${currentTheme.styles.mutedText}`}
              >
                Feito com ♥ SYNC
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
