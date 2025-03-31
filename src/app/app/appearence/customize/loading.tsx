import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Loader2 className="text-primary size-8 animate-spin" />
      Aguarde...
    </div>
  );
}
