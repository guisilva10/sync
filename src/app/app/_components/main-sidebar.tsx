"use client";

import {
  DashboardSidebar,
  DashboardSidebarFooter,
} from "@/app/_components/app-sidebar";

import {
  CompassIcon,
  LayoutDashboard,
  LifeBuoy,
  Link2Icon,
  Paintbrush,
  Projector,
  Send,
} from "lucide-react";

import { Session } from "next-auth";
import { NavUser } from "@/app/_components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { NavMain } from "@/app/_components/nav-main";

type MainSidebarProps = {
  user: Session["user"] | undefined;
};

export function MainSidebar({ user }: MainSidebarProps) {
  const data = {
    navMain: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        isActive: true,
        items: [
          {
            title: "Home",
            url: "/app",
          },
        ],
      },
      {
        title: "Links",
        url: "/app/links",
        icon: Link2Icon,
        items: [
          {
            title: "Meus Links",
            url: "/app/links",
          },
          {
            title: "Adicionar Link",
            url: "/app/links/new",
          },
        ],
      },
      {
        title: "Aparência",
        icon: Paintbrush,
        items: [
          {
            title: "Temas",
            url: "/app/appearence/themes",
          },
          {
            title: "Personalizar",
            url: "/app/appearence/customize",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
    project: [
      {
        name: "Link-1",
        url: "#",
        icon: Projector,
      },
    ],
  };

  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
      <DashboardSidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <div>
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <CompassIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">SYNC</span>
                    <span className="text-muted-foreground truncate text-xs">
                      Enterprise
                    </span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <DashboardSidebarFooter>
          <NavUser user={user} />
        </DashboardSidebarFooter>
      </DashboardSidebar>
    </Sidebar>
  );
}
