import { NOCPageShell, NOCTable, SeverityBadge, ActionBtn } from "../../components/NOCPageShell";
import { liveAlarms } from "../../data/operationalMockData";

const history = liveAlarms.map((a, i) => ({
  ...a,
  resolvedAt: i % 3 === 0 ? "2h ago" : i % 3 === 1 ? "4h ago" : "Yesterday",
  resolvedBy: i % 2 === 0 ? "NOC L2" : "Vendor",
  mttr: `${Math.floor(Math.random() * 90) + 15}m`,
}));

export default function AlarmHistory() {
  const kpis = [
    { label: "Resolved Today", value: 45, color: "text-emerald-600" },
    { label: "Avg MTTR", value: "38m", color: "text-blue-600" },
    { label: "Recurring Alarms", value: 8, color: "text-amber-600", sub: "Same site, 3x this week" },
    { label: "Escalated", value: 4, color: "text-rose-600" },
  ];

  const columns = [
    { header: "Alarm ID", accessor: (a: typeof history[0]) => <span className="font-mono text-[11px] font-bold text-slate-500">{a.id}</span> },
    {
      header: "Site / Customer",
      accessor: (a: typeof history[0]) => (
        <div>
          <div className="font-bold text-xs text-slate-900 dark:text-white">{a.site}</div>
          <div className="text-[10px] text-slate-400">{a.customer}</div>
        </div>
      ),
    },
    { header: "Type", accessor: (a: typeof history[0]) => <span className="text-xs text-slate-600 dark:text-slate-300">{a.type}</span> },
    { header: "Severity", accessor: (a: typeof history[0]) => <SeverityBadge severity={a.severity} /> },
    { header: "Started", accessor: (a: typeof history[0]) => <span className="text-[11px] text-slate-400">{a.startTime}</span> },
    { header: "Duration", accessor: (a: typeof history[0]) => <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{a.duration}</span> },
    { header: "MTTR", accessor: (a: typeof history[0]) => <span className="text-xs font-bold text-blue-600">{a.mttr}</span> },
    { header: "Resolved By", accessor: (a: typeof history[0]) => <span className="text-[11px] text-slate-500">{a.resolvedBy}</span> },
    { header: "Action", accessor: (a: typeof history[0]) => <ActionBtn label="View" /> },
  ];

  return (
    <NOCPageShell title="Alarm History" subtitle="Historical alarm records with resolution metrics" kpis={kpis}>
      <NOCTable columns={columns} data={history} />
    </NOCPageShell>
  );
}
