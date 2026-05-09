import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard, Stat, Pill } from "@/components/page-kit";
import { Button } from "@/components/ui/button";
import { Plus, Receipt, UtensilsCrossed } from "lucide-react";

export const Route = createFileRoute("/restaurant")({
  head: () => ({
    meta: [
      { title: "Restaurant POS — HoteliaOS" },
      { name: "description", content: "Floor plan, open tickets and live sales for restaurants and bars." },
    ],
  }),
  component: RestaurantPage,
});

const tables = Array.from({ length: 18 }).map((_, i) => ({
  no: i + 1,
  seats: [2, 4, 6][i % 3],
  status: ["open", "ordered", "paid", "free"][i % 4] as "open" | "ordered" | "paid" | "free",
  ticket: ["$84.20", "$142.10", "—", "—"][i % 4],
}));

const tone = {
  open: "bg-primary text-primary-foreground",
  ordered: "bg-[color:var(--teal)] text-primary-foreground",
  paid: "bg-accent text-primary border border-accent",
  free: "bg-card border border-border text-muted-foreground",
};

function RestaurantPage() {
  return (
    <AppShell
      title="Maison Côte · Restaurant POS"
      subtitle="Dinner service · 38/72 covers seated"
      actions={
        <>
          <Button variant="outline" size="sm">Service report</Button>
          <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New order</Button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Net sales" value="$8,420" delta="+11%" trend="up" hint="vs. yesterday" />
        <Stat label="Open tickets" value="14" hint="2 over 45 min" />
        <Stat label="Avg ticket" value="$74" delta="+3" trend="up" hint="per cover" />
        <Stat label="Tips collected" value="$612" hint="distributed at close" />
      </div>

      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard className="xl:col-span-2" title="Floor plan" desc="Main dining room">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {tables.map((t) => (
              <button
                key={t.no}
                className={
                  "rounded-xl p-3 text-left transition hover:shadow-soft " + tone[t.status]
                }
              >
                <div className="flex items-center justify-between text-[10.5px] uppercase tracking-wider opacity-80">
                  <span>T{String(t.no).padStart(2, "0")}</span>
                  <span>{t.seats} pax</span>
                </div>
                <p className="mt-1 text-[13px] font-semibold">{t.ticket}</p>
                <p className="mt-0.5 text-[10.5px] capitalize opacity-80">{t.status}</p>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Open ticket"
          desc="T-04 · Server: Camille R."
          action={<Pill tone="primary">Dining</Pill>}
        >
          <ul className="text-[12.5px] divide-y divide-border">
            {[
              ["1", "Burrata, heirloom tomato", "18.00"],
              ["2", "Tuna tartare", "44.00"],
              ["1", "Côte de bœuf 600g", "92.00"],
              ["2", "Truffle frites", "24.00"],
              ["1", "Bottle Pinot Noir '19", "78.00"],
            ].map(([q, n, p]) => (
              <li key={n} className="flex items-center justify-between py-2.5">
                <span>
                  <span className="text-muted-foreground mr-2">{q}×</span>
                  {n}
                </span>
                <span className="font-medium">${p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 rounded-xl bg-muted p-3 text-[12px]">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>$256.00</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Service 12%</span>
              <span>$30.72</span>
            </div>
            <div className="flex justify-between mt-1 text-foreground font-semibold text-[13px]">
              <span>Total</span>
              <span>$286.72</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Receipt className="h-4 w-4" /> Print
            </Button>
            <Button size="sm" className="gap-1.5">
              <UtensilsCrossed className="h-4 w-4" /> Send to kitchen
            </Button>
          </div>
        </SectionCard>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Top sellers tonight">
          {[
            ["Côte de bœuf 600g", 24, "$2,208"],
            ["Tuna tartare", 31, "$1,364"],
            ["Truffle frites", 48, "$576"],
            ["Pinot Noir '19", 12, "$936"],
          ].map(([n, q, v]) => (
            <div key={n as string} className="flex items-center justify-between py-2 text-[12.5px] border-b border-border last:border-0">
              <span>{n}</span>
              <span className="text-muted-foreground">{q} sold</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Kitchen times" desc="Last hour avg">
          {[
            ["Starters", "8 min", "On time"],
            ["Mains", "22 min", "+3 min"],
            ["Desserts", "11 min", "On time"],
          ].map(([n, t, s]) => (
            <div key={n as string} className="flex justify-between items-center py-2 text-[12.5px] border-b border-border last:border-0">
              <span>{n}</span>
              <span className="font-medium">{t}</span>
              <Pill tone={s === "On time" ? "success" : "warn"}>{s}</Pill>
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Reservations" desc="Tonight">
          {[
            ["19:00", "Bennett, party of 2"],
            ["19:30", "Tanaka, party of 4 · window"],
            ["20:00", "Haddad, party of 6 · VIP"],
            ["20:30", "Reyes, party of 2"],
          ].map(([t, n]) => (
            <div key={t as string} className="flex justify-between py-2 text-[12.5px] border-b border-border last:border-0">
              <span className="font-medium">{t}</span>
              <span className="text-muted-foreground">{n}</span>
            </div>
          ))}
        </SectionCard>
      </div>
    </AppShell>
  );
}