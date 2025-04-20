import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";

import { auth } from "@/services/auth";
import { getUserCurrentPlan } from "@/services/stripe";
import { createCheckoutSessionAction } from "../actions";

export default async function Page() {
  const session = await auth();
  const plan = await getUserCurrentPlan(session?.user.id as string);
  return (
    <form
      action={async (formData) => {
        "use server";
        await createCheckoutSessionAction(formData);
      }}
    >
      <Card>
        <CardHeader className="border-border border-b">
          <CardTitle>Uso do plano</CardTitle>
          <CardDescription>
            Você está atualmente no plano: {""}
            <span className="font-bold uppercase">{plan.name}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <header className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                {plan.quota.LINKS.current}/{plan.quota.LINKS.available}
              </span>
              <span className="text-muted-foreground text-sm">
                {plan.quota.LINKS.usage}%
              </span>
            </header>
            <main>
              <Progress value={plan.quota.LINKS.usage} />
            </main>
          </div>
        </CardContent>
        <CardFooter className="border-border flex items-center justify-between border-t pt-6">
          {plan.name == "free" ? (
            <span>Para ter mais limite, assine o Plano Pro</span>
          ) : (
            <span>Seu plano atual é {plan.name}</span>
          )}
          {plan.name == "free" ? (
            <Button type="submit">Assine por R$99,90/mês</Button>
          ) : (
            <Button type="submit" variant="outline">
              Gerenciar Plano
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
