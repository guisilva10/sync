"use client";

import { motion } from "framer-motion";

import { cn } from "@/app/_lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Ana Silva",
    username: "@anasilva_dev",
    body: "Essa ferramenta revolucionou meu fluxo de trabalho. Economizo pelo menos 5 horas por semana em tarefas repetitivas.",
    img: "/api/placeholder/40/40",
  },
  {
    name: "Pedro Mendes",
    username: "@pmendes",
    body: "A interface é extremamente intuitiva. Consegui integrar no meu projeto em menos de uma hora e os resultados foram imediatos.",
    img: "/api/placeholder/40/40",
  },
  {
    name: "Carla Oliveira",
    username: "@carla_tech",
    body: "O suporte ao cliente é excepcional. Tive uma dúvida técnica e a equipe respondeu em menos de 30 minutos com uma solução completa.",
    img: "/api/placeholder/40/40",
  },
  {
    name: "Ricardo Almeida",
    username: "@ricardoalmeida",
    body: "Estou impressionado com a velocidade e estabilidade. Mesmo com alto volume de dados, o desempenho permanece consistente.",
    img: "/api/placeholder/40/40",
  },
  {
    name: "Mariana Costa",
    username: "@mari_costa",
    body: "Já testei várias soluções semelhantes no mercado, mas nenhuma oferece o equilíbrio perfeito entre funcionalidade e simplicidade como esta.",
    img: "/api/placeholder/40/40",
  },
  {
    name: "Lucas Ferreira",
    username: "@lucasdev",
    body: "As atualizações regulares trazem recursos que realmente agregam valor. É raro encontrar um produto que evolui exatamente como os usuários precisam.",
    img: "/api/placeholder/40/40",
  },
  {
    name: "Juliana Santos",
    username: "@ju_santos",
    body: "Implementamos na nossa startup há 3 meses e já vimos um aumento de 27% na produtividade da equipe de desenvolvimento.",
    img: "/api/placeholder/40/40",
  },
  {
    name: "Gabriel Martins",
    username: "@gabe_dev",
    body: "A documentação é impecável. Qualquer dúvida que tive foi rapidamente resolvida consultando os guias detalhados.",
    img: "/api/placeholder/40/40",
  },
  {
    name: "Isabela Rocha",
    username: "@isabelaUX",
    body: "Como designer de UX, aprecio a atenção aos detalhes na experiência do usuário. É um produto pensado do início ao fim.",
    img: "/api/placeholder/40/40",
  },
  {
    name: "Fernando Dias",
    username: "@fernandod",
    body: "Conseguimos reduzir nossos custos operacionais em 15% no primeiro trimestre após a implementação. O ROI foi muito além do esperado.",
    img: "/api/placeholder/40/40",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative mx-3 h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:bg-background dark:border-gray-50/[.1] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Avatar className="bg-primary/10 text-primary rounded-full">
          <AvatarImage src={img as string} alt={name} />
          <AvatarFallback className="rounded-lg">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed">{body}</blockquote>
    </figure>
  );
};

export function TestimonialsMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-4 text-3xl font-bold md:text-4xl"
      >
        O que nossos <span className="text-primary">clientes</span> dizem?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-muted-foreground mx-auto mb-6 max-w-2xl text-lg"
      >
        Depoimentos de usuários que transformaram sua presença digital com a
        SYNC
      </motion.p>
      <Marquee pauseOnHover className="mb-6 [--duration:30s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:25s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
