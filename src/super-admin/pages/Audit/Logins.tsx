import { NOCPageShell, NOCTable } from "../../components/NOCPageShell";
const mockData = [
  { time: "2m ago", user: "arjun@stms.io", ip: "192.168.1.45", location: "Mumbai, IN", status: "Success" },
  { time: "1h ago", user: "system_api", ip: "10.0.4.12", location: "AWS ap-south-1", status: "Success" },
  { time: "2h ago", user: "unknown", ip: "14.45.21.11", location: "Beijing, CN", status: "Failed (Bad Password)" },
];
export default function LoginsPage() {
  const columns = [
    { header: "Time", accessor: (a: typeof mockData[0]) => <span className="text-xs font-semibold">{a.time}</span> },
    { header: "User", accessor: (a: typeof mockData[0]) => <span className="text-xs font-bold">{a.user}</span> },
    { header: "IP Address", accessor: (a: typeof mockData[0]) => <span className="text-[11px] font-mono text-slate-500">{a.ip}</span> },
    { header: "Location", accessor: (a: typeof mockData[0]) => <span className="text-xs">{a.location}</span> },
    { header: "Status", accessor: (a: typeof mockData[0]) => <span className={`text-xs font-bold ${a.status.includes('Failed') ? 'text-rose-600' : 'text-emerald-600'}`}>{a.status}</span> },
  ];
  return <NOCPageShell title="Login History" subtitle="Audit trail of all authentication events"><NOCTable columns={columns} data={mockData} /></NOCPageShell>;
}
