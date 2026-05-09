import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownRight,
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  ChefHat,
  Download,
  Filter,
  MoreHorizontal,
  Package,
  Sparkles,
  Wand2,
  Wrench,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HoteliaOS — Hospitality operations platform" },
      {
        name: "description",
        content:
          "Run hotels, restaurants, resorts and villas from one calm, premium SaaS console.",
      },
      { property: "og:title", content: "HoteliaOS — Hospitality operations platform" },
      {
        property: "og:description",
        content:
          "Reservations, POS, HRM, CRM, finance, housekeeping and tenant management — unified.",
      },
    ],
  }),
  component: Index,
});

const revenueData = [
  { d: "Mon", rev: 18420, prev: 16200 },
  { d: "Tue", rev: 22130, prev: 19800 },
  { d: "Wed", rev: 19840, prev: 18100 },
  { d: "Thu", rev: 26580, prev: 21400 },
  { d: "Fri", rev: 31240, prev: 25600 },
  { d: "Sat", rev: 36780, prev: 29900 },
  { d: "Sun", rev: 28910, prev: 24300 },
];

const occupancyData = [
  { d: "W1", v: 62 },
  { d: "W2", v: 71 },
  { d: "W3", v: 68 },
  { d: "W4", v: 84 },
  { d: "W5", v: 88 },
  { d: "W6", v: 79 },
  { d: "W7", v: 91 },
];

const bookings = [
  {
    code: "RSV-48201",
    guest: "Olivia Bennett",
    room: "Deluxe Suite · 412",
    checkin: "May 8",
    nights: 3,
    status: "Confirmed",
    amount: "$1,840",
  },
  {
    code: "RSV-48198",
    guest: "Hiroshi Tanaka",
    room: "Sea-view King · 207",
    checkin: "May 8",
    nights: 5,
    status: "Checked-in",
    amount: "$3,210",
  },
  {
    code: "RSV-48190",
    guest: "Amélie Laurent",
    room: "Garden Villa · V-03",
    checkin: "May 9",
    nights: 7,
    status: "Awaiting",
    amount: "$8,470",
  },
  {
    code: "RSV-48184",
    guest: "Marcus Reyes",
    room: "Twin Classic · 318",
    checkin: "May 10",
    nights: 2,
    status: "Confirmed",
    amount: "$640",
  },
  {
    code: "RSV-48177",
    guest: "Yara Haddad",
    room: "Penthouse · PH-1",
    checkin: "May 11",
    nights: 4,
    status: "VIP",
    amount: "$12,800",
  },
];

const statusTone: Record<string, string> = {
  Confirmed: "bg-accent text-primary border-accent",
  "Checked-in": "bg-accent text-[color:var(--teal)] border-accent",
  Awaiting: "bg-muted text-muted-foreground border-border",
  VIP: "bg-primary text-primary-foreground border-primary",
};

function KpiCard({
  label,
  value,
  delta,
  trend,
  hint,
}: {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-muted-foreground">{label}</p>
        <span
          className={
            "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold " +
            (trend === "up"
              ? "bg-accent text-[var(--teal)]"
              : "bg-destructive/10 text-destructive")
          }
        >
          {trend === "up" ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {delta}
        </span>
      </div>
      <p className="mt-3 text-[26px] font-semibold tracking-tight text-foreground">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}

function SectionCard({
  title,
  desc,
  action,
  children,
  className = "",
}: {
  title: string;
  desc?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl border border-border bg-card shadow-soft overflow-hidden " + className
      }
    >
      <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
        <div>
          <h3 className="text-[14px] font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          {desc && <p className="text-[11.5px] text-muted-foreground">{desc}</p>}
        </div>
        {action}
      </div>
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}

function Index() {
  return (
    <AppShell
      title="Good morning, Léa"
      subtitle="Here's how your portfolio is performing this week."
      actions={
        <>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button size="sm" className="gap-1.5">
            <CalendarDays className="h-4 w-4" /> New reservation
          </Button>
        </>
      }
    >
      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          label="Net revenue (7d)"
          value="$184,920"
          delta="+12.4%"
          trend="up"
          hint="vs. previous 7 days"
        />
        <KpiCard
          label="Occupancy"
          value="86.2%"
          delta="+3.1%"
          trend="up"
          hint="ADR $312 · RevPAR $269"
        />
        <KpiCard
          label="Restaurant covers"
          value="2,418"
          delta="+8.7%"
          trend="up"
          hint="Avg ticket $74"
        />
        <KpiCard
          label="Open tickets"
          value="14"
          delta="-2"
          trend="down"
          hint="3 priority · 11 routine"
        />
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard
          className="xl:col-span-2"
          title="Revenue performance"
          desc="Daily net revenue across all properties"
          action={
            <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-0.5 text-[11px]">
              {["7d", "30d", "QTD", "YTD"].map((t, i) => (
                <button
                  key={t}
                  className={
                    "px-2 py-1 rounded-md transition " +
                    (i === 0
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          }
        >
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="d"
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="prev"
                  stroke="var(--color-border)"
                  fill="transparent"
                  strokeDasharray="4 4"
                />
                <Area
                  type="monotone"
                  dataKey="rev"
                  stroke="var(--teal)"
                  strokeWidth={2}
                  fill="url(#rv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard
          title="Occupancy overview"
          desc="Weekly average across portfolio"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-foreground">86%</span>
            <span className="text-[11px] font-medium text-[var(--teal)]">
              ▲ trending well
            </span>
          </div>
          <div className="h-[160px] mt-2">
            <ResponsiveContainer>
              <BarChart data={occupancyData}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="d"
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="v" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            {[
              { l: "Hotels", v: "88%" },
              { l: "Resorts", v: "91%" },
              { l: "Villas", v: "74%" },
            ].map((s) => (
              <div key={s.l} className="rounded-lg bg-muted/60 py-2">
                <p className="text-[10px] text-muted-foreground">{s.l}</p>
                <p className="text-[13px] font-semibold text-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Middle row: bookings + AI */}
      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard
          className="xl:col-span-2"
          title="Upcoming bookings"
          desc="Next arrivals across all properties"
          action={
            <Button size="sm" variant="ghost" className="text-[12px] h-7">
              View all
            </Button>
          }
        >
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-[11px]">Reservation</TableHead>
                <TableHead className="text-[11px]">Guest</TableHead>
                <TableHead className="text-[11px]">Check-in</TableHead>
                <TableHead className="text-[11px]">Status</TableHead>
                <TableHead className="text-[11px] text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b.code} className="border-border">
                  <TableCell className="py-3">
                    <p className="text-[12.5px] font-medium text-foreground">{b.code}</p>
                    <p className="text-[11px] text-muted-foreground">{b.room}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-accent text-primary text-[10px]">
                          {b.guest
                            .split(" ")
                            .map((p) => p[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[12.5px] text-foreground">{b.guest}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[12.5px] text-foreground">
                    {b.checkin}
                    <span className="text-muted-foreground"> · {b.nights}n</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={"text-[10.5px] " + statusTone[b.status]}
                    >
                      {b.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-[12.5px] font-semibold text-foreground">
                    {b.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard
          title="AI business insights"
          desc="Generated 2 minutes ago"
          action={
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-primary">
              <Wand2 className="h-3 w-3" /> Auto
            </span>
          }
        >
          <ul className="space-y-3">
            {[
              {
                t: "Push weekend villa rates +8%",
                d: "Demand up 22% vs. last 4 weekends. Estimated +$14k revenue.",
                tag: "Pricing",
              },
              {
                t: "Restock Pinot Noir at Maison Côte",
                d: "On-hand below par level for the next 3 covers cycles.",
                tag: "Inventory",
              },
              {
                t: "Reassign 2 housekeepers to Tower B",
                d: "Predicted 14 late checkouts at 12:30 — risk of delay.",
                tag: "Operations",
              },
            ].map((i) => (
              <li
                key={i.t}
                className="rounded-xl border border-border bg-background/60 p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[12.5px] font-semibold text-foreground">{i.t}</p>
                  <span className="text-[10px] text-muted-foreground">{i.tag}</span>
                </div>
                <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
                  {i.d}
                </p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" className="h-7 text-[11px]">
                    Apply
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 text-[11px]">
                    Dismiss
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Operational widgets */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <SectionCard title="Housekeeping" desc="Today · Tower A">
          <div className="space-y-3">
            {[
              { l: "Cleaned", v: 42, total: 60, c: "var(--teal)" },
              { l: "In progress", v: 11, total: 60, c: "var(--color-primary)" },
              { l: "Dirty", v: 7, total: 60, c: "var(--color-muted-foreground)" },
            ].map((r) => (
              <div key={r.l}>
                <div className="flex justify-between text-[11.5px]">
                  <span className="text-muted-foreground">{r.l}</span>
                  <span className="font-medium text-foreground">
                    {r.v}/{r.total}
                  </span>
                </div>
                <Progress
                  value={(r.v / r.total) * 100}
                  className="h-1.5 mt-1 bg-muted [&>div]:bg-primary"
                />
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-3 w-full text-[12px] gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Open board
          </Button>
        </SectionCard>

        <SectionCard title="Maintenance tickets" desc="Across all properties">
          <ul className="space-y-2.5">
            {[
              { r: "Room 412", t: "AC unit cycling", p: "High" },
              { r: "Spa", t: "Pool pH calibration", p: "Med" },
              { r: "Lobby", t: "Sliding door sensor", p: "Low" },
            ].map((t) => (
              <li
                key={t.r}
                className="flex items-center justify-between text-[12px]"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-muted">
                    <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{t.r}</p>
                    <p className="text-[10.5px] text-muted-foreground">{t.t}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {t.p}
                </Badge>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Restaurant sales" desc="Today">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-foreground">$8,420</span>
            <span className="text-[11px] text-[var(--teal)]">+11%</span>
          </div>
          <div className="mt-3 space-y-2">
            {[
              { n: "Maison Côte", v: "$3,210", i: ChefHat },
              { n: "Garden Bistro", v: "$2,640", i: ChefHat },
              { n: "Rooftop Bar", v: "$2,570", i: ChefHat },
            ].map((o) => (
              <div
                key={o.n}
                className="flex items-center justify-between text-[12px]"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <o.i className="h-3.5 w-3.5 text-muted-foreground" /> {o.n}
                </span>
                <span className="font-semibold">{o.v}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Inventory alerts" desc="Below par level">
          <ul className="space-y-2.5">
            {[
              { n: "Egyptian cotton sheets", q: "12 left", c: "Linens" },
              { n: "Ristretto blend beans", q: "3kg left", c: "F&B" },
              { n: "Mini bar — Tonic 200ml", q: "18 left", c: "F&B" },
            ].map((i) => (
              <li key={i.n} className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent">
                  <Package className="h-3.5 w-3.5 text-primary" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-foreground truncate">
                    {i.n}
                  </p>
                  <p className="text-[10.5px] text-muted-foreground">{i.c}</p>
                </div>
                <span className="text-[11px] font-semibold text-destructive">
                  {i.q}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Bottom: tenants + attendance + reservation calendar */}
      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard
          title="Tenant performance"
          desc="Top properties this month"
          action={<MoreHorizontal className="h-4 w-4 text-muted-foreground" />}
        >
          <div className="space-y-3">
            {[
              { n: "Aurelia Riviera", t: "Resort · 142 keys", v: "$284k", p: 92 },
              { n: "Maison Côte", t: "Boutique · 48 keys", v: "$118k", p: 81 },
              { n: "Olive & Thyme", t: "Restaurant", v: "$74k", p: 68 },
              { n: "Casa Azul Villas", t: "Villas · 12 keys", v: "$56k", p: 54 },
            ].map((t) => (
              <div key={t.n}>
                <div className="flex items-center justify-between text-[12.5px]">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground text-[10px] font-semibold">
                      {t.n[0]}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{t.n}</p>
                      <p className="text-[10.5px] text-muted-foreground">{t.t}</p>
                    </div>
                  </div>
                  <span className="font-semibold">{t.v}</span>
                </div>
                <Progress value={t.p} className="h-1 mt-2 bg-muted [&>div]:bg-[var(--teal)]" />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Employee attendance" desc="Today · 412 staff">
          <div className="grid grid-cols-3 gap-3">
            {[
              { l: "Present", v: "364", c: "text-[var(--teal)]" },
              { l: "Late", v: "21", c: "text-foreground" },
              { l: "Absent", v: "27", c: "text-destructive" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-border bg-background/60 p-3 text-center"
              >
                <p className={"text-xl font-semibold " + s.c}>{s.v}</p>
                <p className="text-[10.5px] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2.5">
            {[
              { n: "Front office", v: 96 },
              { n: "Housekeeping", v: 88 },
              { n: "F&B", v: 82 },
              { n: "Maintenance", v: 73 },
            ].map((d) => (
              <div key={d.n}>
                <div className="flex justify-between text-[11.5px]">
                  <span className="text-muted-foreground">{d.n}</span>
                  <span className="font-medium text-foreground">{d.v}%</span>
                </div>
                <Progress value={d.v} className="h-1 mt-1 bg-muted [&>div]:bg-primary" />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Reservation calendar" desc="May 2026">
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 mt-1">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 3;
              const inMonth = day > 0 && day <= 31;
              const load = inMonth ? (day * 13) % 100 : 0;
              const today = day === 7;
              return (
                <div
                  key={i}
                  className={
                    "aspect-square rounded-md flex flex-col items-center justify-center text-[10px] " +
                    (!inMonth
                      ? "text-muted-foreground/30"
                      : today
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-background/60 hover:bg-accent/50")
                  }
                >
                  <span>{inMonth ? day : ""}</span>
                  {inMonth && !today && (
                    <span
                      className="mt-0.5 h-0.5 w-4 rounded-full"
                      style={{
                        backgroundColor:
                          load > 75
                            ? "var(--teal)"
                            : load > 40
                              ? "var(--color-primary)"
                              : "var(--color-border)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between text-[10.5px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <BedDouble className="h-3 w-3" /> 248 nights booked
            </span>
            <span>$642k forecast</span>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}

