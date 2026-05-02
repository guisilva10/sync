import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/app/_components/page-dashboard";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import Link from "next/link";
import { CrownIcon, ArrowLeftIcon } from "lucide-react";
import { auth } from "@/services/auth";
import { getUserCurrentPlan } from "@/services/stripe";
import { getLinksByUser } from "@/features/links/presentation/actions";
import { CustomizeForm } from "./_components/customize-form";

export default async function Page() {
  const session = await auth();
  const plan = await getUserCurrentPlan(session?.user?.id as string);
  const isPro = plan?.name === "pro";

  if (!isPro) {
    return (
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>Personalizar Link</DashboardPageHeaderTitle>
        </DashboardPageHeader>
        <DashboardPageMain className="mx-auto flex w-full flex-col items-center justify-center gap-8 py-12">
          <Card className="w-full max-w-lg border shadow-lg">
            <CardContent className="space-y-6 pt-8 text-center">
              <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                <CrownIcon className="text-primary size-8" />
              </div>
              <div>
                <Badge variant="outline" className="text-primary mb-2 text-sm">
                  Exclusivo Pro
                </Badge>
                <h2 className="text-2xl font-bold">Funcionalidade Premium</h2>
              </div>
              <p className="text-muted-foreground">
                Personalize seus links com imagem de fundo no header e layout em
                grid. Disponível exclusivamente para assinantes Pro.
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild>
                  <Link href="/app/billing">Fazer Upgrade Pro</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/app">
                    <ArrowLeftIcon className="mr-1 size-4" />
                    Voltar ao Dashboard
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </DashboardPageMain>
      </DashboardPage>
    );
  }

  const links = await getLinksByUser();

  const linksForForm = (links ?? []).map((link) => ({
    id: link.id,
    title: link.title || "Sem título",
    slug: link.slug || "",
    headerImage: link.headerImage || null,
    layout: (link.layout as "default" | "grid") || "default",
    image: link.image || null,
    description: link.description || null,
    theme: link.theme || "light-normal",
    socialLinksJson: Array.isArray(link.socialLinksJson)
      ? (link.socialLinksJson as { title: string; url: string }[])
      : [],
  }));

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Personalizar Link</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain className="py-6">
        {linksForForm.length === 0 ? (
          <Card className="w-full max-w-lg border shadow-lg">
            <CardContent className="space-y-4 pt-8 text-center">
              <p className="text-muted-foreground">
                Você ainda não tem nenhum link. Crie um primeiro!
              </p>
              <Button asChild>
                <Link href="/app/links/new">Criar Link</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <CustomizeForm links={linksForForm} />
        )}
      </DashboardPageMain>
    </DashboardPage>
  );
}
