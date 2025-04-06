/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/app/_components/ui/card";
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  Github,
  Globe,
  ArrowLeft,
  PaperclipIcon,
} from "lucide-react";
import Link from "next/link";
import { getLinkById } from "../new/actions";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/app/_components/page-dashboard";
import { supabase } from "@/services/supabase/index";
import { VisualizeButton } from "../(main)/_components/visualize-button";
import { themes } from "@/app/_components/theme/constants";
import { FaWhatsapp } from "react-icons/fa";

const platformIcons: Record<string, { icon: React.ReactNode }> = {
  instagram: { icon: <Instagram className="h-5 w-5" /> },
  twitter: { icon: <Twitter className="h-5 w-5" /> },
  youtube: { icon: <Youtube className="h-5 w-5" /> },
  facebook: { icon: <Facebook className="h-5 w-5" /> },
  linkedin: { icon: <Linkedin className="h-5 w-5" /> },
  github: { icon: <Github className="h-5 w-5" /> },
  whatsapp: { icon: <FaWhatsapp className="h-5 w-5" /> },
  portfolio: { icon: <PaperclipIcon className="h-5 w-5" /> },
  other: { icon: <Globe className="h-5 w-5" /> },
};

const detectPlatform = (url: string): string => {
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("twitter.com") || url.includes("x.com")) return "twitter";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("facebook.com")) return "facebook";
  if (url.includes("linkedin.com")) return "linkedin";
  if (url.includes("github.com")) return "github";
  if (url.includes("whatsapp.com")) return "whatsapp";
  if (url.includes("")) return "portfolio"; // Assuming 'portfolio' is a keyword in the URL for portfolio links
  return "other";
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getLinkById(id);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md p-8 text-center">
          <h2 className="text-xl font-semibold">Link não encontrado</h2>
          <p className="mt-2 text-gray-600">
            Este link não existe ou foi removido
          </p>
          <Button asChild className="mt-6">
            <Link href="/app/links">Voltar para Links</Link>
          </Button>
        </Card>
      </div>
    );
  }

  // Ajuste para lidar com socialLinksJson como array de objetos
  const socialLinks: { title: string; url: string }[] = Array.isArray(
    data.socialLinksJson,
  )
    ? data.socialLinksJson.filter(Boolean).map((link: any) => ({
        title: link.title,
        url: link.url,
      }))
    : [];

  const themeStyles =
    themes.light.find((t) => t.value === data.theme) ||
    themes.dark.find((t) => t.value === data.theme) ||
    themes.light[0];

  // Obtém a URL pública da imagem do Supabase, se existir
  const imageUrl = data.image
    ? supabase.storage.from("images").getPublicUrl(data.image).data.publicUrl
    : null;

  // Sanitiza o nome do usuário para ser usado como slug
  const usernameSlug = data.user.name?.toLowerCase().replace(/\s+/g, "-") || "";

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle className={themeStyles.styles.text}>
          Visualizando Link: {data.slug}
        </DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain className="py-12">
        <Card
          className={`bg-background/90 mx-auto w-full shadow-xl backdrop-blur-lg transition-all hover:shadow-2xl lg:max-w-md ${themeStyles.styles.background} ${themeStyles.styles.text}`}
        >
          <CardHeader className="relative pt-16 pb-0">
            <div className="absolute top-4 left-4 z-10">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="rounded-full"
                    >
                      <Link href="/app/links">
                        <ArrowLeft
                          className={`h-4 w-4 ${themeStyles.styles.text}`}
                        />
                        <span className="sr-only">Voltar</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voltar ao painel</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <VisualizeButton
                      linkId={id}
                      userId={data.userId}
                      usernameSlug={usernameSlug}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visualizar página</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>

          <CardContent className="px-6 pt-0 pb-6">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div
                  className={`absolute -inset-1 rounded-full bg-gradient-to-r ${themeStyles.styles.avatarBg} opacity-70 blur`}
                ></div>
                <Avatar className="border-primary/20 relative h-32 w-32 border shadow-sm">
                  {imageUrl ? (
                    <AvatarImage
                      src={imageUrl}
                      alt={data.title || "Imagem do link"}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <>
                      <AvatarImage
                        src={data.user.image as string}
                        alt={data.user.name as string}
                        className="object-cover"
                      />
                      <AvatarFallback
                        className={`${themeStyles.styles.avatarBg} text-3xl ${themeStyles.styles.buttonText}`}
                      >
                        {data.user.name?.charAt(0).toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
              </div>
            </div>
            <div className="mb-10 text-center">
              <div
                className={`${themeStyles.styles.nameBg} inline-block ${themeStyles.styles.nameText} rounded-full px-4 py-1 text-sm font-medium`}
              >
                @{data.user.name}
              </div>
            </div>
            <div className="mb-8 text-center">
              <h1
                className={`mb-2 text-2xl font-bold tracking-tight ${themeStyles.styles.text}`}
              >
                {data.title}
              </h1>
              {data.description && (
                <p
                  className={`mx-auto max-w-xs ${themeStyles.styles.mutedText}`}
                >
                  {data.description}
                </p>
              )}
            </div>

            <div className="space-y-3">
              {socialLinks.length > 0 ? (
                socialLinks.map((link, index) => {
                  const platform = detectPlatform(link.url); // Função suposta para detectar a plataforma
                  const { icon } =
                    platformIcons[platform] || platformIcons.other;
                  const clickCount =
                    data.linkClicks.find((click) => click.url === link.url)
                      ?.clicks || 0;

                  return (
                    <div key={index} className="group relative">
                      <p
                        className={`text-xs ${themeStyles.styles.mutedText} mb-1 text-end`}
                      >
                        Cliques: {clickCount}
                      </p>
                      <Button
                        variant="bio"
                        className={`h-12 w-full rounded-xl shadow-md transition-all duration-300 ${themeStyles.styles.buttonBg} ${themeStyles.styles.buttonText}`}
                      >
                        <Link
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 py-6"
                        >
                          <span className="flex items-center justify-center">
                            {icon}
                          </span>
                          <span className="font-medium">{link.title}</span>
                        </Link>
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div
                  className={`flex flex-col items-center justify-center rounded-xl px-4 py-12 text-center ${themeStyles.styles.mutedText}`}
                >
                  <Globe
                    className={`mb-4 h-12 w-12 ${themeStyles.styles.mutedText}`}
                  />
                  <p className="font-medium">Nenhum link social disponível</p>
                  <p className="mt-2 text-sm">
                    Adicione links através do seu painel de controle
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter
            className={`flex justify-center pt-6 pb-8 ${themeStyles.styles.mutedText}`}
          >
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-1">
                <span className="text-xs font-medium">Feito com</span>
                <span className={`font-semibold ${themeStyles.styles.text}`}>
                  ♥
                </span>
                <span className={`font-semibold ${themeStyles.styles.text}`}>
                  SYNC
                </span>
              </div>
              <p className="text-xs">
                © {new Date().getFullYear()} • Todos os direitos reservados
              </p>
            </div>
          </CardFooter>
        </Card>
      </DashboardPageMain>
    </DashboardPage>
  );
}
