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

  isImpersonatingSuperAdmin: boolean;
  impersonatedSuperAdminCustomer: CustomerType | null;
  startSuperAdminImpersonation: (customer: CustomerType) => void;
  stopSuperAdminImpersonation: () => void;
}

const ImpersonationContext = createContext<ImpersonationContextType | undefined>(undefined);

export function ImpersonationProvider({ children }: { children: ReactNode }) {
  // Existing Customer Portal Impersonation
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [impersonatedCustomer, setImpersonatedCustomer] = useState<CustomerType | null>(null);
  
  // New Super Admin Portal Impersonation
  const [isImpersonatingSuperAdmin, setIsImpersonatingSuperAdmin] = useState(false);
  const [impersonatedSuperAdminCustomer, setImpersonatedSuperAdminCustomer] = useState<CustomerType | null>(null);

  const [, setLocation] = useLocation();

  const startImpersonation = (customer: CustomerType) => {
    console.log(`[AUDIT] Super Admin opened Customer Workspace: ${customer.name} at ${new Date().toISOString()}`);
    setImpersonatedCustomer(customer);
    setIsImpersonating(true);
    setLocation("/analytics");
  };

  const stopImpersonation = () => {
    if (impersonatedCustomer) {
      console.log(`[AUDIT] Super Admin exited Customer Workspace: ${impersonatedCustomer.name} at ${new Date().toISOString()}`);
    }
    setIsImpersonating(false);
    setImpersonatedCustomer(null);
    setLocation("/super-admin/customers");
  };

  const startSuperAdminImpersonation = (customer: CustomerType) => {
    console.log(`[AUDIT] Platform Owner opened Super Admin Workspace for: ${customer.name} at ${new Date().toISOString()}`);
    setImpersonatedSuperAdminCustomer(customer);
    setIsImpersonatingSuperAdmin(true);
    setLocation("/super-admin/dashboard");
  };

  const stopSuperAdminImpersonation = () => {
    if (impersonatedSuperAdminCustomer) {
      console.log(`[AUDIT] Platform Owner exited Super Admin Workspace for: ${impersonatedSuperAdminCustomer.name} at ${new Date().toISOString()}`);
    }
    setIsImpersonatingSuperAdmin(false);
    setImpersonatedSuperAdminCustomer(null);
    setLocation("/owner/customers");
  };

  return (
    <ImpersonationContext.Provider value={{ 
      isImpersonating, impersonatedCustomer, startImpersonation, stopImpersonation,
      isImpersonatingSuperAdmin, impersonatedSuperAdminCustomer, startSuperAdminImpersonation, stopSuperAdminImpersonation
    }}>
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
