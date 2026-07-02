import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  LayoutDashboard, HeartPulse, Users, Store, Globe, Package,
  BarChart3, Wallet, FileText, Shield, Settings, LogOut,
  ChevronRight, ChevronLeft, Server,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/owner/overview", icon: LayoutDashboard },
  { label: "Customers", href: "/owner/customers", icon: Users },
  { label: "Vendors", href: "/owner/vendors", icon: Store },
  { label: "Sites", href: "/owner/sites", icon: Globe },
  { label: "Platform Health", href: "/owner/platform-health", icon: HeartPulse },
  { label: "Analytics", href: "/owner/analytics", icon: BarChart3 },
  { label: "Billing", href: "/owner/billing", icon: Wallet },
  { label: "Reports", href: "/owner/reports", icon: FileText },
  { label: "Users", href: "/owner/users", icon: Shield },
  { label: "System", href: "/owner/system", icon: Server },
  { label: "Settings", href: "/owner/settings", icon: Settings },
];

export function OwnerSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [location, setLocation] = useLocation();

  function isActive(href: string) {
    return location === href || location.startsWith(href + "?");
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="flex flex-col h-screen shrink-0 z-50 overflow-hidden"
      style={{
        background: "#0F172A",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center h-14 px-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <Server className="w-4 h-4" style={{ color: "#94A3B8" }} />
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden ml-2.5 whitespace-nowrap"
            >
              <div className="text-[13px] font-bold text-slate-200 tracking-tight leading-none">
                STMS Admin
              </div>
              <div
                className="text-[10px] font-semibold mt-0.5"
                style={{ color: "#475569" }}
              >
                Platform Console
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex-1" />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-6 rounded flex items-center justify-center cursor-pointer transition-colors shrink-0"
          style={{ color: "#475569" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#94A3B8"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#475569"; }}
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <TooltipProvider key={item.label} delayDuration={80}>
              <Tooltip open={collapsed ? undefined : false}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setLocation(item.href)}
                    className="w-full flex items-center h-9 px-2.5 rounded-lg transition-all duration-100 cursor-pointer text-left relative"
                    style={{
                      background: active
                        ? "rgba(255,255,255,0.07)"
                        : "transparent",
                      color: active ? "#F1F5F9" : "#64748B",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                        (e.currentTarget as HTMLElement).style.color = "#94A3B8";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "#64748B";
                      }
                    }}
                  >
                    {/* Active Indicator */}
                    {active && (
                      <div
                        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full"
                        style={{ background: "#6366F1" }}
                      />
                    )}
                    <item.icon
                      className="w-4 h-4 shrink-0"
                      style={{ strokeWidth: active ? 2.5 : 1.75 }}
                    />
                    <AnimatePresence initial={false}>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.15 }}
                          className="ml-2.5 text-[13px] font-medium whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">{item.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </nav>

      {/* Footer — user */}
      <div
        className="p-2 shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <TooltipProvider delayDuration={80}>
          <Tooltip open={collapsed ? undefined : false}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setLocation("/login")}
                className="w-full flex items-center gap-2.5 h-10 px-2.5 rounded-lg cursor-pointer transition-all duration-100"
                style={{ color: "#475569" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#CBD5E1";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#475569";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{ background: "rgba(255,255,255,0.07)", color: "#94A3B8" }}
                >
                  AM
                </div>
                <AnimatePresence initial={false}>
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex-1 flex items-center justify-between overflow-hidden"
                    >
                      <div className="min-w-0">
                        <div className="text-[12px] font-semibold text-slate-300 truncate">Arjun Mehta</div>
                        <div className="text-[10px] truncate" style={{ color: "#475569" }}>
                          Super Admin
                        </div>
                      </div>
                      <LogOut className="w-3.5 h-3.5 shrink-0 ml-2" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">Sign Out</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.aside>
  );
}
