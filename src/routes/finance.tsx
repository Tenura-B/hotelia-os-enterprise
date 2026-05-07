import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard, Stat, Pill } from "@/components/page-kit";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/finance")({
  head: () => ({ meta: [{ title: "Finance — HoteliaOS" }] }),
  component: FinancePage,
});

const cash = [
  { m: "Jan", in: 412, out: 318 },
  { m: "Feb", in: 384, out: 296 },
  { m: "Mar", in: 528, out: 372 },
  { m: "Apr", in: 612, out: 421 },
  { m: "May", in: 684, out: 458 },
];

const ebitda = cash.map((d) => ({ m: d.m, v: d.in - d.out }));

function FinancePage() {
  return (
    <AppShell
      title="Finance & accounting"
      subtitle="Cash flow, P&L and invoicing across all entities."
      actions={
        <>
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
          <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New invoice</Button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Revenue MTD" value="$684k" delta="+11%" trend="up" hint="vs. last month" />
        <Stat label="EBITDA" value="$226k" delta="+8%" trend="up" hint="margin 33%" />
        <Stat label="Receivables" value="$84.2k" hint="14 invoices · 6 over 30d" />
        <Stat label="Payables" value="$62.1k" hint="due in next 14 days" />
      </div>

      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard className="xl:col-span-2" title="Cash flow" desc="Inflows vs. outflows">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <AreaChart data={cash}>
                <defs>
                  <linearGradient id="ci" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="co" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="m" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }} />
                <Area type="monotone" dataKey="in" stroke="var(--teal)" fill="url(#ci)" strokeWidth={2} />
                <Area type="monotone" dataKey="out" stroke="var(--color-primary)" fill="url(#co)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="EBITDA trend" desc="Last 5 months">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <LineChart data={ebitda}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="m" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} width={32} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }} />
                <Line type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--color-primary)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard className="mt-5" title="Recent invoices">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-[11px]">Invoice</TableHead>
              <TableHead className="text-[11px]">Client</TableHead>
              <TableHead className="text-[11px]">Issued</TableHead>
              <TableHead className="text-[11px]">Due</TableHead>
              <TableHead className="text-[11px]">Status</TableHead>
              <TableHead className="text-[11px] text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["INV-9821", "Bennett Group", "May 1", "May 31", "Paid", "$12,840"],
              ["INV-9820", "Tanaka Holdings", "Apr 28", "May 28", "Sent", "$8,420"],
              ["INV-9819", "Haddad Family Office", "Apr 22", "May 22", "Sent", "$36,210"],
              ["INV-9818", "Laurent SARL", "Apr 18", "Apr 28", "Overdue", "$4,810"],
              ["INV-9817", "Reyes Travel Co.", "Apr 14", "May 14", "Paid", "$1,640"],
            ].map(([i, c, is, d, s, a]) => (
              <TableRow key={i} className="border-border">
                <TableCell className="py-3 text-[12.5px] font-medium">{i}</TableCell>
                <TableCell className="text-[12.5px]">{c}</TableCell>
                <TableCell className="text-[12px] text-muted-foreground">{is}</TableCell>
                <TableCell className="text-[12px] text-muted-foreground">{d}</TableCell>
                <TableCell>
                  <Pill tone={s === "Paid" ? "success" : s === "Overdue" ? "danger" : "neutral"}>{s}</Pill>
                </TableCell>
                <TableCell className="text-right text-[12.5px] font-semibold">{a}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </AppShell>
  );
}