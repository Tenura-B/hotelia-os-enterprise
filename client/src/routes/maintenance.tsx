import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard, Stat, Pill } from "@/components/page-kit";
import { Button } from "@/components/ui/button";
import { Plus, Wrench } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/maintenance")({
  head: () => ({ meta: [{ title: "Maintenance — HoteliaOS" }] }),
  component: MaintenancePage,
});

const tickets = [
  ["MX-2104", "AC unit cycling", "Room 412", "High", "Open", "Daniel O."],
  ["MX-2103", "Pool pH calibration", "Spa", "Med", "In progress", "Liam W."],
  ["MX-2099", "Sliding door sensor", "Lobby", "Low", "In progress", "Aiko S."],
  ["MX-2095", "Elevator B vibration", "Tower B", "High", "Vendor", "Otis Co."],
  ["MX-2089", "Mini-bar lock jammed", "Room 207", "Low", "Open", "Sofia R."],
  ["MX-2080", "Boiler 02 efficiency drop", "Plant", "Critical", "Vendor", "Cofely"],
];

function MaintenancePage() {
  return (
    <AppShell
      title="Maintenance"
      subtitle="Preventive plans, work orders and SLA tracking."
      actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New ticket</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Open tickets" value="14" delta="-2" trend="up" hint="3 priority" />
        <Stat label="MTTR" value="3h 12m" delta="-22 min" trend="up" hint="last 30 days" />
        <Stat label="Preventive due" value="9" hint="this week" />
        <Stat label="Vendor jobs" value="4" hint="external contractors" />
      </div>

      <SectionCard className="mt-5" title="Active work orders">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-[11px]">Ticket</TableHead>
              <TableHead className="text-[11px]">Issue</TableHead>
              <TableHead className="text-[11px]">Location</TableHead>
              <TableHead className="text-[11px]">Priority</TableHead>
              <TableHead className="text-[11px]">Status</TableHead>
              <TableHead className="text-[11px]">Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map(([id, t, loc, pr, st, a]) => (
              <TableRow key={id} className="border-border">
                <TableCell className="py-3 text-[12.5px] font-medium">{id}</TableCell>
                <TableCell className="text-[12.5px]">{t}</TableCell>
                <TableCell className="text-[12.5px] text-muted-foreground">{loc}</TableCell>
                <TableCell>
                  <Pill tone={pr === "Critical" ? "danger" : pr === "High" ? "warn" : "neutral"}>{pr}</Pill>
                </TableCell>
                <TableCell>
                  <Pill tone={st === "Open" ? "neutral" : st === "Vendor" ? "accent" : "primary"}>{st}</Pill>
                </TableCell>
                <TableCell className="text-[12.5px]">{a}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Asset health" desc="Top 5 monitored systems">
          {[
            ["HVAC Tower A", 92],
            ["Boiler 02", 64],
            ["Spa pumps", 88],
            ["Elevators", 71],
            ["Kitchen extraction", 95],
          ].map(([n, v]) => (
            <div key={n as string} className="py-2 border-b border-border last:border-0">
              <div className="flex justify-between text-[12.5px]">
                <span>{n}</span>
                <span className="font-medium">{v}%</span>
              </div>
              <div className="h-1.5 mt-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: `${v}%`,
                    backgroundColor: (v as number) < 70 ? "var(--color-destructive)" : "var(--teal)",
                  }}
                />
              </div>
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Upcoming preventive" desc="Next 7 days">
          {[
            ["Mon", "Boiler annual service", "Plant"],
            ["Tue", "Spa filter swap", "Spa"],
            ["Wed", "Elevator inspection", "Tower B"],
            ["Thu", "Fire alarm drill", "All zones"],
            ["Fri", "Kitchen deep clean", "Maison Côte"],
          ].map(([d, t, l]) => (
            <div key={t as string} className="flex items-center gap-3 py-2 border-b border-border last:border-0 text-[12.5px]">
              <span className="grid h-8 w-10 place-items-center rounded-md bg-accent text-[10.5px] font-semibold text-primary">{d}</span>
              <div className="flex-1">
                <p className="font-medium">{t}</p>
                <p className="text-[10.5px] text-muted-foreground">{l}</p>
              </div>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </SectionCard>
      </div>
    </AppShell>
  );
}