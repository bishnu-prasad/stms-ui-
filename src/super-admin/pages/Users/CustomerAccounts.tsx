import { NOCPageShell, NOCTable, StatusDot } from "../../components/NOCPageShell";
const mockData = [
  { id: "CUS-101", name: "Rahul Singh", email: "rsingh@jio.com", customer: "Jio", role: "Portal Admin", lastLogin: "10m ago", status: "Active" },
  { id: "CUS-102", name: "Neha Sharma", email: "nsharma@airtel.in", customer: "Airtel", role: "Viewer", lastLogin: "Yesterday", status: "Active" }
];
export default function CustomerAccountsPage() {
  const columns = [
    { header: "Name", accessor: (u: typeof mockData[0]) => <span className="font-bold text-xs">{u.name}</span> },
    { header: "Customer", accessor: (u: typeof mockData[0]) => <span className="font-semibold text-xs">{u.customer}</span> },
    { header: "Role", accessor: (u: typeof mockData[0]) => <span className="text-xs">{u.role}</span> },
    { header: "Status", accessor: (u: typeof mockData[0]) => <StatusDot status={u.status} /> },
  ];
  return <NOCPageShell title="Customer Accounts" subtitle="Manage user accounts across all customer tenants"><NOCTable columns={columns} data={mockData} /></NOCPageShell>;
}
