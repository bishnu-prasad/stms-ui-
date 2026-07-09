import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { platformAdmins } from "../../data/ownerMockData";
import { Shield, Key, UserCog, Users, CheckCircle2, XCircle } from "lucide-react";

type Tab = "admins" | "customer-admins" | "roles" | "permissions";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  mfaEnabled: boolean;
  lastLogin: string;
}

function InviteAdminModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (admin: Admin) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Operations Admin");
  const [department, setDepartment] = useState("Operations");
  const [mfaEnabled, setMfaEnabled] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newAdmin: Admin = {
      id: `admin-${Date.now()}`,
      name,
      email,
      role,
      department,
      mfaEnabled,
      lastLogin: new Date().toISOString(),
    };

    onSave(newAdmin);
    onClose();
    setName("");
    setEmail("");
    setRole("Operations Admin");
    setDepartment("Operations");
    setMfaEnabled(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col p-6 space-y-4 shadow-xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h2 className="text-sm font-bold text-slate-800">Invite Platform Admin</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm leading-none cursor-pointer">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-slate-600">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Priya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="priya@indionetworks.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-2 outline-none focus:border-indigo-500"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Operations Admin">Operations Admin</option>
                <option value="Billing Admin">Billing Admin</option>
                <option value="Technical Admin">Technical Admin</option>
                <option value="Support Admin">Support Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Department</label>
              <input
                type="text"
                required
                placeholder="e.g. Operations"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 py-1 select-none">
            <input
              type="checkbox"
              id="mfa"
              checked={mfaEnabled}
              onChange={(e) => setMfaEnabled(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="mfa" className="text-slate-600 font-medium cursor-pointer">Require Multi-Factor Authentication (MFA)</label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="h-8.5 px-4 rounded-lg text-slate-600 hover:bg-slate-50 border border-slate-200 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-8.5 px-5 rounded-lg text-white font-bold cursor-pointer transition-all active:scale-95 shadow-sm"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
            >
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OwnerUsers() {
  const [activeTab, setActiveTab] = useState<Tab>("admins");
  const [adminsList, setAdminsList] = useState<Admin[]>(platformAdmins as any);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const tabs = [
    { id: "admins" as Tab, label: "Platform Admins", icon: Shield },
    { id: "customer-admins" as Tab, label: "Customer Admins", icon: Users },
    { id: "roles" as Tab, label: "Roles", icon: UserCog },
    { id: "permissions" as Tab, label: "Permissions", icon: Key },
  ];

  const customerAdmins = [
    { name: "Raj Sharma", email: "raj@reliancejio.com", customer: "Reliance Jio", role: "Admin", status: "active", mfa: true },
    { name: "Priya Patel", email: "priya@airtel.com", customer: "Bharti Airtel", role: "Admin", status: "active", mfa: true },
    { name: "Amit Singh", email: "amit@vodafone.com", customer: "Vodafone Idea", role: "NOC Manager", status: "active", mfa: false },
    { name: "Sunita Reddy", email: "sunita@bsnl.com", customer: "BSNL", role: "Admin", status: "active", mfa: false },
    { name: "Vikram Kumar", email: "vikram@tata.com", customer: "Tata Teleservices", role: "L2 Engineer", status: "active", mfa: true },
  ];

  const roles = [
    { name: "Super Admin", users: adminsList.filter((a) => a.role === "Super Admin").length, permissions: "All permissions", color: "#EF4444" },
    { name: "Operations Admin", users: adminsList.filter((a) => a.role === "Operations Admin").length, permissions: "Customers, Vendors, Reports", color: "#F59E0B" },
    { name: "Billing Admin", users: adminsList.filter((a) => a.role === "Billing Admin").length, permissions: "Billing, Invoices, Reports (read)", color: "#6366F1" },
    { name: "Technical Admin", users: adminsList.filter((a) => a.role === "Technical Admin").length, permissions: "Vendors, System, Platform (read)", color: "#8B5CF6" },
    { name: "Support Admin", users: adminsList.filter((a) => a.role === "Support Admin").length, permissions: "Customers (read), Alarms, Reports (read)", color: "#3B82F6" },
    { name: "Read Only", users: 4, permissions: "View all, no edits", color: "#64748B" },
  ];

  return (
    <div className="space-y-5 pb-6">
      <AnimatePresence>
        {isInviteModalOpen && (
          <InviteAdminModal
            isOpen={isInviteModalOpen}
            onClose={() => setIsInviteModalOpen(false)}
            onSave={(newAdmin) => setAdminsList([...adminsList, newAdmin])}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage platform admins, roles, and permissions</p>
        </div>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white cursor-pointer transition-all active:scale-95 shadow-sm"
          style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
        >
          + Invite Admin
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: "#F1F5F9" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={{ background: activeTab === t.id ? "#fff" : "transparent", color: activeTab === t.id ? "#6366F1" : "#64748B", boxShadow: activeTab === t.id ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}
          >
            <t.icon className="w-3.5 h-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {/* Platform Admins */}
      {activeTab === "admins" && (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
          <table className="w-full text-xs">
            <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
              <tr>
                {["Admin", "Email", "Role", "Department", "MFA", "Last Login", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {adminsList.map((admin) => (
                <tr key={admin.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white font-sans shrink-0" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
                        {admin.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-semibold text-slate-800">{admin.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-mono text-[10px] text-slate-500">{admin.email}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: admin.role === "Super Admin" ? "#FEF2F2" : "rgba(99,102,241,0.08)", color: admin.role === "Super Admin" ? "#EF4444" : "#6366F1" }}>
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{admin.department}</td>
                  <td className="px-5 py-3">
                    {admin.mfaEnabled ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-300" />}
                  </td>
                  <td className="px-5 py-3 text-slate-400">{new Date(admin.lastLogin).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">Active</span>
                  </td>
                  <td className="px-5 py-3">
                    <button className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Customer Admins */}
      {activeTab === "customer-admins" && (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
          <table className="w-full text-xs">
            <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
              <tr>
                {["Name", "Email", "Customer", "Role", "MFA", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customerAdmins.map((admin, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-slate-800">{admin.name}</td>
                  <td className="px-5 py-3 font-mono text-[10px] text-slate-500">{admin.email}</td>
                  <td className="px-5 py-3 text-slate-600">{admin.customer}</td>
                  <td className="px-5 py-3"><span className="text-indigo-600 font-semibold">{admin.role}</span></td>
                  <td className="px-5 py-3">
                    {admin.mfa ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-300" />}
                  </td>
                  <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Roles */}
      {activeTab === "roles" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div key={role.name} className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${role.color}20` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${role.color}15` }}>
                  <Shield className="w-4 h-4" style={{ color: role.color }} />
                </div>
                <span className="text-xs font-bold tabular-nums" style={{ color: role.color }}>{role.users} users</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">{role.name}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">{role.permissions}</p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between">
                <button className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">Edit Role</button>
                <button className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer">Clone</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Permissions */}
      {activeTab === "permissions" && (
        <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
          <h3 className="text-sm font-bold text-slate-800 mb-4">Permission Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                  <th className="text-left pb-3 pr-4 font-semibold text-slate-500 text-[10px] uppercase tracking-wide">Resource</th>
                  {["Super Admin", "Ops Admin", "Billing Admin", "Tech Admin", "Support"].map((r) => (
                    <th key={r} className="text-center pb-3 px-3 font-semibold text-slate-500 text-[10px] uppercase tracking-wide whitespace-nowrap">{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { resource: "Customers", perms: [true, true, false, false, true] },
                  { resource: "Vendors", perms: [true, true, false, true, false] },
                  { resource: "Billing & Invoices", perms: [true, false, true, false, false] },
                  { resource: "Platform Health", perms: [true, true, false, true, false] },
                  { resource: "Analytics", perms: [true, true, true, true, true] },
                  { resource: "Reports", perms: [true, true, true, true, true] },
                  { resource: "User Management", perms: [true, false, false, false, false] },
                  { resource: "System", perms: [true, false, false, true, false] },
                  { resource: "Settings", perms: [true, false, false, false, false] },
                ].map((row) => (
                  <tr key={row.resource}>
                    <td className="py-2.5 pr-4 font-semibold text-slate-700">{row.resource}</td>
                    {row.perms.map((has, i) => (
                      <td key={i} className="py-2.5 px-3 text-center">
                        {has ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-slate-200 text-sm">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
