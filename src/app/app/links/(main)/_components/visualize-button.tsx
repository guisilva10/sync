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
    <Button className="flex items-center" onClick={handleVisualize}>
      <Eye className="size-4" />
      <span>Visualizar</span>
    </Button>
  );
}
