import { NOCPageShell, NOCTable, SeverityBadge, StatusDot, ActionBtn } from "../../components/NOCPageShell";
import { sites } from "../../data/operationalMockData";
import { AlertCircle, RefreshCw } from "lucide-react";

const critical = sites.filter(s => s.alarmSeverity === "Critical" || s.status === "Offline");

export default function CriticalSites() {
  const kpis = [
    { label: "Critical Sites", value: critical.length, sub: "Requiring immediate triage", color: "text-rose-600" },
    { label: "Offline Gateways", value: critical.filter(s => s.gatewayStatus === "Offline").length, sub: "No communication", color: "text-slate-500" },
    { label: "On Battery", value: critical.filter(s => s.powerSource === "Battery").length, sub: "No mains power", color: "text-amber-600" },
    { label: "DG Running", value: critical.filter(s => s.powerSource === "DG").length, sub: "Diesel consuming", color: "text-purple-600" },
  ];

  const columns = [
    {
      header: "Site",
      accessor: (s: typeof sites[0]) => (
        <div>
          <div className="font-mono font-bold text-rose-600 text-[11px]">{s.id}</div>
          <div className="font-semibold text-slate-900 dark:text-white text-xs">{s.name}</div>
          <div className="text-[10px] text-slate-400">{s.customer} · {s.region}</div>
        </div>
      ),
    },
    {
      header: "Active Alarm",
      accessor: (s: typeof sites[0]) => (
        <div>
          <SeverityBadge severity={s.alarmSeverity === "None" ? "Normal" : s.alarmSeverity} />
          <div className="text-[10px] text-slate-500 mt-0.5">{s.lastAlarm}</div>
        </div>
      ),
    },
    { header: "Power Source", accessor: (s: typeof sites[0]) => <span className={`text-xs font-bold ${s.powerSource === "Battery" ? "text-amber-600" : s.powerSource === "DG" ? "text-purple-600" : "text-slate-500"}`}>{s.powerSource}</span> },
    { header: "Gateway", accessor: (s: typeof sites[0]) => <StatusDot status={s.gatewayStatus} /> },
    { header: "Last Comm", accessor: (s: typeof sites[0]) => <span className={`text-xs font-bold ${s.lastComm.includes("m") && parseInt(s.lastComm) > 30 ? "text-rose-600" : "text-slate-500"}`}>{s.lastComm}</span> },
    {
      header: "Actions",
      accessor: (s: typeof sites[0]) => (
        <div className="flex gap-1 flex-wrap">
          <ActionBtn label="Triage" variant="danger" />
          <ActionBtn label="Assign" />
          <ActionBtn label="Ticket" />
        </div>
      ),
    },
  ];

  return (
    <NOCPageShell
      title="Critical Sites"
      subtitle="Highest severity sites requiring immediate operational attention"
      badge="LIVE TRIAGE"
      badgeColor="bg-rose-500 animate-pulse"
      kpis={kpis}
      actions={
        <button className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50 shadow-sm">
          <RefreshCw className="w-3.5 h-3.5" /> Auto-refresh: 60s
        </button>
      }
    >
      <div className="flex items-start gap-2.5 bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-xl px-4 py-3">
        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
        <p className="text-xs font-semibold text-rose-700 dark:text-rose-400">
          {critical.length} site{critical.length > 1 ? "s" : ""} currently require immediate triage. Sites are sorted by alarm severity and offline duration.
        </p>
      </div>
      <NOCTable columns={columns} data={critical} emptyMessage="No critical sites at this time" />
    </NOCPageShell>
  );
}
