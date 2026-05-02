"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { cn } from "@/app/_lib/utils";

export interface NavSection {
  label: string;
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function NavMain({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname();

  return (
    <>
      {sections.map((section) => (
        <SidebarGroup key={section.label}>
          <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) => {
              const isActive =
                pathname === item.url ||
                (item.url !== "/app" && pathname.startsWith(item.url));

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                    className={cn(
                      "relative transition-all duration-200",
                      isActive && [
                        "bg-primary/10 text-primary font-semibold",
                        "hover:bg-primary/15 hover:text-primary",
                        "before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2",
                        "before:bg-primary before:h-5 before:w-[3px] before:rounded-full",
                      ],
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon
                        className={cn(
                          "transition-colors duration-200",
                          isActive && "text-primary",
                        )}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
