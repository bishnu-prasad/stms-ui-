import { useState } from "react";
import { useLocation } from "wouter";
import { Search, Bell, Settings, LogOut, ChevronDown, ShieldCheck, Activity, Globe, Command } from "lucide-react";
import { platformSystemInfo } from "../data/mockData";

export function SuperAdminHeader() {
  const [, setLocation] = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-[56px] bg-white border-b border-slate-200/90 flex items-center justify-between px-8 shrink-0 sticky top-0 z-40 font-sans">
      {/* Global Command Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search customers, microservices, servers, API keys (⌘K)..."
            className="w-96 h-[36px] pl-10 pr-4 text-[13px] bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Live Status Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{platformSystemInfo.platformStatus} ({platformSystemInfo.systemUptime})</span>
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Provision Button */}
        <button 
          onClick={() => setLocation("/super-admin/customers")}
          className="hidden sm:flex items-center gap-2 px-3.5 h-[34px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          + Provision Tenant
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2.5 pl-2 pr-1.5 h-[36px] rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-[11px] font-bold text-white shadow-xs">
              SA
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[12px] font-bold text-slate-800 leading-tight">Root Admin</div>
              <div className="text-[10px] text-slate-400">System Administrator</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-11 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-900">Arjun Mehta (Root)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">root@indionetworks.com</div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { setShowProfile(false); setLocation("/super-admin/settings"); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" /> Platform Settings
                </button>
              </div>
              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => setLocation("/login")}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
