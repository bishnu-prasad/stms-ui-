import { useState } from "react";
import { NOCPageShell, NOCTable, SeverityBadge, StatusDot, ActionBtn } from "../../components/NOCPageShell";
import { liveAlarms, alarmTrend7d } from "../../data/operationalMockData";
import { Bell, RefreshCw } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type AlarmTab = "ALL" | "Critical" | "Major" | "Minor" | "Warning" | "Acknowledged";

export default function LiveAlarms() {
  const [tab, setTab] = useState<AlarmTab>("ALL");

  const filtered = tab === "ALL" ? liveAlarms
    : tab === "Acknowledged" ? liveAlarms.filter(a => a.ack)
    : liveAlarms.filter(a => a.severity === tab && !a.ack);

  const counts = {
    ALL: liveAlarms.length,
    Critical: liveAlarms.filter(a => a.severity === "Critical").length,
    Major: liveAlarms.filter(a => a.severity === "Major").length,
    Minor: liveAlarms.filter(a => a.severity === "Minor").length,
    Warning: liveAlarms.filter(a => a.severity === "Warning").length,
    Acknowledged: liveAlarms.filter(a => a.ack).length,
  };

  const kpis = [
    { label: "Total Active", value: liveAlarms.filter(a => !a.ack).length, color: "text-slate-900 dark:text-white" },
    { label: "Critical", value: counts.Critical, color: "text-rose-600" },
    { label: "Major", value: counts.Major, color: "text-orange-600" },
    { label: "Unacknowledged", value: liveAlarms.filter(a => !a.ack).length, color: "text-amber-600" },
    { label: "New (1h)", value: 14, color: "text-blue-600" },
    { label: "Acknowledged", value: counts.Acknowledged, color: "text-emerald-600" },
  ];

  const tabColors: Record<AlarmTab, string> = {
    ALL: "bg-slate-800 text-white",
    Critical: "bg-rose-600 text-white",
    Major: "bg-orange-500 text-white",
    Minor: "bg-amber-500 text-white",
    Warning: "bg-yellow-500 text-white",
    Acknowledged: "bg-emerald-600 text-white",
  };

  const columns = [
    { header: "Alarm ID", accessor: (a: typeof liveAlarms[0]) => <span className="font-mono text-[11px] font-bold text-blue-600">{a.id}</span> },
    {
      header: "Site / Customer",
      accessor: (a: typeof liveAlarms[0]) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white text-xs">{a.site}</div>
          <div className="text-[10px] text-slate-400">{a.customer} · {a.region}</div>
        </div>
      ),
    },
    {
      header: "Alarm Type",
      accessor: (a: typeof liveAlarms[0]) => (
        <div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{a.type}</div>
        </div>
      ),
    },
    { header: "Severity", accessor: (a: typeof liveAlarms[0]) => <SeverityBadge severity={a.ack ? "Normal" : a.severity} /> },
    {
      header: "Start / Duration",
      accessor: (a: typeof liveAlarms[0]) => (
        <div className="text-[11px]">
          <div className="text-slate-500">{a.startTime}</div>
          <div className={`font-bold ${parseInt(a.duration) > 60 ? "text-rose-600" : "text-slate-600"}`}>{a.duration}</div>
        </div>
      ),
    },
    { header: "Gateway", accessor: (a: typeof liveAlarms[0]) => <StatusDot status={a.gwStatus} /> },
    {
      header: "Actions",
      accessor: (a: typeof liveAlarms[0]) => (
        <div className="flex gap-1 flex-wrap">
          {!a.ack && <ActionBtn label="Acknowledge" variant="success" />}
          <ActionBtn label="Ticket" />
          <ActionBtn label="Assign" />
        </div>
      ),
    },
  ];

  return (
    <NOCPageShell
      title="Live Alarms"
      subtitle="Real-time alarm feed across all customers and sites"
      badge={`${liveAlarms.filter(a => !a.ack).length} Active`}
      badgeColor="bg-rose-500"
      kpis={kpis}
      actions={
        <button className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50 shadow-sm">
          <RefreshCw className="w-3.5 h-3.5" /> Live
        </button>
      }
    >
      {/* 7-day alarm trend */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-4">7-Day Alarm Volume Trend</div>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={alarmTrend7d} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "11px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }} />
            <Bar dataKey="critical" name="Critical" stackId="a" fill="#EF4444" radius={[0, 0, 0, 0]} />
            <Bar dataKey="major" name="Major" stackId="a" fill="#F97316" />
            <Bar dataKey="minor" name="Minor" stackId="a" fill="#FBBF24" />
            <Bar dataKey="warning" name="Warning" stackId="a" fill="#FDE68A" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {(Object.keys(counts) as AlarmTab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${tab === t ? tabColors[t] : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"}`}>
            {t} <span className="ml-1 font-mono opacity-80">({counts[t]})</span>
          </button>
        ))}
      </div>

      <NOCTable columns={columns} data={filtered} emptyMessage="No alarms in this category" />
    </NOCPageShell>
  );
}
