import { User } from "@/generated/prisma/client";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
