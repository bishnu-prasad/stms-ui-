import { ReactNode } from "react";
import { useLocation } from "wouter";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  // Full-screen layout for Login page without Sidebar & Header
  if (location === "/login") {
    return <div className="min-h-screen w-full bg-background">{children}</div>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background font-sans text-foreground">
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
  );
}
