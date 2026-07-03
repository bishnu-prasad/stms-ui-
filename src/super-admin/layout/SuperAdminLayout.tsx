import { ReactNode } from "react";
import { SuperAdminSidebar } from "./SuperAdminSidebar";
import { SuperAdminHeader } from "./SuperAdminHeader";
import { useImpersonation } from "@/contexts/ImpersonationContext";
import { ShieldAlert, ArrowLeft, ChevronDown } from "lucide-react";

interface SuperAdminLayoutProps {
  children: ReactNode;
}

export function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const { isImpersonatingSuperAdmin, impersonatedSuperAdminCustomer, stopSuperAdminImpersonation } = useImpersonation();

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden font-sans text-foreground">
      {/* ── Support Mode Banner (Platform Owner impersonating Super Admin) ── */}
      {isImpersonatingSuperAdmin && impersonatedSuperAdminCustomer && (
        <div className="h-12 bg-slate-900 text-white shrink-0 flex items-center justify-between px-6 shadow-md relative z-50 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-50">Customer Workspace</span>
            </div>
            <div className="text-xs text-slate-300 flex items-center gap-1.5">
              <span>Viewing Customer:</span>
              <button className="font-bold text-white hover:text-slate-100 flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded transition-colors">
                {impersonatedSuperAdminCustomer.name} <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="text-xs text-slate-400 border-l border-slate-700 pl-4 ml-2">
              Workspace: Customer Super Admin
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Accessed by: Platform Owner
            </div>
            <button 
              onClick={stopSuperAdminImpersonation}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white hover:bg-slate-700 hover:text-emerald-400 text-xs font-bold rounded border border-slate-700 shadow-sm transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Platform Owner
            </button>
          </div>
        </div>
      )}

      {/* ── Main Layout ── */}
      <div
        className="flex flex-1 w-full overflow-hidden"
        style={{
          background: "#F8FAFC",
          color: "#0F172A",
          fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif"
        }}
      >
        <SuperAdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
          <SuperAdminHeader />
          <main
            className="flex-1 overflow-y-auto relative"
            style={{ background: "#F8FAFC" }}
          >
            <div className="max-w-[1440px] mx-auto w-full px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
