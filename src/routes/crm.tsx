import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard, Stat, Pill } from "@/components/page-kit";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Plus, Star } from "lucide-react";

export const Route = createFileRoute("/crm")({
  head: () => ({ meta: [{ title: "CRM — HoteliaOS" }] }),
  component: CRMPage,
});

const guests = [
  ["Olivia Bennett", "olivia@bennett.co", "London, UK", "Platinum", 14, "$48,210"],
  ["Hiroshi Tanaka", "h.tanaka@kintaro.jp", "Tokyo, JP", "Gold", 9, "$32,140"],
  ["Yara Haddad", "yara@haddad.ae", "Dubai, AE", "Platinum", 22, "$98,640"],
  ["Amélie Laurent", "amelie@laurent.fr", "Paris, FR", "Gold", 11, "$28,480"],
  ["Marcus Reyes", "marcus@reyes.co", "Madrid, ES", "Silver", 5, "$8,210"],
  ["Sara Patel", "sara@patel.in", "Mumbai, IN", "Gold", 8, "$24,310"],
];

function CRMPage() {
  return (
    <AppShell
      title="Guest CRM"
      subtitle="Profiles, loyalty tiers and lifetime value across your portfolio."
      actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Add guest</Button>}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Active guests" value="12,408" delta="+184" trend="up" hint="this month" />
        <Stat label="Loyalty members" value="3,842" hint="32% of base" />
        <Stat label="NPS" value="68" delta="+4" trend="up" hint="rolling 30d" />
        <Stat label="Avg LTV" value="$4,210" delta="+6%" trend="up" hint="all tiers" />
      </div>

      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard className="xl:col-span-2" title="Top guests" desc="By lifetime value">
          {guests.map(([n, e, c, t, st, ltv]) => (
            <div
              key={e as string}
              className="flex items-center gap-3 py-3 border-b border-border last:border-0"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-accent text-primary text-[11px]">
                  {(n as string).split(" ").map((p) => p[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-semibold truncate">{n}</p>
                  <Pill tone={t === "Platinum" ? "primary" : t === "Gold" ? "accent" : "neutral"}>
                    <Star className="h-3 w-3" /> {t}
                  </Pill>
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{e} · {c}</p>
              </div>
              <div className="text-right">
                <p className="text-[12.5px] font-semibold">{ltv}</p>
                <p className="text-[10.5px] text-muted-foreground">{st} stays</p>
              </div>
              <div className="hidden md:flex gap-1">
                <Button size="icon" variant="ghost" className="h-7 w-7"><Mail className="h-3.5 w-3.5" /></Button>
                <Button size="icon" variant="ghost" className="h-7 w-7"><Phone className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Active campaigns" desc="Marketing & loyalty">
          {[
            { n: "Spring escape · 20% off", o: "Direct", v: 64, r: "$48k" },
            { n: "Loyalty double points", o: "All channels", v: 41, r: "—" },
            { n: "Long-stay villas", o: "Email", v: 22, r: "$14k" },
          ].map((c) => (
            <div key={c.n} className="rounded-xl border border-border p-3 mb-2 last:mb-0">
              <p className="text-[12.5px] font-semibold">{c.n}</p>
              <p className="text-[10.5px] text-muted-foreground">{c.o}</p>
              <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-[color:var(--teal)]" style={{ width: `${c.v}%` }} />
              </div>
              <div className="mt-1.5 flex justify-between text-[10.5px] text-muted-foreground">
                <span>{c.v}% delivered</span>
                <span>Revenue {c.r}</span>
              </div>
            </div>
          ))}
        </SectionCard>
      </div>
    </AppShell>
  );
}