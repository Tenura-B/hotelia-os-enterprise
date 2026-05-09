import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/page-kit";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — HoteliaOS" }] }),
  component: SettingsPage,
});

function Field({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="py-3 border-b border-border last:border-0">
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <input
        defaultValue={value}
        className="mt-1 w-full bg-transparent text-[13.5px] outline-none text-foreground"
      />
      {hint && <p className="text-[10.5px] text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

function Toggle({ title, desc, on = false }: { title: string; desc: string; on?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
      <div>
        <p className="text-[12.5px] font-medium">{title}</p>
        <p className="text-[11px] text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={on} />
    </div>
  );
}

function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Workspace, profile, security and integrations.">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <nav className="space-y-1 text-[13px] sticky top-20 self-start">
          {["Profile", "Workspace", "Notifications", "Security", "Integrations", "Billing"].map(
            (s, i) => (
              <button
                key={s}
                className={
                  "w-full text-left px-3 py-2 rounded-lg transition " +
                  (i === 0 ? "bg-accent text-primary font-semibold" : "text-muted-foreground hover:bg-accent/50")
                }
              >
                {s}
              </button>
            ),
          )}
        </nav>

        <div className="space-y-4">
          <SectionCard title="Profile" desc="Personal information & contact details">
            <div className="flex items-center gap-4 pb-4 border-b border-border">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-primary text-primary-foreground">LM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-[14px] font-semibold">Léa Marchand</p>
                <p className="text-[12px] text-muted-foreground">General manager · Aurelia Hotels</p>
              </div>
              <Button size="sm" variant="outline">Change photo</Button>
            </div>
            <Field label="Full name" value="Léa Marchand" />
            <Field label="Email" value="lea@aureliahotels.com" />
            <Field label="Phone" value="+33 6 12 34 56 78" />
            <Field label="Time zone" value="Europe/Paris (CEST)" hint="Used for reports and shift scheduling." />
          </SectionCard>

          <SectionCard title="Notifications" desc="Choose how HoteliaOS reaches your team">
            <Toggle title="Booking alerts" desc="Notify me on new bookings & cancellations." on />
            <Toggle title="Maintenance escalations" desc="Push when a critical ticket is opened." on />
            <Toggle title="Daily digest" desc="Email summary every morning at 7:30." on />
            <Toggle title="Weekly board report" desc="PDF summary every Monday." />
          </SectionCard>

          <SectionCard title="Security" desc="Sign-in & session controls">
            <Toggle title="Two-factor authentication" desc="Authenticator app required at every sign-in." on />
            <Toggle title="Single sign-on (SSO)" desc="SAML 2.0 with your identity provider." />
            <Toggle title="Audit log retention" desc="Keep activity logs for 365 days." on />
            <div className="pt-3">
              <Button size="sm" variant="outline">Sign out other sessions</Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}