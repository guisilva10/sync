import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/app/_components/page-dashboard";
import { auth } from "@/services/auth";
import { getUserCurrentPlan } from "@/services/stripe";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

import Link from "next/link";
import { PlusIcon, ExternalLinkIcon, InfoIcon, PencilIcon } from "lucide-react";
import { getLinksByUser } from "../../actions";
import { ThemeEditorSheet } from "./_components/theme-edit-sheet";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function Page() {
  const session = await auth();
  const plan = await getUserCurrentPlan(session?.user.id as string);
  const links = await getLinksByUser();

  // Verifica se o usuário tem um plano ativo
  const hasSubscription = plan && plan.name !== "free";
  const isPlanFree = !hasSubscription;

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Personalizar Links</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav className="flex items-center gap-4">
          {isPlanFree && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/app/billing"
                    className="text-primary text-sm underline underline-offset-4"
                  >
                    <Badge variant="outline" className="gap-1">
                      <InfoIcon className="size-3" />
                      Faça upgrade para mais recursos
                    </Badge>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Assine um plano premium para desbloquear todas as opções de
                    personalização
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <Button asChild variant="default" size="sm">
            <Link
              href="/app/links/new"
              className="flex items-center justify-center gap-2"
            >
              Criar Link
              <PlusIcon className="size-4" />
            </Link>
          </Button>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <div className="py-6">
          {links.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="bg-muted mb-4 rounded-full p-3">
                  <PlusIcon className="text-muted-foreground size-6" />
                </div>
                <h3 className="mb-2 text-lg font-medium">
                  Nenhum link encontrado
                </h3>
                <p className="text-muted-foreground mb-4 max-w-md text-center text-sm">
                  Você ainda não criou nenhum link para personalizar. Crie seu
                  primeiro link para começar.
                </p>
                <Button asChild>
                  <Link href="/app/links/new">Criar meu primeiro link</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              <div className="text-muted-foreground grid grid-cols-3 gap-4 px-4 py-2 text-sm font-medium">
                <div>Link</div>
                <div>Informações</div>
                <div className="text-right">Ações</div>
              </div>
              {links.map((link) => (
                <Card
                  key={link.id}
                  className="overflow-hidden transition-all hover:shadow-md"
                >
                  <CardContent className="flex flex-col justify-between gap-4 p-4 lg:flex-row">
                    <div className="flex flex-col">
                      <Link href={`/app/links/${link.id}`} className="group">
                        <span className="text-primary line-clamp-1 font-medium transition-colors group-hover:underline">
                          {link.title || "Link sem título"}
                        </span>
                        <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                          <span className="line-clamp-1">
                            {link.slug || link.id}
                          </span>
                          <ExternalLinkIcon className="size-3" />
                        </div>
                      </Link>
                    </div>

                    <div className="hidden flex-col justify-center text-sm lg:flex">
                      <div className="flex items-center gap-2">
                        {link.createdAt && (
                          <span className="text-muted-foreground text-xs">
                            Criado{" "}
                            {formatDistanceToNow(new Date(link.createdAt), {
                              locale: ptBR,
                              addSuffix: true,
                            })}
                          </span>
                        )}
                      </div>
                      {link.theme && (
                        <span className="text-muted-foreground mt-1 text-xs">
                          Tema: {link.theme || "Personalizado"}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={`/app/links/edit/${link.id}`}
                          className="flex items-center"
                        >
                          Editar Link
                          <PencilIcon className="ml-1 size-4" />
                        </Link>
                      </Button>
                      <ThemeEditorSheet
                        linkId={link.id}
                        currentTheme={link.theme}
                        hasSubscription={hasSubscription}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DashboardPageMain>
    </DashboardPage>
  );
}
