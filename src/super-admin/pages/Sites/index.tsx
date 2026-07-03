import { useState } from "react";
import { NOCPageShell, NOCTable, SeverityBadge, StatusDot, ActionBtn } from "../../components/NOCPageShell";
import { sites, availabilityTrend } from "../../data/operationalMockData";
import { Plus, Download, Search, Filter } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function AllSites() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = sites.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || s.status === statusFilter || (statusFilter === "Alarm" && s.alarmSeverity !== "None");
    return matchSearch && matchStatus;
  });

  const kpis = [
    { label: "Total Sites", value: 12450, sub: "Across all customers" },
    { label: "Online", value: 12100, sub: "97.2% uptime", color: "text-emerald-600" },
    { label: "Offline", value: 350, sub: "Needs attention", color: "text-rose-600" },
    { label: "On Battery", value: 840, sub: "No mains power", color: "text-amber-600" },
    { label: "On DG", value: 420, sub: "Generator running", color: "text-purple-600" },
    { label: "Comm Failure", value: 85, sub: "No gateway contact", color: "text-slate-500" },
  ];

  const columns = [
    {
      header: "Site ID / Name",
      accessor: (s: typeof sites[0]) => (
        <div>
          <div className="font-mono font-bold text-blue-600 text-[11px]">{s.id}</div>
          <div className="font-semibold text-slate-900 dark:text-white text-xs">{s.name}</div>
        </div>
      ),
    },
    { header: "Customer", accessor: (s: typeof sites[0]) => <span className="font-semibold text-xs">{s.customer}</span> },
    { header: "Region", accessor: (s: typeof sites[0]) => <span className="text-xs text-slate-500">{s.region}</span> },
    { header: "Status", accessor: (s: typeof sites[0]) => <StatusDot status={s.status} /> },
    {
      header: "Power Source",
      accessor: (s: typeof sites[0]) => {
        const color = s.powerSource === "Mains" ? "text-emerald-600" : s.powerSource === "DG" ? "text-purple-600" : s.powerSource === "Battery" ? "text-amber-600" : "text-slate-400";
        return <span className={`text-xs font-bold ${color}`}>{s.powerSource}</span>;
      },
    },
    {
      header: "Gateway",
      accessor: (s: typeof sites[0]) => (
        <div>
          <StatusDot status={s.gatewayStatus} />
          <div className="text-[10px] font-mono text-slate-400">{s.gatewayId}</div>
        </div>
      ),
    },
    {
      header: "Last Alarm",
      accessor: (s: typeof sites[0]) => (
        s.alarmSeverity === "None"
          ? <span className="text-xs text-slate-400">—</span>
          : <div>
            <SeverityBadge severity={s.alarmSeverity} />
            <div className="text-[10px] text-slate-400 mt-0.5">{s.lastAlarm}</div>
          </div>
      ),
    },
    { header: "Last Comm", accessor: (s: typeof sites[0]) => <span className="text-[11px] text-slate-400">{s.lastComm}</span> },
    {
      header: "Actions",
      accessor: (s: typeof sites[0]) => (
        <div className="flex gap-1">
          <ActionBtn label="Details" />
          {s.alarmSeverity === "Critical" && <ActionBtn label="Triage" variant="danger" />}
        </div>
      ),
    },
  ];

  return (
    <NOCPageShell
      title="All Sites"
      subtitle="Complete site inventory across all customers and regions"
      kpis={kpis}
      actions={
        <>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Site
          </button>
        </>
      }
      filters={
        <>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sites..."
              className="pl-9 pr-4 py-2 text-xs w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          {["All", "Online", "Offline", "Alarm"].map(f => (
            <button key={f} onClick={() => setStatusFilter(f)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${statusFilter === f ? "bg-slate-800 text-white border-slate-800" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"}`}>
              {f}
            </button>
          ))}
        </>
      }
    >
      {/* Availability trend */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">24h Site Availability</div>
          <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">Live</span>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={availabilityTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="onlineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "11px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }} />
            <Area type="monotone" dataKey="online" name="Online Sites" stroke="#10B981" strokeWidth={2} fill="url(#onlineGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <NOCTable columns={columns} data={filtered} emptyMessage="No sites match your filters" />
    </NOCPageShell>
  );
}
