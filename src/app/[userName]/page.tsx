/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { getLinkByUsername } from "../app/links/new/actions"; // Use getLinkById em vez de getLinkByUsername
import { supabase } from "@/services/supabase";
import { SocialLinksClient } from "./_components/social-link-conent";

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
    background: "bg-zinc-950",
    text: "text-white",
    mutedText: "text-muted-foreground",
    nameBg: "bg-green-700/20",
    nameText: "text-green-500",
    buttonBg: "bg-green-700",
    buttonText: "text-white",
    avatarBg: "bg-green-600",
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const { userName } = await params;

  const linkData = await getLinkByUsername(userName);

  if (
    !linkData ||
    !linkData.user ||
    linkData.user.name?.toLowerCase().replace(/\s+/g, "-") !== userName
  ) {
    return (
      <div className="bg-background flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full lg:max-w-md">
          <Card className="border-none bg-transparent shadow-xl">
            <CardContent className="pt-12 text-center">
              <p className="text-gray-600">
                Nenhum link encontrado para o usuário &quot;{userName}&quot; com
                o ID &quot;
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const socialLinks: { title: string; url: string }[] = Array.isArray(
    linkData.socialLinksJson,
  )
    ? linkData.socialLinksJson.filter(Boolean).map((link: any) => ({
        title: link.title,
        url: link.url,
      }))
    : [];
  const theme = linkData.theme || "light";
  const themeStyles = themes[theme as keyof typeof themes];

  const imageUrl = linkData.image
    ? supabase.storage.from("images").getPublicUrl(linkData.image).data
        .publicUrl
    : null;

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
                        className={`${themeStyles.avatarBg} text-3xl ${themeStyles.buttonText}`}
                      >
                        {linkData.user.name?.charAt(0).toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </>
                  )}
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

              <SocialLinksClient
                socialLinks={socialLinks}
                linkId={linkData.id}
                themeStyles={{
                  buttonBg: themeStyles.buttonBg,
                  buttonText: themeStyles.buttonText,
                  mutedText: themeStyles.mutedText,
                }}
              />
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
