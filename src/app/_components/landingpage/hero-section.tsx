"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const HeroSection = () => {
  return (
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
            Aumente sua visibilidade online com um link in bio personalizado.A
            SYNC é a solução perfeita para você.
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
              <Link href="#cta">Saiba Mais</Link>
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
  );
};

export default HeroSection;
