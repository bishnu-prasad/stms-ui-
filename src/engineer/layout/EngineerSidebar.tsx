import { useState } from "react";
import { useLocation } from "wouter";
import {
  LayoutDashboard, MapPin, Bell, Settings, FileText,
  Briefcase, Wrench, ShieldCheck, ChevronDown, ChevronRight,
  ClipboardList, Package, HardHat, LifeBuoy, LogOut, Navigation,
  History
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
    href: "/engineer/dashboard",
  },
  {
    label: "My Jobs",
    icon: Briefcase,
    badge: "2",
    badgeColor: "bg-blue-500",
    children: [
      { label: "Assigned Jobs", href: "/engineer/jobs/assigned" },
      { label: "Accepted Jobs", href: "/engineer/jobs/accepted" },
      { label: "In Progress", href: "/engineer/jobs/in-progress" },
      { label: "Completed", href: "/engineer/jobs/completed" },
    ],
  },
  {
    label: "My Sites",
    icon: MapPin,
    href: "/engineer/sites",
  },
  {
    label: "Tickets",
    icon: ClipboardList,
    href: "/engineer/tickets",
  },
  {
    label: "Maintenance",
    icon: Wrench,
    children: [
      { label: "Preventive (PM)", href: "/engineer/maintenance/pm" },
      { label: "Corrective (CM)", href: "/engineer/maintenance/cm" },
      { label: "Site Visits", href: "/engineer/maintenance/visits" },
    ],
  },
  {
    label: "Inventory",
    icon: Package,
    href: "/engineer/inventory",
  },
  {
    label: "Notifications",
    icon: Bell,
    badge: "5",
    badgeColor: "bg-rose-500",
    href: "/engineer/notifications",
  },
  {
    label: "Reports",
    icon: FileText,
    href: "/engineer/reports",
  },
  {
    label: "Profile",
    icon: HardHat,
    href: "/engineer/profile",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/engineer/settings",
  },
  {
    label: "Support",
    icon: LifeBuoy,
    href: "/engineer/support",
  },
];

export function EngineerSidebar() {
  const [location, setLocation] = useLocation();

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
    <aside className="flex flex-col h-screen w-[240px] shrink-0 z-50 overflow-hidden bg-[#1E293B] text-slate-300 border-r border-slate-800 select-none">
      {/* Brand */}
      <div
        onClick={() => setLocation("/engineer/dashboard")}
        className="flex items-center h-[64px] px-4 shrink-0 border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors gap-3"
      >
        <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shrink-0 shadow-sm">
          <HardHat className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[14px] font-extrabold text-white tracking-tight leading-none">Field Ops</div>
          <div className="text-[10px] font-bold text-orange-400 mt-1 uppercase tracking-wider">Engineer Portal</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {navGroups.map((group) => {
          const isGroupOpen = openGroups.includes(group.label);
          const isGroupActive =
            (group.href && location === group.href) ||
            (group.children?.some((c) => isChildActive(c.href)) ?? false);

          if (!group.children) {
            return (
              <button
                key={group.label}
                onClick={() => setLocation(group.href!)}
                className="w-full flex items-center justify-between h-10 px-3 rounded-lg transition-colors cursor-pointer text-left group"
                style={{
                  background: isGroupActive ? "rgba(234,88,12,0.15)" : "transparent",
                  color: isGroupActive ? "#F97316" : "#CBD5E1",
                }}
              >
                <div className="flex items-center gap-3">
                  <group.icon className="w-4 h-4 shrink-0" style={{ color: isGroupActive ? "#F97316" : "#94A3B8" }} />
                  <span className={`text-[13px] ${isGroupActive ? "font-bold" : "font-medium group-hover:text-white"}`}>{group.label}</span>
                </div>
                {group.badge && (
                  <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${group.badgeColor ?? "bg-blue-500"}`}>
                    {group.badge}
                  </span>
                )}
              </button>
            );
          }

          return (
            <div key={group.label}>
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center justify-between gap-2.5 h-10 px-3 rounded-lg transition-colors cursor-pointer text-left hover:bg-slate-800/50 group"
                style={{ color: isGroupActive ? "#F97316" : "#CBD5E1" }}
              >
                <div className="flex items-center gap-3">
                  <group.icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: isGroupActive ? "#F97316" : "#94A3B8" }}
                  />
                  <span className={`text-[13px] ${isGroupActive ? "font-bold" : "font-medium group-hover:text-white"}`}>{group.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {group.badge && (
                    <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${group.badgeColor ?? "bg-blue-500"}`}>
                      {group.badge}
                    </span>
                  )}
                  {isGroupOpen
                    ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                </div>
              </button>

              {isGroupOpen && (
                <div className="ml-4 pl-4 border-l border-slate-700 mt-1 mb-2 space-y-1">
                  {group.children.map((child) => {
                    const active = isChildActive(child.href);
                    return (
                      <button
                        key={child.href}
                        onClick={() => setLocation(child.href)}
                        className="w-full flex items-center h-9 px-3 rounded-md transition-colors cursor-pointer text-left text-[12.5px] hover:text-white"
                        style={{
                          background: active ? "rgba(234,88,12,0.15)" : "transparent",
                          color: active ? "#F97316" : "#94A3B8",
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
      <div className="p-4 border-t border-slate-800 space-y-2 bg-[#0F172A]/50">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">
            AJ
          </div>
          <div>
            <div className="text-xs font-bold text-white">Alex Johnson</div>
            <div className="text-[10px] text-slate-400">L2 Technician</div>
          </div>
        </div>
        <button
          onClick={() => setLocation("/login")}
          className="w-full flex items-center justify-center gap-2 h-9 rounded-lg text-[12px] font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer border border-rose-500/20"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
