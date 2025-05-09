import Link from "next/link";
import { cn } from "../_lib/utils";

export type DashboardSidebarGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function DashboardSidebar({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <aside
      className={cn([
        "border-border bg-secondary/20 flex flex-col space-y-6 border-r",
        className,
      ])}
    >
      {children}
    </aside>
  );
}

export function DashboardSidebarHeader({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <header
      className={cn(["border-border flex h-16 items-center px-6", className])}
    >
      {children}
    </header>
  );
}

export function DashboardSidebarHeaderTitle({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <h2 className={cn(["", className])}>{children}</h2>;
}

export function DashboardSidebarMain({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <main className={cn(["", className])}>{children}</main>;
}

export function DashboardSidebarNav({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <nav className={cn(["px-3", className])}>{children}</nav>;
}

export function DashboardSidebarNavHeader({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <header className={cn(["", className])}>{children}</header>;
}

export function DashboardSidebarNavHeaderTitle({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <div
      className={cn([
        "text-muted-foreground ml-3 text-[0.6rem] uppercase",
        className,
      ])}
    >
      {children}
    </div>
  );
}

export function DashboardSidebarNavMain({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <main className={cn(["flex flex-col", className])}>{children}</main>;
}

type DashboardSidebarNavLinkProps = {
  href: string;
  active?: boolean;
};

export function DashboardSidebarNavLink({
  className,
  children,
  href,
  active,
}: DashboardSidebarGenericProps<DashboardSidebarNavLinkProps>) {
  return (
    <Link
      href={href}
      className={cn([
        "flex items-center rounded-md px-3 py-2 text-xs",
        active && "bg-primary text-white",
        className,
      ])}
    >
      {children}
    </Link>
  );
}

export function DashboardSidebarFooter({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <footer className={cn(["border-border border-t p-2", className])}>
      {children}
    </footer>
  );
}
