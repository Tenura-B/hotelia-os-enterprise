import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard, Stat, Pill } from "@/components/page-kit";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/housekeeping")({
  head: () => ({
    meta: [{ title: "Housekeeping — HoteliaOS" }, { name: "description", content: "Live room cleaning board, assignments and SLAs." }],
  }),
  component: HousekeepingPage,
});

const cols = [
  { k: "Dirty", tone: "warn" as const, items: ["207", "208", "311", "412", "418", "501"] },
  { k: "In progress", tone: "primary" as const, items: ["202 · Marie", "318 · Sofia", "504 · Daniel"] },
  { k: "Inspection", tone: "accent" as const, items: ["201 · Léa", "405"] },
  { k: "Clean", tone: "success" as const, items: ["101", "102", "103", "204", "210", "302", "317"] },
];

function HousekeepingPage() {
  return (
    <AppShell title="Housekeeping" subtitle="Real-time cleaning board · Tower A">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Rooms cleaned" value="48" hint="of 60 today" delta="+12" trend="up" />
        <Stat label="Avg turnaround" value="34 min" delta="-2 min" trend="up" hint="SLA: 40 min" />
        <Stat label="Linen change" value="29" hint="full + spa towels" />
        <Stat label="Lost & found" value="3" hint="logged this week" />
      </div>

      <SectionCard className="mt-5" title="Cleaning board" desc="Drag rooms between stages">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {cols.map((c) => (
            <div key={c.k} className="rounded-xl bg-background/60 border border-border p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] font-semibold">{c.k}</p>
                <Pill tone={c.tone}>{c.items.length}</Pill>
              </div>
              <div className="space-y-2">
                {c.items.map((i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-card px-2.5 py-2 text-[12px] shadow-soft"
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard className="mt-5" title="Staff assignments" desc="Tower A · Morning shift">
        {[
          ["Marie Dubois", 12, 8],
          ["Sofia Russo", 14, 11],
          ["Daniel Okafor", 10, 6],
          ["Aiko Sato", 13, 13],
          ["Liam Walsh", 9, 4],
        ].map(([n, total, done]) => {
          const pct = ((done as number) / (total as number)) * 100;
          return (
            <div key={n as string} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-accent text-primary text-[10px]">
                  {(n as string).split(" ").map((p) => p[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-[12.5px]">
                  <span className="font-medium">{n}</span>
                  <span className="text-muted-foreground">{done}/{total} rooms</span>
                </div>
                <Progress value={pct} className="h-1 mt-1.5 bg-muted [&>div]:bg-[color:var(--teal)]" />
              </div>
            </div>
          );
        })}
      </SectionCard>
    </AppShell>
  );
}