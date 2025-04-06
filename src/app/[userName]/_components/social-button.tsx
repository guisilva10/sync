"use client";

import Link from "next/link";

import { ReactNode } from "react";

interface SocialLinkButtonProps {
  title: string;
  url: string;
  icon: ReactNode;
  linkId: string;
  themeStyles: {
    buttonBg: string;
    buttonText: string;
    mutedText: string;
  };
  onClick: (linkId: string, url: string) => void; // Função de clique passada como prop
}

export function SocialLinkButton({
  title,
  url,
  icon,
  linkId,
  themeStyles,
  onClick,
}: SocialLinkButtonProps) {
  return (
    <div className="group">
      <Link
        href={url}
        className={`flex h-12 w-full items-center rounded-full ${themeStyles.buttonBg} ${themeStyles.buttonText}`}
        onClick={() => onClick(linkId, url)}
        target="_blank"
      >
        <div className="flex w-full items-center justify-center gap-x-3">
          <div>{icon}</div>
          <span>{title}</span>
        </div>
      </Link>
    </div>
  );
}
