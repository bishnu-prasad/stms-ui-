import { NOCPageShell, NOCTable, ActionBtn } from "../../components/NOCPageShell";

const escalations = [
  { id: "ESC-101", ticket: "TKT-4422", issue: "DG Failure - Engine Won't Start", customer: "Vi", site: "Salt Lake Sector-V", age: "14h", level: "L3 Management", assigned: "Operations Director" },
  { id: "ESC-102", ticket: "TKT-4418", issue: "Repeated Mains Failure > 10x today", customer: "Jio", site: "Bandra Kurla-01", age: "2d", level: "L2 Regional", assigned: "West Ops Manager" },
  { id: "ESC-103", ticket: "TKT-4395", issue: "Vendor SLA Breach - No Response", customer: "Airtel", site: "Andheri East-08", age: "5d", level: "L3 Management", assigned: "Vendor Manager" },
];

export default function Escalations() {
  const columns = [
    { header: "Escalation ID", accessor: (e: typeof escalations[0]) => <span className="font-mono text-[11px] font-bold text-rose-600">{e.id}</span> },
    { header: "Linked Ticket", accessor: (e: typeof escalations[0]) => <span className="font-mono text-[11px] font-bold text-blue-600">{e.ticket}</span> },
    { header: "Issue Summary", accessor: (e: typeof escalations[0]) => <span className="font-bold text-xs">{e.issue}</span> },
    { header: "Customer / Site", accessor: (e: typeof escalations[0]) => <div className="text-xs"><div>{e.site}</div><div className="text-[10px] text-slate-400">{e.customer}</div></div> },
    { header: "Escalation Age", accessor: (e: typeof escalations[0]) => <span className="font-bold text-rose-600">{e.age}</span> },
    { header: "Escalation Level", accessor: (e: typeof escalations[0]) => <span className="text-[11px] font-bold px-2 py-1 bg-rose-100 text-rose-700 rounded">{e.level}</span> },
    { header: "Assigned To", accessor: (e: typeof escalations[0]) => <span className="text-[11px] font-semibold">{e.assigned}</span> },
    { header: "Actions", accessor: (e: typeof escalations[0]) => <ActionBtn label="Intervene" variant="danger" /> },
  ];

  return (
    <NOCPageShell 
      title="Active Escalations" 
      subtitle="High priority unresolved tickets requiring management intervention"
      badge="3 Active"
      badgeColor="bg-rose-500"
    >
      <NOCTable columns={columns} data={escalations} />
    </NOCPageShell>
  );
}
