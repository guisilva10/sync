"use server";

import { auth } from "@/services/auth";
import { prisma } from "@/services/database";
import { revalidatePath } from "next/cache";
// Ajuste para sua implementação de autenticação

export type LinkFormData = {
  title: string;
  description: string;
  slug: string;
  socialLinksJson: string[];
  theme: string;
};

const slugify = (text: string): string =>
  text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export async function saveLink(data: LinkFormData) {
  const session = await auth();
  if (!session) {
    return;
  }

  const slug = slugify(data.title);
  const existing = await prisma.links.findUnique({ where: { slug } });
  const uniqueSlug = existing ? `${slug}-${Date.now()}` : slug;

  const links = await prisma.links.create({
    data: {
      title: data.title,
      description: data.description,
      slug: uniqueSlug,
      socialLinksJson: data.socialLinksJson,
      theme: data.theme || "light",
      userId: session.user.id,
    },
  });
  revalidatePath("/app/links");
  return links;
}

export async function getLinkData() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return null;
  }

  const userId = session.user.id;

  const link = await prisma.links.findFirst({
    where: { userId },
  });

  if (!link) {
    return null;
  }

  return link;
  // Parse os links sociais do JSON
}

export const getLinkByTitle = async (id: string) => {
  const session = await auth();
  if (!session) {
    return;
  }

  const link = await prisma.links.findUnique({
    where: {
      id: id,
      userId: session.user.id,
    },
    select: {
      socialLinksJson: true,
      title: true,
      description: true,
      slug: true,
      user: true,
    },
  });

  return link;
};
export const getLinkByIdAndReturnName = async (id: string) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    return null;
  }

  const link = await prisma.links.findUnique({
    where: {
      id: id,
      userId: session.user.id,
    },
    select: {
      id: true,
      socialLinksJson: true,
      title: true,
      description: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return link;
};

// Função para a rota "/[name]" que usa o name diretamente
export const getLinkByName = async (name: string) => {
  const session = await auth();

  const link = await prisma.links.findUnique({
    where: {
      id: name,
      user: {
        name: name,
      },
      userId: session?.user.id,
    },
    select: {
      id: true,
      socialLinksJson: true,
      title: true,
      description: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return link;
};

export const getLinksByName = async (name: string) => {
  try {
    // Normalizar o name: remover espaços extras e converter para minúsculas para comparação
    const normalizedName = name.trim().toLowerCase();
    console.log("Buscando links para o name normalizado:", normalizedName);

    const links = await prisma.links.findMany({
      where: {
        user: {
          name: {
            equals: normalizedName,
            mode: "insensitive",
          },
        },
      },
      select: {
        id: true,
        socialLinksJson: true,
        title: true,
        description: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("Links encontrados:", links);
    return links;
  } catch (error) {
    console.error("Erro ao buscar links por nome:", error);
    return [];
  }
};

export const getLinkById = async (id: string) => {
  const link = await prisma.links.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      slug: true,
      socialLinksJson: true,
      title: true,
      theme: true,
      description: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return link;
};

export const getLinkBySlug = async (slug: string) => {
  try {
    const link = await prisma.links.findUnique({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        slug: true,
        socialLinksJson: true,
        title: true,
        description: true,
        theme: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    console.log("Link encontrado pelo slug:", link);
    return link;
  } catch (error) {
    console.error("Erro ao buscar link por slug:", error);
    return null;
  }
};

export const deleteLinkById = async (id: string) => {
  const session = await auth();
  if (!session) {
    return;
  }

  const link = await prisma.links.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });
  revalidatePath("/app");
  revalidatePath("/app/links");
  return link;
};

export const updateLinkById = async (
  id: string,
  data: {
    title?: string;
    slug?: string;
    description?: string;
    socialLinksJson?: string[];
  },
) => {
  const session = await auth();
  if (!session) {
    throw new Error("Não autorizado");
  }

  // Verifica se o slug já existe (se estiver sendo atualizado)
  if (data.slug) {
    const existingSlug = await prisma.links.findUnique({
      where: { slug: data.slug },
    });
    if (existingSlug && existingSlug.id !== id) {
      throw new Error("Este slug já está em uso");
    }
  }

  const updatedLink = await prisma.links.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      socialLinksJson: data.socialLinksJson,
    },
  });

  revalidatePath("/app");
  revalidatePath("/app/links");
  return updatedLink;
};

export const updateLinkTheme = async (id: string, theme: string) => {
  const session = await auth();
  if (!session) {
    throw new Error("Não autorizado");
  }

  const updatedLink = await prisma.links.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      theme,
    },
  });

  return updatedLink;
};
