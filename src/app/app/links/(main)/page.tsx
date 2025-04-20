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
import { LinkItem } from "./_components/link-item";
import NotificationLinks from "../../(main)/_components/notification-links";

export default async function Page() {
  const links = await getLinksByUser();

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Meus Links</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <NotificationLinks />
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
                      isPrimary={link.isPrimary}
                      userId={link.userId}
                      description={link.description}
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
