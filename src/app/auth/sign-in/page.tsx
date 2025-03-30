"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CompassIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleGoogleSignIn = async () => {
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

          <div className="flex flex-col gap-y-4">
            <Button
              variant="outline"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl transition-colors"
              onClick={() => handleGoogleSignIn()}
            >
              <svg className="size-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              <span>Continuar com Google</span>
            </Button>
            <Link
              href="/"
              className="text-muted-foreground text-center text-sm"
            >
              Voltar ao inicio
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
