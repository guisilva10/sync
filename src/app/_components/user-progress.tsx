import { auth } from "@/services/auth";
import { Progress } from "./ui/progress";
import { getUserCurrentPlan } from "@/services/stripe";

const UserProgress = async () => {
  const session = await auth();
  const plan = await getUserCurrentPlan(session?.user.id as string);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm">Links Criados</span>
        <span className="font-semibold">
          {plan.quota.LINKS.current} / {plan.quota.LINKS.available}
        </span>
      </div>
      <div>
        <Progress value={plan.quota.LINKS.usage} className="w-full" />
      </div>
      {plan.quota.LINKS.current >= plan.quota.LINKS.available && (
        <p className="text-destructive text-sm">
          Limite de links atingido. Faça upgrade para criar mais.
        </p>
      )}
    </div>
  );
};

export default UserProgress;
