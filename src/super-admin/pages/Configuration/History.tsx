import { NOCPageShell, NOCTable, ActionBtn } from "../../components/NOCPageShell";
import { configPushHistory } from "../../data/operationalMockData";

export default function ConfigHistory() {
  const columns = [
    { header: "Push ID", accessor: (p: typeof configPushHistory[0]) => <span className="font-mono text-[11px] font-bold text-blue-600">{p.id}</span> },
    { header: "Profile", accessor: (p: typeof configPushHistory[0]) => <span className="font-bold text-xs">{p.profile}</span> },
    { header: "Target Sites", accessor: (p: typeof configPushHistory[0]) => <span className="text-xs">{p.targetSites}</span> },
    { header: "Success", accessor: (p: typeof configPushHistory[0]) => <span className="text-emerald-600 font-bold">{p.successful}</span> },
    { header: "Failed", accessor: (p: typeof configPushHistory[0]) => <span className={p.failed > 0 ? "text-rose-600 font-bold" : "text-slate-400"}>{p.failed}</span> },
    { header: "Pushed By", accessor: (p: typeof configPushHistory[0]) => <span className="text-[11px] font-semibold">{p.pushedBy}</span> },
    { header: "Started", accessor: (p: typeof configPushHistory[0]) => <span className="text-xs text-slate-500">{p.started}</span> },
    { header: "Duration", accessor: (p: typeof configPushHistory[0]) => <span className="text-xs">{p.duration}</span> },
    { header: "Action", accessor: (p: typeof configPushHistory[0]) => <ActionBtn label="View Log" /> },
  ];

  return (
    <NOCPageShell title="Push History" subtitle="Audit log of all configuration pushes and synchronization tasks">
      <NOCTable columns={columns} data={configPushHistory} />
    </NOCPageShell>
  );
}
