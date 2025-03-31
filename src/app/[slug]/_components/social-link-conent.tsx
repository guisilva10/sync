"use client";
import { ReactNode } from "react";
import { SocialLinkButton } from "./social-button"; // Ajuste o caminho
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  Github,
  Globe,
} from "lucide-react";

// Tipagem das props
interface SocialLinksClientProps {
  socialLinks: { title: string; url: string }[];
  linkId: string;
  themeStyles: {
    buttonBg: string;
    buttonText: string;
    mutedText: string;
  };
}

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

// Função para registrar o clique e redirecionar
async function handleClick(linkId: string, url: string) {
  try {
    const response = await fetch("/api/clicks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ linkId, url }),
    });

    const data = await response.json();
    if (data.success && data.redirect) {
      window.location.href = data.redirect;
    } else {
      console.error("Erro na resposta da API:", data.error);
      window.location.href = url; // Fallback
    }
  } catch (error) {
    console.error("Erro ao registrar clique:", error);
    window.location.href = url; // Redireciona mesmo em caso de erro
  }
}

export function SocialLinksClient({
  socialLinks,
  linkId,
  themeStyles,
}: SocialLinksClientProps) {
  return (
    <div className="space-y-4">
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
              themeStyles={themeStyles}
              onClick={handleClick}
            />
          );
        })
      ) : (
        <div className={`text-center ${themeStyles.mutedText}`}>
          Nenhum link social disponível
        </div>
      )}
    </div>
  );
}
