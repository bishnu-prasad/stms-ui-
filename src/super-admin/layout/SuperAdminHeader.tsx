import { useState } from "react";
import { useLocation } from "wouter";
import { Search, Bell, Settings, LogOut, ShieldCheck, ChevronDown, Box, Zap } from "lucide-react";
import { platformNotifications } from "../../owner/data/ownerMockData";

export function SuperAdminHeader() {
  const [, setLocation] = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadCount = platformNotifications.filter((n) => !n.read).length;

  return (
    <header
      className="h-[56px] flex items-center justify-between px-6 shrink-0 relative z-30"
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      {/* Left: Global Search & Platform Status */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search organizations, users, IP addresses..."
            className="w-96 h-[36px] pl-10 pr-4 text-[13px] bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-2 top-2 flex gap-1">
            <kbd className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 bg-white">⌘</kbd>
            <kbd className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 bg-white">K</kbd>
          </div>
        </div>

        {/* Platform Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[12px] font-semibold text-emerald-700">All Systems Operational</span>
        </div>
      </div>

      {/* Right: Quick Actions, System Info, Profile */}
      <div className="flex items-center gap-4">
        {/* Quick Actions */}
        <div className="hidden lg:flex items-center gap-2 pr-5 border-r border-slate-200">
          <button className="flex items-center gap-2 px-3 h-[32px] rounded-md hover:bg-slate-50 text-slate-600 transition-colors text-[12px] font-medium">
            <Box className="w-4 h-4" /> Provision Tenant
          </button>
          <button className="flex items-center gap-2 px-3 h-[32px] rounded-md hover:bg-slate-50 text-slate-600 transition-colors text-[12px] font-medium">
            <Zap className="w-4 h-4 text-amber-500" /> API Gateway
          </button>
        </div>

        {/* Version Badge */}
        <div className="hidden xl:flex items-center px-2.5 py-1 bg-slate-50 rounded-md text-[11px] font-mono text-slate-500 font-medium border border-slate-200">
          STMS v3.4.1-prod
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="w-[36px] h-[36px] rounded-full flex items-center justify-center hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all relative text-slate-500"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
            )}
          </button>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2.5 pl-2 pr-1.5 h-[36px] rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-bold text-white shadow-sm">
              SA
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[12px] font-semibold text-slate-700 leading-tight">System Admin</div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-11 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <div className="text-[13px] font-semibold text-slate-900">Arjun Mehta</div>
                <div className="text-[12px] text-slate-500 mt-0.5">arjun@indionetworks.com</div>
              </div>
              <div className="py-1.5">
                <button
                  onClick={() => setLocation("/super-admin/settings")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Settings className="w-4 h-4 text-slate-400" /> Platform Settings
                </button>
                <button
                  onClick={() => setLocation("/super-admin/security/access")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-400" /> Access Control
                </button>
              </div>
              <div className="py-1.5 border-t border-slate-100">
                <button
                  onClick={() => setLocation("/super-admin/login")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 text-red-500" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
