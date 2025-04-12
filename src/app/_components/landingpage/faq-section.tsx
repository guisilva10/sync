"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "O que é um link in bio?",
    answer:
      "Um link in bio é uma página web única que reúne todos os seus links importantes em um só lugar. É especialmente útil para perfis de redes sociais como Instagram, TikTok e Twitter, onde geralmente só é permitido um link na biografia.",
  },
  {
    question: "Posso personalizar completamente meu link in bio?",
    answer:
      "Sim! A SYNC oferece personalização completa, incluindo cores, fontes, imagens de fundo e layouts. Você pode criar uma página que combine perfeitamente com sua identidade visual ou marca pessoal.",
  },
  {
    question: "Preciso ter conhecimentos técnicos para usar a SYNC?",
    answer:
      "Não, nossa plataforma foi desenvolvida para ser extremamente intuitiva e fácil de usar. Não é necessário nenhum conhecimento de programação ou design para criar um link in bio profissional.",
  },
  {
    question: "Posso mudar de plano depois?",
    answer:
      "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Se fizer upgrade, você terá acesso imediato aos recursos adicionais. Se fizer downgrade, as alterações entrarão em vigor no próximo ciclo de cobrança.",
  },
  {
    question: "Como funciona a análise de cliques?",
    answer:
      "Nossa ferramenta de análise rastreia quantas pessoas visitam sua página e em quais links elas clicam. Você terá acesso a um painel detalhado com métricas como número de visitantes, taxa de cliques, localizações geográficas e dispositivos utilizados.",
  },
  {
    question: "Posso usar meu próprio domínio?",
    answer:
      "Sim, nos planos pagos você pode conectar seu próprio domínio personalizado à sua página SYNC, criando uma experiência ainda mais profissional e memorável para seus visitantes.",
  },
];

export default function FAQSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Perguntas <span className="text-primary">Frequentes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mx-auto max-w-2xl text-lg"
          >
            Respostas para as dúvidas mais comuns sobre a SYNC
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
