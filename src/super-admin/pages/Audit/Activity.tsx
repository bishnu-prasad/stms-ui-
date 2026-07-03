import { NOCPageShell, NOCTable } from "../../components/NOCPageShell";
import { activityFeed } from "../../data/operationalMockData";
export default function ActivityLogsPage() {
  const columns = [
    { header: "Time", accessor: (a: typeof activityFeed[0]) => <span className="text-xs font-semibold">{a.time}</span> },
    { header: "Type", accessor: (a: typeof activityFeed[0]) => <span className="text-xs uppercase tracking-wider font-bold text-slate-500">{a.type}</span> },
    { header: "Event", accessor: (a: typeof activityFeed[0]) => <span className="text-xs">{a.event}</span> },
    { header: "Actor", accessor: (a: typeof activityFeed[0]) => <span className="text-[11px] font-mono bg-slate-100 px-2 py-1 rounded">{a.actor}</span> },
  ];
  return <NOCPageShell title="Activity Logs" subtitle="Audit trail of all NOC operator actions"><NOCTable columns={columns} data={activityFeed} /></NOCPageShell>;
}
