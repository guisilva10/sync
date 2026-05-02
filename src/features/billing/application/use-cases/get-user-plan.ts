import { authGuard } from "@/shared/lib/auth-guard";
import { getUserCurrentPlan } from "@/services/stripe";

export async function getUserPlan() {
  const session = await authGuard();
  return getUserCurrentPlan(session.user.id);
}
