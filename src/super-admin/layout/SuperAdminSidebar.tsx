import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Server, Shield, Activity, Wallet,
  FileText, Settings, Store, Box, Key, Cloud, ShieldCheck,
  CreditCard, Award, Bell
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/super-admin/dashboard", icon: LayoutDashboard },
  { label: "Customers", href: "/super-admin/customers", icon: Users },
  { label: "Platform Users", href: "/super-admin/users", icon: ShieldCheck },
  { label: "Infrastructure", href: "/super-admin/infrastructure/health", icon: Server },
  { label: "Security", href: "/super-admin/permissions", icon: Shield },
  { label: "Licensing", href: "/super-admin/subscriptions", icon: Key },
  { label: "Billing", href: "/super-admin/customer-health", icon: CreditCard },
  { label: "Monitoring", href: "/super-admin/monitoring/alerts", icon: Activity },
  { label: "Reports", href: "/super-admin/reports", icon: FileText },
  { label: "Audit Logs", href: "/super-admin/monitoring/audit-logs", icon: Award },
  { label: "Settings", href: "/super-admin/settings", icon: Settings },
];

export function SuperAdminSidebar() {
  const [location, setLocation] = useLocation();

  const isActive = (href: string) => location === href || (href !== "/super-admin/dashboard" && location.startsWith(href));

  return (
    <aside className="flex flex-col h-screen w-[250px] shrink-0 z-50 overflow-hidden bg-white border-r border-slate-200/90 select-none shadow-xs">
      {/* Brand Header */}
      <div 
        onClick={() => setLocation("/super-admin/dashboard")}
        className="flex items-center h-[56px] px-6 shrink-0 border-b border-slate-200 cursor-pointer hover:bg-slate-50/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[14px] font-extrabold text-slate-900 tracking-tight leading-none">
              STMS Enterprise
            </div>
            <div className="text-[11px] font-semibold text-blue-600 mt-1">
              Super Admin Console
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <button
              key={item.label}
              onClick={() => setLocation(item.href)}
              className="w-full flex items-center gap-3 h-[38px] px-3.5 rounded-xl transition-colors cursor-pointer text-left group"
              style={{
                background: active ? "rgba(37,99,235,0.08)" : "transparent",
                color: active ? "#2563EB" : "#64748B",
              }}
            >
              <item.icon 
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${active ? 'text-blue-600' : 'text-slate-400'}`} 
                style={{ strokeWidth: active ? 2.5 : 2 }} 
              />
              <span className={`text-[13px] ${active ? 'font-bold' : 'font-medium group-hover:text-slate-900'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
        <div>STMS Cloud v3.4.2</div>
        <div className="text-slate-500 font-semibold mt-0.5">Region: ap-south-1</div>
      </div>
    </aside>
  );
}
