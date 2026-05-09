import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  desc,
  action,
  children,
  className = "",
  pad = true,
}: {
  title?: string;
  desc?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  pad?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card shadow-soft overflow-hidden",
        className,
      )}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
          <div>
            {title && (
              <h3 className="text-[14px] font-semibold tracking-tight text-foreground">
                {title}
              </h3>
            )}
            {desc && <p className="text-[11.5px] text-muted-foreground">{desc}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={cn(pad ? "px-5 pb-5" : "")}>{children}</div>
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  delta,
  trend = "up",
}: {
  label: string;
  value: string;
  hint?: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-muted-foreground">{label}</p>
        {delta && (
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
              trend === "up"
                ? "bg-accent text-[color:var(--teal)]"
                : trend === "down"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-muted text-muted-foreground",
            )}
          >
            {delta}
          </span>
        )}
      </div>
      <p className="mt-3 text-[24px] font-semibold tracking-tight text-foreground">
        {value}
      </p>
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "primary" | "warn" | "danger" | "success";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-muted text-muted-foreground border-border",
    accent: "bg-accent text-primary border-accent",
    primary: "bg-primary text-primary-foreground border-primary",
    warn: "bg-[color:oklch(0.92_0.08_75)] text-[color:oklch(0.4_0.1_60)] border-transparent",
    danger: "bg-destructive/10 text-destructive border-destructive/20",
    success: "bg-accent text-[color:var(--teal)] border-accent",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}