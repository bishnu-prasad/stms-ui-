import { useState } from "react";
import { Building2, Palette, Mail, MessageSquare, Server, HardDrive, Database, Shield, FileText, Key } from "lucide-react";

type Tab = "organization" | "branding" | "smtp" | "sms" | "api" | "storage" | "database" | "security" | "audit" | "license";

export default function OwnerSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("organization");

  const tabs = [
    { id: "organization" as Tab, label: "Organization", icon: Building2 },
    { id: "branding" as Tab, label: "Branding", icon: Palette },
    { id: "smtp" as Tab, label: "SMTP", icon: Mail },
    { id: "sms" as Tab, label: "SMS Gateway", icon: MessageSquare },
    { id: "security" as Tab, label: "Security", icon: Shield },
    { id: "license" as Tab, label: "License", icon: Key },
  ];

  return (
    <div className="space-y-5 pb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Platform configuration and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={{ background: activeTab === t.id ? "#6366F1" : "#fff", color: activeTab === t.id ? "#fff" : "#64748B", border: activeTab === t.id ? "1px solid #6366F1" : "1px solid #E2E8F0" }}
          >
            <t.icon className="w-3.5 h-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {/* Organization */}
      {activeTab === "organization" && (
        <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E2E8F0" }}>
          <h3 className="text-sm font-bold text-slate-800 mb-5">Organization Details</h3>
          <div className="grid grid-cols-2 gap-5 max-w-2xl">
            {[
              { label: "Organization Name", value: "Indio Networks Pvt. Ltd." },
              { label: "Platform Name", value: "STMS — Site & Telecom Monitoring System" },
              { label: "Admin Email", value: "admin@indionetworks.com" },
              { label: "Support Email", value: "support@indionetworks.com" },
              { label: "Registered Address", value: "Mumbai, Maharashtra, India" },
              { label: "GST Number", value: "27AABCI1234F1Z5" },
            ].map((f) => (
              <div key={f.label} className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{f.label}</label>
                <input
                  type="text"
                  defaultValue={f.value}
                  className="w-full h-9 px-3 rounded-lg text-sm text-slate-800 font-medium outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-slate-100">
            <button className="px-5 py-2 rounded-lg text-sm font-bold text-white cursor-pointer" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* SMTP */}
      {activeTab === "smtp" && (
        <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E2E8F0" }}>
          <h3 className="text-sm font-bold text-slate-800 mb-5">SMTP Configuration</h3>
          <div className="grid grid-cols-2 gap-5 max-w-2xl">
            {[
              { label: "SMTP Host", value: "email-smtp.ap-south-1.amazonaws.com" },
              { label: "Port", value: "587" },
              { label: "Username", value: "AKIAIOSFODNN7EXAMPLE" },
              { label: "From Email", value: "noreply@indionetworks.com" },
              { label: "From Name", value: "STMS Platform" },
              { label: "Encryption", value: "TLS" },
            ].map((f) => (
              <div key={f.label} className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{f.label}</label>
                <input
                  type={f.label.toLowerCase().includes("password") ? "password" : "text"}
                  defaultValue={f.value}
                  className="w-full h-9 px-3 rounded-lg text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
            <button className="px-5 py-2 rounded-lg text-sm font-bold text-white cursor-pointer" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>Save</button>
            <button className="px-5 py-2 rounded-lg text-sm font-semibold text-indigo-600 cursor-pointer" style={{ border: "1px solid #E0E7FF", background: "rgba(99,102,241,0.04)" }}>Send Test Email</button>
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="space-y-4 max-w-2xl">
          {[
            { title: "MFA Enforcement", desc: "Require MFA for all Platform Admins", enabled: true },
            { title: "IP Whitelist", desc: "Restrict Platform Admin access by IP range", enabled: false },
            { title: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity", enabled: true },
            { title: "Audit Logging", desc: "Log all admin actions for compliance", enabled: true },
            { title: "Password Policy", desc: "Enforce strong passwords (12+ chars, symbols)", enabled: true },
            { title: "Failed Login Lockout", desc: "Lock account after 5 failed attempts", enabled: true },
          ].map((setting) => (
            <div key={setting.title} className="bg-white rounded-xl p-4 flex items-center justify-between" style={{ border: "1px solid #E2E8F0" }}>
              <div>
                <div className="text-sm font-semibold text-slate-800">{setting.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{setting.desc}</div>
              </div>
              <div
                className="w-10 h-5 rounded-full cursor-pointer relative transition-colors"
                style={{ background: setting.enabled ? "#6366F1" : "#E2E8F0" }}
              >
                <div className="w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm" style={{ left: setting.enabled ? "22px" : "2px" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* License */}
      {activeTab === "license" && (
        <div className="bg-white rounded-2xl p-6 max-w-lg" style={{ border: "1px solid #E2E8F0" }}>
          <h3 className="text-sm font-bold text-slate-800 mb-5">License Information</h3>
          <div className="space-y-3">
            {[
              { label: "License Type", value: "Enterprise Unlimited" },
              { label: "License Key", value: "STMS-ENT-2024-XXXX-XXXX-XXXX" },
              { label: "Licensed To", value: "Indio Networks Pvt. Ltd." },
              { label: "Max Customers", value: "Unlimited" },
              { label: "Max Sites", value: "Unlimited" },
              { label: "Valid Until", value: "2027-01-01" },
              { label: "Support Until", value: "2027-01-01" },
              { label: "Version", value: "STMS v3.2.1" },
            ].map((f) => (
              <div key={f.label} className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium">{f.label}</span>
                <span className="text-xs font-bold text-slate-800 font-mono">{f.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 p-3 rounded-xl" style={{ background: "#ECFDF5", border: "1px solid #A7F3D0" }}>
            <div className="text-xs font-bold text-emerald-700">✓ License Active & Valid</div>
            <div className="text-[11px] text-emerald-600 mt-0.5">Next renewal: January 1, 2027</div>
          </div>
        </div>
      )}

      {activeTab === "branding" && (
        <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E2E8F0" }}>
          <h3 className="text-sm font-bold text-slate-800 mb-4">Branding & Theme</h3>
          <div className="space-y-4 max-w-md">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Platform Title</label>
              <input defaultValue="STMS — Remote Monitoring System" className="w-full h-9 px-3 rounded-lg text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500" style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Primary Brand Color</label>
              <div className="flex items-center gap-3">
                <input type="color" defaultValue="#6366F1" className="w-9 h-9 rounded-lg cursor-pointer border border-slate-200" />
                <input defaultValue="#6366F1" className="flex-1 h-9 px-3 rounded-lg text-sm font-mono outline-none" style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }} />
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button className="px-5 py-2 rounded-lg text-sm font-bold text-white cursor-pointer" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>Save Branding</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "sms" && (
        <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E2E8F0" }}>
          <h3 className="text-sm font-bold text-slate-800 mb-5">SMS Gateway Configuration</h3>
          <div className="grid grid-cols-2 gap-5 max-w-2xl">
            {[
              { label: "Provider", value: "Twilio" },
              { label: "Account SID", value: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
              { label: "From Number", value: "+918XXXXXXXXXX" },
              { label: "DLT Template ID", value: "XXXXXXXXXX" },
            ].map((f) => (
              <div key={f.label} className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{f.label}</label>
                <input defaultValue={f.value} className="w-full h-9 px-3 rounded-lg text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500" style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }} />
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-slate-100">
            <button className="px-5 py-2 rounded-lg text-sm font-bold text-white cursor-pointer" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>Save SMS Settings</button>
          </div>
        </div>
      )}
    </div>
  );
}
