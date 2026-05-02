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
import { TrendingUp } from "lucide-react";
import type { TopUrlData } from "./chart-utils";

const chartConfig = {
  clicks: {
    label: "Cliques",
    color: "oklch(0.51 0.2 17)",
  },
} satisfies ChartConfig;

export function TopUrlsChart({ data }: { data: TopUrlData[] }) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="text-primary h-4 w-4" />
            URLs Mais Clicadas
          </CardTitle>
          <CardDescription>
            Top 5 links sociais com mais cliques
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
          <TrendingUp className="text-primary h-4 w-4" />
          URLs Mais Clicadas
        </CardTitle>
        <CardDescription>Top 5 links sociais com mais cliques</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart
            data={data}
            margin={{ left: 0, right: 16, top: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) => {
                    const item = payload?.[0]?.payload as
                      | TopUrlData
                      | undefined;
                    return item?.fullUrl || "";
                  }}
                />
              }
            />
            <Bar
              dataKey="clicks"
              fill="var(--color-clicks)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
