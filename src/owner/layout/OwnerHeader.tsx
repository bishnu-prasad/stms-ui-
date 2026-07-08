import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import {
  Search, Bell, ChevronDown, LogOut, User, UserCog, Command,
} from "lucide-react";
import { platformNotifications } from "../data/ownerMockData";

const SEARCH_ITEMS = [
  { type: "Customer", name: "Reliance Jio", href: "/owner/customers" },
  { type: "Customer", name: "Bharti Airtel", href: "/owner/customers" },
  { type: "Customer", name: "Vodafone Idea", href: "/owner/customers" },
  { type: "Customer", name: "BSNL", href: "/owner/customers" },
  { type: "Vendor", name: "Delta Electronics", href: "/owner/vendors" },
  { type: "Report", name: "June 2026 Executive Report", href: "/owner/reports" },
  { type: "Invoice", name: "INV-2026-0842 — Reliance Jio", href: "/owner/billing" },
  { type: "Site", name: "Mumbai Central — Airtel", href: "/owner/sites" },
  { type: "User", name: "Arjun Mehta — Super Admin", href: "/owner/users" },
];

export function OwnerHeader() {
  const [, setLocation] = useLocation();
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const cmdRef = useRef<HTMLInputElement>(null);

  const unreadCount = platformNotifications.filter((n) => !n.read).length;
  const filtered = searchQuery.length > 0
    ? SEARCH_ITEMS.filter((i) =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_ITEMS;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette((v) => !v);
      }
      if (e.key === "Escape") {
        setShowCommandPalette(false);
        setShowNotifications(false);
        setShowProfile(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (showCommandPalette) {
      setSearchQuery("");
      setTimeout(() => cmdRef.current?.focus(), 50);
    }
  }, [showCommandPalette]);

  const notifDot: Record<string, string> = {
    error: "#EF4444", warning: "#F59E0B", info: "#6366F1", success: "#10B981",
  };

  return (
    <>
      {/* ── Command Palette ────────────────────────────────── */}
      {showCommandPalette && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-24"
          style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowCommandPalette(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ border: "1px solid #E2E8F0" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
              <Command className="w-4 h-4 text-slate-400" />
              <input
                ref={cmdRef}
                type="text"
                placeholder="Search customers, vendors, reports, invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm text-slate-900 bg-transparent outline-none placeholder:text-slate-400"
              />
              <kbd className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { setShowCommandPalette(false); setLocation(item.href); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded font-mono"
                    style={{ background: "#F1F5F9", color: "#64748B" }}
                  >
                    {item.type.toUpperCase()}
                  </span>
                  <span className="text-sm text-slate-700">{item.name}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="text-sm text-slate-400 px-4 py-4">No results</p>
              )}
            </div>
            <div className="px-4 py-2.5 border-t border-slate-100 flex items-center gap-4 text-[10px] text-slate-400">
              <span><kbd className="font-mono">↑↓</kbd> navigate</span>
              <span><kbd className="font-mono">↵</kbd> select</span>
              <span><kbd className="font-mono">ESC</kbd> close</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Header Bar ─────────────────────────────────────── */}
      <header
        className="h-13 flex items-center justify-between px-6 shrink-0 relative z-30"
        style={{
          height: "52px",
          background: "#ffffff",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        {/* Left: Platform status indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-medium">Platform Operating Normally</span>
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-slate-700">124</span>
            <span>customers</span>
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-slate-700">8,462</span>
            <span>sites</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => setShowCommandPalette(true)}
            className="flex items-center gap-2 px-3 h-8 rounded-lg text-slate-400 transition-colors cursor-pointer"
            style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F1F5F9"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8FAFC"; }}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="text-xs text-slate-400">Search...</span>
            <div className="flex items-center gap-0.5 ml-2">
              <kbd className="text-[10px] font-mono text-slate-300 px-1 py-0.5 rounded" style={{ border: "1px solid #E2E8F0", background: "#fff" }}>⌘K</kbd>
            </div>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
              className="relative w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
              style={{ background: "transparent" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F1F5F9"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <Bell className="w-4 h-4 text-slate-500" />
              {unreadCount > 0 && (
                <span
                  className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                  style={{ background: "#EF4444" }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div
                className="absolute right-0 top-10 w-80 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
                style={{ border: "1px solid #E2E8F0" }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">Notifications</span>
                  <span className="text-[10px] font-semibold text-slate-400">{unreadCount} unread</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {platformNotifications.map((n) => (
                    <div key={n.id} className={`px-4 py-3 ${!n.read ? "bg-slate-50/60" : ""}`}>
                      <div className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: notifDot[n.type] }} />
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold text-slate-800 leading-snug">{n.title}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{n.message}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-slate-100 text-center">
                  <button className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 cursor-pointer">View all</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
              className="flex items-center gap-2 h-8 px-2.5 rounded-lg cursor-pointer transition-colors"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F1F5F9"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: "#1E293B" }}
              >
                AM
              </div>
              <span className="text-[12px] font-semibold text-slate-700 hidden sm:block">Arjun Mehta</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {showProfile && (
              <div
                className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-lg z-50 py-1 overflow-hidden"
                style={{ border: "1px solid #E2E8F0" }}
              >
                <div className="px-3 py-2.5 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">Arjun Mehta</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">arjun@indionetworks.com</div>
                  <div className="text-[10px] font-semibold text-slate-500 mt-0.5">Super Admin</div>
                </div>
                <button
                  onClick={() => { setShowProfile(false); setLocation("/owner/profile"); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" /> My Profile
                </button>
                <button
                  onClick={() => { setShowProfile(false); setLocation("/owner/settings"); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  <UserCog className="w-3.5 h-3.5" /> Settings
                </button>
                <button
                  onClick={() => { setShowProfile(false); setLocation("/login"); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-500 hover:bg-slate-50 border-t border-slate-100 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
