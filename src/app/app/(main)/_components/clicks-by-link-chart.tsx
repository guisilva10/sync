"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { BarChart3 } from "lucide-react";

interface ClicksByLinkData {
  name: string;
  clicks: number;
}

const chartConfig = {
  clicks: {
    label: "Cliques",
    color: "oklch(0.51 0.2 17)",
  },
} satisfies ChartConfig;

export function ClicksByLinkChart({ data }: { data: ClicksByLinkData[] }) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="text-primary h-4 w-4" />
            Cliques por Link
          </CardTitle>
          <CardDescription>
            Distribuição de cliques entre seus links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex h-[200px] items-center justify-center text-sm">
            Nenhum clique registrado ainda
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="text-primary h-4 w-4" />
          Cliques por Link
        </CardTitle>
        <CardDescription>
          Distribuição de cliques entre seus links
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 0, right: 16, top: 0, bottom: 0 }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              width={100}
              tick={{ fontSize: 12 }}
            />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="clicks"
              fill="var(--color-clicks)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
