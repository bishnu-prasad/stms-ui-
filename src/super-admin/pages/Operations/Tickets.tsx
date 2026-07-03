import { NOCPageShell, NOCTable, SeverityBadge, ActionBtn } from "../../components/NOCPageShell";
import { tickets } from "../../data/operationalMockData";
import { useState } from "react";

export default function Tickets() {
  const [tab, setTab] = useState("All");

  const kpis = [
    { label: "Open Tickets", value: tickets.filter(t => t.status !== "Resolved").length, color: "text-amber-600" },
    { label: "Critical Priority", value: tickets.filter(t => t.priority === "Critical").length, color: "text-rose-600" },
    { label: "Unassigned", value: tickets.filter(t => t.vendor === "Unassigned").length, color: "text-slate-500" },
  ];

  const columns = [
    { header: "Ticket ID", accessor: (t: typeof tickets[0]) => <span className="font-mono text-[11px] font-bold text-blue-600">{t.id}</span> },
    { header: "Title", accessor: (t: typeof tickets[0]) => <span className="font-bold text-xs">{t.title}</span> },
    { header: "Site / Customer", accessor: (t: typeof tickets[0]) => <div className="text-xs"><div>{t.site}</div><div className="text-[10px] text-slate-400">{t.customer}</div></div> },
    { header: "Priority", accessor: (t: typeof tickets[0]) => <SeverityBadge severity={t.priority} /> },
    { header: "Status", accessor: (t: typeof tickets[0]) => <span className="text-xs font-semibold">{t.status}</span> },
    { header: "Vendor", accessor: (t: typeof tickets[0]) => <span className={`text-xs ${t.vendor === "Unassigned" ? "text-slate-400 italic" : ""}`}>{t.vendor}</span> },
    { header: "SLA Left", accessor: (t: typeof tickets[0]) => <span className="font-bold text-xs">{t.slaLeft}</span> },
    { header: "Actions", accessor: (t: typeof tickets[0]) => <ActionBtn label="Manage" /> },
  ];

  return (
    <NOCPageShell title="Ticket Center" subtitle="Manage operational work orders and dispatches" kpis={kpis}>
      <NOCTable columns={columns} data={tickets} />
    </NOCPageShell>
  );
}
