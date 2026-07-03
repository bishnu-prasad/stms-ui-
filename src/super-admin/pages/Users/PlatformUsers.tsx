import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, CheckCircle2, XCircle, ShieldAlert } from "lucide-react";
import { superAdminPlatformUsers } from "../../data/mockData";

export default function PlatformUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = superAdminPlatformUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Platform Users</h1>
          <p className="text-xs text-slate-400 mt-1">Manage global STMS administrators and staff.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-700/80 transition-colors shadow-sm">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/20">
            <Plus className="w-3.5 h-3.5" /> Invite User
          </button>
        </div>
      </div>

      <div className="bg-[#1E293B] border border-slate-700/60 rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/40">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#0F172A] border border-slate-700 text-slate-100 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-900/60 border-b border-slate-700/60 text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">MFA Status</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-blue-400">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-100">{user.name}</div>
                        <div className="text-[10px] text-slate-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.mfa ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Enabled
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-red-400">
                        <ShieldAlert className="w-3.5 h-3.5" /> Disabled
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono">{user.lastLogin}</td>
                  <td className="px-6 py-4">
                    {user.status === "Active" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-red-950/60 text-red-400 border border-red-800/60">
                        <XCircle className="w-3.5 h-3.5" /> Locked
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 rounded-md hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
