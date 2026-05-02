import { auth } from "@/services/auth";

export async function authGuard() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Não autorizado");
  }

  return session;
}
