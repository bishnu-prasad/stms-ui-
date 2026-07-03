import { ReactNode } from "react";
import { VendorSidebar } from "./VendorSidebar";
import { VendorHeader } from "./VendorHeader";

interface VendorLayoutProps {
  children: ReactNode;
}

export function VendorLayout({ children }: VendorLayoutProps) {
  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900 overflow-hidden">
      <VendorSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <VendorHeader />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
