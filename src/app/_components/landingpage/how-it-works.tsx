"use client";

import { motion } from "framer-motion";
import { ClipboardEdit, Paintbrush, Share } from "lucide-react";

const steps = [
  {
    icon: <ClipboardEdit className="text-primary size-12" />,
    title: "Crie sua conta",
    description:
      "Registre-se gratuitamente e comece a construir seu link in bio personalizado em minutos.",
  },
  {
    icon: <Paintbrush className="text-primary size-12" />,
    title: "Personalize seu perfil",
    description:
      "Escolha um template, adicione seus links e personalize com suas cores e estilo.",
  },
  {
    icon: <Share className="text-primary size-12" />,
    title: "Compartilhe com o mundo",
    description:
      "Adicione seu link personalizado em suas redes sociais e aumente seu alcance.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Como <span className="text-primary">Funciona</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mx-auto max-w-2xl text-lg"
          >
            Três passos simples para criar seu link in bio perfeito
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-background border-primary/20 mb-6 rounded-full border-2 p-6">
                {step.icon}
              </div>
              <div className="bg-primary mb-4 flex h-8 w-8 items-center justify-center rounded-full text-xl font-bold text-white">
                {index + 1}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
