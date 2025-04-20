import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/app/_components/page-dashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  PlusIcon,
  LinkIcon,
  ChartBarIcon,
  CreditCard,
  MousePointerClickIcon,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { getLinksByUser } from "../actions";
import Link from "next/link";
import { auth } from "@/services/auth";
import { getUserCurrentPlan } from "@/services/stripe";
import { LinkItem } from "../links/(main)/_components/link-item";
import NotificationLinks from "./_components/notification-links";

export default async function Page() {
  const links = await getLinksByUser();
  const session = await auth();
  const plan = await getUserCurrentPlan(session?.user.id as string);

  const totalLinks = links.length;

  // Calcula o total de cliques somando os cliques de todos os linkClicks
  const totalClicks = links.reduce((acc, link) => {
    const linkClicksSum = link.linkClicks.reduce(
      (sum, click) => sum + click.clicks,
      0,
    );
    return acc + linkClicksSum;
  }, 0);

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Visão Geral</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav className="flex items-center">
          <NotificationLinks />
          <Button asChild>
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
      <DashboardPageMain className="py-6">
        <div className="space-y-6">
          {/* Estatísticas de Links */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Links Criados
                </CardTitle>
                <LinkIcon className="text-primary h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalLinks}</div>
                <p className="text-muted-foreground text-xs">
                  Total de links na sua conta
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Desempenho
                </CardTitle>
                <ChartBarIcon className="text-primary h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {((totalLinks / 10) * 100).toFixed(1)}%
                </div>
                <p className="text-muted-foreground text-xs">
                  Progresso de criação de links
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clicks</CardTitle>
                <MousePointerClickIcon className="text-primary h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClicks}</div>
                <p className="text-muted-foreground text-xs">
                  Total de cliques em todos os links sociais
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Uso do Plano atual
                </CardTitle>
                <CreditCard className="text-primary h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {plan.quota.LINKS.usage}%
                </div>
                <p className="text-muted-foreground text-xs">
                  seu plano atual é{" "}
                  <span className="text-white uppercase">{plan.name}</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Links */}
          <Card>
            <CardHeader>
              <CardTitle>Seus Links Criados</CardTitle>
            </CardHeader>
            <CardContent>
              {links.length === 0 ? (
                <div className="text-muted-foreground py-4 text-center">
                  Você ainda não criou nenhum link
                </div>
              ) : (
                <div className="space-y-4">
                  {links.map((link) => (
                    <LinkItem
                      key={link.id}
                      id={link.id as string}
                      title={link.title || ""}
                      slug={link.slug}
                      description={link.description}
                      isPrimary={link.isPrimary}
                      userId={link.userId}
                      socialLinksJson={
                        typeof link.socialLinksJson === "string"
                          ? JSON.parse(link.socialLinksJson)
                          : []
                      }
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  );
}
