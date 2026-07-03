import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  LayoutDashboard, Users, Server, Shield, Activity, Wallet,
  FileText, Settings, ChevronDown, ChevronRight, Store, Box,
  Database, HardDrive, Key, Cloud, ShieldCheck
} from "lucide-react";

type NavGroup = {
  label: string;
  icon: React.ElementType;
  items?: { label: string; href: string }[];
  href?: string;
};

const navigation: NavGroup[] = [
  { label: "Dashboard", href: "/super-admin/dashboard", icon: LayoutDashboard },
  {
    label: "Tenant Management", icon: Users,
    items: [
      { label: "Customers", href: "/super-admin/customers" },
      { label: "Customer Health", href: "/super-admin/customer-health" },
      { label: "Subscriptions", href: "/super-admin/subscriptions" }
    ]
  },
  {
    label: "User Management", icon: Shield,
    items: [
      { label: "Platform Users", href: "/super-admin/users" },
      { label: "Roles", href: "/super-admin/roles" },
      { label: "Permissions", href: "/super-admin/permissions" }
    ]
  },
  {
    label: "Infrastructure", icon: Server,
    items: [
      { label: "Platform Health", href: "/super-admin/infrastructure/health" },
      { label: "Servers", href: "/super-admin/infrastructure/servers" },
      { label: "Database", href: "/super-admin/infrastructure/database" },
      { label: "Storage", href: "/super-admin/infrastructure/storage" },
      { label: "Backup", href: "/super-admin/infrastructure/backup" },
      { label: "API Gateway", href: "/super-admin/infrastructure/gateway" }
    ]
  },
  {
    label: "Vendor Management", icon: Store,
    items: [
      { label: "Vendors", href: "/super-admin/vendors" },
      { label: "Vendor SLA", href: "/super-admin/vendor-sla" }
    ]
  },
  { label: "Inventory", href: "/super-admin/inventory", icon: Box },
  {
    label: "Monitoring", icon: Activity,
    items: [
      { label: "Alerts", href: "/super-admin/monitoring/alerts" },
      { label: "Audit Logs", href: "/super-admin/monitoring/audit-logs" }
    ]
  },
  { label: "Reports", href: "/super-admin/reports", icon: FileText },
  { label: "System Settings", href: "/super-admin/settings", icon: Settings }
];

export function SuperAdminSidebar() {
  const [location, setLocation] = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Infrastructure": true,
    "Tenant Management": true
  });

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) => location === href || location.startsWith(href + "?");
  
  const isGroupActive = (items: {href: string}[]) => items.some(item => isActive(item.href));

  return (
    <aside
      className="flex flex-col h-screen w-[260px] shrink-0 z-50 overflow-hidden bg-white border-r border-slate-200"
    >
      {/* Brand Header */}
      <div 
        onClick={() => setLocation("/super-admin/dashboard")}
        className="flex items-center h-[56px] px-6 shrink-0 border-b border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <div>
            <div className="text-[14px] font-bold text-slate-900 tracking-tight leading-none">
              STMS Enterprise
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">
              Super Admin Console
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-5 px-4 space-y-1 custom-scrollbar">
        {navigation.map((group) => {
          if (group.href) {
            // Single Item
            const active = isActive(group.href);
            return (
              <button
                key={group.label}
                onClick={() => setLocation(group.href!)}
                className="w-full flex items-center gap-3 h-[36px] px-3 rounded-md transition-colors cursor-pointer text-left"
                style={{
                  background: active ? "rgba(37,99,235,0.08)" : "transparent",
                  color: active ? "#2563EB" : "#64748B",
                }}
              >
                <group.icon className="w-4 h-4 shrink-0" style={{ strokeWidth: active ? 2.5 : 2 }} />
                <span className={`text-[13px] ${active ? 'font-semibold' : 'font-medium hover:text-slate-900'}`}>{group.label}</span>
              </button>
            );
          }

          // Expandable Group
          const groupActive = group.items ? isGroupActive(group.items) : false;
          const expanded = expandedGroups[group.label] || false;

          return (
            <div key={group.label} className="pt-1.5 pb-0.5">
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center justify-between h-[36px] px-3 rounded-md transition-colors cursor-pointer text-left hover:bg-slate-50"
                style={{ color: groupActive ? "#0F172A" : "#64748B" }}
              >
                <div className="flex items-center gap-3">
                  <group.icon className={`w-4 h-4 shrink-0 ${groupActive ? 'text-blue-600' : ''}`} style={{ strokeWidth: 2 }} />
                  <span className={`text-[13px] ${groupActive ? 'font-semibold' : 'font-medium'}`}>{group.label}</span>
                </div>
                {expanded ? (
                  <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                )}
              </button>
              
              <AnimatePresence initial={false}>
                {expanded && group.items && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden ml-[26px] border-l border-slate-200 mt-1 pl-3 flex flex-col gap-0.5"
                  >
                    {group.items.map((item) => {
                      const itemActive = isActive(item.href);
                      return (
                        <button
                          key={item.label}
                          onClick={() => setLocation(item.href)}
                          className="w-full flex items-center h-[32px] px-3 rounded-md transition-colors cursor-pointer text-left text-[13px]"
                          style={{
                            background: itemActive ? "rgba(37,99,235,0.08)" : "transparent",
                            color: itemActive ? "#2563EB" : "#64748B",
                            fontWeight: itemActive ? 600 : 500,
                          }}
                        >
                          <span className={!itemActive ? "hover:text-slate-900 transition-colors" : ""}>
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
      
      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
      `}</style>
    </aside>
  );
}
