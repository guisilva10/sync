"use server";

import { redirect } from "next/navigation";
import { createCheckout } from "../../application/use-cases/create-checkout-session";

export async function createCheckoutSessionAction() {
  const checkoutSession = await createCheckout();
  if (!checkoutSession.url) return;
  redirect(checkoutSession.url);
}
