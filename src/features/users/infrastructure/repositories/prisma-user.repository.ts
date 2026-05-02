import { prisma } from "@/services/database";

export const userRepository = {
  async updateName(userId: string, name: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { name },
    });
  },
};
