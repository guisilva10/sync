"use client";

import * as React from "react";
import {
  BarChart3,
  CompassIcon,
  LayoutDashboard,
  LifeBuoy,
  Link2Icon,
  Paintbrush,
  Plug,
  Projector,
  Send,
} from "lucide-react";

import { NavMain } from "@/app/_components/nav-main";
import { NavProjects } from "@/app/_components/nav-projects";
import { NavSecondary } from "@/app/_components/nav-secondary";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { NavUser } from "./nav-user";

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
      url: "#",
      icon: Link2Icon,
      items: [
        {
          title: "Meus Links",
          url: "#",
        },
        {
          title: "Adicionar Link",
          url: "#",
        },
      ],
    },
    {
      title: "Aparência",

      icon: Paintbrush,
      items: [
        {
          title: "Temas",
          url: "#",
        },
        {
          title: "Personalizar",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart3,
    },
    {
      title: "Integrações",

      icon: Plug,
      items: [
        {
          title: "Google Analytics",
          url: "#",
        },
        {
          title: "Meta Pixel",
          url: "#",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
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
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.project} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
