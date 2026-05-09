import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SectionCard, Stat, Pill } from "@/components/page-kit";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/inventory")({
  head: () => ({ meta: [{ title: "Inventory — HoteliaOS" }] }),
  component: InventoryPage,
});

const items = [
  ["LIN-001", "Egyptian cotton sheet · King", "Linens", 12, 40, "Below par"],
  ["FB-204", "Ristretto blend beans 1kg", "F&B", 3, 20, "Critical"],
  ["MB-118", "Tonic water 200ml", "Mini-bar", 18, 60, "Below par"],
  ["AM-302", "Aurelia amenity kit", "Amenities", 142, 200, "OK"],
  ["FB-188", "Pinot Noir '19", "F&B", 7, 24, "Below par"],
  ["LIN-019", "Bath towel · large", "Linens", 88, 120, "OK"],
  ["EQ-077", "Spa robe · adult M", "Spa", 24, 30, "OK"],
];

function InventoryPage() {
  return (
    <AppShell
      title="Inventory"
      subtitle="Stock levels, par lines and purchase orders."
      actions={
        <>
          <Button variant="outline" size="sm">Receive stock</Button>
          <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New PO</Button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="SKUs tracked" value="1,284" hint="across 4 warehouses" />
        <Stat label="Below par" value="38" delta="+4" trend="down" hint="6 critical" />
        <Stat label="Open POs" value="12" hint="$48k committed" />
        <Stat label="Stock value" value="$612k" delta="+2.1%" trend="up" hint="month over month" />
      </div>

      <SectionCard
        className="mt-5"
        title="Stock items"
        action={
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search SKU…" className="h-8 w-48 rounded-md border border-border bg-background pl-7 pr-2 text-[12px] outline-none" />
          </div>
        }
      >
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-[11px]">SKU</TableHead>
              <TableHead className="text-[11px]">Item</TableHead>
              <TableHead className="text-[11px]">Category</TableHead>
              <TableHead className="text-[11px]">On hand</TableHead>
              <TableHead className="text-[11px]">Par</TableHead>
              <TableHead className="text-[11px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(([sku, n, c, oh, par, s]) => (
              <TableRow key={sku} className="border-border">
                <TableCell className="py-3 text-[12px] font-mono text-muted-foreground">{sku}</TableCell>
                <TableCell className="text-[12.5px] font-medium">{n}</TableCell>
                <TableCell className="text-[12px] text-muted-foreground">{c}</TableCell>
                <TableCell className="text-[12.5px]">{oh}</TableCell>
                <TableCell className="text-[12.5px] text-muted-foreground">{par}</TableCell>
                <TableCell>
                  <Pill tone={s === "Critical" ? "danger" : s === "Below par" ? "warn" : "success"}>{s}</Pill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </AppShell>
  );
}