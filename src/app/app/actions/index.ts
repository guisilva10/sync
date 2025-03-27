/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { auth } from "@/services/auth";
import { prisma } from "@/services/database";
import { z } from "zod";
import { deleteLinkSchema, linkSchema } from "../(main)/schema";
import { createCheckoutSession } from "@/services/stripe";
import { redirect } from "next/navigation";

export const getLinksByUser = async () => {
  const session = await auth();

  const links = await prisma.links.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      userId: session?.user.id,
    },
  });

  return links;
};

export async function upsertLink(input: z.infer<typeof linkSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  if (input.id) {
    const link = await prisma.links.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    });

    if (!link) {
      return {
        error: "Not found",
        data: null,
      };
    }

    const updatedLink = await prisma.links.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: {
        title: input.title,
        description: input.description,
      },
    });

    return {
      error: null,
      data: updatedLink,
    };
  }

  if (!input.title && !input.description) {
    return {
      error: "Title is required",
      data: null,
    };
  }

  const link = await prisma.links.create({
    data: {
      title: input.title,
      description: input.description,
      userId: session?.user?.id,
    },
  });

  return link;
}

export async function deleteLink(input: z.infer<typeof deleteLinkSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  const link = await prisma.links.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  });

  if (!link) {
    return {
      error: "Not found",
      data: null,
    };
  }

  await prisma.links.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  });

  return {
    error: null,
    data: "link deleted successfully",
  };
}

export async function createCheckoutSessionAction(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  const checkoutSession = await createCheckoutSession(
    session.user.id as string,
    session.user.email as string,
    session.user.stripeSubscriptionId as string,
  );

  if (!checkoutSession.url) return;
  redirect(checkoutSession.url);
}
