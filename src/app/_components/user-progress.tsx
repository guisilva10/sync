import { auth } from "@/services/auth";
import { Progress } from "./ui/progress";
import { getUserCurrentPlan } from "@/services/stripe";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Info } from "lucide-react";

const UserUpgradePlan = async () => {
  const session = await auth();
  const plan = await getUserCurrentPlan(session?.user.id as string);

  const quotaPercentage = Math.round(
    (plan.quota.LINKS.current / plan.quota.LINKS.available) * 100,
  );

  const getProgressColor = () => {
    if (quotaPercentage < 50) return "bg-green-500/10";
    if (quotaPercentage < 80) return "bg-yellow-500/10";
    return "bg-red-500/10";
  };

  return (
    <div className="border-border bg-background fixed right-6 bottom-6 z-[1800] w-[320px] rounded-xl border shadow-2xl transition-all duration-300 hover:shadow-lg">
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground text-sm">
              Cota de Criação de Links
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="text-muted-foreground h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Seu uso atual da cota de criação de links</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-sm font-semibold">
            {plan.quota.LINKS.current} / {plan.quota.LINKS.available} Links
          </span>
        </div>

        <Progress
          value={quotaPercentage}
          className={`mb-2 w-full ${getProgressColor()}`}
        />

        {quotaPercentage >= 80 && (
          <div className="mb-2 flex items-center space-x-2 rounded-md border border-yellow-200 bg-yellow-50 p-2">
            <Info className="h-5 w-5 text-yellow-500" />
            <p className="text-xs text-yellow-700">
              Você está se aproximando do seu limite de criação de links
            </p>
          </div>
        )}

        {quotaPercentage >= 100 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Atualizar Plano
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Limite de Cota Atingido</AlertDialogTitle>
                <AlertDialogDescription>
                  Você atingiu o número máximo de links para seu plano atual.
                  Atualize para criar mais links e continuar expandindo sua
                  rede.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>Atualizar Plano</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default UserUpgradePlan;
