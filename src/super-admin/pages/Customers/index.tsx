import { useState } from "react";
import { NOCPageShell, NOCTable, SeverityBadge, StatusDot, ActionBtn } from "../../components/NOCPageShell";
import { customers } from "../../data/operationalMockData";
import { Plus, Download, Search, Filter } from "lucide-react";

export default function CustomerDirectory() {
  const [search, setSearch] = useState("");
  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const kpis = [
    { label: "Total Customers", value: customers.length, sub: "All registered", color: "text-blue-600" },
    { label: "Active", value: customers.filter(c => c.status === "Active").length, sub: "Operational", color: "text-emerald-600" },
    { label: "Critical Health", value: customers.filter(c => c.health === "Critical").length, sub: "Need attention", color: "text-rose-600" },
    { label: "SLA At Risk", value: customers.filter(c => c.slaActual < c.slaRequired).length, sub: "Below contracted", color: "text-amber-600" },
  ];

  const columns = [
    {
      header: "Customer",
      accessor: (c: typeof customers[0]) => (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">{c.logo}</div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white">{c.name}</div>
            <div className="text-[10px] text-slate-400 font-mono">{c.id}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Sites (Total / Online / Offline)",
      accessor: (c: typeof customers[0]) => (
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-600 dark:text-slate-300 font-bold">{c.totalSites.toLocaleString()}</span>
          <span className="text-slate-300">/</span>
          <span className="text-emerald-600 font-bold">{c.onlineSites.toLocaleString()}</span>
          <span className="text-slate-300">/</span>
          <span className={`font-bold ${c.offlineSites > 30 ? "text-rose-600" : "text-slate-500"}`}>{c.offlineSites}</span>
        </div>
      ),
    },
    {
      header: "Availability",
      accessor: (c: typeof customers[0]) => (
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${c.slaActual}%`, background: c.slaActual >= c.slaRequired ? "#10B981" : "#EF4444" }} />
          </div>
          <span className={`text-xs font-bold tabular-nums ${c.slaActual >= c.slaRequired ? "text-emerald-600" : "text-rose-600"}`}>{c.slaActual}%</span>
        </div>
      ),
    },
    {
      header: "Alarms / Tickets",
      accessor: (c: typeof customers[0]) => (
        <div className="flex items-center gap-2 text-xs">
          <span className={`font-bold ${c.alarms > 50 ? "text-rose-600" : "text-amber-600"}`}>{c.alarms} alarms</span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-600 dark:text-slate-300 font-semibold">{c.tickets} tickets</span>
        </div>
      ),
    },
    {
      header: "SLA Status",
      accessor: (c: typeof customers[0]) => (
        <SeverityBadge severity={c.health} />
      ),
    },
    {
      header: "Last Sync",
      accessor: (c: typeof customers[0]) => (
        <span className="text-[11px] text-slate-400">{c.lastSync}</span>
      ),
    },
    {
      header: "Actions",
      accessor: (c: typeof customers[0]) => (
        <div className="flex items-center gap-1">
          <ActionBtn label="Sites" />
          <ActionBtn label="Alarms" variant="danger" />
        </div>
      ),
    },
  ];

  return (
    <NOCPageShell
      title="Customer Directory"
      subtitle={`${customers.length} registered enterprise customer organizations`}
      kpis={kpis}
      actions={
        <>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Customer
          </button>
        </>
      }
      filters={
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      }
    >
      <NOCTable columns={columns} data={filtered} emptyMessage="No customers found" />
    </NOCPageShell>
  );
}
