import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard, Stat, Pill } from "@/components/page-kit";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export const Route = createFileRoute("/hrm")({
  head: () => ({ meta: [{ title: "HRM — HoteliaOS" }] }),
  component: HRMPage,
});

const staff = [
  ["Camille Roche", "Front office · Manager", "Aurelia Riviera", "Active", "08:02"],
  ["Daniel Okafor", "Maintenance · Lead", "Aurelia Riviera", "Active", "07:48"],
  ["Sofia Russo", "Housekeeping", "Tower A", "Active", "06:55"],
  ["Aiko Sato", "Housekeeping", "Tower A", "Active", "07:01"],
  ["Liam Walsh", "Maintenance", "Plant", "Late", "09:12"],
  ["Marie Dubois", "Housekeeping", "Tower B", "Off duty", "—"],
  ["Noor Khan", "F&B · Captain", "Maison Côte", "Active", "16:00"],
];

function HRMPage() {
  return (
    <AppShell
      title="People & HRM"
      subtitle="Staff directory, attendance, payroll status and performance."
      actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Add employee</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Active staff" value="412" hint="across all properties" />
        <Stat label="Present today" value="364" delta="+12" trend="up" hint="88% attendance" />
        <Stat label="Payroll due" value="$184,210" hint="May 15 · 8 days" />
        <Stat label="Open roles" value="9" hint="3 urgent" />
      </div>

      <SectionCard className="mt-5" title="Staff directory" desc="Filter by department, property, status">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-[11px]">Employee</TableHead>
              <TableHead className="text-[11px]">Role</TableHead>
              <TableHead className="text-[11px]">Property</TableHead>
              <TableHead className="text-[11px]">Status</TableHead>
              <TableHead className="text-[11px] text-right">Clock-in</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map(([n, r, p, s, t]) => (
              <TableRow key={n} className="border-border">
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-accent text-primary text-[10px]">
                        {n.split(" ").map((p) => p[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[12.5px] font-medium">{n}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[12px] text-muted-foreground">{r}</TableCell>
                <TableCell className="text-[12px]">{p}</TableCell>
                <TableCell>
                  <Pill tone={s === "Active" ? "success" : s === "Late" ? "warn" : "neutral"}>{s}</Pill>
                </TableCell>
                <TableCell className="text-right text-[12.5px] font-medium">{t}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Department headcount">
          {[
            ["Front office", 64],
            ["Housekeeping", 142],
            ["F&B", 118],
            ["Maintenance", 38],
            ["Admin & finance", 50],
          ].map(([n, v]) => (
            <div key={n as string} className="py-2 border-b border-border last:border-0">
              <div className="flex justify-between text-[12.5px]">
                <span>{n}</span>
                <span className="font-medium">{v}</span>
              </div>
              <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${((v as number) / 142) * 100}%` }} />
              </div>
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Leave requests" desc="Awaiting approval">
          {[
            ["Camille R.", "Annual leave", "May 20 – 27"],
            ["Sofia R.", "Sick leave", "Tomorrow"],
            ["Liam W.", "Personal", "May 12"],
          ].map(([n, t, d]) => (
            <div key={n as string} className="flex items-center justify-between py-2.5 border-b border-border last:border-0 text-[12.5px]">
              <div>
                <p className="font-medium">{n}</p>
                <p className="text-[10.5px] text-muted-foreground">{t} · {d}</p>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" className="h-7 text-[11px]">Decline</Button>
                <Button size="sm" className="h-7 text-[11px]">Approve</Button>
              </div>
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Top performers" desc="This quarter">
          {[
            ["Camille Roche", "Front office", "98%"],
            ["Aiko Sato", "Housekeeping", "96%"],
            ["Noor Khan", "F&B", "94%"],
            ["Daniel Okafor", "Maintenance", "92%"],
          ].map(([n, d, s]) => (
            <div key={n as string} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                  {(n as string).split(" ").map((p) => p[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-[12.5px] font-medium">{n}</p>
                <p className="text-[10.5px] text-muted-foreground">{d}</p>
              </div>
              <span className="text-[12.5px] font-semibold text-[color:var(--teal)]">{s}</span>
            </div>
          ))}
        </SectionCard>
      </div>
    </AppShell>
  );
}