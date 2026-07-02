import { useState } from "react";
import { Globe, Map, Layers } from "lucide-react";

type Tab = "global" | "regions" | "circles";

export default function OwnerSites() {
  const [activeTab, setActiveTab] = useState<Tab>("global");

  const tabs = [
    { id: "global" as Tab, label: "Global Sites", icon: Globe },
    { id: "regions" as Tab, label: "Regions", icon: Map },
    { id: "circles" as Tab, label: "Circles", icon: Layers },
  ];

  const sites = [
    { id: "s-001", name: "Mumbai Central Tower", customer: "Reliance Jio", region: "West", circle: "Mumbai", status: "online", devices: 12, alarms: 0, lat: "19.0760° N", lng: "72.8777° E" },
    { id: "s-002", name: "Delhi Ring Road Site", customer: "Bharti Airtel", region: "North", circle: "Delhi", status: "online", devices: 18, alarms: 1, lat: "28.6139° N", lng: "77.2090° E" },
    { id: "s-003", name: "Kolkata Port Tower", customer: "BSNL", region: "East", circle: "West Bengal", status: "warning", devices: 8, alarms: 3, lat: "22.5726° N", lng: "88.3639° E" },
    { id: "s-004", name: "Chennai IT Corridor", customer: "Tata Teleservices", region: "South", circle: "Tamil Nadu", status: "online", devices: 14, alarms: 0, lat: "13.0827° N", lng: "80.2707° E" },
    { id: "s-005", name: "Ahmedabad GIDC", customer: "Vodafone Idea", region: "West", circle: "Gujarat", status: "offline", devices: 10, alarms: 5, lat: "23.0225° N", lng: "72.5714° E" },
    { id: "s-006", name: "Pune Hinjewadi Hub", customer: "Tikona Digital Networks", region: "West", circle: "Maharashtra", status: "online", devices: 16, alarms: 0, lat: "18.5204° N", lng: "73.8567° E" },
    { id: "s-007", name: "Bangalore Whitefield", customer: "Bharti Airtel", region: "South", circle: "Karnataka", status: "online", devices: 22, alarms: 2, lat: "12.9716° N", lng: "77.5946° E" },
    { id: "s-008", name: "Hyderabad HITEC City", customer: "Reliance Jio", region: "South", circle: "Telangana", status: "online", devices: 20, alarms: 0, lat: "17.3850° N", lng: "78.4867° E" },
  ];

  const regions = [
    { name: "North", states: ["Delhi", "UP", "Rajasthan", "Haryana", "J&K"], sites: 2840, healthySites: 2780, customers: 3 },
    { name: "South", states: ["Tamil Nadu", "Karnataka", "Telangana", "Kerala", "AP"], sites: 1920, healthySites: 1890, customers: 3 },
    { name: "West", states: ["Maharashtra", "Gujarat", "Goa"], sites: 2180, healthySites: 2050, customers: 4 },
    { name: "East", states: ["West Bengal", "Odisha", "Bihar", "Jharkhand"], sites: 980, healthySites: 960, customers: 2 },
    { name: "Central", states: ["MP", "Chhattisgarh", "Uttarakhand"], sites: 542, healthySites: 538, customers: 2 },
    { name: "Northeast", sites: 0, healthySites: 0, customers: 0, states: ["Assam", "Others"] },
  ];

  const circles = [
    { name: "Mumbai", region: "West", sites: 640, customer: "Reliance Jio, VI", status: "Healthy" },
    { name: "Delhi", region: "North", sites: 820, customer: "Airtel, Jio", status: "Healthy" },
    { name: "Tamil Nadu", region: "South", sites: 480, customer: "Tata, Airtel", status: "Healthy" },
    { name: "Gujarat", region: "West", sites: 580, customer: "VI, Jio", status: "Warning" },
    { name: "Maharashtra", region: "West", sites: 460, customer: "Tikona, Airtel", status: "Healthy" },
    { name: "Karnataka", region: "South", sites: 520, customer: "Airtel, BSNL", status: "Healthy" },
    { name: "West Bengal", region: "East", sites: 340, customer: "MTS, BSNL", status: "Warning" },
    { name: "UP", region: "North", sites: 780, customer: "Jio, BSNL", status: "Healthy" },
  ];

  const statusColor: Record<string, string> = { online: "#10B981", warning: "#F59E0B", offline: "#EF4444", Healthy: "#10B981", Warning: "#F59E0B" };

  return (
    <div className="space-y-5 pb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Sites</h1>
        <p className="text-sm text-slate-500 mt-0.5">Global site distribution across all customers</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: "#F1F5F9" }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={{ background: activeTab === t.id ? "#fff" : "transparent", color: activeTab === t.id ? "#6366F1" : "#64748B", boxShadow: activeTab === t.id ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}>
            <t.icon className="w-3.5 h-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {activeTab === "global" && (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
          <table className="w-full text-xs">
            <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
              <tr>{["Site Name", "Customer", "Region", "Circle", "Status", "Devices", "Alarms", "Coordinates"].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sites.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-slate-800">{s.name}</td>
                  <td className="px-5 py-3 text-slate-500">{s.customer}</td>
                  <td className="px-5 py-3 text-slate-600">{s.region}</td>
                  <td className="px-5 py-3 text-slate-500">{s.circle}</td>
                  <td className="px-5 py-3"><span className="flex items-center gap-1.5 font-semibold" style={{ color: statusColor[s.status] }}><span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[s.status] }} />{s.status}</span></td>
                  <td className="px-5 py-3 tabular-nums text-slate-700">{s.devices}</td>
                  <td className="px-5 py-3 font-bold" style={{ color: s.alarms > 3 ? "#EF4444" : s.alarms > 0 ? "#F59E0B" : "#10B981" }}>{s.alarms}</td>
                  <td className="px-5 py-3 font-mono text-[10px] text-slate-400">{s.lat}, {s.lng}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "regions" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {regions.map((r) => (
            <div key={r.name} className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800">{r.name} Region</h3>
                <span className="text-lg">📍</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-slate-400">Total Sites</span><span className="font-bold text-slate-800">{r.sites.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Healthy Sites</span><span className="font-bold text-emerald-600">{r.healthySites.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Customers</span><span className="font-bold text-indigo-600">{r.customers}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">States/UTs</span><span className="font-semibold text-slate-600">{r.states.length}</span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="h-1.5 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: r.sites > 0 ? `${(r.healthySites / r.sites) * 100}%` : "0%" }} />
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{r.sites > 0 ? Math.round((r.healthySites / r.sites) * 100) : 0}% healthy</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "circles" && (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
          <table className="w-full text-xs">
            <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
              <tr>{["Circle", "Region", "Sites", "Customers", "Status"].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {circles.map((c) => (
                <tr key={c.name} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-slate-800">{c.name}</td>
                  <td className="px-5 py-3 text-slate-500">{c.region}</td>
                  <td className="px-5 py-3 font-bold tabular-nums text-slate-800">{c.sites}</td>
                  <td className="px-5 py-3 text-slate-500 text-[11px]">{c.customer}</td>
                  <td className="px-5 py-3"><span className="font-semibold text-xs" style={{ color: statusColor[c.status] }}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
