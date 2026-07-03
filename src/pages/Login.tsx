import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Activity, Bell, BarChart3, ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AccountType = "admin" | "superadmin" | "vendor" | "customer" | null;

export default function Login() {
  const [, setLocation] = useLocation();
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [email, setEmail] = useState("admin@indionetworks.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (accountType === "vendor") {
        setLocation("/vendor/dashboard");
      } else if (accountType === "superadmin") {
        setLocation("/super-admin/dashboard");
      } else if (accountType === "admin") {
        setLocation("/owner/overview");
      } else {
        setLocation("/analytics");
      }
    }, 450);
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-[#F8FAFC] font-sans">
      {/* ── LEFT: Atmospheric Telecom Tower ─────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0F172A] text-white flex-col overflow-hidden select-none">
        {/* Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060C16] via-[#0F172A] to-[#1E293B]" />

        {/* Tower SVG */}
        <div className="absolute right-8 bottom-0 top-0 w-[400px] pointer-events-none flex items-end justify-center opacity-80">
          <svg viewBox="0 0 300 700" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
            <polygon points="146,80 154,80 178,680 122,680" fill="#0D1527" />
            <polygon points="148,80 152,80 170,680 130,680" fill="#090E1A" />
            <rect x="138" y="140" width="24" height="4" fill="#090E1A" />
            <rect x="135" y="210" width="30" height="4" fill="#090E1A" />
            <rect x="132" y="280" width="36" height="5" fill="#090E1A" />
            <rect x="129" y="360" width="42" height="5" fill="#090E1A" />
            <rect x="126" y="440" width="48" height="6" fill="#090E1A" />
            <rect x="123" y="520" width="54" height="6" fill="#090E1A" />
            <rect x="120" y="600" width="60" height="7" fill="#090E1A" />
            <line x1="138" y1="140" x2="165" y2="210" stroke="#060A12" strokeWidth="3" />
            <line x1="162" y1="140" x2="135" y2="210" stroke="#060A12" strokeWidth="3" />
            <line x1="135" y1="210" x2="168" y2="280" stroke="#060A12" strokeWidth="3" />
            <line x1="165" y1="210" x2="132" y2="280" stroke="#060A12" strokeWidth="3" />
            <line x1="132" y1="280" x2="171" y2="360" stroke="#060A12" strokeWidth="3.5" />
            <line x1="168" y1="280" x2="129" y2="360" stroke="#060A12" strokeWidth="3.5" />
            <line x1="129" y1="360" x2="174" y2="440" stroke="#060A12" strokeWidth="4" />
            <line x1="171" y1="360" x2="126" y2="440" stroke="#060A12" strokeWidth="4" />
            <rect x="110" y="100" width="80" height="6" fill="#070C16" />
            <rect x="105" y="175" width="90" height="6" fill="#070C16" />
            <rect x="112" y="75" width="8" height="40" rx="1.5" fill="#04070E" />
            <rect x="126" y="70" width="9" height="45" rx="1.5" fill="#04070E" />
            <rect x="145" y="65" width="10" height="50" rx="1.5" fill="#04070E" />
            <rect x="165" y="70" width="9" height="45" rx="1.5" fill="#04070E" />
            <rect x="180" y="75" width="8" height="40" rx="1.5" fill="#04070E" />
            <circle cx="105" cy="245" r="22" fill="#050811" />
            <circle cx="105" cy="245" r="18" fill="#080D1A" />
            <circle cx="195" cy="285" r="25" fill="#050811" />
            <circle cx="195" cy="285" r="20" fill="#080D1A" />
            <circle cx="150" cy="62" r="4" fill="#EF4444" />
          </svg>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#060C16] via-transparent to-[#060C16]/50" />

        {/* Text Content */}
        <div className="relative z-10 flex flex-col justify-center h-full p-14 max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl font-extrabold tracking-tight text-white mb-2">RMS</h1>
            <h2 className="text-lg font-bold text-slate-300 mb-4">Remote Monitoring System</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Real-time monitoring of telecom infrastructure — towers, batteries, DGs, SMPS, energy meters, and alarms across thousands of remote sites.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {[
              { icon: Activity, label: "Live Monitoring" },
              { icon: Bell, label: "Smart Alerts" },
              { icon: BarChart3, label: "Real-time Analytics" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-white" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold">✓</span>
                <Icon className="w-3.5 h-3.5 text-slate-400" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT: Login Form ────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-14 bg-[#F8FAFC]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center p-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-500">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
              <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">RMS</h3>
            <p className="text-[11px] text-slate-400">By Indio Networks</p>
          </div>
        </div>

        {/* Center Form Area */}
        <div className="w-full max-w-md mx-auto my-auto space-y-5">
          <AnimatePresence mode="wait">
            {/* Step 1: Choose Workspace */}
            {!accountType && (
              <motion.div
                key="choose"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Choose Workspace</h2>
                  <p className="text-xs text-slate-400 mt-1">Select your portal to continue sign in.</p>
                </div>

                {/* Platform Admin Card */}
                <motion.button
                  whileHover={{ scale: 1.015, boxShadow: "0 8px 24px rgba(99,102,241,0.12)" }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => { setAccountType("admin"); setEmail("admin@indionetworks.com"); }}
                  className="w-full text-left p-4 rounded-2xl cursor-pointer transition-all"
                  style={{ background: "#fff", border: "2px solid #E0E7FF", boxShadow: "0 2px 8px rgba(99,102,241,0.06)" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(99,102,241,0.08)" }}>
                      🏢
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1" }}>PLATFORM OWNER</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm mb-1">Platform Administration</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed space-y-0.5">
                    <div>• Manage customers & revenue</div>
                    <div>• Billing & vendor management</div>
                  </div>
                </motion.button>

                {/* Super Admin Card */}
                <motion.button
                  whileHover={{ scale: 1.015, boxShadow: "0 8px 24px rgba(15,23,42,0.12)" }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => { setAccountType("superadmin"); setEmail("root@indionetworks.com"); }}
                  className="w-full text-left p-4 rounded-2xl cursor-pointer transition-all"
                  style={{ background: "#fff", border: "2px solid #E2E8F0", boxShadow: "0 2px 8px rgba(15,23,42,0.06)" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(15,23,42,0.06)" }}>
                      ⚙️
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: "rgba(15,23,42,0.08)", color: "#0F172A" }}>SUPER ADMIN</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm mb-1">Enterprise Console</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed space-y-0.5">
                    <div>• Complete STMS infrastructure</div>
                    <div>• Platform security & settings</div>
                  </div>
                </motion.button>

                {/* Vendor Partner Card */}
                <motion.button
                  whileHover={{ scale: 1.015, boxShadow: "0 8px 24px rgba(13,148,136,0.12)" }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => { setAccountType("vendor" as any); setEmail("service@delta-electronics.in"); }}
                  className="w-full text-left p-4 rounded-2xl cursor-pointer transition-all"
                  style={{ background: "#fff", border: "2px solid #CCFBF1", boxShadow: "0 2px 8px rgba(13,148,136,0.06)" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(13,148,136,0.08)" }}>
                      🔧
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: "rgba(13,148,136,0.1)", color: "#0D9488" }}>VENDOR PARTNER</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm mb-1">Vendor FieldOps Platform</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed space-y-0.5">
                    <div>• Maintenance dispatches & SLA countdowns</div>
                    <div>• Engineer tracking & spare parts</div>
                  </div>
                </motion.button>

                {/* Customer Card */}
                <motion.button
                  whileHover={{ scale: 1.015, boxShadow: "0 8px 24px rgba(37,99,235,0.1)" }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => { setAccountType("customer"); setEmail("operator@vodafone.com"); }}
                  className="w-full text-left p-4 rounded-2xl cursor-pointer transition-all"
                  style={{ background: "#fff", border: "2px solid #E2E8F0", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(37,99,235,0.06)" }}>
                      🛰
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: "rgba(37,99,235,0.08)", color: "#2563EB" }}>CUSTOMER</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm mb-1">Customer Workspace</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed space-y-0.5">
                    <div>• Monitor sites & devices</div>
                    <div>• Real-time alarms & reports</div>
                  </div>
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Login Form */}
            {accountType && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {/* Back + Workspace Badge */}
                <div className="flex items-center gap-3 mb-5">
                  <button
                    onClick={() => setAccountType(null)}
                    className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
                    style={{
                      background: accountType === "superadmin" ? "rgba(15,23,42,0.08)" : accountType === "admin" ? "rgba(99,102,241,0.08)" : "rgba(37,99,235,0.06)",
                      color: accountType === "superadmin" ? "#0F172A" : accountType === "admin" ? "#6366F1" : "#2563EB",
                    }}
                  >
                    {accountType === "superadmin" ? "⚙️" : accountType === "admin" ? "🏢" : "🛰"}
                    {accountType === "superadmin" ? "Super Admin" : accountType === "admin" ? "Platform Admin" : "Customer Workspace"}
                  </div>
                </div>

                <motion.div
                  className="bg-white rounded-3xl p-7 space-y-5"
                  style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                >
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
                    <p className="text-xs text-slate-400 mt-1">Sign in to continue to your {accountType === "superadmin" ? "Super Admin console" : accountType === "admin" ? "admin console" : "monitoring dashboard"}.</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <Input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-11 text-xs rounded-xl border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 h-11 text-xs rounded-xl border-slate-200 bg-white"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-indigo-600 cursor-pointer" />
                        Remember me
                      </label>
                      <a href="#" className="font-semibold" style={{ color: accountType === "superadmin" ? "#0F172A" : accountType === "admin" ? "#6366F1" : "#2563EB" }}>Forgot password?</a>
                    </div>

                    {/* Log in Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 font-bold text-sm rounded-xl text-white cursor-pointer transition-all"
                      style={{ background: accountType === "superadmin" ? "#0F172A" : accountType === "admin" ? "linear-gradient(135deg, #6366F1, #8B5CF6)" : "#2563EB" }}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Opening {accountType === "superadmin" ? "Super Admin Console" : accountType === "admin" ? "Admin Console" : "Dashboard"}...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Sign in to {accountType === "superadmin" ? "Super Admin" : accountType === "admin" ? "Platform Admin" : "Customer Portal"}
                        </span>
                      )}
                    </Button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-4 pb-2">
          <span>RMS by Indio Networks</span>
          <span>© 2026 Indio Networks</span>
        </div>
      </div>
    </div>
  );
}
