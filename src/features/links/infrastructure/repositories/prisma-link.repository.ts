import { prisma } from "@/services/database";
import type { CreateLinkDTO } from "../../application/dtos/create-link.dto";
import type {
  UpdateLinkDTO,
  UpdateCustomizationDTO,
} from "../../application/dtos/update-link.dto";

const slugify = (text: string): string =>
  text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export const linkRepository = {
  async create(data: CreateLinkDTO, userId: string) {
    const slug = slugify(data.title);
    const existing = await prisma.links.findUnique({ where: { slug } });
    const uniqueSlug = existing ? `${slug}-${Date.now()}` : slug;

    return prisma.links.create({
      data: {
        title: data.title,
        description: data.description,
        slug: uniqueSlug,
        socialLinksJson: data.socialLinksJson,
        image: data.image,
        theme: data.theme || "light",
        userId,
      },
    });
  },

  async findById(id: string, userId: string) {
    return prisma.links.findUnique({
      where: { id, userId },
      include: {
        linkClicks: true,
        user: true,
      },
    });
  },

  async findBySlug(slug: string) {
    return prisma.links.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        socialLinksJson: true,
        title: true,
        description: true,
        image: true,
        headerImage: true,
        layout: true,
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
  },

  async findAllByUser(userId: string) {
    return prisma.links.findMany({
      where: { userId },
      orderBy: { id: "asc" },
      include: { linkClicks: true },
    });
  },

  async findForEdit(id: string, userId: string) {
    return prisma.links.findUnique({
      where: { id, userId },
      select: {
        image: true,
        headerImage: true,
        layout: true,
        title: true,
        description: true,
        socialLinksJson: true,
        theme: true,
        slug: true,
      },
    });
  },

  async update(id: string, userId: string, data: UpdateLinkDTO) {
    if (data.slug) {
      const existingSlug = await prisma.links.findUnique({
        where: { slug: data.slug },
      });
      if (existingSlug && existingSlug.id !== id) {
        throw new Error("Este slug já está em uso");
      }
    }

    return prisma.links.update({
      where: { id, userId },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        theme: data.theme,
        image: data.image,
        ...(data.socialLinksJson && {
          socialLinksJson: data.socialLinksJson,
        }),
      },
    });
  },

  async updateCustomization(
    id: string,
    userId: string,
    data: UpdateCustomizationDTO,
  ) {
    return prisma.links.update({
      where: { id, userId },
      data: {
        ...(data.headerImage !== undefined && {
          headerImage: data.headerImage,
        }),
        ...(data.layout !== undefined && { layout: data.layout }),
      },
    });
  },

  async updateTheme(id: string, userId: string, theme: string) {
    return prisma.links.update({
      where: { id, userId },
      data: { theme },
    });
  },

  async delete(id: string, userId: string) {
    return prisma.links.delete({
      where: { id, userId },
    });
  },

  async updatePrimaryStatus(linkId: string, userId: string) {
    await prisma.links.updateMany({
      where: { userId, isPrimary: true },
      data: { isPrimary: false },
    });

    return prisma.links.update({
      where: { id: linkId },
      data: { isPrimary: true },
    });
  },

  async incrementClick(linkId: string, url: string) {
    const existingClick = await prisma.linkClick.findUnique({
      where: { linkId_url: { linkId, url } },
    });

    if (existingClick) {
      await prisma.linkClick.update({
        where: { id: existingClick.id },
        data: {
          clicks: { increment: 1 },
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.linkClick.create({
        data: { linkId, url, clicks: 1 },
      });
    }
  },
};
