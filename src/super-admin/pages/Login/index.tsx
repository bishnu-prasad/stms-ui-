import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Shield, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SuperAdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("root@indionetworks.com");
  const [password, setPassword] = useState("supersecret123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setLocation("/super-admin/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-[#F8FAFC] font-sans">
      {/* ── LEFT: Enterprise / Server / Infrastructure Visual ─────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0F172A] text-white flex-col overflow-hidden select-none items-center justify-center">
        {/* Sky Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1E293B] via-[#0F172A] to-[#020617]" />
        
        {/* Subtle grid pattern for technical feel */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Abstract Infrastructure SVG */}
        <div className="relative z-10 w-full max-w-md">
          <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-2xl opacity-90">
            {/* Server Racks Abstract */}
            <rect x="50" y="80" width="120" height="240" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="2" />
            <rect x="230" y="40" width="120" height="280" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="2" />
            
            {/* Blinking lights on Rack 1 */}
            {[100, 140, 180, 220, 260, 300].map(y => (
              <g key={`r1-${y}`}>
                <rect x="70" y={y} width="80" height="12" rx="2" fill="#0F172A" />
                <circle cx="80" cy={y+6} r="2" fill="#10B981" />
                <circle cx="90" cy={y+6} r="2" fill="#10B981" />
                <circle cx="100" cy={y+6} r="2" fill="#3B82F6" />
              </g>
            ))}

            {/* Blinking lights on Rack 2 */}
            {[60, 100, 140, 180, 220, 260, 300].map(y => (
              <g key={`r2-${y}`}>
                <rect x="250" y={y} width="80" height="12" rx="2" fill="#0F172A" />
                <circle cx="260" cy={y+6} r="2" fill="#10B981" />
                <circle cx="270" cy={y+6} r="2" fill="#10B981" />
                <circle cx="280" cy={y+6} r="2" fill={y === 140 ? "#F59E0B" : "#10B981"} />
              </g>
            ))}

            {/* Connection Lines */}
            <path d="M170,160 L200,160 L200,200 L230,200" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M170,240 L200,240 L200,220 L230,220" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 4" />
            
            <circle cx="200" cy="200" r="4" fill="#3B82F6" />
            <circle cx="200" cy="220" r="4" fill="#3B82F6" />
          </svg>
        </div>

        {/* Text Content */}
        <div className="absolute bottom-16 left-16 right-16 z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-blue-500" /> STMS Enterprise
            </h1>
            <h2 className="text-sm font-semibold text-blue-400 mb-3 tracking-widest uppercase">Super Admin Console</h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Secure, centralized platform administration. Manage tenants, infrastructure, security, and global settings across the entire STMS network.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT: Login Form ────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-16 xl:p-24 bg-[#F8FAFC]">
        {/* Back Button */}
        <div className="absolute top-8 left-8 lg:left-auto lg:right-8">
          <button
            onClick={() => setLocation("/login")}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
          >
            ← Back to Portals
          </button>
        </div>

        <div className="w-full max-w-[420px] mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Super Administrator</h2>
            <p className="text-sm text-slate-500 mt-1.5">Sign in to the Enterprise Administration Console.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-2xl p-8"
            style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
          >
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Enterprise Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-10 text-sm rounded-lg border-slate-200 bg-[#F8FAFC] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Admin Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-10 text-sm rounded-lg border-slate-200 bg-[#F8FAFC] focus:bg-white transition-colors"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600" />
                  Remember this device
                </label>
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</a>
              </div>

              {/* Log in Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 font-bold text-sm rounded-lg text-white transition-all bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Access Console <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Capabilities Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-6 border-t border-slate-200"
          >
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-4">Enterprise Management Capabilities</div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Infrastructure Monitoring</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Tenant Provisioning</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Global Security & RBAC</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Platform Configuration</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
