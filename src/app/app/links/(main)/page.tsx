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

import { PencilRulerIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

import Link from "next/link";
import { getLinksByUser } from "../../actions";

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
                    <div
                      key={link.id}
                      className="flex items-center justify-between border-b pb-2 last:border-b-0"
                    >
                      <div>
                        <p className="font-medium">{link.title}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <PencilRulerIcon />
                        </Button>
                        <Button size="sm">
                          <Trash2Icon />
                        </Button>
                      </div>
                    </div>
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
