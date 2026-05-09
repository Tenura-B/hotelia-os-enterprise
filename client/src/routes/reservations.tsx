import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard, Stat, Pill } from "@/components/page-kit";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, ChevronLeft, ChevronRight, Filter, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — HoteliaOS" },
      { name: "description", content: "Manage bookings, arrivals, departures and the rooming chart." },
    ],
  }),
  component: ReservationsPage,
});

const rooms = [
  "201 · Deluxe King",
  "202 · Deluxe King",
  "207 · Sea-view King",
  "318 · Twin Classic",
  "412 · Deluxe Suite",
  "501 · Junior Suite",
  "PH-1 · Penthouse",
  "V-03 · Garden Villa",
];

const blocks = [
  { row: 0, start: 1, len: 3, name: "O. Bennett", tone: "bg-primary text-primary-foreground" },
  { row: 1, start: 2, len: 4, name: "M. Chen", tone: "bg-[color:var(--teal)] text-primary-foreground" },
  { row: 2, start: 0, len: 5, name: "H. Tanaka", tone: "bg-accent text-primary border border-accent" },
  { row: 3, start: 4, len: 2, name: "M. Reyes", tone: "bg-primary text-primary-foreground" },
  { row: 4, start: 1, len: 6, name: "Group · Aurelia", tone: "bg-[color:var(--teal)] text-primary-foreground" },
  { row: 5, start: 5, len: 3, name: "S. Patel", tone: "bg-accent text-primary border border-accent" },
  { row: 6, start: 3, len: 4, name: "Y. Haddad · VIP", tone: "bg-primary text-primary-foreground" },
  { row: 7, start: 0, len: 7, name: "A. Laurent", tone: "bg-[color:var(--teal)] text-primary-foreground" },
];

function ReservationsPage() {
  const days = Array.from({ length: 14 }, (_, i) => i + 6);
  return (
    <AppShell
      title="Reservations"
      subtitle="Front-office cockpit for arrivals, in-house guests and the rooming chart."
      actions={
        <>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> New booking
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Arrivals today" value="38" delta="+6" trend="up" hint="12 VIP · 4 groups" />
        <Stat label="In-house" value="214" hint="86% occupancy" />
        <Stat label="Departures" value="42" delta="-3" trend="down" hint="9 late checkouts" />
        <Stat label="ADR" value="$312" delta="+4.1%" trend="up" hint="vs. last week" />
      </div>

      <SectionCard
        className="mt-5"
        title="Rooming chart"
        desc="Drag bookings to reassign · 14-day window"
        action={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Find guest…"
                className="h-8 w-44 rounded-md border border-border bg-background pl-7 pr-2 text-[12px] outline-none"
              />
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-[12px] text-muted-foreground">May 6 – 19</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <div className="min-w-[820px]">
            <div className="grid" style={{ gridTemplateColumns: "180px repeat(14, minmax(40px,1fr))" }}>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground py-2 px-2">
                Room
              </div>
              {days.map((d) => (
                <div
                  key={d}
                  className="text-center text-[10.5px] font-medium text-muted-foreground py-2 border-l border-border/60"
                >
                  {d}
                </div>
              ))}
            </div>
            {rooms.map((room, ri) => {
              const block = blocks.find((b) => b.row === ri);
              return (
                <div
                  key={room}
                  className="grid items-center border-t border-border/60 hover:bg-accent/20 transition"
                  style={{ gridTemplateColumns: "180px repeat(14, minmax(40px,1fr))" }}
                >
                  <div className="text-[12px] py-2.5 px-2 text-foreground">{room}</div>
                  {days.map((_, di) => (
                    <div key={di} className="h-10 border-l border-border/60 relative">
                      {block && block.start === di && (
                        <div
                          className={
                            "absolute inset-y-1.5 left-0.5 rounded-md px-2 text-[10.5px] font-medium flex items-center shadow-soft " +
                            block.tone
                          }
                          style={{ width: `calc(${block.len * 100}% - 4px)` }}
                        >
                          {block.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </SectionCard>

      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Today's arrivals" desc="Sorted by ETA" className="xl:col-span-2">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-[11px]">Guest</TableHead>
                <TableHead className="text-[11px]">Reservation</TableHead>
                <TableHead className="text-[11px]">ETA</TableHead>
                <TableHead className="text-[11px]">Room</TableHead>
                <TableHead className="text-[11px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Olivia Bennett", "RSV-48201", "14:20", "412", "Confirmed"],
                ["Hiroshi Tanaka", "RSV-48198", "15:05", "207", "Pre-paid"],
                ["Yara Haddad", "RSV-48177", "16:30", "PH-1", "VIP"],
                ["Marcus Reyes", "RSV-48184", "17:00", "318", "Awaiting"],
                ["Amélie Laurent", "RSV-48190", "18:45", "V-03", "Confirmed"],
              ].map(([g, r, t, room, s]) => (
                <TableRow key={r} className="border-border">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-accent text-primary text-[10px]">
                          {g.split(" ").map((p) => p[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[12.5px]">{g}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[12px] text-muted-foreground">{r}</TableCell>
                  <TableCell className="text-[12.5px] font-medium">{t}</TableCell>
                  <TableCell className="text-[12.5px]">{room}</TableCell>
                  <TableCell>
                    <Pill tone={s === "VIP" ? "primary" : s === "Awaiting" ? "neutral" : "success"}>
                      {s}
                    </Pill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard
          title="Channel mix"
          desc="Where today's bookings came from"
          action={<CalendarDays className="h-4 w-4 text-muted-foreground" />}
        >
          {[
            { n: "Direct (web)", v: 42, c: "var(--color-primary)" },
            { n: "Booking.com", v: 27, c: "var(--teal)" },
            { n: "Expedia", v: 14, c: "oklch(0.78 0.12 75)" },
            { n: "Travel agent", v: 11, c: "oklch(0.62 0.15 30)" },
            { n: "Walk-in", v: 6, c: "var(--color-muted-foreground)" },
          ].map((c) => (
            <div key={c.n} className="mb-3 last:mb-0">
              <div className="flex justify-between text-[12px]">
                <span className="text-muted-foreground">{c.n}</span>
                <span className="font-medium text-foreground">{c.v}%</span>
              </div>
              <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${c.v}%`, backgroundColor: c.c }}
                />
              </div>
            </div>
          ))}
        </SectionCard>
      </div>
    </AppShell>
  );
}