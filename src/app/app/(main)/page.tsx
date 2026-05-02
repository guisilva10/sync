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
  CreditCard,
  MousePointerClickIcon,
  TrophyIcon,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { getLinksByUser } from "@/features/links/presentation/actions";
import Link from "next/link";
import { auth } from "@/services/auth";
import { getUserCurrentPlan } from "@/services/stripe";
import { LinkItem } from "../links/(main)/_components/link-item";
import { ClicksByLinkChart } from "./_components/clicks-by-link-chart";
import { ClicksByPlatformChart } from "./_components/clicks-by-platform-chart";
import { TopUrlsChart } from "./_components/top-urls-chart";
import { buildPlatformData, buildTopUrlsData } from "./_components/chart-utils";

export default async function Page() {
  const links = await getLinksByUser();
  const session = await auth();
  const plan = await getUserCurrentPlan(session?.user.id as string);

  const totalLinks = links.length;

  const totalClicks = links.reduce((acc, link) => {
    const linkClicksSum = link.linkClicks.reduce(
      (sum, click) => sum + click.clicks,
      0,
    );
    return acc + linkClicksSum;
  }, 0);

  // Dados para graficos
  const clicksByLink = links
    .map((link) => ({
      name: link.title || link.slug || "Sem título",
      clicks: link.linkClicks.reduce((sum, c) => sum + c.clicks, 0),
    }))
    .filter((d) => d.clicks > 0)
    .sort((a, b) => b.clicks - a.clicks);

  const clicksByPlatform = buildPlatformData(links);
  const topUrls = buildTopUrlsData(links);

  // Top link (mais clicado)
  const topLink = clicksByLink.length > 0 ? clicksByLink[0] : null;

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Visão Geral</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav className="flex items-center">
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
          {/* Stat Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                <CardTitle className="text-sm font-medium">Cliques</CardTitle>
                <MousePointerClickIcon className="text-primary h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClicks}</div>
                <p className="text-muted-foreground text-xs">
                  Total de cliques em todos os links
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Link</CardTitle>
                <TrophyIcon className="text-primary h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="truncate text-2xl font-bold">
                  {topLink ? topLink.name : "—"}
                </div>
                <p className="text-muted-foreground text-xs">
                  {topLink
                    ? `${topLink.clicks} cliques`
                    : "Nenhum clique ainda"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Plano Atual
                </CardTitle>
                <CreditCard className="text-primary h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {plan.quota.LINKS.usage}%
                </div>
                <p className="text-muted-foreground text-xs">
                  Plano{" "}
                  <span className="font-semibold uppercase">{plan.name}</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Graficos */}
          {totalClicks > 0 && (
            <>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ClicksByLinkChart data={clicksByLink} />
                <ClicksByPlatformChart data={clicksByPlatform} />
              </div>
              <TopUrlsChart data={topUrls} />
            </>
          )}

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
