import { useState } from "react";
import { Bell, Search, ChevronDown, LogOut, User, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useLocation } from "wouter";

export function Header() {
  const [location, setLocation] = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathParts = location === "/" ? ["Global Command Center"] : location.split("/").filter(Boolean);

  const handleLogout = () => {
    setIsProfileOpen(false);
    setLocation("/login");
  };
  
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card shrink-0 relative z-30">
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium text-muted-foreground flex items-center">
          Home 
          {pathParts.map((part, i) => (
            <span key={i} className="flex items-center">
              <span className="mx-2">&gt;</span>
              <span className={i === pathParts.length - 1 ? "text-foreground capitalize font-bold" : "capitalize"}>
                {part}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md border border-border text-sm w-64 text-muted-foreground cursor-text hover:bg-muted/80 transition-colors">
          <Search className="w-4 h-4" />
          <span>Search (Cmd+K)</span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded-md text-emerald-600 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span>LIVE</span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium bg-blue-500/10 px-3 py-1 rounded-md text-blue-600 border border-blue-500/20">
          <span className="font-bold">98.2%</span> Healthy
        </div>

        <div className="text-xs font-mono text-muted-foreground tracking-tight">Last sync: 2 min ago</div>

        <button className="relative hover:bg-muted p-2 rounded-md transition-colors cursor-pointer">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 cursor-pointer hover:bg-muted p-1 pr-2 rounded-md transition-colors outline-none"
          >
            <Avatar className="w-8 h-8 rounded-md">
              <AvatarFallback className="rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-bold text-xs">
                NOC
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start leading-none">
              <span className="text-xs font-bold text-foreground">Reliance Jio</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Production</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-xl shadow-xl z-50 py-1.5 text-xs">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="block font-bold text-slate-900 dark:text-slate-100">Reliance Jio</span>
                <span className="block text-[10px] font-mono text-slate-400">admin@indionetworks.com</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold flex items-center gap-2 cursor-pointer border-t border-slate-100 dark:border-slate-800"
              >
                <LogOut className="w-4 h-4 text-rose-500" /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
