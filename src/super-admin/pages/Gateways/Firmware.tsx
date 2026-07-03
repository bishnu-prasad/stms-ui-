import { NOCPageShell, NOCTable, ActionBtn } from "../../components/NOCPageShell";
import { gateways } from "../../data/operationalMockData";

export default function Firmware() {
  const versions = [
    { version: "v2.4.1", status: "Current", gateways: 8400, release: "2024-05-15", compliant: true },
    { version: "v2.4.0", status: "Supported", gateways: 2150, release: "2024-03-10", compliant: true },
    { version: "v2.3.8", status: "Deprecated", gateways: 1800, release: "2023-11-20", compliant: false },
    { version: "v2.1.0", status: "EOL", gateways: 100, release: "2023-01-05", compliant: false },
  ];

  const compliantCount = versions.filter(v => v.compliant).reduce((sum, v) => sum + v.gateways, 0);
  const total = gateways.length;
  const pct = Math.round((compliantCount / total) * 100);

  const kpis = [
    { label: "Global Compliance", value: `${pct}%`, color: "text-emerald-600" },
    { label: "Pending Updates", value: "1,900", color: "text-amber-600" },
    { label: "Latest Release", value: "v2.4.1", color: "text-blue-600" },
  ];

  const columns = [
    { header: "Firmware Version", accessor: (v: typeof versions[0]) => <span className="font-mono font-bold">{v.version}</span> },
    { header: "Active Gateways", accessor: (v: typeof versions[0]) => <span className="font-bold">{v.gateways.toLocaleString()}</span> },
    { header: "Release Date", accessor: (v: typeof versions[0]) => <span className="text-slate-500">{v.release}</span> },
    { header: "Support Status", accessor: (v: typeof versions[0]) => <span className={`px-2 py-1 rounded text-xs font-bold ${v.status === 'Current' ? 'bg-emerald-100 text-emerald-700' : v.status === 'Deprecated' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>{v.status}</span> },
    { header: "Action", accessor: (v: typeof versions[0]) => <ActionBtn label={v.compliant ? "View Notes" : "Schedule OTA"} variant={v.compliant ? "default" : "danger"} /> },
  ];

  return (
    <NOCPageShell title="Firmware Rollouts" subtitle="Global gateway firmware compliance and OTA updates" kpis={kpis}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
          <span>v2.4.x Compliance</span>
          <span>{pct}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <NOCTable columns={columns} data={versions} />
    </NOCPageShell>
  );
}
