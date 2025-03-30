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
import { getLinkBySlug } from "../app/links/new/actions"; // Ajuste o caminho

const platformStyles: Record<string, { icon: ReactNode }> = {
  instagram: { icon: <Instagram className="h-5 w-5 text-white" /> },
  twitter: { icon: <Twitter className="h-5 w-5 text-white" /> },
  youtube: { icon: <Youtube className="h-5 w-5 text-white" /> },
  facebook: { icon: <Facebook className="h-5 w-5 text-white" /> },
  linkedin: { icon: <Linkedin className="h-5 w-5 text-white" /> },
  github: { icon: <Github className="h-5 w-5 text-white" /> },
  other: { icon: <Globe className="h-5 w-5 text-white" /> },
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
              <p className="text-[oklch(0.556_0_0)]">
                Nenhum link encontrado para o slug {slug}...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const socialLinks = linkData.socialLinksJson ?? [];

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full lg:max-w-md">
        <Card className="border-none bg-transparent shadow-xl">
          <CardContent className="pt-12">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[oklch(0.51_0.2_17)] to-[oklch(0.646_0.222_41.116)] opacity-70 blur"></div>
                <Avatar className="border-primary/20 relative h-32 w-32 border shadow-sm">
                  <AvatarImage
                    src={linkData.user.image as string}
                    alt={linkData.user.name as string}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-[oklch(0.51_0.2_17)] text-3xl text-white">
                    {linkData.user.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="mb-10 text-center">
              <div className="bg-primary/20 inline-block rounded-full px-4 py-1 text-sm font-medium text-[oklch(0.51_0.2_17)]">
                @{linkData.user.name}
              </div>
            </div>

            <div className="">
              <div className="mb-4 flex flex-col text-center">
                <h1 className="mb-0 text-2xl font-bold">{linkData.title}</h1>
                {linkData.description && (
                  <p className="mx-auto max-w-xs text-[oklch(0.556_0_0)]">
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
                          className="flex h-12 w-full items-center rounded-full border"
                          variant="bio"
                        >
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-x-3"
                          >
                            <div className="text-primary">{icon}</div>
                            <span>{title}</span>
                          </Link>
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-[oklch(0.556_0_0)]">
                    Nenhum link social disponível para &quot;{linkData.title}
                    &quot;
                  </div>
                )}
              </div>
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
      </div>
    </div>
  );
}
