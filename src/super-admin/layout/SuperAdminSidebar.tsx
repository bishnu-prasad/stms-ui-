import { useState } from "react";
import { useLocation } from "wouter";
import {
  LayoutDashboard, Users, MapPin, Bell, Radio, Settings, FileText,
  BarChart2, Shield, ClipboardList, ChevronDown, ChevronRight,
  ShieldCheck, Building2, Activity, Wrench, Server, Cpu,
  BookOpen, LogOut
} from "lucide-react";

interface NavChild {
  label: string;
  href: string;
}

interface NavGroup {
  label: string;
  icon: React.ElementType;
  href?: string;          // direct nav if no children
  children?: NavChild[];
  badge?: string;
  badgeColor?: string;
}

const navGroups: NavGroup[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/super-admin/dashboard",
  },
  {
    label: "Customers",
    icon: Building2,
    children: [
      { label: "Customer Directory", href: "/super-admin/customers" },
      { label: "Customer Health", href: "/super-admin/customers/health" },
      { label: "Customer Sites", href: "/super-admin/customers/sites" },
      { label: "Customer SLA", href: "/super-admin/customers/sla" },
    ],
  },
  {
    label: "Sites",
    icon: MapPin,
    children: [
      { label: "All Sites", href: "/super-admin/sites" },
      { label: "Site Health", href: "/super-admin/sites/health" },
      { label: "Critical Sites", href: "/super-admin/sites/critical" },
    ],
  },
  {
    label: "Alarms",
    icon: Bell,
    badge: "482",
    badgeColor: "bg-rose-500",
    children: [
      { label: "Live Alarms", href: "/super-admin/alarms/live" },
      { label: "Alarm History", href: "/super-admin/alarms/history" },
      { label: "Alarm Analytics", href: "/super-admin/alarms/analytics" },
    ],
  },
  {
    label: "Gateways",
    icon: Radio,
    children: [
      { label: "Gateway Status", href: "/super-admin/gateways" },
      { label: "Communication Health", href: "/super-admin/gateways/communication" },
      { label: "Firmware", href: "/super-admin/gateways/firmware" },
      { label: "Configuration", href: "/super-admin/gateways/configuration" },
    ],
  },
  {
    label: "Configuration",
    icon: Cpu,
    children: [
      { label: "Config Profiles", href: "/super-admin/config/profiles" },
      { label: "Bulk Push", href: "/super-admin/config/push" },
      { label: "OTA Updates", href: "/super-admin/config/ota" },
      { label: "Push History", href: "/super-admin/config/history" },
    ],
  },
  {
    label: "Operations",
    icon: Wrench,
    children: [
      { label: "Tickets", href: "/super-admin/operations/tickets" },
      { label: "Vendor Management", href: "/super-admin/operations/vendors" },
      { label: "Escalations", href: "/super-admin/operations/escalations" },
    ],
  },
  {
    label: "Analytics",
    icon: BarChart2,
    children: [
      { label: "Network Health", href: "/super-admin/analytics/network" },
      { label: "Site Availability", href: "/super-admin/analytics/availability" },
      { label: "Power Analytics", href: "/super-admin/analytics/power" },
      { label: "Vendor Analytics", href: "/super-admin/analytics/vendors" },
    ],
  },
  {
    label: "Reports",
    icon: FileText,
    children: [
      { label: "Operational Reports", href: "/super-admin/reports/operational" },
      { label: "Alarm Reports", href: "/super-admin/reports/alarms" },
      { label: "Customer Reports", href: "/super-admin/reports/customers" },
      { label: "SLA Reports", href: "/super-admin/reports/sla" },
    ],
  },
  {
    label: "Users",
    icon: Users,
    children: [
      { label: "Admin Users", href: "/super-admin/users" },
      { label: "Customer Accounts", href: "/super-admin/users/customers" },
      { label: "Vendor Accounts", href: "/super-admin/users/vendors" },
      { label: "Roles & Permissions", href: "/super-admin/users/roles" },
    ],
  },
  {
    label: "Audit",
    icon: BookOpen,
    children: [
      { label: "Activity Logs", href: "/super-admin/audit/activity" },
      { label: "Login History", href: "/super-admin/audit/logins" },
      { label: "Config Audit", href: "/super-admin/audit/config" },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    children: [
      { label: "System Settings", href: "/super-admin/settings" },
      { label: "Notification Rules", href: "/super-admin/settings/notifications" },
      { label: "Integrations", href: "/super-admin/settings/integrations" },
    ],
  },
];

export function SuperAdminSidebar() {
  const [location, setLocation] = useLocation();

  // Determine which group is active
  const getActiveGroup = () => {
    for (const g of navGroups) {
      if (g.href && location === g.href) return g.label;
      if (g.children?.some((c) => location.startsWith(c.href))) return g.label;
    }
    return "";
  };

  const [openGroups, setOpenGroups] = useState<string[]>([getActiveGroup()]);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isChildActive = (href: string) => location === href || location.startsWith(href + "/");

  return (
    <aside className="flex flex-col h-screen w-[230px] shrink-0 z-50 overflow-hidden bg-white border-r border-slate-200/90 select-none">
      {/* Brand */}
      <div
        onClick={() => setLocation("/super-admin/dashboard")}
        className="flex items-center h-[56px] px-4 shrink-0 border-b border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors gap-3"
      >
        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[13px] font-extrabold text-slate-900 tracking-tight leading-none">STMS Enterprise</div>
          <div className="text-[10px] font-bold text-blue-600 mt-0.5 uppercase tracking-wider">Super Admin</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 custom-scrollbar">
        {navGroups.map((group) => {
          const isGroupOpen = openGroups.includes(group.label);
          const isGroupActive =
            (group.href && location === group.href) ||
            (group.children?.some((c) => isChildActive(c.href)) ?? false);

          if (!group.children) {
            // Direct nav item (Dashboard)
            return (
              <button
                key={group.label}
                onClick={() => setLocation(group.href!)}
                className="w-full flex items-center gap-2.5 h-9 px-3 rounded-lg transition-colors cursor-pointer text-left"
                style={{
                  background: isGroupActive ? "rgba(37,99,235,0.08)" : "transparent",
                  color: isGroupActive ? "#2563EB" : "#475569",
                }}
              >
                <group.icon className="w-4 h-4 shrink-0" style={{ color: isGroupActive ? "#2563EB" : "#94A3B8" }} />
                <span className={`text-[12.5px] ${isGroupActive ? "font-bold" : "font-medium"}`}>{group.label}</span>
              </button>
            );
          }

          return (
            <div key={group.label}>
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center justify-between gap-2.5 h-9 px-3 rounded-lg transition-colors cursor-pointer text-left hover:bg-slate-50"
                style={{ color: isGroupActive ? "#2563EB" : "#475569" }}
              >
                <div className="flex items-center gap-2.5">
                  <group.icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: isGroupActive ? "#2563EB" : "#94A3B8", strokeWidth: isGroupActive ? 2.5 : 2 }}
                  />
                  <span className={`text-[12.5px] ${isGroupActive ? "font-bold" : "font-medium"}`}>{group.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {group.badge && (
                    <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full ${group.badgeColor ?? "bg-blue-500"}`}>
                      {group.badge}
                    </span>
                  )}
                  {isGroupOpen
                    ? <ChevronDown className="w-3 h-3 text-slate-400" />
                    : <ChevronRight className="w-3 h-3 text-slate-400" />}
                </div>
              </button>

              {/* Children */}
              {isGroupOpen && (
                <div className="ml-3 pl-3 border-l border-slate-100 mt-0.5 mb-1 space-y-0.5">
                  {group.children.map((child) => {
                    const active = isChildActive(child.href);
                    return (
                      <button
                        key={child.href}
                        onClick={() => setLocation(child.href)}
                        className="w-full flex items-center h-8 px-3 rounded-lg transition-colors cursor-pointer text-left text-[12px]"
                        style={{
                          background: active ? "rgba(37,99,235,0.08)" : "transparent",
                          color: active ? "#2563EB" : "#64748B",
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {child.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100 space-y-1">
        <button
          onClick={() => setLocation("/login")}
          className="w-full flex items-center gap-2.5 h-8 px-3 rounded-lg text-[12px] font-medium text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
        <div className="text-[10px] text-slate-400 font-mono px-3">STMS v3.4.2 · ap-south-1</div>
      </div>
    </aside>
  );
}
