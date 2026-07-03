import { ReactNode } from "react";
import { SuperAdminSidebar } from "./SuperAdminSidebar";
import { SuperAdminHeader } from "./SuperAdminHeader";

interface SuperAdminLayoutProps {
  children: ReactNode;
}

export function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{
        background: "#F8FAFC",
        color: "#0F172A",
        fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif"
      }}
    >
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <SuperAdminHeader />
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: "#F8FAFC" }}
        >
          <div className="max-w-[1440px] mx-auto w-full px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
