import { type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarRange,
  Hotel,
  UtensilsCrossed,
  Users,
  HeartHandshake,
  Wallet,
  Boxes,
  Sparkles,
  Wrench,
  Building2,
  CreditCard,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronsUpDown,
  Plus,
  Command,
  LifeBuoy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "@/components/AuthModal";
import { authApi } from "@/lib/auth";
import { useEffect, useState } from "react";

const nav = [
  {
    label: "Workspace",
    items: [
      { to: "/", icon: LayoutDashboard, label: "Overview" },
      { to: "/reservations", icon: CalendarRange, label: "Reservations" },
      { to: "/hotel", icon: Hotel, label: "Hotel ops" },
      { to: "/restaurant", icon: UtensilsCrossed, label: "Restaurant POS" },
      { to: "/housekeeping", icon: Sparkles, label: "Housekeeping" },
      { to: "/maintenance", icon: Wrench, label: "Maintenance" },
    ],
  },
  {
    label: "Business",
    items: [
      { to: "/crm", icon: HeartHandshake, label: "CRM" },
      { to: "/hrm", icon: Users, label: "HRM" },
      { to: "/finance", icon: Wallet, label: "Finance" },
      { to: "/inventory", icon: Boxes, label: "Inventory" },
      { to: "/analytics", icon: BarChart3, label: "Analytics" },
    ],
  },
  {
    label: "Platform",
    items: [
      { to: "/admin", icon: Building2, label: "Tenants" },
      { to: "/billing", icon: CreditCard, label: "Billing" },
      { to: "/settings", icon: Settings, label: "Settings" },
    ],
  },
];

function SidebarLink({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const active = to === "/" ? path === "/" : path.startsWith(to);
  return (
    <Link
      to={to}
      className={cn(
        "group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={active ? 2.2 : 1.75} />
      <span>{label}</span>
    </Link>
  );
}

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const token = authApi.getToken();
    setIsAuthenticated(!!token);
    setIsMounted(true);
  }, []);

  const handleSignOut = () => {
    authApi.logout();
    window.location.reload();
  };

  if (!isMounted) {
    return <div className="flex min-h-screen w-full bg-background" />; // Prevent flash during hydration
  }

  if (!isAuthenticated) {
    return <AuthModal />;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar">
        <div className="px-4 pt-5 pb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-2.5 rounded-xl border border-border bg-card px-2.5 py-2 text-left shadow-soft hover:bg-accent/30 transition">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <Hotel className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-semibold text-foreground">
                    Aurelia Hotels
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    Group · 12 properties
                  </p>
                </div>
                <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Switch workspace
              </DropdownMenuLabel>
              <DropdownMenuItem>Aurelia Hotels</DropdownMenuItem>
              <DropdownMenuItem>Maison Côte Resorts</DropdownMenuItem>
              <DropdownMenuItem>Olive & Thyme Bistro Co.</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus className="h-4 w-4" /> New tenant
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-5">
          {nav.map((group) => (
            <div key={group.label}>
              <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((it) => (
                  <SidebarLink key={it.to} {...it} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <div className="rounded-xl bg-accent/60 p-3">
            <div className="flex items-center gap-2">
              <LifeBuoy className="h-4 w-4 text-primary" />
              <p className="text-[12px] font-semibold text-foreground">Need a hand?</p>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
              Concierge support is online 24/7 for your team.
            </p>
            <Button size="sm" variant="outline" className="mt-2.5 w-full h-7 text-[11px]">
              Open helpdesk
            </Button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 lg:px-8 backdrop-blur">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search guests, rooms, invoices…"
              className="h-9 w-full rounded-lg border border-border bg-card pl-8 pr-14 text-[13px] outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
              <Command className="h-3 w-3" /> K
            </kbd>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="outline" size="sm" className="hidden md:inline-flex h-9 gap-1.5">
              <Plus className="h-4 w-4" /> Quick action
            </Button>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--teal)]" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg pl-1 pr-2 py-1 hover:bg-accent/50">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary text-primary-foreground text-[11px]">
                      LM
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left leading-tight">
                    <p className="text-[12px] font-semibold text-foreground">User</p>
                    <p className="text-[10px] text-muted-foreground">General manager</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page header */}
        <div className="px-4 lg:px-8 pt-7 pb-5 flex flex-wrap items-end justify-between gap-4 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
                {title}
              </h1>
              <Badge
                variant="outline"
                className="border-accent bg-accent text-[10px] font-medium text-primary"
              >
                Live
              </Badge>
            </div>
            {subtitle && (
              <p className="mt-1 text-[13px] text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>

        <main className="flex-1 px-4 lg:px-8 py-6">{children}</main>
      </div>
    </div>
  );
}