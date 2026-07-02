import { ReactNode } from "react";
import { useLocation } from "wouter";
import { OwnerSidebar } from "./OwnerSidebar";
import { OwnerHeader } from "./OwnerHeader";

export function OwnerLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ background: "#F8FAFC", fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif" }}
    >
      <OwnerSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <OwnerHeader />
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: "#F8FAFC" }}
        >
          <div className="max-w-[1400px] mx-auto w-full px-7 py-7">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
