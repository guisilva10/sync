"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Palette,
  BarChart3,
  Zap,
  Share2,
  Layout,
} from "lucide-react";

const features = [
  {
    icon: <Layout className="text-primary size-10" />,
    title: "Layouts Modernos",
    description:
      "Escolha entre diversos templates profissionais e personalizáveis para destacar seu conteúdo.",
  },
  {
    icon: <Palette className="text-primary size-10" />,
    title: "Personalização Total",
    description:
      "Adapte cores, fontes e estilos para combinar perfeitamente com sua marca pessoal.",
  },
  {
    icon: <Smartphone className="text-primary size-10" />,
    title: "Otimizado para Mobile",
    description:
      "Experiência perfeita em qualquer dispositivo, garantindo que seus seguidores tenham a melhor experiência.",
  },
  {
    icon: <BarChart3 className="text-primary size-10" />,
    title: "Análise de Cliques",
    description:
      "Acompanhe o desempenho dos seus links com métricas detalhadas e insights valiosos.",
  },
  {
    icon: <Share2 className="text-primary size-10" />,
    title: "Integração com Redes Sociais",
    description:
      "Conecte facilmente todas as suas redes sociais em um único lugar acessível.",
  },
  {
    icon: <Zap className="text-primary size-10" />,
    title: "Carregamento Rápido",
    description:
      "Páginas otimizadas para carregamento instantâneo, mantendo seus visitantes engajados.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative px-6 py-20">
      <div className="bg-background absolute inset-0 -z-10 h-screen w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] transition-all duration-1000 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] after:absolute after:inset-0 after:bg-[#9f1239]/20 after:opacity-20 after:blur-3xl dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Recursos que <span className="text-primary">transformam</span> sua
            presença online
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mx-auto max-w-2xl text-lg"
          >
            A SYNC oferece tudo que você precisa para criar um link in bio
            profissional e eficiente
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-xl border p-6 transition-all hover:shadow-md"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
