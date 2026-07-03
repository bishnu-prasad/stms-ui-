import { NOCPageShell, NOCTable, ActionBtn, SeverityBadge } from "../../components/NOCPageShell";
import { vendors } from "../../data/operationalMockData";

export default function Vendors() {
  const kpis = [
    { label: "Active Vendors", value: vendors.length, color: "text-blue-600" },
    { label: "Open Jobs", value: vendors.reduce((s, v) => s + v.openJobs, 0), color: "text-amber-600" },
    { label: "Avg Response", value: "46m", color: "text-emerald-600" },
  ];

  const columns = [
    { header: "Vendor Name", accessor: (v: typeof vendors[0]) => <span className="font-bold text-xs">{v.name}</span> },
    { header: "Regions", accessor: (v: typeof vendors[0]) => <span className="text-xs text-slate-500">{v.regions.join(", ")}</span> },
    { header: "Open Jobs", accessor: (v: typeof vendors[0]) => <span className="font-bold">{v.openJobs}</span> },
    { header: "Completed Today", accessor: (v: typeof vendors[0]) => <span className="font-bold text-emerald-600">{v.completedToday}</span> },
    { header: "SLA Compliance", accessor: (v: typeof vendors[0]) => <span className={`font-bold ${v.slaCompliance < 95 ? "text-amber-600" : "text-emerald-600"}`}>{v.slaCompliance}%</span> },
    { header: "Avg Response", accessor: (v: typeof vendors[0]) => <span className="text-xs">{v.avgResponse}m</span> },
    { header: "Status", accessor: (v: typeof vendors[0]) => <SeverityBadge severity={v.status === "Active" ? "Normal" : "Warning"} /> },
    { header: "Action", accessor: (v: typeof vendors[0]) => <ActionBtn label="Manage" /> },
  ];

  return (
    <NOCPageShell title="Vendor Management" subtitle="Monitor field service vendor performance and SLAs" kpis={kpis}>
      <NOCTable columns={columns} data={vendors} />
    </NOCPageShell>
  );
}
