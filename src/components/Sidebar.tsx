import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Activity,
  Settings2,
  Building2,
  Boxes,
  Users,
  FileText,
  Bell,
  Braces,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Radio,
  Moon,
  Sun,
  MapPin,
  Layers,
  ShieldCheck,
  Key,
  Clock,
  Zap,
  BatteryCharging,
  SlidersHorizontal,
  LogOut,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import { useLocation } from "wouter";

interface NavSubItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface NavItem {
  name: string;
  href?: string;
  icon: React.ElementType;
  children?: NavSubItem[];
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "MAIN",
    items: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        children: [
          { name: "Overview", href: "/analytics?tab=overview", icon: LayoutDashboard },
          { name: "Analytics", href: "/analytics?tab=performance", icon: BarChart3 },
        ],
      },
      {
        name: "Monitor",
        icon: Activity,
        children: [
          { name: "Sites", href: "/monitor?sub=sites", icon: Building2 },
          { name: "Alarms", href: "/monitor?sub=alarms", icon: Bell },
        ],
      },
      {
        name: "Config",
        icon: Settings2,
        children: [
          { name: "Location", href: "/config?tab=location", icon: MapPin },
          { name: "Category", href: "/config?tab=category", icon: Layers },
        ],
      },
      {
        name: "Sites",
        icon: Building2,
        children: [
          { name: "Manage", href: "/sites?sub=manage", icon: Building2 },
        ],
      },
      { name: "Inventory", href: "#energy", icon: Boxes },
      {
        name: "Users",
        icon: Users,
        children: [
          { name: "Vendors", href: "/users?tab=vendors", icon: Users },
          { name: "Admins", href: "/users?tab=admins", icon: ShieldCheck },
          { name: "Roles", href: "/users?tab=roles", icon: Key },
        ],
      },
      {
        name: "Reports",
        icon: FileText,
        children: [
          { name: "Site", href: "/reports?tab=site", icon: Building2 },
          { name: "Site Leakage Time", href: "/reports?tab=leakage", icon: Clock },
          { name: "Energy & Power", href: "/reports?tab=energy", icon: Zap },
          { name: "Site Consumption", href: "/reports?tab=consumption", icon: BatteryCharging },
        ],
      },
      {
        name: "Notifications",
        icon: Bell,
        children: [
          { name: "Notification Groups", href: "/notifications?tab=groups", icon: Users },
          { name: "Notification Logs", href: "/notifications?tab=logs", icon: Bell },
          { name: "My Preferences", href: "/notifications?tab=preferences", icon: SlidersHorizontal },
        ],
      },
    ],
  },
  {
    title: "OPERATION",
    items: [],
  },
  {
    title: "EXTRA",
    items: [{ name: "API", href: "#api", icon: Braces }],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [location, setLocation] = useLocation();
  const [activeHash, setActiveHash] = useState("#analytics");
  const { theme, setTheme } = useTheme();

  // Helper to determine initial active group based on URL path
  const getInitialActiveGroup = () => {
    if (location.startsWith("/analytics")) return "Dashboard";
    if (location.startsWith("/monitor")) return "Monitor";
    if (location.startsWith("/config")) return "Config";
    if (location.startsWith("/sites")) return "Sites";
    if (location.startsWith("/users")) return "Users";
    if (location.startsWith("/reports")) return "Reports";
    if (location.startsWith("/notifications")) return "Notifications";
    return "Dashboard";
  };

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(() => {
    const activeGroup = getInitialActiveGroup();
    return {
      Dashboard: activeGroup === "Dashboard",
      Monitor: activeGroup === "Monitor",
      Config: activeGroup === "Config",
      Sites: activeGroup === "Sites",
      Users: activeGroup === "Users",
      Reports: activeGroup === "Reports",
      Notifications: activeGroup === "Notifications",
    };
  });

  // Automatically update the open menu group when route changes
  useEffect(() => {
    const activeGroup = getInitialActiveGroup();
    setExpandedItems({
      Dashboard: activeGroup === "Dashboard",
      Monitor: activeGroup === "Monitor",
      Config: activeGroup === "Config",
      Sites: activeGroup === "Sites",
      Users: activeGroup === "Users",
      Reports: activeGroup === "Reports",
      Notifications: activeGroup === "Notifications",
    });
  }, [location]);

  function toggleExpanded(name: string) {
    setExpandedItems((prev) => {
      const next = {
        Dashboard: false,
        Monitor: false,
        Config: false,
        Sites: false,
        Users: false,
        Reports: false,
        Notifications: false,
      };
      // Toggle the clicked one, collapse others
      next[name] = !prev[name];
      return next;
    });
  }

  function handleNavigate(href?: string) {
    if (!href) return;
    if (href.startsWith("/")) {
      setLocation(href);
    } else {
      setActiveHash(href);
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const sidebarWidth = collapsed ? 72 : 260;

  return (
    <motion.aside
      animate={{ width: sidebarWidth }}
      transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
      className="bg-white dark:bg-card flex flex-col border-r border-slate-200/80 dark:border-sidebar-border h-screen sticky top-0 shrink-0 z-50 overflow-hidden shadow-xs select-none"
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 shrink-0 border-b border-slate-100 dark:border-sidebar-border">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
            <Radio className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-foreground">
                  STMS
                </span>
                <span className="ml-1.5 text-xs font-semibold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  v3
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          data-testid="sidebar-toggle"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Tree */}
      <nav className="flex-1 py-3 px-2.5 overflow-y-auto overflow-x-hidden space-y-4">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {/* Section Header */}
            {section.title && (
              <div className="pt-2 pb-1">
                {!collapsed ? (
                  <div className="px-3 text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                    {section.title}
                  </div>
                ) : (
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-2" />
                )}
              </div>
            )}

            {/* Section Items */}
            {section.items.map((item) => {
              const children = item.children ?? [];
              const hasChildren = children.length > 0;
              const isChildActive =
                hasChildren &&
                children.some((c) => {
                  const path = c.href.split("?")[0];
                  return c.href.startsWith("/")
                    ? location === path
                    : activeHash === c.href;
                });
              const isParentActive =
                (item.href &&
                  (item.href.startsWith("/")
                    ? location === item.href.split("?")[0]
                    : activeHash === item.href)) ||
                isChildActive;

              if (hasChildren) {
                return (
                  <div key={item.name} className="space-y-1">
                    <TooltipProvider delayDuration={100}>
                      <Tooltip open={collapsed ? undefined : false}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => {
                              if (collapsed) setCollapsed(false);
                              toggleExpanded(item.name);
                            }}
                            data-testid={`nav-${item.name.toLowerCase()}`}
                            className={`w-full relative flex items-center h-10 px-3 rounded-lg transition-all duration-150 cursor-pointer outline-none group
                              ${
                                isParentActive
                                  ? "bg-blue-50/80 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-medium"
                                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                              }`}
                          >
                            {isParentActive && (
                              <motion.div
                                layoutId="active-pill"
                                className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-full"
                              />
                            )}
                            <item.icon
                              className={`w-4 h-4 shrink-0 transition-colors ${
                                isParentActive
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-200"
                              }`}
                            />

                            {!collapsed && (
                              <div className="ml-3 flex-1 flex items-center justify-between overflow-hidden">
                                <span className="text-sm font-medium whitespace-nowrap truncate">
                                  {item.name}
                                </span>
                                <ChevronDown
                                  className={`w-3.5 h-3.5 shrink-0 text-slate-400 transition-transform duration-200 ${
                                    expandedItems[item.name] ? "rotate-180" : ""
                                  }`}
                                />
                              </div>
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-medium text-xs">
                          {item.name}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Sub-items list */}
                    <AnimatePresence initial={false}>
                      {expandedItems[item.name] && !collapsed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-4 space-y-1 overflow-hidden"
                        >
                          {children.map((child) => {
                            const isChildSelected = (() => {
                              if (!child.href.startsWith("/")) {
                                return activeHash === child.href;
                              }
                              const [path, search] = child.href.split("?");
                              if (location !== path) return false;
                              if (search) {
                                return window.location.search.includes(search);
                              }
                              return !window.location.search;
                            })();
                            return (
                              <button
                                key={child.name}
                                onClick={() => handleNavigate(child.href)}
                                data-testid={`nav-${child.name.toLowerCase()}`}
                                className={`w-full relative flex items-center h-9 px-3 rounded-lg transition-colors cursor-pointer outline-none group text-left ${
                                  isChildSelected
                                    ? "bg-blue-50/90 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-semibold"
                                    : "text-slate-500 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white"
                                }`}
                              >
                                {isChildSelected && (
                                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-full" />
                                )}
                                <child.icon
                                  className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                                    isChildSelected
                                      ? "text-blue-600 dark:text-blue-400"
                                      : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500"
                                  }`}
                                />
                                <span className="ml-3 text-xs font-medium whitespace-nowrap truncate">
                                  {child.name}
                                </span>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = item.href?.startsWith("/")
                ? location === item.href
                : activeHash === item.href;

              return (
                <TooltipProvider key={item.name} delayDuration={100}>
                  <Tooltip open={collapsed ? undefined : false}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleNavigate(item.href)}
                        data-testid={`nav-${item.name.toLowerCase()}`}
                        className={`w-full relative flex items-center h-10 px-3 rounded-lg transition-all duration-150 cursor-pointer outline-none group text-left ${
                          isActive
                            ? "bg-blue-50/80 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-semibold"
                            : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-pill"
                            className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-full"
                          />
                        )}
                        <item.icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-200"
                          }`}
                        />
                        {!collapsed && (
                          <span className="ml-3 text-sm font-medium whitespace-nowrap truncate">
                            {item.name}
                          </span>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-medium text-xs">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer / Bottom Profile Section */}
      <div className="p-3 border-t border-slate-100 dark:border-sidebar-border shrink-0 flex flex-col gap-1 bg-slate-50/50 dark:bg-slate-900/30">
        <TooltipProvider delayDuration={100}>
          <Tooltip open={collapsed ? undefined : false}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                data-testid="theme-toggle"
                className="w-full flex items-center h-9 px-3 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 cursor-pointer outline-none"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 shrink-0 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 shrink-0 text-slate-500" />
                )}
                {!collapsed && (
                  <span className="ml-3 text-xs font-medium whitespace-nowrap truncate">
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </span>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium text-xs">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={100}>
          <Tooltip open={collapsed ? undefined : false}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setLocation("/login")}
                className="w-full flex items-center justify-between h-10 px-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 group transition-colors cursor-pointer outline-none"
              >
                <div className="flex items-center">
                  <Avatar className="w-7 h-7 rounded-md shrink-0">
                    <AvatarFallback className="rounded-md text-[11px] bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-bold">
                      NOC
                    </AvatarFallback>
                  </Avatar>
                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex-1 flex items-center justify-between overflow-hidden"
                      >
                        <div className="ml-2.5 flex flex-col min-w-0 overflow-hidden text-left">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate leading-snug group-hover:text-rose-600">
                            Reliance Jio
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-400 truncate leading-none">
                            Customer
                          </span>
                        </div>
                        <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 transition-colors shrink-0 ml-2" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium text-xs">
              Log Out (Customer)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.aside>
  );
}
