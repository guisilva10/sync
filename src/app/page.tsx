"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  CompassIcon,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";

import { useTheme } from "next-themes";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header
        className={`sticky top-0 z-50 w-full px-6 backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="from-primary to-primary/70 flex size-8 items-center justify-center rounded-lg bg-gradient-to-r text-white">
              <CompassIcon className="size-4 text-white" />
            </div>
            <span>Sync</span>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {mounted && theme === "dark" ? (
                <Sun className="size-[18px]" />
              ) : (
                <Moon className="size-[18px]" />
              )}
              <span className="sr-only">Alternar tema</span>
            </Button>
            <Button className="rounded-full" asChild>
              <Link href="/auth/sign-in" className="flex items-center">
                Comece Agora
                <ChevronRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {mounted && theme === "dark" ? (
                <Sun className="size-[18px]" />
              ) : (
                <Moon className="size-[18px]" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
              <span className="sr-only">Alternar menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-background/95 absolute inset-x-0 top-16 border-b backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2 border-t pt-2">
                <Button className="rounded-full">
                  Comece Agora
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>
      <main className="relative w-full lg:max-w-screen">
        <div className="bg-background absolute inset-0 -z-10 h-screen w-full animate-pulse bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] transition-all duration-1000 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] after:absolute after:inset-0 after:bg-[#9f1239] after:opacity-20 after:blur-3xl dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]" />
        <section className="z-10 flex h-screen w-full items-center justify-center overflow-hidden">
          <div className="relative px-6 lg:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-5xl text-center"
            >
              <h1 className="from-foreground to-foreground/70 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent lg:text-8xl">
                Crie Seu Link In Bio Personalizado com a{" "}
                <span className="text-primary font-bold">SYNC</span>
              </h1>
              <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
                Aumente sua visibilidade online com um link in bio
                personalizado.A SYNC é a solução perfeita para você.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="h-12 rounded-full px-8 text-base"
                >
                  <Link href="/auth/sign-in" className="flex items-center">
                    Criar meu Link in Bio
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full px-8 text-base"
                >
                  Saiba Mais
                </Button>
              </div>
              <div className="text-muted-foreground mt-6 flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Check className="text-primary size-4" />
                  <span>personalização livre</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="text-primary size-4" />
                  <span>integração com redes sociais</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="text-primary size-4" />
                  <span>layouts modernos</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
