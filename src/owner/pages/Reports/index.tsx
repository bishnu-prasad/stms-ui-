import { useState } from "react";
import { FileText, Download, Calendar, BarChart3, Users, Store, Wallet, Zap, ClipboardList } from "lucide-react";

type Tab = "executive" | "customer" | "vendor" | "financial" | "ops" | "energy" | "ai";

const tabs = [
  { id: "executive" as Tab, label: "Executive Reports", icon: BarChart3 },
  { id: "customer" as Tab, label: "Customer Reports", icon: Users },
  { id: "vendor" as Tab, label: "Vendor Reports", icon: Store },
  { id: "financial" as Tab, label: "Financial Reports", icon: Wallet },
  { id: "ops" as Tab, label: "Operations Reports", icon: ClipboardList },
  { id: "energy" as Tab, label: "Energy Reports", icon: Zap },
  { id: "ai" as Tab, label: "AI Reports", icon: BarChart3 },
];

const reportTemplates: Record<Tab, Array<{ name: string; desc: string; lastGenerated: string; size: string }>> = {
  executive: [
    { name: "Platform Executive Summary", desc: "High-level KPIs, revenue, uptime, customer health", lastGenerated: "2026-07-01", size: "2.4 MB" },
    { name: "Monthly Business Review", desc: "Customer growth, churn, ARR, MRR trends", lastGenerated: "2026-06-30", size: "3.1 MB" },
    { name: "Quarterly Performance Report", desc: "Q2 2026 comprehensive platform performance", lastGenerated: "2026-06-30", size: "8.6 MB" },
  ],
  customer: [
    { name: "Customer Health Dashboard", desc: "Per-customer uptime, alarms, risk scores", lastGenerated: "2026-07-02", size: "1.8 MB" },
    { name: "Customer Churn Analysis", desc: "At-risk customers, renewal probabilities", lastGenerated: "2026-06-30", size: "1.2 MB" },
    { name: "Customer Onboarding Report", desc: "New customer stats, onboarding velocity", lastGenerated: "2026-07-01", size: "0.8 MB" },
  ],
  vendor: [
    { name: "Vendor Performance Summary", desc: "SLA compliance, failure rates, response times", lastGenerated: "2026-07-02", size: "1.6 MB" },
    { name: "Vendor SLA Report", desc: "Detailed SLA breach analysis", lastGenerated: "2026-07-01", size: "2.2 MB" },
    { name: "Firmware Deployment Report", desc: "Update coverage, pending updates, deployment status", lastGenerated: "2026-06-28", size: "0.9 MB" },
  ],
  financial: [
    { name: "Revenue & Billing Summary", desc: "MRR, ARR, collections, overdue invoices", lastGenerated: "2026-07-01", size: "1.4 MB" },
    { name: "Tax & GST Report", desc: "GST summary, TDS, quarterly tax filing data", lastGenerated: "2026-06-30", size: "2.8 MB" },
    { name: "Subscription Renewal Forecast", desc: "30-60-90 day renewal pipeline", lastGenerated: "2026-07-02", size: "0.6 MB" },
  ],
  ops: [
    { name: "Platform Operations Report", desc: "Infrastructure health, incidents, SLAs", lastGenerated: "2026-07-02", size: "2.1 MB" },
    { name: "Alarm Resolution Report", desc: "MTTR, SLA compliance, open alarms", lastGenerated: "2026-07-01", size: "1.7 MB" },
    { name: "Audit Log Report", desc: "All admin actions in selected period", lastGenerated: "2026-07-02", size: "0.4 MB" },
  ],
  energy: [
    { name: "Energy Consumption Report", desc: "Power usage across all monitored sites", lastGenerated: "2026-07-01", size: "3.2 MB" },
    { name: "DG Runtime Report", desc: "Generator runtime, fuel consumption analysis", lastGenerated: "2026-06-30", size: "1.9 MB" },
    { name: "Carbon Footprint Summary", desc: "CO2 estimates, green energy metrics", lastGenerated: "2026-06-30", size: "0.7 MB" },
  ],
  ai: [
    { name: "AI Predictive Analysis Report", desc: "ML-based failure predictions, risk scoring", lastGenerated: "2026-07-02", size: "1.1 MB" },
    { name: "Revenue Forecast Report", desc: "90-day AI revenue projection", lastGenerated: "2026-07-01", size: "0.5 MB" },
    { name: "Anomaly Detection Summary", desc: "Unusual patterns detected across platform", lastGenerated: "2026-07-02", size: "0.8 MB" },
  ],
};

export default function OwnerReports() {
  const [activeTab, setActiveTab] = useState<Tab>("executive");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  return (
    <div className="space-y-5 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Reports</h1>
          <p className="text-sm text-slate-500 mt-0.5">Generate, schedule and download platform reports</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 cursor-pointer transition-colors"
            style={{ border: "1px solid #E2E8F0", background: "#fff" }}
          >
            <Calendar className="w-3.5 h-3.5" /> Schedule Report
          </button>
          <button
            onClick={() => setIsCustomModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white cursor-pointer"
            style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
          >
            <FileText className="w-3.5 h-3.5" /> Custom Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={{
              background: activeTab === t.id ? "#6366F1" : "#fff",
              color: activeTab === t.id ? "#fff" : "#64748B",
              border: activeTab === t.id ? "1px solid #6366F1" : "1px solid #E2E8F0",
            }}
          >
            <t.icon className="w-3.5 h-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {(reportTemplates[activeTab] ?? []).map((report) => (
          <div
            key={report.name}
            className="bg-white rounded-2xl p-5 hover:shadow-md transition-shadow"
            style={{ border: "1px solid #E2E8F0" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.08)" }}>
                <FileText className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{report.size}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1">{report.name}</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">{report.desc}</p>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">Last: {report.lastGenerated}</span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">
                  <Download className="w-3 h-3" /> PDF
                </button>
                <button className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline cursor-pointer">
                  <Download className="w-3 h-3" /> Excel
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Generate New Report Card */}
        <div
          onClick={() => setIsCustomModalOpen(true)}
          className="bg-white rounded-2xl p-5 border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
          style={{ borderColor: "#E2E8F0" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.08)" }}>
            <FileText className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-slate-700">Generate New Report</div>
            <div className="text-xs text-slate-400 mt-0.5">Custom parameters & date range</div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODAL DIALOG: SCHEDULE REPORT (PREMIUM)                              */}
      {/* ==================================================================== */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-205 rounded-2xl p-6 shadow-xl w-full max-w-lg text-left">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-650" /> Schedule Recurring Report
              </h3>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-1.5 text-slate-450 hover:text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer font-bold border-none bg-transparent"
              >
                ×
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsScheduleModalOpen(false); }} className="space-y-4 text-xs font-semibold text-slate-650">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Report Template</label>
                <select className="w-full h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500">
                  <option>Platform Executive Summary</option>
                  <option>Monthly Business Review</option>
                  <option>Customer Health Dashboard</option>
                  <option>Revenue & Billing Summary</option>
                  <option>Platform Operations Report</option>
                  <option>Energy Consumption Report</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Frequency</label>
                  <select className="w-full h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500">
                    <option>Daily at 08:00 AM</option>
                    <option>Weekly (Mondays)</option>
                    <option>Monthly (1st of Month)</option>
                    <option>Quarterly (End of Quarter)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">File Format</label>
                  <select className="w-full h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500">
                    <option>PDF Document</option>
                    <option>Excel Spreadsheet</option>
                    <option>CSV Raw Data</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Recipient Emails</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ops@stms.com, ceo@stms.com"
                  className="w-full h-9 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:ring-2 focus:ring-blue-550"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-slate-700 font-bold mb-1">Delivery Channels</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" />
                    Email Attachment
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
                    <input type="checkbox" className="w-4 h-4 accent-indigo-600" />
                    Slack Integration
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
                    <input type="checkbox" className="w-4 h-4 accent-indigo-600" />
                    WhatsApp Summary
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Schedule Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL DIALOG: CUSTOM REPORT (PREMIUM)                                */}
      {/* ==================================================================== */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-205 rounded-2xl p-6 shadow-xl w-full max-w-lg text-left">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-650" /> Custom Report Builder
              </h3>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="p-1.5 text-slate-450 hover:text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer font-bold border-none bg-transparent"
              >
                ×
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsCustomModalOpen(false); }} className="space-y-4 text-xs font-semibold text-slate-650">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Report Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q2 Region-wise SLA Compliance"
                  className="w-full h-9 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Start Date</label>
                  <input
                    type="date"
                    required
                    className="w-full h-9 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">End Date</label>
                  <input
                    type="date"
                    required
                    className="w-full h-9 rounded-lg border border-slate-200 px-3 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Filter by Region</label>
                  <select className="w-full h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-blue-550">
                    <option>All Regions</option>
                    <option>North</option>
                    <option>West</option>
                    <option>South</option>
                    <option>East</option>
                    <option>Central</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Export Format</label>
                  <select className="w-full h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500">
                    <option>PDF Document (.pdf)</option>
                    <option>Excel Spreadsheet (.xlsx)</option>
                    <option>CSV Raw Sheet (.csv)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-2">Metrics & Scope to Include</label>
                <div className="grid grid-cols-2 gap-2 text-slate-650 font-medium">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" />
                    Uptime SLA Targets
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-600" />
                    Revenue Breakdown
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-indigo-600" />
                    Active Alarm History
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-indigo-600" />
                    Carbon Emission green data
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
