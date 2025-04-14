"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CompassIcon, ExternalLink } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { signIn } from "next-auth/react";
import { useInsecureBrowser } from "@/app/_lib/insecure-web-view";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";

export default function LoginPage() {
  const isInsecure = useInsecureBrowser();

  const handleGoogleSignIn = async () => {
    if (isInsecure) return; // previne tentativa de login em navegador inseguro
    try {
      await signIn("google", { callbackUrl: "/app" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center">
      <div className="bg-background absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] after:absolute after:inset-0 after:bg-[#9f1239] after:opacity-20 after:blur-3xl dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]"></div>

      <div className="w-full max-w-md px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-background/80 rounded-2xl border p-8 shadow-sm backdrop-blur-lg"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 font-bold">
              <div className="from-primary/80 to-primary flex size-10 items-center justify-center rounded-lg bg-gradient-to-r text-white">
                <CompassIcon className="size-5 text-white" />
              </div>
              <span className="text-xl">SYNC</span>
            </div>
          </div>

          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold tracking-tight">
              Entrar na plataforma
            </h1>
            <p className="text-muted-foreground text-sm">
              Continue com sua conta social para acessar
            </p>
          </div>

          {isInsecure && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Navegador não compatível</AlertTitle>
              <AlertDescription>
                Parece que você está usando um navegador interno (como do
                Instagram ou Linkedin).
                <br />
                <strong>
                  Toque nos 3 pontinhos e selecione &quot;Abrir no
                  navegador&quot;.
                </strong>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-y-4">
            <Button
              variant="outline"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl transition-colors"
              onClick={handleGoogleSignIn}
              disabled={isInsecure}
            >
              <svg className="size-5" viewBox="0 0 24 24">
                {/* Google SVG path aqui */}
                {/* ... */}
              </svg>
              <span>Continuar com Google</span>
            </Button>

            {isInsecure && (
              <a
                href={
                  typeof window !== "undefined"
                    ? window.location.href
                    : "/auth/sign-in"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-sm text-blue-600 underline"
              >
                <ExternalLink className="mr-1 h-4 w-4" />
                Abrir no navegador
              </a>
            )}

            <Link
              href="/"
              className="text-muted-foreground text-center text-sm"
            >
              Voltar ao início
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Ao continuar, você concorda com nossos{" "}
              <Link href="#" className="text-primary hover:underline">
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link href="#" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
