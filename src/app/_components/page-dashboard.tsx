import { cn } from "@/app/_lib/utils";

export type DashboardPageGenericProps<T = unknown> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function DashboardPage({
  className,
  children,
}: DashboardPageGenericProps) {
  return <section className={cn(["h-screen", className])}>{children}</section>;
}

export function DashboardPageHeader({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <header
      className={cn([
        "border-border flex h-14 items-center justify-between border-b px-2",
        className,
      ])}
    >
      {children}
    </header>
  );
}

export function DashboardPageHeaderTitle({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <span
      className={cn(["text-muted-foreground text-xs uppercase", className])}
    >
      {children}
    </span>
  );
}

export function DashboardPageHeaderNav({
  className,
  children,
}: DashboardPageGenericProps) {
  return <nav className={cn(["", className])}>{children}</nav>;
}

export function DashboardPageMain({
  className,
  children,
}: DashboardPageGenericProps) {
  return <main className={cn(["", className])}>{children}</main>;
}
