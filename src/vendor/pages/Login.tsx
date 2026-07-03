import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Wrench, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VendorLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("service@delta-electronics.in");
  const [password, setPassword] = useState("delta12345");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setLocation("/vendor/dashboard");
    }, 450);
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-[#F8FAFC] font-sans">
      {/* ── LEFT: Technical Field Operations Visual ─────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0F766E] text-white flex-col overflow-hidden select-none items-center justify-center p-12">
        {/* Pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0D9488] via-[#0F766E] to-[#115E59]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

        {/* Visual Graphic */}
        <div className="relative z-10 w-full max-w-md text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto shadow-2xl">
            <Wrench className="w-10 h-10 text-teal-200" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
              Delta FieldOps Console
            </h1>
            <p className="text-sm text-teal-100/90 leading-relaxed max-w-sm mx-auto font-medium">
              Enterprise Telecom Maintenance & Dispatch Management Platform. Real-time ticket dispatch, engineer tracking, SLA compliance, and spare parts management.
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Login Form ────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-16 xl:p-24 bg-[#F8FAFC]">
        {/* Back Button */}
        <div className="absolute top-8 left-8 lg:left-auto lg:right-8">
          <button
            onClick={() => setLocation("/login")}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            ← Back to Workspaces
          </button>
        </div>

        <div className="w-full max-w-[420px] mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold w-fit mb-4">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              VENDOR PARTNER PORTAL
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign in to Vendor Console</h2>
            <p className="text-xs text-slate-500 mt-1">Enter your technician or service partner credentials.</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Vendor Partner Email</label>
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
                  className="w-4 h-4 rounded border-slate-300 text-teal-600 cursor-pointer"
                />
                Remember login
              </label>
              <a href="#" className="font-semibold text-teal-700 hover:text-teal-900">Forgot password?</a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 font-bold text-sm rounded-xl text-white bg-teal-600 hover:bg-teal-700 cursor-pointer transition-all shadow-xs"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Opening Vendor Console...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Sign in to Vendor Workspace
                </span>
              )}
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-200/80 text-center text-xs text-slate-400">
            STMS Vendor Dispatch Network • Enterprise Partner Access
          </div>
        </div>
      </div>
    </div>
  );
}
