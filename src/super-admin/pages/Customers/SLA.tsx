import { NOCPageShell, NOCTable, SeverityBadge } from "../../components/NOCPageShell";
import { customers, slaComplianceTrend } from "../../data/operationalMockData";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { AlertTriangle } from "lucide-react";

const atRisk = customers.filter(c => c.slaActual < c.slaRequired);

export default function CustomerSLA() {
  const kpis = [
    { label: "Meeting SLA", value: customers.filter(c => c.slaActual >= c.slaRequired).length, color: "text-emerald-600" },
    { label: "At Risk", value: customers.filter(c => c.slaActual < c.slaRequired && c.slaActual >= c.slaRequired - 1).length, color: "text-amber-600" },
    { label: "Breached", value: customers.filter(c => c.slaActual < c.slaRequired - 1).length, color: "text-rose-600" },
    { label: "Platform Avg", value: `${(customers.reduce((s, c) => s + c.slaActual, 0) / customers.length).toFixed(1)}%`, color: "text-blue-600" },
  ];

  const columns = [
    {
      header: "Customer",
      accessor: (c: typeof customers[0]) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-[9px] font-bold">{c.logo}</div>
          <span className="font-bold text-xs">{c.name}</span>
        </div>
      ),
    },
    { header: "Required SLA", accessor: (c: typeof customers[0]) => <span className="font-mono font-bold text-xs">{c.slaRequired}%</span> },
    {
      header: "Actual Availability",
      accessor: (c: typeof customers[0]) => (
        <span className={`font-mono font-bold text-xs ${c.slaActual >= c.slaRequired ? "text-emerald-600" : "text-rose-600"}`}>{c.slaActual}%</span>
      ),
    },
    {
      header: "Variance",
      accessor: (c: typeof customers[0]) => {
        const diff = (c.slaActual - c.slaRequired).toFixed(1);
        return <span className={`font-mono font-bold text-xs ${parseFloat(diff) >= 0 ? "text-emerald-600" : "text-rose-600"}`}>{parseFloat(diff) >= 0 ? "+" : ""}{diff}%</span>;
      },
    },
    {
      header: "Status",
      accessor: (c: typeof customers[0]) => (
        <SeverityBadge severity={c.slaActual >= c.slaRequired ? "Normal" : "Critical"} />
      ),
    },
    { header: "Open Tickets", accessor: (c: typeof customers[0]) => <span className="font-bold text-xs">{c.tickets}</span> },
  ];

  return (
    <NOCPageShell
      title="Customer SLA Overview"
      subtitle="SLA compliance tracking across all enterprise customers"
      kpis={kpis}
    >
      {atRisk.length > 0 && (
        <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
          <p className="text-xs text-rose-700 font-semibold">
            {atRisk.length} customer{atRisk.length > 1 ? "s" : ""} ({atRisk.map(c => c.shortName).join(", ")}) are currently below contracted SLA levels.
          </p>
        </div>
      )}

      {/* SLA Trend Chart */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-4">SLA Compliance Trend (5 Months)</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={slaComplianceTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis domain={[95, 100]} tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "11px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }} formatter={(v: number) => [`${v}%`]} />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Line type="monotone" dataKey="jio" name="Jio" stroke="#10B981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="airtel" name="Airtel" stroke="#3B82F6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="vi" name="Vi" stroke="#EF4444" strokeWidth={2} dot={false} strokeDasharray="4 2" />
            <Line type="monotone" dataKey="bsnl" name="BSNL" stroke="#8B5CF6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <NOCTable columns={columns} data={[...customers].sort((a, b) => a.slaActual - b.slaActual)} />
    </NOCPageShell>
  );
}
