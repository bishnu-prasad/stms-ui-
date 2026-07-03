import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Wrench, Building2, Bell, Users, Boxes,
  FileText, Settings, ShieldCheck, ChevronRight, ChevronLeft,
  Store, UserCheck, Calendar, Sliders, LifeBuoy, User
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
  { label: "My Jobs", href: "/vendor/jobs", icon: Wrench, badge: "18" },
  { label: "Assigned Sites", href: "/vendor/sites", icon: Building2 },
  { label: "Active Alarms", href: "/vendor/alarms", icon: Bell, badge: "3" },
  { label: "Maintenance", href: "/vendor/maintenance", icon: Calendar },
  { label: "Engineers", href: "/vendor/engineers", icon: UserCheck },
  { label: "Inventory", href: "/vendor/inventory", icon: Boxes },
  { label: "Customers", href: "/vendor/customers", icon: Store },
  { label: "Reports", href: "/vendor/reports", icon: FileText },
  { label: "Notifications", href: "/vendor/notifications", icon: Bell },
  { label: "Settings", href: "/vendor/settings", icon: Settings },
  { label: "Profile", href: "/vendor/profile", icon: User },
  { label: "Support", href: "/vendor/support", icon: LifeBuoy },
];

export function VendorSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [location, setLocation] = useLocation();

  const isActive = (href: string) => location === href || location.startsWith(href + "?");

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 250 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="flex flex-col h-screen shrink-0 z-50 overflow-hidden bg-white border-r border-slate-200/90 select-none shadow-xs"
    >
      {/* Brand Header */}
      <div 
        onClick={() => setLocation("/vendor/dashboard")}
        className="flex items-center h-[56px] px-5 shrink-0 border-b border-slate-200 cursor-pointer hover:bg-slate-50/80 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white shrink-0 shadow-sm shadow-teal-500/20">
            <Wrench className="w-4 h-4" />
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <div className="text-[14px] font-bold text-slate-900 tracking-tight leading-none">
                  Delta FieldOps
                </div>
                <div className="text-[11px] font-medium text-teal-700 mt-1">
                  Vendor Partner Console
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              className="w-full flex items-center justify-between h-[38px] px-3 rounded-xl transition-colors cursor-pointer text-left group"
              style={{
                background: active ? "rgba(13,148,136,0.08)" : "transparent",
                color: active ? "#0D9488" : "#64748B",
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <item.icon 
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${active ? 'text-teal-600' : 'text-slate-400'}`} 
                  style={{ strokeWidth: active ? 2.5 : 2 }} 
                />
                {!collapsed && (
                  <span className={`text-[13px] truncate ${active ? 'font-bold' : 'font-medium group-hover:text-slate-900'}`}>
                    {item.label}
                  </span>
                )}
              </div>

              {!collapsed && item.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  active ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center h-[34px] rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
}
