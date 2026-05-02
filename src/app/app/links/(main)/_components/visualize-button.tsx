// _components/visualize-button.tsx
"use client";

import { Button } from "@/app/_components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export function VisualizeButton({ slug }: { slug: string }) {
  const router = useRouter();

  const handleVisualize = () => {
    router.push(`/${slug}`);
  };

  return (
    <Button className="flex items-center" onClick={handleVisualize}>
      <Eye className="size-4" />
      <span>Visualizar</span>
    </Button>
  );
}
