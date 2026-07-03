import { NOCPageShell, NOCTable, ActionBtn, StatusDot } from "../../components/NOCPageShell";

const profiles = [
  { id: "CP-2024-08", name: "Standard Edge Config v8", type: "Global", gateways: 12050, lastUpdated: "Aug 15, 2024", author: "System Admin" },
  { id: "CP-2024-07", name: "Standard Edge Config v7", type: "Global", gateways: 350, lastUpdated: "Jul 01, 2024", author: "System Admin" },
  { id: "CP-LOWBW", name: "Low Bandwidth Optimized", type: "Specialized", gateways: 45, lastUpdated: "Jun 12, 2024", author: "NOC L3" },
  { id: "CP-DEBUG", name: "Verbose Logging Config", type: "Debug", gateways: 5, lastUpdated: "Yesterday", author: "Engineering" },
];

export default function ConfigProfiles() {
  const columns = [
    { header: "Profile ID", accessor: (p: typeof profiles[0]) => <span className="font-mono text-[11px] font-bold text-blue-600">{p.id}</span> },
    { header: "Profile Name", accessor: (p: typeof profiles[0]) => <span className="font-bold text-xs">{p.name}</span> },
    { header: "Type", accessor: (p: typeof profiles[0]) => <span className="text-xs text-slate-500">{p.type}</span> },
    { header: "Active Gateways", accessor: (p: typeof profiles[0]) => <span className="font-bold">{p.gateways.toLocaleString()}</span> },
    { header: "Last Updated", accessor: (p: typeof profiles[0]) => <span className="text-xs">{p.lastUpdated}</span> },
    { header: "Author", accessor: (p: typeof profiles[0]) => <span className="text-[11px] font-semibold">{p.author}</span> },
    { header: "Actions", accessor: (p: typeof profiles[0]) => (
      <div className="flex gap-1">
        <ActionBtn label="Edit" />
        <ActionBtn label="Push" variant="success" />
      </div>
    )},
  ];

  return (
    <NOCPageShell 
      title="Configuration Profiles" 
      subtitle="Manage gateway configuration templates and versions"
      actions={<button className="px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg">Create Profile</button>}
    >
      <NOCTable columns={columns} data={profiles} />
    </NOCPageShell>
  );
}
