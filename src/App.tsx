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

// Super Admin Portal Pages & Layout
import { SuperAdminLayout } from "@/super-admin/layout/SuperAdminLayout";
import DashboardPage from "@/super-admin/pages/Enterprise/Dashboard";
import CustomersPage from "@/super-admin/pages/Enterprise/Customers";
import CustomerHealthPage from "@/super-admin/pages/Enterprise/CustomerHealth";
import SubscriptionsPage from "@/super-admin/pages/Enterprise/Subscriptions";
import PlatformUsersPage from "@/super-admin/pages/Enterprise/PlatformUsers";
import RolesPage from "@/super-admin/pages/Enterprise/Roles";
import PermissionsPage from "@/super-admin/pages/Enterprise/Permissions";
import PlatformHealthPage from "@/super-admin/pages/Enterprise/PlatformHealth";
import ServersPage from "@/super-admin/pages/Enterprise/Servers";
import DatabasePage from "@/super-admin/pages/Enterprise/Database";
import StoragePage from "@/super-admin/pages/Enterprise/Storage";
import BackupPage from "@/super-admin/pages/Enterprise/Backup";
import ApiGatewayPage from "@/super-admin/pages/Enterprise/ApiGateway";
import VendorsPage from "@/super-admin/pages/Enterprise/Vendors";
import VendorSLAPage from "@/super-admin/pages/Enterprise/VendorSLA";
import InventoryPage from "@/super-admin/pages/Enterprise/Inventory";
import AlertsPage from "@/super-admin/pages/Enterprise/Alerts";
import AuditLogsPage from "@/super-admin/pages/Enterprise/AuditLogs";
import ReportsPage from "@/super-admin/pages/Enterprise/Reports";
import SettingsPage from "@/super-admin/pages/Enterprise/Settings";
import SuperAdminLogin from "@/super-admin/pages/Login";

// Vendor Portal Layout & Pages
import { VendorLayout } from "@/vendor/layout/VendorLayout";
import VendorDashboardPage from "@/vendor/pages/Dashboard";
import VendorJobsPage from "@/vendor/pages/Jobs";
import VendorAssignedSitesPage from "@/vendor/pages/AssignedSites";
import VendorActiveAlarmsPage from "@/vendor/pages/ActiveAlarms";
import VendorMaintenancePage from "@/vendor/pages/Maintenance";
import VendorEngineersPage from "@/vendor/pages/Engineers";
import VendorInventoryPage from "@/vendor/pages/Inventory";
import VendorCustomersPage from "@/vendor/pages/Customers";
import VendorReportsPage from "@/vendor/pages/Reports";
import VendorNotificationsPage from "@/vendor/pages/Notifications";
import VendorSettingsPage from "@/vendor/pages/Settings";
import VendorProfilePage from "@/vendor/pages/Profile";
import VendorSupportPage from "@/vendor/pages/Support";
import VendorLoginPage from "@/vendor/pages/Login";

const queryClient = new QueryClient();

function AppRouter() {
  return (
    <Switch>
      {/* ── Root & Workspace Login ────────────────────────── */}
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/super-admin/login" component={SuperAdminLogin} />
      <Route path="/vendor/login" component={VendorLoginPage} />

      {/* ── Vendor Portal ─────────────────────────────────── */}
      <Route path="/vendor/dashboard">
        <VendorLayout><VendorDashboardPage /></VendorLayout>
      </Route>
      <Route path="/vendor/jobs">
        <VendorLayout><VendorJobsPage /></VendorLayout>
      </Route>
      <Route path="/vendor/sites">
        <VendorLayout><VendorAssignedSitesPage /></VendorLayout>
      </Route>
      <Route path="/vendor/alarms">
        <VendorLayout><VendorActiveAlarmsPage /></VendorLayout>
      </Route>
      <Route path="/vendor/maintenance">
        <VendorLayout><VendorMaintenancePage /></VendorLayout>
      </Route>
      <Route path="/vendor/engineers">
        <VendorLayout><VendorEngineersPage /></VendorLayout>
      </Route>
      <Route path="/vendor/inventory">
        <VendorLayout><VendorInventoryPage /></VendorLayout>
      </Route>
      <Route path="/vendor/customers">
        <VendorLayout><VendorCustomersPage /></VendorLayout>
      </Route>
      <Route path="/vendor/reports">
        <VendorLayout><VendorReportsPage /></VendorLayout>
      </Route>
      <Route path="/vendor/notifications">
        <VendorLayout><VendorNotificationsPage /></VendorLayout>
      </Route>
      <Route path="/vendor/settings">
        <VendorLayout><VendorSettingsPage /></VendorLayout>
      </Route>
      <Route path="/vendor/profile">
        <VendorLayout><VendorProfilePage /></VendorLayout>
      </Route>
      <Route path="/vendor/support">
        <VendorLayout><VendorSupportPage /></VendorLayout>
      </Route>
      <Route path="/vendor">
        <VendorLayout><VendorDashboardPage /></VendorLayout>
      </Route>

      {/* ── Super Admin Portal ───────────────────────────── */}
      <Route path="/super-admin/dashboard">
        <SuperAdminLayout><DashboardPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/customers">
        <SuperAdminLayout><CustomersPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/customer-health">
        <SuperAdminLayout><CustomerHealthPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/subscriptions">
        <SuperAdminLayout><SubscriptionsPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/users">
        <SuperAdminLayout><PlatformUsersPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/roles">
        <SuperAdminLayout><RolesPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/permissions">
        <SuperAdminLayout><PermissionsPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/infrastructure/health">
        <SuperAdminLayout><PlatformHealthPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/infrastructure/servers">
        <SuperAdminLayout><ServersPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/infrastructure/database">
        <SuperAdminLayout><DatabasePage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/infrastructure/storage">
        <SuperAdminLayout><StoragePage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/infrastructure/backup">
        <SuperAdminLayout><BackupPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/infrastructure/gateway">
        <SuperAdminLayout><ApiGatewayPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/vendors">
        <SuperAdminLayout><VendorsPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/vendor-sla">
        <SuperAdminLayout><VendorSLAPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/inventory">
        <SuperAdminLayout><InventoryPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/monitoring/alerts">
        <SuperAdminLayout><AlertsPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/monitoring/audit-logs">
        <SuperAdminLayout><AuditLogsPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/reports">
        <SuperAdminLayout><ReportsPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin/settings">
        <SuperAdminLayout><SettingsPage /></SuperAdminLayout>
      </Route>
      <Route path="/super-admin">
        <SuperAdminLayout><DashboardPage /></SuperAdminLayout>
      </Route>

      {/* ── Platform Owner Portal ────────────────────────── */}
      <Route path="/owner/overview">
        <OwnerLayout><OwnerOverview /></OwnerLayout>
      </Route>
      <Route path="/owner/platform-health">
        <OwnerLayout><OwnerPlatformHealth /></OwnerLayout>
      </Route>
      <Route path="/owner/customers">
        <OwnerLayout><OwnerCustomers /></OwnerLayout>
      </Route>
      <Route path="/owner/vendors">
        <OwnerLayout><OwnerVendors /></OwnerLayout>
      </Route>
      <Route path="/owner/sites">
        <OwnerLayout><OwnerSites /></OwnerLayout>
      </Route>
      <Route path="/owner/inventory">
        <OwnerLayout><OwnerSites /></OwnerLayout>
      </Route>
      <Route path="/owner/analytics">
        <OwnerLayout><OwnerAnalytics /></OwnerLayout>
      </Route>
      <Route path="/owner/billing">
        <OwnerLayout><OwnerBilling /></OwnerLayout>
      </Route>
      <Route path="/owner/invoices">
        <OwnerLayout><OwnerBilling /></OwnerLayout>
      </Route>
      <Route path="/owner/reports">
        <OwnerLayout><OwnerReports /></OwnerLayout>
      </Route>
      <Route path="/owner/users">
        <OwnerLayout><OwnerUsers /></OwnerLayout>
      </Route>
      <Route path="/owner/audit-logs">
        <OwnerLayout><OwnerAuditLogs /></OwnerLayout>
      </Route>
      <Route path="/owner/system">
        <OwnerLayout><OwnerSystem /></OwnerLayout>
      </Route>
      <Route path="/owner/settings">
        <OwnerLayout><OwnerSettings /></OwnerLayout>
      </Route>
      <Route path="/owner">
        <OwnerLayout><OwnerOverview /></OwnerLayout>
      </Route>

      {/* ── Customer Portal ──────────────────────────────── */}
      <Route path="/analytics">
        <Layout><Analytics /></Layout>
      </Route>
      <Route path="/monitor">
        <Layout><Monitor /></Layout>
      </Route>
      <Route path="/config">
        <Layout><Config /></Layout>
      </Route>
      <Route path="/users">
        <Layout><Users /></Layout>
      </Route>
      <Route path="/reports">
        <Layout><Reports /></Layout>
      </Route>
      <Route path="/notifications">
        <Layout><Notifications /></Layout>
      </Route>
      <Route path="/network">
        <Layout><NetworkMap /></Layout>
      </Route>
      <Route path="/sites">
        <Layout><Sites /></Layout>
      </Route>

      {/* ── 404 Fallback ─────────────────────────────────── */}
      <Route component={NotFound} />
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
