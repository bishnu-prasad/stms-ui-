import { NOCPageShell, NOCTable, ActionBtn } from "../../components/NOCPageShell";

const otaJobs = [
  { id: "OTA-882", firmware: "v2.4.1", target: "All Gateways (12,450)", status: "Completed", progress: "100%", started: "2 days ago", duration: "14h 20m", failed: 42 },
  { id: "OTA-883", firmware: "v2.4.1-patch1", target: "Jio Network (4,200)", status: "In Progress", progress: "45%", started: "2h ago", duration: "—", failed: 0 },
  { id: "OTA-884", firmware: "v2.4.2-beta", target: "Canary Group (100)", status: "Scheduled", progress: "0%", started: "Tomorrow 02:00", duration: "—", failed: 0 },
];

export default function OTAUpdates() {
  const columns = [
    { header: "Job ID", accessor: (j: typeof otaJobs[0]) => <span className="font-mono text-[11px] font-bold text-blue-600">{j.id}</span> },
    { header: "Firmware Version", accessor: (j: typeof otaJobs[0]) => <span className="font-bold text-xs">{j.firmware}</span> },
    { header: "Target", accessor: (j: typeof otaJobs[0]) => <span className="text-xs text-slate-600">{j.target}</span> },
    { header: "Status", accessor: (j: typeof otaJobs[0]) => (
      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${j.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : j.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
        {j.status}
      </span>
    )},
    { header: "Progress", accessor: (j: typeof otaJobs[0]) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: j.progress }} />
        </div>
        <span className="text-xs font-bold">{j.progress}</span>
      </div>
    )},
    { header: "Started", accessor: (j: typeof otaJobs[0]) => <span className="text-xs">{j.started}</span> },
    { header: "Failed Nodes", accessor: (j: typeof otaJobs[0]) => <span className={j.failed > 0 ? "font-bold text-rose-600" : "text-slate-400"}>{j.failed}</span> },
    { header: "Actions", accessor: (j: typeof otaJobs[0]) => <ActionBtn label="View Logs" /> },
  ];

  return (
    <NOCPageShell 
      title="OTA Firmware Updates" 
      subtitle="Schedule and manage Over-The-Air firmware update campaigns"
      actions={<button className="px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg">New OTA Campaign</button>}
    >
      <NOCTable columns={columns} data={otaJobs} />
    </NOCPageShell>
  );
}
