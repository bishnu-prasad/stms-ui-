import { ReactNode } from "react";
import { useLocation } from "wouter";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useImpersonation } from "@/contexts/ImpersonationContext";
import { ShieldAlert, ArrowLeft, ChevronDown } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { isImpersonating, impersonatedCustomer, stopImpersonation } = useImpersonation();

  // Full-screen layout for Login page without Sidebar & Header
  if (location === "/login") {
    return <div className="min-h-screen w-full bg-background">{children}</div>;
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden font-sans text-foreground">
      {/* ── Support Mode Banner (Only visible when impersonating) ── */}
      {isImpersonating && impersonatedCustomer && (
        <div className="h-12 bg-blue-600 text-white shrink-0 flex items-center justify-between px-6 shadow-md relative z-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-700/50 px-3 py-1 rounded-full border border-blue-500/30">
              <ShieldAlert className="w-4 h-4 text-blue-200" />
              <span className="text-xs font-bold text-blue-50">Support Mode</span>
            </div>
            <div className="text-xs text-blue-100 flex items-center gap-1.5">
              <span>Viewing Workspace:</span>
              <button className="font-bold text-white hover:text-blue-100 flex items-center gap-1 bg-blue-700/30 hover:bg-blue-700 px-2 py-0.5 rounded transition-colors">
                {impersonatedCustomer.name} <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">
              Accessed by: Root Super Admin
            </div>
            <button 
              onClick={stopImpersonation}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold rounded shadow-sm transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Super Admin
            </button>
          </div>
        </div>
      )}

      {/* ── Main Layout ── */}
      <div className="flex flex-1 w-full overflow-hidden bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 bg-background relative z-10">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 relative">
            <div className="max-w-[1600px] mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
