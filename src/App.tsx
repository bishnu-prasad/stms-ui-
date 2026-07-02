import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import { OwnerLayout } from "@/owner/layout/OwnerLayout";
import NotFound from "@/pages/not-found";

// Customer Portal Pages
import Analytics from "@/pages/Analytics";
import Monitor from "@/pages/Monitor";
import NetworkMap from "@/pages/Network";
import Sites from "@/pages/Sites";
import Config from "@/pages/Config";
import Users from "@/pages/Users";
import Reports from "@/pages/Reports";
import Notifications from "@/pages/Notifications";
import Login from "@/pages/Login";

// Platform Admin Pages
import OwnerOverview from "@/owner/pages/Overview";
import OwnerPlatformHealth from "@/owner/pages/PlatformHealth";
import OwnerCustomers from "@/owner/pages/Customers";
import OwnerVendors from "@/owner/pages/Vendors";
import OwnerAnalytics from "@/owner/pages/Analytics";
import OwnerBilling from "@/owner/pages/Billing";
import OwnerReports from "@/owner/pages/Reports";
import OwnerUsers from "@/owner/pages/Users";
import OwnerSites from "@/owner/pages/Sites";
import OwnerAuditLogs from "@/owner/pages/AuditLogs";
import OwnerSystem from "@/owner/pages/System";
import OwnerSettings from "@/owner/pages/Settings";

const queryClient = new QueryClient();

function CustomerRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/monitor" component={Monitor} />
        <Route path="/config" component={Config} />
        <Route path="/users" component={Users} />
        <Route path="/reports" component={Reports} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/network" component={NetworkMap} />
        <Route path="/sites" component={Sites} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function OwnerRouter() {
  return (
    <OwnerLayout>
      <Switch>
        <Route path="/owner/overview" component={OwnerOverview} />
        <Route path="/owner/platform-health" component={OwnerPlatformHealth} />
        <Route path="/owner/customers" component={OwnerCustomers} />
        <Route path="/owner/vendors" component={OwnerVendors} />
        <Route path="/owner/sites" component={OwnerSites} />
        <Route path="/owner/inventory" component={OwnerSites} />
        <Route path="/owner/analytics" component={OwnerAnalytics} />
        <Route path="/owner/billing" component={OwnerBilling} />
        <Route path="/owner/invoices" component={OwnerBilling} />
        <Route path="/owner/reports" component={OwnerReports} />
        <Route path="/owner/users" component={OwnerUsers} />
        <Route path="/owner/audit-logs" component={OwnerAuditLogs} />
        <Route path="/owner/system" component={OwnerSystem} />
        <Route path="/owner/settings" component={OwnerSettings} />
        <Route component={NotFound} />
      </Switch>
    </OwnerLayout>
  );
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/owner/:rest*" component={OwnerRouter} />
      <Route component={CustomerRouter} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="stms-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppRouter />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
