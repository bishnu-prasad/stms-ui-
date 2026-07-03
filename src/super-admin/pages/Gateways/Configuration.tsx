import { NOCPageShell, NOCTable, ActionBtn } from "../../components/NOCPageShell";
import { configPushHistory } from "../../data/operationalMockData";

export default function ConfigurationOps() {
  const kpis = [
    { label: "Successful Pushes", value: 1420, color: "text-emerald-600" },
    { label: "Failed Pushes", value: 11, color: "text-rose-600" },
    { label: "Pending Sync", value: 45, color: "text-amber-600" },
  ];

  const columns = [
    { header: "Push ID", accessor: (p: typeof configPushHistory[0]) => <span className="font-mono text-[11px] font-bold text-blue-600">{p.id}</span> },
    { header: "Profile", accessor: (p: typeof configPushHistory[0]) => <span className="font-bold text-xs">{p.profile}</span> },
    { header: "Target Sites", accessor: (p: typeof configPushHistory[0]) => <span className="text-xs">{p.targetSites}</span> },
    { header: "Success", accessor: (p: typeof configPushHistory[0]) => <span className="text-emerald-600 font-bold">{p.successful}</span> },
    { header: "Failed", accessor: (p: typeof configPushHistory[0]) => <span className={p.failed > 0 ? "text-rose-600 font-bold" : "text-slate-400"}>{p.failed}</span> },
    { header: "Started", accessor: (p: typeof configPushHistory[0]) => <span className="text-xs text-slate-500">{p.started}</span> },
    { header: "Duration", accessor: (p: typeof configPushHistory[0]) => <span className="text-xs">{p.duration}</span> },
    { header: "Action", accessor: (p: typeof configPushHistory[0]) => <ActionBtn label="View Log" /> },
  ];

  return (
    <NOCPageShell title="Configuration Center" subtitle="Track bulk configuration rollouts and edge synchronization" kpis={kpis}>
      <NOCTable columns={columns} data={configPushHistory} />
    </NOCPageShell>
  );
}
