/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { getLinkBySlug } from "@/features/links/presentation/actions";
import { supabase } from "@/services/supabase";
import { SocialLinksClient } from "./_components/social-link-conent";
import { themes } from "../_components/theme/constants";

interface SocialLink {
  title: string;
  url: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const linkData = await getLinkBySlug(slug);

  if (!linkData) {
    return {
      title: "Link não encontrado | SYNC",
      description: "Este link não existe ou foi removido.",
    };
  }

  const title = linkData.title || slug;
  const description =
    linkData.description || `Confira os links de ${title} no SYNC`;

  const imageUrl = linkData.image
    ? supabase.storage.from("images").getPublicUrl(linkData.image).data
        .publicUrl
    : linkData.user?.image || undefined;

  return {
    title: `${title} | SYNC`,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      ...(imageUrl && { images: [{ url: imageUrl, width: 400, height: 400 }] }),
    },
    twitter: {
      card: "summary",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const linkData = await getLinkBySlug(slug);

  if (!linkData || !linkData.user) {
    return (
      <div className="bg-background flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full lg:max-w-md">
          <Card className="border-none bg-transparent shadow-xl">
            <CardContent className="pt-12 text-center">
              <p className="text-gray-600">
                Nenhum link encontrado para &quot;{slug}&quot;
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const socialLinks: SocialLink[] = Array.isArray(linkData.socialLinksJson)
    ? linkData.socialLinksJson.filter(Boolean).map((link) => {
        const item = link as Record<string, unknown>;
        return {
          title: String(item.title ?? ""),
          url: String(item.url ?? ""),
        };
      })
    : [];

  const themeStyles =
    themes.light.find((t) => t.value === linkData.theme) ||
    themes.dark.find((t) => t.value === linkData.theme) ||
    themes.light[0];

  const imageUrl = linkData.image
    ? supabase.storage.from("images").getPublicUrl(linkData.image).data
        .publicUrl
    : null;

  const headerImageUrl = linkData.headerImage
    ? supabase.storage.from("images").getPublicUrl(linkData.headerImage).data
        .publicUrl
    : null;

  const linkLayout = (linkData.layout as "default" | "grid") || "default";

  // Determinar se tema e light ou dark pra forcar color scheme
  const isLightTheme = linkData.theme?.startsWith("light") ?? true;

  return (
    <div
      data-force-theme={isLightTheme ? "light" : "dark"}
      className={`${themeStyles.styles.background} flex min-h-screen w-full items-center justify-center p-4`}
    >
      <div className="w-full lg:max-w-md">
        <Card
          className={`border-none bg-transparent! ${themeStyles.styles.text} shadow-none`}
        >
          <CardContent className="p-0">
            {/* Header com background image */}
            <div className="relative">
              {headerImageUrl ? (
                <div className="relative h-44 overflow-hidden rounded-t-lg">
                  <img
                    src={headerImageUrl}
                    alt="Header background"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
                </div>
              ) : (
                <div className="h-12" />
              )}

              <div
                className={`flex flex-col items-center ${headerImageUrl ? "-mt-16" : ""} relative z-10 px-6 pb-4`}
              >
                <div className="relative">
                  <div
                    className={`absolute -inset-1 rounded-full bg-gradient-to-r ${themeStyles.styles.avatarBg} opacity-70 blur`}
                  ></div>
                  <Avatar className="relative h-32 w-32 border shadow-sm">
                    {imageUrl ? (
                      <AvatarImage
                        src={imageUrl}
                        alt={linkData.title || "Imagem do link"}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <>
                        <AvatarImage
                          src={linkData.user.image as string}
                          alt={linkData.user.name as string}
                          className="object-cover"
                        />
                        <AvatarFallback
                          className={`${themeStyles.styles.avatarBg} text-3xl ${themeStyles.styles.buttonText}`}
                        >
                          {linkData.user.name?.charAt(0).toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                </div>
                <div className="mt-4 mb-4 flex flex-col text-center">
                  <h1
                    className={`mb-0 text-2xl font-bold ${themeStyles.styles.text}`}
                  >
                    {linkData.title}
                  </h1>
                  {linkData.description && (
                    <p
                      className={`mx-auto max-w-xs ${themeStyles.styles.mutedText}`}
                    >
                      {linkData.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <SocialLinksClient
                socialLinks={socialLinks}
                linkId={linkData.id}
                layout={linkLayout}
                themeStyles={{
                  buttonBg: themeStyles.styles.buttonBg,
                  buttonText: themeStyles.styles.buttonText,
                  mutedText: themeStyles.styles.mutedText,
                }}
              />
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
      </div>
    </div>
  );
}
