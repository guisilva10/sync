"use client";
import { ReactNode } from "react";
import { SocialLinkButton } from "./social-button"; // Ajuste o caminho
import { Globe, PaperclipIcon } from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

// Tipagem das props
interface SocialLinksClientProps {
  socialLinks: { title: string; url: string }[];
  linkId: string;
  layout?: "default" | "grid";
  themeStyles: {
    buttonBg: string;
    buttonText: string;
    mutedText: string;
  };
}

const platformStyles: Record<string, { icon: ReactNode }> = {
  instagram: { icon: <FaInstagram className="h-5 w-5" /> },
  twitter: { icon: <FaTwitter className="h-5 w-5" /> },
  youtube: { icon: <FaYoutube className="h-5 w-5" /> },
  facebook: { icon: <FaFacebook className="h-5 w-5" /> },
  linkedin: { icon: <FaLinkedin className="h-5 w-5" /> },
  github: { icon: <FaGithub className="h-5 w-5" /> },
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
  if (url.includes("")) return "portfolio";
  return "other";
};

// Função para registrar o clique e redirecionar
async function handleClick(linkId: string, url: string) {
  try {
    const response = await fetch("/api/clicks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ linkId, url }),
      next: {
        tags: ["clicks"],
      },
    });

    const data = await response.json();
    if (data.success && data.redirect) {
    } else {
      console.error("Erro na resposta da API:", data.error);
    }
  } catch (error) {
    console.error("Erro ao registrar clique:", error);
  }
}

export function SocialLinksClient({
  socialLinks,
  linkId,
  layout = "default",
  themeStyles,
}: SocialLinksClientProps) {
  const isGrid = layout === "grid";

  return (
    <div className={isGrid ? "grid grid-cols-2 gap-3" : "space-y-4"}>
      {socialLinks.length > 0 ? (
        socialLinks.map((link, index) => {
          const platform = detectPlatform(link.url);
          const { icon } = platformStyles[platform] || platformStyles.other;

          return (
            <SocialLinkButton
              key={index}
              title={link.title}
              url={link.url}
              icon={icon}
              linkId={linkId}
              layout={layout}
              themeStyles={themeStyles}
              onClick={handleClick}
            />
          );
        })
      ) : (
        <div
          className={`text-center ${themeStyles.mutedText} ${isGrid ? "col-span-2" : ""}`}
        >
          Nenhum link social disponível
        </div>
      )}
    </div>
  );
}
