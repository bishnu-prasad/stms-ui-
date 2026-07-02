import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Check, Activity, Bell, BarChart3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("admin@indionetworks.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setLocation("/analytics");
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-[#F8FAFC] font-sans">
      {/* ==================================================================== */}
      {/* LEFT HALF: ATMOSPHERIC TELECOM TOWER WITH DUSK SKY                   */}
      {/* ==================================================================== */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#1E293B] text-white flex-col justify-between p-12 overflow-hidden select-none">
        {/* Dusk Twilight Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#334155]" />
        
        {/* Real Telecom Tower Silhouette Graphic */}
        <div className="absolute right-12 bottom-0 top-0 w-[420px] pointer-events-none flex items-end justify-center opacity-85">
          <svg viewBox="0 0 300 700" className="w-full h-full text-[#0B132B] fill-current" preserveAspectRatio="xMidYMax meet">
            {/* Main Vertical Lattice Legs */}
            <polygon points="146,80 154,80 178,680 122,680" fill="#0D1527" />
            <polygon points="148,80 152,80 170,680 130,680" fill="#090E1A" />
            
            {/* Horizontal Crossbars */}
            <rect x="138" y="140" width="24" height="4" fill="#090E1A" />
            <rect x="135" y="210" width="30" height="4" fill="#090E1A" />
            <rect x="132" y="280" width="36" height="5" fill="#090E1A" />
            <rect x="129" y="360" width="42" height="5" fill="#090E1A" />
            <rect x="126" y="440" width="48" height="6" fill="#090E1A" />
            <rect x="123" y="520" width="54" height="6" fill="#090E1A" />
            <rect x="120" y="600" width="60" height="7" fill="#090E1A" />

            {/* Lattice Diagonal Braces */}
            <line x1="138" y1="140" x2="165" y2="210" stroke="#060A12" strokeWidth="3" />
            <line x1="162" y1="140" x2="135" y2="210" stroke="#060A12" strokeWidth="3" />
            <line x1="135" y1="210" x2="168" y2="280" stroke="#060A12" strokeWidth="3" />
            <line x1="165" y1="210" x2="132" y2="280" stroke="#060A12" strokeWidth="3" />
            <line x1="132" y1="280" x2="171" y2="360" stroke="#060A12" strokeWidth="3.5" />
            <line x1="168" y1="280" x2="129" y2="360" stroke="#060A12" strokeWidth="3.5" />
            <line x1="129" y1="360" x2="174" y2="440" stroke="#060A12" strokeWidth="4" />
            <line x1="171" y1="360" x2="126" y2="440" stroke="#060A12" strokeWidth="4" />
            <line x1="126" y1="440" x2="177" y2="520" stroke="#060A12" strokeWidth="4.5" />
            <line x1="174" y1="440" x2="123" y2="520" stroke="#060A12" strokeWidth="4.5" />

            {/* Top Sector Antenna Mount Platform */}
            <rect x="110" y="100" width="80" height="6" fill="#070C16" />
            <rect x="105" y="175" width="90" height="6" fill="#070C16" />

            {/* Vertical Sector Antenna Panels (Top Tier) */}
            <rect x="112" y="75" width="8" height="40" rx="1.5" fill="#04070E" />
            <rect x="126" y="70" width="9" height="45" rx="1.5" fill="#04070E" />
            <rect x="145" y="65" width="10" height="50" rx="1.5" fill="#04070E" />
            <rect x="165" y="70" width="9" height="45" rx="1.5" fill="#04070E" />
            <rect x="180" y="75" width="8" height="40" rx="1.5" fill="#04070E" />

            {/* Vertical Sector Antenna Panels (Mid Tier) */}
            <rect x="108" y="150" width="9" height="42" rx="1.5" fill="#04070E" />
            <rect x="124" y="145" width="10" height="48" rx="1.5" fill="#04070E" />
            <rect x="166" y="145" width="10" height="48" rx="1.5" fill="#04070E" />
            <rect x="183" y="150" width="9" height="42" rx="1.5" fill="#04070E" />

            {/* Large Microwave Dish Antennas */}
            <circle cx="105" cy="245" r="22" fill="#050811" />
            <circle cx="105" cy="245" r="18" fill="#080D1A" />
            <circle cx="195" cy="285" r="25" fill="#050811" />
            <circle cx="195" cy="285" r="20" fill="#080D1A" />

            {/* Top Light Beacon */}
            <circle cx="150" cy="62" r="4" fill="#EF4444" className="animate-pulse" />
          </svg>
        </div>

        {/* Subtle Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/40" />

        {/* Empty Spacer to Push Content to Center/Bottom */}
        <div />

        {/* Center Hero Text Section (Matches Reference Screenshot) */}
        <div className="relative z-10 max-w-xl space-y-5 my-auto pl-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-extrabold tracking-tight text-white mb-2 font-sans">
              RMS
            </h1>
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight">
              Remote Monitoring System
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-normal max-w-lg">
              Real-time monitoring of telecom infrastructure — towers, batteries, DGs, SMPS, energy meters, and alarms across thousands of remote sites.
            </p>
          </motion.div>

          {/* Feature Badges (Matches Reference Screenshot) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col gap-2.5 pt-3"
          >
            <div className="flex flex-wrap items-center gap-3">
              {/* Live Monitoring Badge */}
              <div className="px-3.5 py-2 rounded-full bg-[#182335]/90 border border-slate-700/60 text-xs font-semibold text-white backdrop-blur-md flex items-center gap-2 shadow-sm">
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[9px] shrink-0">
                  ✓
                </span>
                <Activity className="w-3.5 h-3.5 text-slate-300" />
                <span>Live Monitoring</span>
              </div>

              {/* Smart Alerts Badge */}
              <div className="px-3.5 py-2 rounded-full bg-[#182335]/90 border border-slate-700/60 text-xs font-semibold text-white backdrop-blur-md flex items-center gap-2 shadow-sm">
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[9px] shrink-0">
                  ✓
                </span>
                <Bell className="w-3.5 h-3.5 text-slate-300" />
                <span>Smart Alerts</span>
              </div>
            </div>

            {/* Real-time Analytics Badge */}
            <div className="flex items-center">
              <div className="px-3.5 py-2 rounded-full bg-[#182335]/90 border border-slate-700/60 text-xs font-semibold text-white backdrop-blur-md flex items-center gap-2 shadow-sm">
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[9px] shrink-0">
                  ✓
                </span>
                <BarChart3 className="w-3.5 h-3.5 text-slate-300" />
                <span>Real-time Analytics</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Empty Spacer Bottom */}
        <div />
      </div>

      {/* ==================================================================== */}
      {/* RIGHT HALF: LOGIN CARD FORM (DITTO MATCH)                           */}
      {/* ==================================================================== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-14 bg-[#F8FAFC]">
        {/* Top Logo Section */}
        <div className="flex justify-end lg:justify-start items-center gap-3 pt-2 pl-4">
          {/* Orange Concentric Ring Icon Container */}
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center p-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-500 fill-current">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
              <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-snug">RMS</h3>
            <p className="text-[11px] text-slate-400 font-normal">By Indio Networks</p>
          </div>
        </div>

        {/* Center Card Container */}
        <div className="w-full max-w-md mx-auto my-auto py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-xl shadow-slate-200/50 space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                Welcome back
              </h2>
              <p className="text-xs text-slate-400 font-normal">
                Sign in to continue to your monitoring dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 text-xs rounded-xl border-slate-200 bg-white focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 text-xs rounded-xl border-slate-200 bg-white focus:bg-white text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-normal">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline font-semibold">
                  Forgot password?
                </a>
              </div>

              {/* Log in Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#6B8AF6] hover:bg-[#5B7BF5] text-white font-bold text-sm rounded-xl shadow-sm transition-all cursor-pointer mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Opening Dashboard...
                  </span>
                ) : (
                  <span>Log in</span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-normal px-4 pb-2">
          <span>RMS by Indio Networks</span>
          <span>© 2026 Indio Networks</span>
        </div>
      </div>
    </div>
  );
}
