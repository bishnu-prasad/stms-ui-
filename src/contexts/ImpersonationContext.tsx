import React, { createContext, useContext, useState, ReactNode } from "react";
import { useLocation } from "wouter";

export interface CustomerType {
  id: string;
  name: string;
  logo: string;
  region: string;
  status: string;
  totalSites: number;
  onlineSites: number;
  alarms: number;
  tickets: number;
  vendors: number;
  admins: number;
  plan?: string;
}

interface ImpersonationContextType {
  isImpersonating: boolean;
  impersonatedCustomer: CustomerType | null;
  startImpersonation: (customer: CustomerType) => void;
  stopImpersonation: () => void;
}

const ImpersonationContext = createContext<ImpersonationContextType | undefined>(undefined);

export function ImpersonationProvider({ children }: { children: ReactNode }) {
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [impersonatedCustomer, setImpersonatedCustomer] = useState<CustomerType | null>(null);
  const [, setLocation] = useLocation();

  const startImpersonation = (customer: CustomerType) => {
    // 1. Audit Log 
    console.log(`[AUDIT] Super Admin opened Customer Workspace: ${customer.name} at ${new Date().toISOString()}`);
    
    // 2. Set State
    setImpersonatedCustomer(customer);
    setIsImpersonating(true);
    
    // 3. Route to Customer Portal
    setLocation("/analytics");
  };

  const stopImpersonation = () => {
    if (impersonatedCustomer) {
      console.log(`[AUDIT] Super Admin exited Customer Workspace: ${impersonatedCustomer.name} at ${new Date().toISOString()}`);
    }
    
    setIsImpersonating(false);
    setImpersonatedCustomer(null);
    
    // Route back to Super Admin Dashboard
    setLocation("/super-admin/customers");
  };

  return (
    <ImpersonationContext.Provider value={{ isImpersonating, impersonatedCustomer, startImpersonation, stopImpersonation }}>
      {children}
    </ImpersonationContext.Provider>
  );
}

export function useImpersonation() {
  const context = useContext(ImpersonationContext);
  if (context === undefined) {
    throw new Error("useImpersonation must be used within an ImpersonationProvider");
  }
  return context;
}
