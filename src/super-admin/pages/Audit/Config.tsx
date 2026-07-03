import { NOCPageShell, NOCTable } from "../../components/NOCPageShell";
import { configPushHistory } from "../../data/operationalMockData";
export default function ConfigAuditPage() {
  const columns = [
    { header: "Time", accessor: (p: typeof configPushHistory[0]) => <span className="text-xs font-semibold">{p.started}</span> },
    { header: "Job ID", accessor: (p: typeof configPushHistory[0]) => <span className="font-mono text-[11px] font-bold text-blue-600">{p.id}</span> },
    { header: "Profile", accessor: (p: typeof configPushHistory[0]) => <span className="font-bold text-xs">{p.profile}</span> },
    { header: "Targets", accessor: (p: typeof configPushHistory[0]) => <span className="text-xs">{p.targetSites}</span> },
    { header: "Actor", accessor: (p: typeof configPushHistory[0]) => <span className="text-[11px] font-mono bg-slate-100 px-2 py-1 rounded">{p.pushedBy}</span> },
  ];
  return <NOCPageShell title="Config Audit" subtitle="Detailed logs of all gateway configuration changes"><NOCTable columns={columns} data={configPushHistory} /></NOCPageShell>;
}
