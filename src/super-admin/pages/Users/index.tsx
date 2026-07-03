import { NOCPageShell, NOCTable, StatusDot } from "../../components/NOCPageShell";
import { adminUsers } from "../../data/operationalMockData";
export default function AdminUsersPage() {
  const columns = [
    { header: "User ID", accessor: (u: typeof adminUsers[0]) => <span className="font-mono text-[11px] font-bold text-blue-600">{u.id}</span> },
    { header: "Name", accessor: (u: typeof adminUsers[0]) => <span className="font-bold text-xs">{u.name}</span> },
    { header: "Email", accessor: (u: typeof adminUsers[0]) => <span className="text-xs text-slate-500">{u.email}</span> },
    { header: "Role", accessor: (u: typeof adminUsers[0]) => <span className="text-xs font-semibold">{u.role}</span> },
    { header: "Last Login", accessor: (u: typeof adminUsers[0]) => <span className="text-xs">{u.lastLogin}</span> },
    { header: "Status", accessor: (u: typeof adminUsers[0]) => <StatusDot status={u.status} /> },
  ];
  return (
    <NOCPageShell title="Admin Users" subtitle="Manage Super Admin console users and NOC operators">
      <NOCTable columns={columns} data={adminUsers} />
    </NOCPageShell>
  );
}
