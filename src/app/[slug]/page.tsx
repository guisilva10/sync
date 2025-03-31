import type { ReactNode } from "react";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  Github,
  Globe,
} from "lucide-react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { getLinkBySlug } from "../app/links/new/actions";

// Definição dos temas
const themes = {
  light: {
    background: "bg-white",
    text: "text-black",
    mutedText: "text-muted-foreground",
    buttonBg: "bg-primary",
    nameBg: "bg-primary/20",
    nameText: "text-primary",
    buttonText: "text-white",
    avatarBg: "bg-primary",
  },
  dark: {
    background: "bg-zinc-950",
    text: "text-white",
    mutedText: "text-muted-foreground",
    buttonBg: "bg-primary",
    nameBg: "bg-primary/20",
    nameText: "text-primary",
    buttonText: "text-white",
    avatarBg: "bg-primary",
  },
  blue: {
    background: "bg-zinc-950",
    text: "text-white",
    mutedText: "text-muted-foreground",
    nameBg: "bg-blue-700/20",
    nameText: "text-blue-500",
    buttonBg: "bg-blue-700",
    buttonText: "text-white",
    avatarBg: "bg-blue-600",
  },
  green: {
    background: "bg-zync-950",
    text: "text-white",
    mutedText: "text-muted-foreground",
    nameBg: "bg-green-700/20",
    nameText: "text-green-500",
    buttonBg: "bg-green-700",
    buttonText: "text-white",
    avatarBg: "bg-green-600",
  },
};
const platformStyles: Record<string, { icon: ReactNode }> = {
  instagram: { icon: <Instagram className="h-5 w-5" /> },
  twitter: { icon: <Twitter className="h-5 w-5" /> },
  youtube: { icon: <Youtube className="h-5 w-5" /> },
  facebook: { icon: <Facebook className="h-5 w-5" /> },
  linkedin: { icon: <Linkedin className="h-5 w-5" /> },
  github: { icon: <Github className="h-5 w-5" /> },
  other: { icon: <Globe className="h-5 w-5" /> },
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("Slug recebido:", slug);

  const linkData = await getLinkBySlug(slug);

  if (!linkData || !linkData.user) {
    return (
      <div className="bg-background flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full lg:max-w-md">
          <Card className="border-none bg-transparent shadow-xl">
            <CardContent className="pt-12 text-center">
              <p className="text-gray-600">
                Nenhum link encontrado para o slug {slug}...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const socialLinks = linkData.socialLinksJson ?? [];
  const theme = linkData.theme ?? "light";
  const themeStyles = themes[theme as keyof typeof themes];

  return (
    <div
      className={`${themeStyles.background} flex min-h-screen w-full items-center justify-center p-4`}
    >
      <div className="w-full lg:max-w-md">
        <Card
          className={`border-none ${themeStyles.background} ${themeStyles.text}`}
        >
          <CardContent className="pt-12">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <Avatar className="border-primary/20 relative h-32 w-32 border shadow-sm">
                  <AvatarImage
                    src={linkData.user.image as string}
                    alt={linkData.user.name as string}
                    className="object-cover"
                  />
                  <AvatarFallback
                    className={`${themeStyles.avatarBg} text-3xl ${themeStyles.buttonText}`}
                  >
                    {linkData.user.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="mb-10 text-center">
              <div
                className={`${themeStyles.nameBg} inline-block ${themeStyles.nameText} rounded-full px-4 py-1 text-sm font-medium ${themeStyles.buttonBg.replace(
                  "bg-",
                  "text-",
                )}`}
              >
                @{linkData.user.name}
              </div>
            </div>

            <div className="">
              <div className="mb-4 flex flex-col text-center">
                <h1 className={`mb-0 text-2xl font-bold ${themeStyles.text}`}>
                  {linkData.title}
                </h1>
                {linkData.description && (
                  <p className={`mx-auto max-w-xs ${themeStyles.mutedText}`}>
                    {linkData.description}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {socialLinks.length > 0 ? (
                  socialLinks.map((url: string, urlIndex: number) => {
                    const platform = detectPlatform(url);
                    const { icon } =
                      platformStyles[platform] || platformStyles.other;
                    const title = generateTitle(platform);

                    return (
                      <div key={urlIndex} className="group">
                        <Button
                          className={`flex h-12 w-full items-center rounded-full border ${themeStyles.buttonBg} ${themeStyles.buttonText}`}
                          variant="bio"
                        >
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-x-3"
                          >
                            <div>{icon}</div>
                            <span>{title}</span>
                          </Link>
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <div className={`text-center ${themeStyles.mutedText}`}>
                    Nenhum link social disponível para $quot;{linkData.title}
                    $quot;
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter
            className={`flex justify-center pt-6 pb-8 ${themeStyles.mutedText}`}
          >
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-1">
                <span className="text-xs font-medium">Feito com</span>
                <span className={`font-semibold ${themeStyles.nameText}`}>
                  ♥
                </span>
                <span className={`font-semibold ${themeStyles.nameText}`}>
                  SYNC
                </span>
              </div>
              <p className="text-xs">
                © {new Date().getFullYear()} • Todos os direitos reservados
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
