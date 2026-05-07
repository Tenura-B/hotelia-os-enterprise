import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard, Stat, Pill } from "@/components/page-kit";
import { Button } from "@/components/ui/button";
import { BedDouble, DoorOpen, KeyRound, Plus } from "lucide-react";

export const Route = createFileRoute("/hotel")({
  head: () => ({
    meta: [
      { title: "Hotel operations — HoteliaOS" },
      { name: "description", content: "Live room status, floor plan and operational checks." },
    ],
  }),
  component: HotelPage,
});

const states = ["clean", "dirty", "occupied", "ooo"] as const;
type S = (typeof states)[number];
const tone: Record<S, string> = {
  clean: "bg-accent text-primary border border-accent",
  dirty: "bg-[color:oklch(0.92_0.08_75)] text-[color:oklch(0.4_0.1_60)]",
  occupied: "bg-primary text-primary-foreground",
  ooo: "bg-destructive/10 text-destructive border border-destructive/20",
};
const label: Record<S, string> = {
  clean: "Clean",
  dirty: "Dirty",
  occupied: "Occupied",
  ooo: "OOO",
};

function HotelPage() {
  const floors = [3, 4, 5];
  const seed = (i: number): S => states[(i * 7) % 4];

  return (
    <AppShell
      title="Hotel operations"
      subtitle="Aurelia Riviera · 142 keys · live room status"
      actions={
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> Add room
        </Button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Occupied" value="118" hint="83% of inventory" delta="+4" trend="up" />
        <Stat label="Available" value="19" hint="ready to sell" />
        <Stat label="Out of order" value="5" hint="under maintenance" trend="down" delta="-1" />
        <Stat label="Avg LOS" value="3.4 nights" hint="this week" />
      </div>

      <SectionCard className="mt-5" title="Floor plan" desc="Tap a room to see status & guest profile">
        <div className="space-y-5">
          {floors.map((f) => (
            <div key={f}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] font-semibold text-foreground">Floor {f}</p>
                <p className="text-[10.5px] text-muted-foreground">20 keys · West wing</p>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                {Array.from({ length: 20 }).map((_, i) => {
                  const s = seed(f * 20 + i);
                  return (
                    <button
                      key={i}
                      className={
                        "aspect-square rounded-md text-[10.5px] font-medium grid place-items-center transition hover:scale-[1.03] " +
                        tone[s]
                      }
                    >
                      {f}
                      {String(i + 1).padStart(2, "0")}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/60">
            {states.map((s) => (
              <Pill
                key={s}
                tone={
                  s === "clean"
                    ? "success"
                    : s === "occupied"
                      ? "primary"
                      : s === "ooo"
                        ? "danger"
                        : "warn"
                }
              >
                {label[s]}
              </Pill>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Today's checklist" desc="Front-office shift">
          {[
            "Verify all VIP arrivals & welcome notes",
            "Audit safe-deposit boxes",
            "Confirm shuttle schedule with concierge",
            "Cross-check no-show bookings",
          ].map((t, i) => (
            <label
              key={i}
              className="flex items-start gap-2 py-2 text-[12.5px] text-foreground"
            >
              <input type="checkbox" defaultChecked={i < 2} className="mt-0.5 accent-[color:var(--teal)]" />
              <span className={i < 2 ? "line-through text-muted-foreground" : ""}>{t}</span>
            </label>
          ))}
        </SectionCard>

        <SectionCard title="Key cards issued" desc="Last 24h">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent">
              <KeyRound className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">96</p>
              <p className="text-[11px] text-muted-foreground">+12 vs. yesterday</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-[12px]">
            {[
              ["Standard", 64],
              ["Suite access", 22],
              ["Spa", 10],
            ].map(([n, v]) => (
              <div key={n as string} className="flex justify-between">
                <span className="text-muted-foreground">{n}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Walk-ins" desc="Likelihood next 4h">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent">
              <DoorOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">~14</p>
              <p className="text-[11px] text-muted-foreground">8 rooms reserved for walk-ins</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-accent/60 p-3 text-[11.5px] text-foreground">
            <BedDouble className="inline h-3.5 w-3.5 mr-1 text-primary" />
            Recommend holding 4 Deluxe King for high ADR walk-ins.
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}