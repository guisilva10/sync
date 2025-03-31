import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/app/_components/page-dashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import Link from "next/link";
import { CalendarClockIcon, RocketIcon, ArrowLeftIcon } from "lucide-react";
import { auth } from "@/services/auth";
import { getUserCurrentPlan } from "@/services/stripe";

export default async function Page() {
  const session = await auth(); // Busca a sessão do usuário autenticado
  const plan = await getUserCurrentPlan(session?.user?.id as string); // Busca o plano do usuário
  // Verifica se o plano é "Pro"
  const isPro = plan?.name === "pro";
  const isFree = plan?.name === "free";

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Personalizar Link</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain className="mx-auto flex w-full flex-col items-center justify-center gap-8 py-12">
        <Card className="w-full border shadow-lg transition-all hover:shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <RocketIcon className="text-primary size-8" />
            </div>
            <div>
              <Badge variant="outline" className="text-primary mb-2 text-sm">
                <CalendarClockIcon className="mr-1 size-3" /> Em desenvolvimento
              </Badge>
              <CardTitle className="text-2xl font-bold">
                Disponível em Breve
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="w-full text-center">
            <p className="text-muted-foreground mb-2 text-lg">
              Estamos trabalhando em algo incrível! Esta funcionalidade estará
              disponível em breve para melhorar sua experiência.
            </p>

            {isFree && (
              <div className="bg-muted rounded-lg p-4">
                <h3 className="mb-2 font-medium">Funcionalidade Premium</h3>
                <p className="text-muted-foreground mb-3 text-sm">
                  Esta funcionalidade estará disponível exclusivamente para
                  usuários do plano Pro. Faça o upgrade para ter acesso
                  antecipado quando for lançada.
                </p>
                <Button asChild variant="default" size="sm" className="mt-1">
                  <Link href="/app/plans">Ver planos disponíveis</Link>
                </Button>
              </div>
            )}

            {isPro && (
              <div className="bg-primary/5 rounded-lg p-4">
                <h3 className="mb-2 font-medium">Acesso prioritário</h3>
                <p className="text-muted-foreground mb-3 text-sm">
                  Como assinante Pro, você terá acesso prioritário a esta
                  funcionalidade assim que for lançada. Fique de olho nas
                  novidades!
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link href="/app">
                <ArrowLeftIcon className="size-4" />
                Voltar ao Dashboard
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </DashboardPageMain>
    </DashboardPage>
  );
}
