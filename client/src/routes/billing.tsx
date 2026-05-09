import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard, Stat, Pill } from "@/components/page-kit";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/billing")({
  head: () => ({ meta: [{ title: "Billing — HoteliaOS" }] }),
  component: BillingPage,
});

const plans = [
  {
    n: "Starter",
    p: "$0",
    s: "/mo",
    d: "For boutique hotels & cafés getting started.",
    f: ["1 property", "5 staff seats", "Reservations & POS", "Email support"],
  },
  {
    n: "Business",
    p: "$249",
    s: "/property/mo",
    d: "For growing hotels and small chains.",
    f: ["Up to 6 properties", "Unlimited seats", "HRM + CRM + Inventory", "AI insights", "Priority support"],
    highlight: true,
  },
  {
    n: "Enterprise",
    p: "Custom",
    s: "",
    d: "For multi-property groups & resorts.",
    f: ["Unlimited properties", "Dedicated success manager", "SSO + audit logs", "Custom integrations", "99.99% SLA"],
  },
];

function BillingPage() {
  return (
    <AppShell title="Billing & subscription" subtitle="Plan, usage and payment history.">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Current plan" value="Business" hint="renews May 28" />
        <Stat label="Properties" value="6 / 6" hint="at plan limit" />
        <Stat label="Staff seats" value="412" hint="unlimited" />
        <Stat label="Next invoice" value="$1,494" hint="May 28 · auto-charge" />
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div
            key={p.n}
            className={
              "relative rounded-2xl border bg-card p-6 shadow-soft " +
              (p.highlight ? "border-primary ring-2 ring-primary/15" : "border-border")
            }
          >
            {p.highlight && (
              <span className="absolute -top-2 left-6 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5">
                Current plan
              </span>
            )}
            <p className="text-[13px] font-semibold text-foreground">{p.n}</p>
            <p className="mt-1 text-[12px] text-muted-foreground">{p.d}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-[28px] font-semibold tracking-tight">{p.p}</span>
              <span className="text-[12px] text-muted-foreground">{p.s}</span>
            </div>
            <ul className="mt-4 space-y-2 text-[12.5px]">
              {p.f.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--teal)] mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className="mt-5 w-full"
              variant={p.highlight ? "outline" : "default"}
              size="sm"
            >
              {p.highlight ? "Manage plan" : p.n === "Enterprise" ? "Contact sales" : "Upgrade"}
            </Button>
          </div>
        ))}
      </div>

      <SectionCard className="mt-5" title="Payment history">
        {[
          ["May 1", "Business plan · 6 properties", "$1,494", "Paid"],
          ["Apr 1", "Business plan · 6 properties", "$1,494", "Paid"],
          ["Mar 1", "Business plan · 5 properties", "$1,245", "Paid"],
          ["Feb 1", "Business plan · 5 properties", "$1,245", "Paid"],
        ].map(([d, l, a, s]) => (
          <div key={d as string} className="flex items-center justify-between py-3 border-b border-border last:border-0 text-[12.5px]">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-primary text-[10px] font-semibold">{d}</span>
              <span>{l}</span>
            </div>
            <div className="flex items-center gap-3">
              <Pill tone="success">{s}</Pill>
              <span className="font-semibold w-20 text-right">{a}</span>
            </div>
          </div>
        ))}
      </SectionCard>
    </AppShell>
  );
}