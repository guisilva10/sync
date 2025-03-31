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
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getLinksByUser } from "../../actions";
import { LinkItem } from "./_components/link-item"; // Importe o novo componente

export default async function Page() {
  const links = await getLinksByUser();

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Meus Links</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <Button asChild>
            <Link
              href="/app/links/new"
              className="flex items-center justify-center"
            >
              Criar Link
              <PlusIcon className="size-4" />
            </Link>
          </Button>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain className="py-12">
        <div className="space-y-6">
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
                      socialLinksJson={
                        Array.isArray(link.socialLinksJson)
                          ? link.socialLinksJson
                              .filter((link) => link !== null)
                              .map((link) => link.toString())
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
