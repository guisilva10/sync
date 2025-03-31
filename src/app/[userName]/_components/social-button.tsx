"use client";
import { Button } from "@/app/_components/ui/button";

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
      <Button
        className={`flex h-12 w-full items-center rounded-full border ${themeStyles.buttonBg} ${themeStyles.buttonText}`}
        variant="bio"
        onClick={() => onClick(linkId, url)}
      >
        <div className="flex w-full items-center justify-center gap-x-3">
          <div>{icon}</div>
          <span>{title}</span>
        </div>
      </Button>
    </div>
  );
}
