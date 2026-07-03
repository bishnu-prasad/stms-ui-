import { NOCPageShell, NOCTable, StatusDot } from "../../components/NOCPageShell";
const mockData = [
  { id: "VEN-101", name: "Amit Kumar", email: "akumar@delta.com", vendor: "Delta Electronics", role: "Field Engineer", lastLogin: "1h ago", status: "Active" }
];
export default function VendorAccountsPage() {
  const columns = [
    { header: "Name", accessor: (u: typeof mockData[0]) => <span className="font-bold text-xs">{u.name}</span> },
    { header: "Vendor", accessor: (u: typeof mockData[0]) => <span className="font-semibold text-xs">{u.vendor}</span> },
    { header: "Role", accessor: (u: typeof mockData[0]) => <span className="text-xs">{u.role}</span> },
    { header: "Status", accessor: (u: typeof mockData[0]) => <StatusDot status={u.status} /> },
  ];
  return <NOCPageShell title="Vendor Accounts" subtitle="Manage user accounts across all vendor organizations"><NOCTable columns={columns} data={mockData} /></NOCPageShell>;
}
