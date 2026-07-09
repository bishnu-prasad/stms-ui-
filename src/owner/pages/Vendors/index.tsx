import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { vendors } from "../../data/ownerMockData";
import { TrendingUp, Shield, Cpu, Star, ChevronRight } from "lucide-react";

type Tab = "performance" | "sla" | "firmware";

interface Vendor {
  id: string;
  name: string;
  logo: string;
  products: string[];
  installedSites: number;
  failureRate: number;
  avgResponseTime: number;
  healthScore: number;
  customerRating: number;
  slaCompliance: number;
  openTickets: number;
  status: "active" | "inactive";
  firmware: string;
}

function AddVendorModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (v: Vendor) => void;
}) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [products, setProducts] = useState("");
  const [installedSites, setInstalledSites] = useState(0);
  const [failureRate, setFailureRate] = useState(0.0);
  const [avgResponseTime, setAvgResponseTime] = useState(0.0);
  const [healthScore, setHealthScore] = useState(90);
  const [customerRating, setCustomerRating] = useState(4.5);
  const [slaCompliance, setSlaCompliance] = useState(98.5);
  const [openTickets, setOpenTickets] = useState(0);
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [firmware, setFirmware] = useState("v1.0.0");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !logo) return;
    const newVendor: Vendor = {
      id: `vend-${Date.now()}`,
      name,
      logo: logo.toUpperCase().slice(0, 2),
      products: products.split(",").map((p) => p.trim()).filter(Boolean),
      installedSites: Number(installedSites),
      failureRate: Number(failureRate),
      avgResponseTime: Number(avgResponseTime),
      healthScore: Number(healthScore),
      customerRating: Number(customerRating),
      slaCompliance: Number(slaCompliance),
      openTickets: Number(openTickets),
      status,
      firmware,
    };
    onSave(newVendor);
    onClose();
    setName("");
    setLogo("");
    setProducts("");
    setInstalledSites(0);
    setFailureRate(0.0);
    setAvgResponseTime(0.0);
    setHealthScore(90);
    setCustomerRating(4.5);
    setSlaCompliance(98.5);
    setOpenTickets(0);
    setStatus("active");
    setFirmware("v1.0.0");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col p-6 space-y-4 shadow-xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h2 className="text-sm font-bold text-slate-800">Add New Vendor</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm leading-none cursor-pointer">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-slate-600">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Vendor Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Ericsson India"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Logo Initials (Max 2 letters)</label>
              <input
                type="text"
                required
                maxLength={2}
                placeholder="e.g. ER"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Products (Comma separated)</label>
            <input
              type="text"
              placeholder="e.g. UPS, SMPS, Battery Controller"
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Installed Sites</label>
              <input
                type="number"
                min={0}
                required
                placeholder="e.g. 1000"
                value={installedSites || ""}
                onChange={(e) => setInstalledSites(Number(e.target.value))}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Failure Rate (%)</label>
              <input
                type="number"
                step="0.1"
                min={0}
                max={100}
                required
                placeholder="0.8"
                value={failureRate || ""}
                onChange={(e) => setFailureRate(Number(e.target.value))}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Response Time (h)</label>
              <input
                type="number"
                step="0.1"
                min={0}
                required
                placeholder="2.4"
                value={avgResponseTime || ""}
                onChange={(e) => setAvgResponseTime(Number(e.target.value))}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Health Score (0-100)</label>
              <input
                type="number"
                min={0}
                max={100}
                required
                placeholder="95"
                value={healthScore || ""}
                onChange={(e) => setHealthScore(Number(e.target.value))}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">SLA Compliance (%)</label>
              <input
                type="number"
                step="0.1"
                min={0}
                max={100}
                required
                placeholder="99.0"
                value={slaCompliance || ""}
                onChange={(e) => setSlaCompliance(Number(e.target.value))}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Customer Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                min={0}
                max={5}
                required
                placeholder="4.8"
                value={customerRating || ""}
                onChange={(e) => setCustomerRating(Number(e.target.value))}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Open Tickets</label>
              <input
                type="number"
                min={0}
                required
                placeholder="e.g. 5"
                value={openTickets || ""}
                onChange={(e) => setOpenTickets(Number(e.target.value))}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-2 outline-none focus:border-indigo-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Firmware Version</label>
              <input
                type="text"
                required
                placeholder="v1.0.0"
                value={firmware}
                onChange={(e) => setFirmware(e.target.value)}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500"
              />
            </div>
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
              Save Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OwnerVendors() {
  const [activeTab, setActiveTab] = useState<Tab>("performance");
  const [vendorsList, setVendorsList] = useState<Vendor[]>(vendors as any);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const tabs = [
    { id: "performance" as Tab, label: "Vendor Performance", icon: TrendingUp },
    { id: "sla" as Tab, label: "Vendor SLA", icon: Shield },
    { id: "firmware" as Tab, label: "Firmware", icon: Cpu },
  ];

  return (
    <div className="space-y-5 pb-6">
      <AnimatePresence>
        {isAddModalOpen && (
          <AddVendorModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={(newVendor) => setVendorsList([...vendorsList, newVendor])}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Vendors</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage and monitor all platform vendors</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white cursor-pointer transition-all active:scale-95 shadow-sm"
          style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
        >
          + Add Vendor
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

      {activeTab === "performance" && (
        <div className="space-y-3">
          {vendorsList.map((v, idx) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-5 flex items-center gap-5"
              style={{ border: "1px solid #E2E8F0" }}
            >
              <div className="text-lg font-bold text-slate-300 w-6 text-center tabular-nums">#{idx + 1}</div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
                {v.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-800 text-sm">{v.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{v.products.join(", ")}</div>
              </div>
              <div className="grid grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-1">Installed Sites</div>
                  <div className="text-sm font-bold text-slate-800 tabular-nums">{v.installedSites.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-1">Failure Rate</div>
                  <div className="text-sm font-bold tabular-nums" style={{ color: v.failureRate < 1 ? "#10B981" : v.failureRate < 2 ? "#F59E0B" : "#EF4444" }}>{v.failureRate}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-1">Response Time</div>
                  <div className="text-sm font-bold text-slate-800 tabular-nums">{v.avgResponseTime}h</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-1">Health Score</div>
                  <div className="text-sm font-bold tabular-nums" style={{ color: v.healthScore >= 90 ? "#10B981" : v.healthScore >= 75 ? "#F59E0B" : "#EF4444" }}>{v.healthScore}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-slate-700">{v.customerRating}</span>
              </div>
              <div>
                <div className="w-full h-2 rounded-full bg-slate-100 w-20">
                  <div className="h-full rounded-full" style={{ width: `${v.healthScore}%`, background: v.healthScore >= 90 ? "#10B981" : v.healthScore >= 75 ? "#F59E0B" : "#EF4444" }} />
                </div>
              </div>
              <button className="text-xs font-semibold text-indigo-600 flex items-center gap-0.5 cursor-pointer whitespace-nowrap">
                View <ChevronRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "sla" && (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
          <table className="w-full text-xs">
            <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
              <tr>
                {["Vendor", "SLA Compliance", "Avg Response", "Open Tickets", "Failures/mo", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {vendorsList.map((v) => {
                const slaColor = v.slaCompliance >= 98 ? "#10B981" : v.slaCompliance >= 95 ? "#F59E0B" : "#EF4444";
                return (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg text-[10px] font-bold text-white flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>{v.logo}</div>
                        <span className="font-semibold text-slate-800">{v.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-slate-100">
                          <div className="h-full rounded-full" style={{ width: `${v.slaCompliance}%`, background: slaColor }} />
                        </div>
                        <span className="font-bold tabular-nums" style={{ color: slaColor }}>{v.slaCompliance}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-700 tabular-nums">{v.avgResponseTime}h</td>
                    <td className="px-5 py-3 font-bold" style={{ color: v.openTickets > 40 ? "#EF4444" : v.openTickets > 20 ? "#F59E0B" : "#10B981" }}>{v.openTickets}</td>
                    <td className="px-5 py-3 text-slate-700 tabular-nums">{v.failureRate}%</td>
                    <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize" style={{ background: v.status === "active" ? "#ECFDF5" : "#FEF2F2", color: v.status === "active" ? "#059669" : "#DC2626" }}>{v.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "firmware" && (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Firmware Versions</h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 cursor-pointer" style={{ border: "1px solid #E0E7FF", background: "rgba(99,102,241,0.04)" }}>
              <Cpu className="w-3.5 h-3.5" /> Upload Firmware
            </button>
          </div>
          <table className="w-full text-xs">
            <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
              <tr>
                {["Vendor", "Current Version", "Installed Sites", "Pending Updates", "Last Deployed", "Action"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {vendorsList.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-slate-800">{v.name}</td>
                  <td className="px-5 py-3"><span className="font-mono text-[11px] px-2 py-0.5 rounded" style={{ background: "#F0FDF4", color: "#059669" }}>{v.firmware}</span></td>
                  <td className="px-5 py-3 tabular-nums text-slate-700">{v.installedSites.toLocaleString()}</td>
                  <td className="px-5 py-3 font-bold" style={{ color: v.openTickets > 30 ? "#F59E0B" : "#10B981" }}>{Math.floor(v.installedSites * 0.12)}</td>
                  <td className="px-5 py-3 text-slate-400">2026-06-25</td>
                  <td className="px-5 py-3">
                    <button className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">Deploy Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
