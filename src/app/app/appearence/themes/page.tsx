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
              {links.map((link) => (
                <Card
                  key={link.id}
                  className={`overflow-hidden transition-all hover:shadow-md ${
                    link.isPrimary ? "" : ""
                  }`}
                >
                  <CardContent className="flex flex-col justify-between gap-4 p-4 lg:flex-row">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Link href={`/app/links/${link.id}`} className="group">
                          <span className="text-primary line-clamp-1 font-medium transition-colors group-hover:underline">
                            {link.title || "Link sem título"}
                          </span>
                        </Link>
                        {link.isPrimary && (
                          <Badge
                            variant="outline"
                            className="bg-primary/10 border-primary/20 text-primary h-5 px-2 py-0 text-xs"
                          >
                            Principal
                          </Badge>
                        )}
                      </div>
                      <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
                        <span className="line-clamp-1 flex items-center">
                          /{link.slug || link.id}
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`/app/links/${link.id}`}
                                className="hover:text-primary hover:bg-muted/50 rounded-sm p-0.5 transition-colors"
                              >
                                <ExternalLinkIcon className="size-3" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-xs">
                              Ver detalhes do link
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div className="hidden flex-col justify-center text-sm lg:flex">
                      <div className="flex items-center gap-2">
                        {link.createdAt && (
                          <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-3"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            Criado{" "}
                            {formatDistanceToNow(new Date(link.createdAt), {
                              locale: ptBR,
                              addSuffix: true,
                            })}
                          </span>
                        )}
                      </div>
                      {link.theme && (
                        <span className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-3"
                          >
                            <circle cx="13.5" cy="6.5" r="2.5" />
                            <circle cx="19" cy="17" r="2.5" />
                            <circle cx="6" cy="12" r="2.5" />
                            <line x1="14" y1="8" x2="18" y2="15" />
                            <line x1="6" y1="14" x2="12" y2="17" />
                            <line x1="12" y1="17" x2="13" y2="8" />
                          </svg>
                          Tema: {link.theme || "Personalizado"}
                        </span>
                      )}

                      {link.linkClicks !== undefined && (
                        <span className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-3"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          {link.linkClicks.length || 0} visualizações
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="h-8"
                            >
                              <Link
                                href={`/app/links/edit/${link.id}`}
                                className="flex items-center"
                              >
                                <PencilIcon className="size-3.5 md:mr-1" />
                                <span className="sr-only lg:not-sr-only">
                                  Editar Link
                                </span>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="text-xs">
                            Editar informações do link
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

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
