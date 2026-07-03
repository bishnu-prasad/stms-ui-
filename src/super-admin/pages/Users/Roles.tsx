import { NOCPageShell, NOCTable } from "../../components/NOCPageShell";
const mockData = [
  { role: "Super Admin", scope: "Global", users: 5, description: "Full platform access" },
  { role: "NOC L2", scope: "Global", users: 12, description: "Triage and ops access" },
  { role: "Portal Admin", scope: "Customer Tenant", users: 84, description: "Customer-level admin" }
];
export default function RolesPage() {
  const columns = [
    { header: "Role", accessor: (u: typeof mockData[0]) => <span className="font-bold text-xs">{u.role}</span> },
    { header: "Scope", accessor: (u: typeof mockData[0]) => <span className="text-xs font-semibold">{u.scope}</span> },
    { header: "Assigned Users", accessor: (u: typeof mockData[0]) => <span className="text-xs">{u.users}</span> },
    { header: "Description", accessor: (u: typeof mockData[0]) => <span className="text-xs text-slate-500">{u.description}</span> },
  ];
  return <NOCPageShell title="Roles & Permissions" subtitle="Define access control rules for all user types"><NOCTable columns={columns} data={mockData} /></NOCPageShell>;
}
