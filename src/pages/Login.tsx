import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Activity, Bell, BarChart3, Check, Building2, ShieldCheck, Wrench, Radio } from "lucide-react";
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
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#090D16] text-white flex-col justify-between p-12 overflow-hidden select-none">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Tower Background Graphic Silhouette - Dark Solid Silhouette Matching stms-ui.vercel.app */}
        <div className="absolute top-0 bottom-0 right-10 xl:right-28 w-80 pointer-events-none flex items-center justify-center opacity-70 select-none">
          <svg viewBox="0 0 300 800" className="w-full h-full" fill="none">
            {/* Red Beacon Light at Top */}
            <circle cx="150" cy="50" r="4" fill="#EF4444" className="animate-pulse" />

            {/* Top Antenna Mount Structure */}
            <rect x="146" y="55" width="8" height="40" fill="#04060E" stroke="#0E1626" strokeWidth="1.5" />
            <rect x="125" y="70" width="50" height="4" fill="#04060E" stroke="#0E1626" strokeWidth="1.5" />
            <rect x="115" y="88" width="70" height="4" fill="#04060E" stroke="#0E1626" strokeWidth="1.5" />

            {/* Panel Antennas */}
            <rect x="120" y="60" width="8" height="26" rx="2" fill="#030409" stroke="#0E1626" strokeWidth="1.5" />
            <rect x="146" y="60" width="8" height="26" rx="2" fill="#030409" stroke="#0E1626" strokeWidth="1.5" />
            <rect x="172" y="60" width="8" height="26" rx="2" fill="#030409" stroke="#0E1626" strokeWidth="1.5" />

            {/* Tower Main Legs */}
            <line x1="150" y1="90" x2="40" y2="780" stroke="#0A111F" strokeWidth="6" />
            <line x1="150" y1="90" x2="260" y2="780" stroke="#0A111F" strokeWidth="6" />
            <line x1="150" y1="90" x2="150" y2="780" stroke="#060A14" strokeWidth="3" strokeDasharray="8 6" opacity="0.6" />

            {/* Left Microwave Dish - Solid Dark Circle */}
            <circle cx="100" cy="260" r="32" fill="#03050C" stroke="#0B1322" strokeWidth="4" />
            <circle cx="100" cy="260" r="24" fill="#03050C" stroke="#0A101C" strokeWidth="2" opacity="0.7" />
            <circle cx="100" cy="260" r="6" fill="#09101F" />
            <line x1="100" y1="260" x2="135" y2="260" stroke="#0A111F" strokeWidth="3" />

            {/* Right Microwave Dish - Solid Dark Circle */}
            <circle cx="200" cy="290" r="32" fill="#03050C" stroke="#0B1322" strokeWidth="4" />
            <circle cx="200" cy="290" r="24" fill="#03050C" stroke="#0A101C" strokeWidth="2" opacity="0.7" />
            <circle cx="200" cy="290" r="6" fill="#09101F" />
            <line x1="200" y1="290" x2="165" y2="290" stroke="#0A111F" strokeWidth="3" />

            {/* Cross Lattice Bracing Sections */}
            {[
              { y1: 120, y2: 160, left1: 145, right1: 155, left2: 139, right2: 161 },
              { y1: 160, y2: 210, left1: 139, right1: 161, left2: 131, right2: 169 },
              { y1: 210, y2: 270, left1: 131, right1: 169, left2: 122, right2: 178 },
              { y1: 270, y2: 340, left1: 122, right1: 178, left2: 111, right2: 189 },
              { y1: 340, y2: 420, left1: 111, right1: 189, left2: 98, right2: 202 },
              { y1: 420, y2: 510, left1: 98, right1: 202, left2: 84, right2: 216 },
              { y1: 510, y2: 600, left1: 84, right1: 216, left2: 70, right2: 230 },
              { y1: 600, y2: 700, left1: 70, right1: 230, left2: 54, right2: 246 },
              { y1: 700, y2: 780, left1: 54, right1: 246, left2: 40, right2: 260 },
            ].map((section, idx) => (
              <g key={idx}>
                <line x1={section.left2} y1={section.y2} x2={section.right2} y2={section.y2} stroke="#0A111F" strokeWidth="3" />
                <line x1={section.left1} y1={section.y1} x2={section.right2} y2={section.y2} stroke="#070C17" strokeWidth="2" />
                <line x1={section.right1} y1={section.y1} x2={section.left2} y2={section.y2} stroke="#070C17" strokeWidth="2" />
              </g>
            ))}
          </svg>
        </div>

        {/* Top Header Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center p-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-500">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
              <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base tracking-tight">RMS</h3>
            <p className="text-[11px] text-slate-400">By Indio Networks</p>
          </div>
        </div>

        {/* Center Hero Content */}
        <div className="relative z-10 space-y-4 my-auto max-w-lg">
          <h1 className="text-5xl font-black text-white tracking-tight leading-none">
            RMS
          </h1>
          <h2 className="text-xl font-bold text-slate-200">
            Remote Monitoring System
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed pt-2">
            Real-time monitoring of telecom infrastructure — towers, batteries, DGs, SMPS, energy meters, and alarms across thousands of remote sites.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-4">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-white bg-slate-800/80 border border-slate-700/60">
              <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold">✓</span>
              Live Monitoring
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-white bg-slate-800/80 border border-slate-700/60">
              <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold">✓</span>
              Smart Alerts
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-white bg-slate-800/80 border border-slate-700/60">
              <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold">✓</span>
              Real-time Analytics
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-slate-500">
          © 2026 STMS Infrastructure Inc. All rights reserved.
        </div>
      </div>

      {/* ── RIGHT: Login Form & Workspace Selector ─────────────────── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-14 bg-[#F8FAFC] overflow-y-auto">
        {/* Top Header Logo for Mobile */}
        <div className="flex lg:hidden items-center gap-3 mb-6">
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

        {/* Center Area */}
        <div className="w-full max-w-md mx-auto my-auto space-y-5">
          {/* RMS Header Logo for Desktop */}
          <div className="hidden lg:flex items-center gap-3 mb-2">
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

          <AnimatePresence mode="wait">
            {/* Step 1: Choose Workspace */}
            {!accountType && (
              <motion.div
                key="choose"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="text-2.5xl font-extrabold text-slate-900 tracking-tight">Choose Workspace</h2>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Select your portal to continue sign in.</p>
                </div>

                {/* 1. Platform Owner Card */}
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(99,102,241,0.06)", borderColor: "#6366f1" }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => { setAccountType("admin"); setEmail("admin@indionetworks.com"); }}
                  className="w-full text-left p-4 rounded-xl cursor-pointer transition-all bg-white border border-slate-200/80 shadow-2xs flex gap-4 items-start hover:border-indigo-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-sm tracking-tight">Platform Administration</span>
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 tracking-wider shrink-0">
                        PLATFORM OWNER
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium leading-relaxed">
                      Manage customers, platform settings & billing directory
                    </div>
                  </div>
                </motion.button>

                {/* 2. Super Admin Card */}
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(15,23,42,0.06)", borderColor: "#475569" }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => { setAccountType("superadmin"); setEmail("root@indionetworks.com"); }}
                  className="w-full text-left p-4 rounded-xl cursor-pointer transition-all bg-white border border-slate-200/80 shadow-2xs flex gap-4 items-start hover:border-slate-400"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-sm tracking-tight">Enterprise Console</span>
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 tracking-wider shrink-0">
                        SUPER ADMIN
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium leading-relaxed">
                      Configure IoT gateways, alarms & global infrastructure settings
                    </div>
                  </div>
                </motion.button>

                {/* 3. Customer Card */}
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(37,99,235,0.06)", borderColor: "#2563eb" }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => { setAccountType("customer"); setEmail("operator@vodafone.com"); }}
                  className="w-full text-left p-4 rounded-xl cursor-pointer transition-all bg-white border border-slate-200/80 shadow-2xs flex gap-4 items-start hover:border-blue-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <Radio className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-sm tracking-tight">Customer Workspace</span>
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 tracking-wider shrink-0">
                        CUSTOMER
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium leading-relaxed">
                      Monitor live sites, equipment signals & real-time alarms
                    </div>
                  </div>
                </motion.button>

                {/* 4. Vendor Partner Card */}
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(13,148,136,0.06)", borderColor: "#0d9488" }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() => { setAccountType("vendor" as any); setEmail("service@delta-electronics.in"); }}
                  className="w-full text-left p-4 rounded-xl cursor-pointer transition-all bg-white border border-slate-200/80 shadow-2xs flex gap-4 items-start hover:border-teal-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-sm tracking-tight">Vendor FieldOps Platform</span>
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 tracking-wider shrink-0">
                        VENDOR PARTNER
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium leading-relaxed">
                      Manage maintenance dispatches, tracking & parts logs
                    </div>
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
                className="space-y-5"
              >
                {/* Back + Workspace Badge */}
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => setAccountType(null)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    ← Back to Workspaces
                  </button>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase bg-blue-50 text-blue-700 border border-blue-100">
                    {accountType} PORTAL
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sign in to your account</h2>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Enter your credentials to access the console.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Email Address</label>
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
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                      />
                      Remember login
                    </label>
                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-800">Forgot password?</a>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 font-bold text-sm rounded-xl text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all shadow-xs"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Authenticating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> Sign In
                      </span>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-6">
          <div>RMS by Indio Networks</div>
          <div>© 2026 Indio Networks</div>
        </div>
      </div>
    </div>
  );
}
