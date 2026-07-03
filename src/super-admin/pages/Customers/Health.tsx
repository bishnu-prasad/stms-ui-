import { NOCPageShell, NOCTable, SeverityBadge, ActionBtn } from "../../components/NOCPageShell";
import { customers } from "../../data/operationalMockData";
import { AlertTriangle } from "lucide-react";

const sorted = [...customers].sort((a, b) => a.slaActual - b.slaActual);

export default function CustomerHealth() {
  const critical = customers.filter(c => c.health === "Critical").length;
  const warning = customers.filter(c => c.health === "Warning").length;
  const healthy = customers.filter(c => c.health === "Healthy").length;

  const kpis = [
    { label: "Critical Customers", value: critical, sub: "Needs immediate attention", color: "text-rose-600" },
    { label: "Warning Customers", value: warning, sub: "Monitor closely", color: "text-amber-600" },
    { label: "Healthy Customers", value: healthy, sub: "SLA met", color: "text-emerald-600" },
    { label: "Avg Availability", value: `${(customers.reduce((s, c) => s + c.slaActual, 0) / customers.length).toFixed(1)}%`, sub: "Platform-wide", color: "text-blue-600" },
  ];

  const columns = [
    {
      header: "Customer",
      accessor: (c: typeof customers[0]) => (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">{c.logo}</div>
          <span className="font-bold text-slate-900 dark:text-white">{c.name}</span>
        </div>
      ),
    },
    { header: "Total Sites", accessor: (c: typeof customers[0]) => <span className="font-mono font-bold">{c.totalSites.toLocaleString()}</span> },
    {
      header: "Health Score",
      accessor: (c: typeof customers[0]) => {
        const pct = Math.round((c.onlineSites / c.totalSites) * 100);
        const color = pct >= 99 ? "#10B981" : pct >= 97 ? "#F59E0B" : "#EF4444";
        return (
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
            </div>
            <span className="text-xs font-bold tabular-nums" style={{ color }}>{pct}%</span>
          </div>
        );
      },
    },
    {
      header: "SLA Required / Actual",
      accessor: (c: typeof customers[0]) => (
        <div className="text-xs">
          <span className="text-slate-400">{c.slaRequired}%</span>
          <span className="text-slate-300 mx-1">→</span>
          <span className={`font-bold ${c.slaActual >= c.slaRequired ? "text-emerald-600" : "text-rose-600"}`}>{c.slaActual}%</span>
        </div>
      ),
    },
    {
      header: "Active Alarms",
      accessor: (c: typeof customers[0]) => (
        <span className={`font-bold ${c.alarms > 50 ? "text-rose-600" : c.alarms > 20 ? "text-amber-600" : "text-slate-600"}`}>{c.alarms}</span>
      ),
    },
    { header: "Open Tickets", accessor: (c: typeof customers[0]) => <span className="font-bold text-slate-600 dark:text-slate-300">{c.tickets}</span> },
    { header: "Health", accessor: (c: typeof customers[0]) => <SeverityBadge severity={c.health} /> },
    {
      header: "Action",
      accessor: (c: typeof customers[0]) => (
        <ActionBtn label={c.health === "Critical" ? "Triage" : "Monitor"} variant={c.health === "Critical" ? "danger" : "default"} />
      ),
    },
  ];

  return (
    <NOCPageShell
      title="Customer Health Matrix"
      subtitle="Customers ranked by operational health — worst first"
      badge={critical > 0 ? `${critical} Critical` : undefined}
      badgeColor="bg-rose-500"
      kpis={kpis}
    >
      {critical > 0 && (
        <div className="flex items-start gap-2.5 bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/40 rounded-xl px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0 animate-pulse" />
          <p className="text-xs text-rose-700 dark:text-rose-400 font-semibold">
            {critical} customer{critical > 1 ? "s" : ""} with Critical health status require immediate operational intervention.
          </p>
        </div>
      )}
      <NOCTable columns={columns} data={sorted} />
    </NOCPageShell>
  );
}
