import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard, Stat, Pill } from "@/components/page-kit";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Tenants — HoteliaOS Admin" }] }),
  component: AdminPage,
});

const tenants = [
  ["Aurelia Hotels", "Group · 12 properties", "Enterprise", "Active", "412", "$184k"],
  ["Maison Côte Resorts", "Resort · 4 properties", "Business", "Active", "184", "$92k"],
  ["Olive & Thyme Bistro", "Restaurant · 6 outlets", "Business", "Active", "62", "$38k"],
  ["Casa Azul Villas", "Villa · 12 keys", "Starter", "Trial", "14", "$0"],
  ["Oryx Boutique", "Hotel · 1 property", "Starter", "Suspended", "8", "$2k"],
];

function AdminPage() {
  return (
    <AppShell
      title="SaaS tenants"
      subtitle="Multi-tenant control plane · monitor health, plans and usage."
      actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New tenant</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Tenants" value="48" delta="+3" trend="up" hint="2 trials this week" />
        <Stat label="MRR" value="$214k" delta="+8%" trend="up" hint="net new $18k" />
        <Stat label="Churn (30d)" value="1.2%" delta="-0.4%" trend="up" hint="industry: 3.1%" />
        <Stat label="Platform uptime" value="99.98%" hint="SLA: 99.9%" />
      </div>

      <SectionCard className="mt-5" title="All tenants">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-[11px]">Tenant</TableHead>
              <TableHead className="text-[11px]">Type</TableHead>
              <TableHead className="text-[11px]">Plan</TableHead>
              <TableHead className="text-[11px]">Status</TableHead>
              <TableHead className="text-[11px]">Seats</TableHead>
              <TableHead className="text-[11px] text-right">MRR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map(([n, t, p, s, seats, mrr]) => (
              <TableRow key={n} className="border-border">
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground text-[10px] font-semibold">
                      {n[0]}
                    </span>
                    <span className="text-[12.5px] font-medium">{n}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[12px] text-muted-foreground">{t}</TableCell>
                <TableCell><Pill tone={p === "Enterprise" ? "primary" : p === "Business" ? "accent" : "neutral"}>{p}</Pill></TableCell>
                <TableCell><Pill tone={s === "Active" ? "success" : s === "Trial" ? "warn" : "danger"}>{s}</Pill></TableCell>
                <TableCell className="text-[12.5px]">{seats}</TableCell>
                <TableCell className="text-right text-[12.5px] font-semibold">{mrr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </AppShell>
  );
}