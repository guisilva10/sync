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
import { themes } from "../_components/theme/constants";

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
  const themeStyles =
    themes.light.find((t) => t.value === linkData.theme) ||
    themes.dark.find((t) => t.value === linkData.theme) ||
    themes.light[0];

  const imageUrl = linkData.image
    ? supabase.storage.from("images").getPublicUrl(linkData.image).data
        .publicUrl
    : null;

  return (
    <div
      className={`${themeStyles.styles.background} flex min-h-screen w-full items-center justify-center p-4`}
    >
      <div className="w-full lg:max-w-md">
        <Card
          className={`border-none ${themeStyles.styles.background} ${themeStyles.styles.text}`}
        >
          <CardContent className="pt-12">
            <div className="mb-8 flex justify-center">
              <div className="relative">
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
            </div>

            <div className="mb-10 text-center">
              <div
                className={`${themeStyles.styles.nameBg} inline-block ${themeStyles.styles.nameText} rounded-full px-4 py-1 text-sm font-medium ${themeStyles.styles.buttonBg.replace(
                  "bg-",
                  "text-",
                )}`}
              >
                @{linkData.user.name}
              </div>
            </div>

            <div className="">
              <div className="mb-4 flex flex-col text-center">
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

              <SocialLinksClient
                socialLinks={socialLinks}
                linkId={linkData.id}
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
                <span
                  className={`font-semibold ${themeStyles.styles.nameText}`}
                >
                  ♥
                </span>
                <span
                  className={`font-semibold ${themeStyles.styles.nameText}`}
                >
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
