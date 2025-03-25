import { PropsWithChildren } from "react";

import { auth } from "@/services/auth";
import { MainSidebar } from "./_components/main-sidebar";
import { SidebarInset, SidebarProvider } from "../_components/ui/sidebar";
import { SiteHeader } from "../_components/site-header";

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <MainSidebar user={session?.user} />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
