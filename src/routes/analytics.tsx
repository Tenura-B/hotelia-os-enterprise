import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard, Stat } from "@/components/page-kit";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — HoteliaOS" }] }),
  component: AnalyticsPage,
});

const adr = [
  { d: "Jan", h: 264, r: 412 },
  { d: "Feb", h: 248, r: 388 },
  { d: "Mar", h: 296, r: 432 },
  { d: "Apr", h: 312, r: 478 },
  { d: "May", h: 332, r: 502 },
];

const segments = [
  { name: "Leisure", value: 48 },
  { name: "Corporate", value: 22 },
  { name: "Groups", value: 18 },
  { name: "MICE", value: 12 },
];

const colors = ["var(--color-primary)", "var(--teal)", "oklch(0.78 0.12 75)", "oklch(0.62 0.15 30)"];

function AnalyticsPage() {
  return (
    <AppShell
      title="Analytics"
      subtitle="Cross-property performance and benchmarks."
      actions={<Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export PDF</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="ADR" value="$312" delta="+4.1%" trend="up" />
        <Stat label="RevPAR" value="$269" delta="+6.2%" trend="up" />
        <Stat label="GOPPAR" value="$118" delta="+3.4%" trend="up" />
        <Stat label="LOS" value="3.4n" delta="+0.2" trend="up" />
      </div>

      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard className="xl:col-span-2" title="ADR by property type" desc="Last 5 months">
          <div className="h-[280px]">
            <ResponsiveContainer>
              <BarChart data={adr}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="d" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="h" fill="var(--color-primary)" radius={[6, 6, 0, 0]} name="Hotels" />
                <Bar dataKey="r" fill="var(--teal)" radius={[6, 6, 0, 0]} name="Resorts" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Guest segments" desc="Share of revenue">
          <div className="h-[220px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={segments} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {segments.map((_, i) => (
                    <Cell key={i} fill={colors[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5">
            {segments.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: colors[i] }} />
                  {s.name}
                </span>
                <span className="font-medium">{s.value}%</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}