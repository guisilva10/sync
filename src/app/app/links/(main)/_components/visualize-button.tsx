// _components/visualize-button.tsx
"use client";

import { Button } from "@/app/_components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateLinkPrimaryStatus } from "../../new/actions";

export function VisualizeButton({
  linkId,
  userId,
  usernameSlug,
}: {
  linkId: string;
  userId: string;
  usernameSlug: string;
}) {
  const router = useRouter();

  const handleVisualize = async () => {
    await updateLinkPrimaryStatus(linkId, userId);
    router.push(`/${usernameSlug}`);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={handleVisualize}
    >
      <Eye className="h-4 w-4" />
      <span className="sr-only">Visualizar</span>
    </Button>
  );
}
