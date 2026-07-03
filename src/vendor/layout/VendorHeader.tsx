import { useState } from "react";
import { useLocation } from "wouter";
import { Search, Bell, Settings, LogOut, ChevronDown, Wrench, ShieldCheck, CheckCircle2 } from "lucide-react";

export function VendorHeader() {
  const [, setLocation] = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-[56px] bg-white border-b border-slate-200/90 flex items-center justify-between px-8 shrink-0 sticky top-0 z-40">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search assigned sites, maintenance jobs, parts, engineers..."
            className="w-96 h-[36px] pl-10 pr-4 text-[13px] bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Live Status Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span>Delta Field Operations Live</span>
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Dispatch Action */}
        <button 
          onClick={() => setLocation("/vendor/jobs")}
          className="hidden sm:flex items-center gap-2 px-3.5 h-[34px] bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Wrench className="w-3.5 h-3.5" /> Dispatch Board
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-50 border border-slate-200 text-slate-600 transition-all relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Vendor Alerts</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600">3 New</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900">SLA Timer Warning (28m left)</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">SATKHANDA Open Plot — Battery Critical</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900">Customer Work Verification</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Reliance Jio approved PM-Q2-88 routine</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2.5 pl-2 pr-1.5 h-[36px] rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-[11px] font-bold text-white shadow-xs">
              DS
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[12px] font-bold text-slate-800 leading-tight">Delta Services</div>
              <div className="text-[10px] text-slate-400">Vendor Partner</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-11 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-900">Delta Electronics Lead</div>
                <div className="text-[11px] text-slate-400 mt-0.5">service@delta-electronics.in</div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { setShowProfile(false); setLocation("/vendor/profile"); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Vendor Profile
                </button>
                <button
                  onClick={() => { setShowProfile(false); setLocation("/vendor/settings"); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" /> SLA Settings
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
