"use client";

import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

import { ReactNode } from "react";

interface SocialLinkButtonProps {
  title: string;
  url: string;
  icon: ReactNode;
  linkId: string;
  layout?: "default" | "grid";
  themeStyles: {
    buttonBg: string;
    buttonText: string;
    mutedText: string;
  };
  onClick: (linkId: string, url: string) => void;
}

export function SocialLinkButton({
  title,
  url,
  icon,
  linkId,
  layout = "default",
  themeStyles,
  onClick,
}: SocialLinkButtonProps) {
  if (layout === "grid") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onClick(linkId, url)}
        className={`flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all hover:scale-105 ${themeStyles.buttonBg} ${themeStyles.buttonText}`}
      >
        <div className="text-2xl">{icon}</div>
        <span className="text-center text-xs font-medium">{title}</span>
      </a>
    );
  }

  return (
    <div className="group">
      <Button
        asChild
        onClick={() => onClick(linkId, url)}
        variant="bio"
        className={`flex h-12 w-full items-center rounded-full ${themeStyles.buttonBg} ${themeStyles.buttonText}`}
      >
        <Link href={url} target="_blank">
          <div className="flex w-full items-center justify-center gap-x-3">
            <div>{icon}</div>
            <span>{title}</span>
          </div>
        </Link>
      </Button>
    </div>
  );
}
