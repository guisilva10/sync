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
  Eye,
  ArrowLeft,
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

const platformIcons: Record<string, { icon: React.ReactNode }> = {
  instagram: {
    icon: <Instagram className="h-5 w-5" />,
  },
  twitter: {
    icon: <Twitter className="h-5 w-5" />,
  },
  youtube: {
    icon: <Youtube className="h-5 w-5" />,
  },
  facebook: {
    icon: <Facebook className="h-5 w-5" />,
  },
  linkedin: {
    icon: <Linkedin className="h-5 w-5" />,
  },
  github: {
    icon: <Github className="h-5 w-5" />,
  },
  other: {
    icon: <Globe className="h-5 w-5" />,
  },
};

const detectPlatform = (url: string): string => {
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("twitter.com") || url.includes("x.com")) return "twitter";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("facebook.com")) return "facebook";
  if (url.includes("linkedin.com")) return "linkedin";
  if (url.includes("github.com")) return "github";
  return "other";
};

const generateTitle = (platform: string): string => {
  switch (platform) {
    case "instagram":
      return "Instagram";
    case "twitter":
      return "Twitter";
    case "youtube":
      return "YouTube";
    case "facebook":
      return "Facebook";
    case "linkedin":
      return "LinkedIn";
    case "github":
      return "GitHub";
    default:
      return "Link";
  }
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
          <p className="text-muted-foreground mt-2">
            Este link não existe ou foi removido
          </p>
          <Button asChild className="mt-6">
            <Link href="/app/links">Voltar para Links</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const socialLinks = data.socialLinksJson || [];

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>
          Visualizando Link: {data.slug}
        </DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain className="py-12">
        <Card className="bg-background/90 border-primary/10 mx-auto w-full shadow-xl backdrop-blur-lg transition-all hover:shadow-2xl lg:max-w-md">
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
                        <ArrowLeft className="h-4 w-4" />
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
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="rounded-full"
                    >
                      <Link href={`/${data.slug}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Visualizar</span>
                      </Link>
                    </Button>
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
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[oklch(0.51_0.2_17)] to-[oklch(0.646_0.222_41.116)] opacity-70 blur"></div>
                <Avatar className="border-primary/20 relative h-32 w-32 border shadow-sm">
                  <AvatarImage
                    src={data.user.image as string}
                    alt={data.user.name as string}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-[oklch(0.51_0.2_17)] text-3xl text-white">
                    {data.user.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="mb-10 text-center">
              <div className="bg-primary/20 inline-block rounded-full px-4 py-1 text-sm font-medium text-[oklch(0.51_0.2_17)]">
                @{data.user.name}
              </div>
            </div>
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold tracking-tight">
                {data.title}
              </h1>
              {data.description && (
                <p className="text-muted-foreground mx-auto max-w-xs">
                  {data.description}
                </p>
              )}
            </div>

            <div className="space-y-3">
              {socialLinks.length > 0 ? (
                socialLinks.map((url: string, index: number) => {
                  const platform = detectPlatform(url);
                  const { icon } =
                    platformIcons[platform] || platformIcons.other;
                  const title = generateTitle(platform);

                  return (
                    <div key={index} className="group relative">
                      <Button
                        variant="bio"
                        className={`h-12 w-full rounded-xl text-white shadow-md transition-all duration-300`}
                      >
                        <Link
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 py-6"
                        >
                          <span className="flex items-center justify-center">
                            {icon}
                          </span>
                          <span className="font-medium">{title}</span>
                        </Link>
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div className="bg-muted/50 flex flex-col items-center justify-center rounded-xl px-4 py-12 text-center">
                  <Globe className="mb-4 h-12 w-12 opacity-40" />
                  <p className="text-muted-foreground font-medium">
                    Nenhum link social disponível
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Adicione links através do seu painel de controle
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-6 pb-8">
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-1">
                <span className="text-xs font-medium text-[oklch(0.556_0_0)]">
                  Feito com
                </span>
                <span className="text-[oklch(0.577_0.245_27.325)]">♥</span>
                <span className="font-semibold text-[oklch(0.51_0.2_17)]">
                  SYNC
                </span>
              </div>
              <p className="text-xs text-[oklch(0.556_0_0)]">
                © {new Date().getFullYear()} • Todos os direitos reservados
              </p>
            </div>
          </CardFooter>
        </Card>
      </DashboardPageMain>
    </DashboardPage>
  );
}
