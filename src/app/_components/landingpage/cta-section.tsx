"use client";

import { motion } from "framer-motion";
import { Button } from "@/app/_components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden px-6 py-20" id="cta">
      <div className="bg-primary/10 dark:bg-primary/5 absolute inset-0 -z-10" />
      <div className="absolute -z-10 h-full w-full bg-[radial-gradient(circle_at_center,rgba(159,18,57,0.15),transparent_65%)]" />

      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6 text-3xl font-bold md:text-5xl"
        >
          Pronto para <span className="text-primary">Transformar</span> sua
          Presença Online?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg"
        >
          Junte-se a milhares de criadores de conteúdo, influenciadores e
          empresas que já estão usando a SYNC para impulsionar sua presença
          digital.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="h-12 rounded-full px-8 text-base"
            asChild
          >
            <Link href="/auth/sign-in" className="flex items-center">
              Comece Gratuitamente
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-8 text-base"
            asChild
          >
            <Link href="https://synclinkbr.vercel.app/guilherme-willem">
              Ver Demonstração
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
