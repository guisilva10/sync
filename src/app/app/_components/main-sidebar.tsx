"use client";

import {
  DashboardSidebar,
  DashboardSidebarFooter,
} from "@/app/_components/app-sidebar";

import {
  CompassIcon,
  CreditCard,
  LayoutDashboard,
  Link2Icon,
  Paintbrush,
  PlusCircle,
  Palette,
  UserIcon,
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
import { NavMain, type NavSection } from "@/app/_components/nav-main";

type MainSidebarProps = {
  user: Session["user"] | undefined;
};

const sections: NavSection[] = [
  {
    label: "Geral",
    items: [
      {
        title: "Dashboard",
        url: "/app",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Links",
    items: [
      {
        title: "Meus Links",
        url: "/app/links",
        icon: Link2Icon,
      },
      {
        title: "Novo Link",
        url: "/app/links/new",
        icon: PlusCircle,
      },
    ],
  },
  {
    label: "Aparência",
    items: [
      {
        title: "Temas",
        url: "/app/appearence/themes",
        icon: Paintbrush,
      },
      {
        title: "Personalizar",
        url: "/app/appearence/customize",
        icon: Palette,
      },
    ],
  },
  {
    label: "Conta",
    items: [
      {
        title: "Perfil",
        url: "/app/account",
        icon: UserIcon,
      },
      {
        title: "Plano",
        url: "/app/billing",
        icon: CreditCard,
      },
    ],
  },
];

export function MainSidebar({ user }: MainSidebarProps) {
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
          <NavMain sections={sections} />
        </SidebarContent>
        <DashboardSidebarFooter>
          <NavUser user={user} />
        </DashboardSidebarFooter>
      </DashboardSidebar>
    </Sidebar>
  );
}
