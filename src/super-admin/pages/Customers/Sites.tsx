import { NOCPageShell, NOCTable, SeverityBadge, StatusDot, ActionBtn } from "../../components/NOCPageShell";
import { sites } from "../../data/operationalMockData";
import { customers } from "../../data/operationalMockData";
import { useState } from "react";
import { Search } from "lucide-react";

export default function CustomerSites() {
  const [selectedCustomer, setSelectedCustomer] = useState("All");
  const filtered = selectedCustomer === "All" ? sites : sites.filter(s => s.customer === selectedCustomer);
  const customerNames = ["All", ...Array.from(new Set(sites.map(s => s.customer)))];

  const kpis = [
    { label: "Total Sites Shown", value: filtered.length },
    { label: "Online", value: filtered.filter(s => s.status === "Online").length, color: "text-emerald-600" },
    { label: "Offline", value: filtered.filter(s => s.status === "Offline").length, color: "text-rose-600" },
    { label: "With Alarms", value: filtered.filter(s => s.alarmSeverity !== "None").length, color: "text-amber-600" },
  ];

  const columns = [
    {
      header: "Site",
      accessor: (s: typeof sites[0]) => (
        <div>
          <div className="font-mono font-bold text-blue-600 text-[11px]">{s.id}</div>
          <div className="font-semibold text-slate-900 dark:text-white text-xs">{s.name}</div>
        </div>
      ),
    },
    { header: "Customer", accessor: (s: typeof sites[0]) => <span className="font-semibold text-xs">{s.customer}</span> },
    { header: "Region / State", accessor: (s: typeof sites[0]) => <span className="text-xs text-slate-500">{s.region} · {s.state}</span> },
    { header: "Status", accessor: (s: typeof sites[0]) => <StatusDot status={s.status} /> },
    { header: "Power Source", accessor: (s: typeof sites[0]) => <span className="text-xs font-semibold">{s.powerSource}</span> },
    {
      header: "Gateway",
      accessor: (s: typeof sites[0]) => (
        <div>
          <StatusDot status={s.gatewayStatus} />
          <div className="text-[10px] font-mono text-slate-400">{s.gatewayId}</div>
        </div>
      ),
    },
    { header: "Last Alarm", accessor: (s: typeof sites[0]) => <SeverityBadge severity={s.alarmSeverity === "None" ? "None" : s.alarmSeverity} /> },
    { header: "Last Comm", accessor: (s: typeof sites[0]) => <span className="text-[11px] text-slate-400">{s.lastComm}</span> },
    { header: "Action", accessor: (s: typeof sites[0]) => <ActionBtn label="Details" /> },
  ];

  return (
    <NOCPageShell
      title="Customer Sites"
      subtitle="All sites grouped by customer with gateway and alarm status"
      kpis={kpis}
      filters={
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
            {customerNames.map(name => (
              <button key={name} onClick={() => setSelectedCustomer(name)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${selectedCustomer === name ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700"}`}>
                {name}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <NOCTable columns={columns} data={filtered} />
    </NOCPageShell>
  );
}
