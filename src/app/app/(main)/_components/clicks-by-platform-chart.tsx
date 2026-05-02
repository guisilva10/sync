"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { PieChartIcon } from "lucide-react";
import type { PlatformData } from "./chart-utils";

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  twitter: "Twitter",
  youtube: "YouTube",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  github: "GitHub",
  whatsapp: "WhatsApp",
  portfolio: "Portfólio",
  other: "Outro",
};

function buildPlatformChartConfig(data: PlatformData[]): ChartConfig {
  const config: ChartConfig = {};
  data.forEach((item) => {
    config[item.platform] = {
      label: PLATFORM_LABELS[item.platform] || item.platform,
      color: item.fill,
    };
  });
  return config;
}

export function ClicksByPlatformChart({ data }: { data: PlatformData[] }) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PieChartIcon className="text-primary h-4 w-4" />
            Cliques por Plataforma
          </CardTitle>
          <CardDescription>Distribuição por rede social</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex h-[200px] items-center justify-center text-sm">
            Nenhum clique registrado ainda
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartConfig = buildPlatformChartConfig(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <PieChartIcon className="text-primary h-4 w-4" />
          Cliques por Plataforma
        </CardTitle>
        <CardDescription>Distribuição por rede social</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="clicks"
              nameKey="platform"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={2}
              stroke="hsl(var(--background))"
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="platform" />}
              className="flex-wrap gap-2 text-xs"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
