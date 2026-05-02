import { authGuard } from "@/shared/lib/auth-guard";
import { createCheckoutSession } from "@/services/stripe";

export async function createCheckout() {
  const session = await authGuard();

  return createCheckoutSession(
    session.user.id as string,
    session.user.email as string,
    session.user.stripeSubscriptionId as string,
  );
}
