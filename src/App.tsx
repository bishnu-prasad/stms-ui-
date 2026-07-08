import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ImpersonationProvider } from "@/contexts/ImpersonationContext";
import { Layout } from "@/components/Layout";
import { OwnerLayout } from "@/owner/layout/OwnerLayout";
import { SuperAdminLayout } from "@/super-admin/layout/SuperAdminLayout";
import { VendorLayout } from "@/vendor/layout/VendorLayout";
import { EngineerLayout } from "@/engineer/layout/EngineerLayout";
import NotFound from "@/pages/not-found";

// Engineer Portal Pages
import EngineerDashboard from "@/engineer/pages/Dashboard";
import JobsList from "@/engineer/pages/Jobs/JobsList";
import TicketDetails from "@/engineer/pages/Jobs/TicketDetails";
import WorkExecution from "@/engineer/pages/Jobs/WorkExecution";
import MySites from "@/engineer/pages/Sites/MySites";
import Inventory from "@/engineer/pages/Inventory";
import EngineerNotifications from "@/engineer/pages/Notifications";
import EngineerReports from "@/engineer/pages/Reports";
import Profile from "@/engineer/pages/Profile";
import Settings from "@/engineer/pages/Settings";
import Support from "@/engineer/pages/Support";

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
import CustomerProfile from "@/pages/Profile";

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
import OwnerProfile from "@/owner/pages/Profile";

// Super Admin Portal Pages & Layout
import DashboardPage from "@/super-admin/pages/Enterprise/Dashboard";
import CustomersDirPage from "@/super-admin/pages/Customers/index";
import CustomerHealthPage from "@/super-admin/pages/Customers/Health";
import CustomerSitesPage from "@/super-admin/pages/Customers/Sites";
import CustomerSLAPage from "@/super-admin/pages/Customers/SLA";
import AllSitesPage from "@/super-admin/pages/Sites/index";
import SiteHealthPage from "@/super-admin/pages/Sites/Health";
import CriticalSitesPage from "@/super-admin/pages/Sites/Critical";
import LiveAlarmsPage from "@/super-admin/pages/Alarms/Live";
import AlarmHistoryPage from "@/super-admin/pages/Alarms/History";
import AlarmAnalyticsPage from "@/super-admin/pages/Alarms/Analytics";
import GatewayStatusPage from "@/super-admin/pages/Gateways/index";
import CommHealthPage from "@/super-admin/pages/Gateways/Communication";
import FirmwarePage from "@/super-admin/pages/Gateways/Firmware";
import GatewayConfigPage from "@/super-admin/pages/Gateways/Configuration";
import ConfigProfilesPage from "@/super-admin/pages/Configuration/Profiles";
import BulkPushPage from "@/super-admin/pages/Configuration/BulkPush";
import OTAUpdatesPage from "@/super-admin/pages/Configuration/OTA";
import ConfigHistoryPage from "@/super-admin/pages/Configuration/History";
import TicketsPage from "@/super-admin/pages/Operations/Tickets";
import VendorsPage from "@/super-admin/pages/Operations/Vendors";
import EscalationsPage from "@/super-admin/pages/Operations/Escalations";
import NetworkHealthPage from "@/super-admin/pages/Analytics/Network";
import AvailabilityPage from "@/super-admin/pages/Analytics/Availability";
import PowerAnalyticsPage from "@/super-admin/pages/Analytics/Power";
import VendorAnalyticsPage from "@/super-admin/pages/Analytics/VendorAnalytics";
import OpReportsPage from "@/super-admin/pages/Reports/Operational";
import AlarmReportsPage from "@/super-admin/pages/Reports/Alarms";
import CustomerReportsPage from "@/super-admin/pages/Reports/Customers";
import SLAReportsPage from "@/super-admin/pages/Reports/SLA";
import AdminUsersPage from "@/super-admin/pages/Users/index";
import CustAccountsPage from "@/super-admin/pages/Users/CustomerAccounts";
import VendorAccountsPage from "@/super-admin/pages/Users/VendorAccounts";
import RolesPage from "@/super-admin/pages/Users/Roles";
import ActivityLogsPage from "@/super-admin/pages/Audit/Activity";
import LoginsPage from "@/super-admin/pages/Audit/Logins";
import ConfigAuditPage from "@/super-admin/pages/Audit/Config";
import SystemSettingsPage from "@/super-admin/pages/Settings/index";
import NotificationsPage from "@/super-admin/pages/Settings/Notifications";
import IntegrationsPage from "@/super-admin/pages/Settings/Integrations";
import SuperAdminProfile from "@/super-admin/pages/Profile";
import SuperAdminLogin from "@/super-admin/pages/Login";

// Vendor Portal Layout & Pages
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
      <Route path="/super-admin/dashboard"><SuperAdminLayout><DashboardPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/customers"><SuperAdminLayout><CustomersDirPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/customers/health"><SuperAdminLayout><CustomerHealthPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/customers/sites"><SuperAdminLayout><CustomerSitesPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/customers/sla"><SuperAdminLayout><CustomerSLAPage /></SuperAdminLayout></Route>
      
      <Route path="/super-admin/sites"><SuperAdminLayout><AllSitesPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/sites/health"><SuperAdminLayout><SiteHealthPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/sites/critical"><SuperAdminLayout><CriticalSitesPage /></SuperAdminLayout></Route>
      
      <Route path="/super-admin/alarms/live"><SuperAdminLayout><LiveAlarmsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/alarms/history"><SuperAdminLayout><AlarmHistoryPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/alarms/analytics"><SuperAdminLayout><AlarmAnalyticsPage /></SuperAdminLayout></Route>
      
      <Route path="/super-admin/gateways"><SuperAdminLayout><GatewayStatusPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/gateways/communication"><SuperAdminLayout><CommHealthPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/gateways/firmware"><SuperAdminLayout><FirmwarePage /></SuperAdminLayout></Route>
      <Route path="/super-admin/gateways/configuration"><SuperAdminLayout><GatewayConfigPage /></SuperAdminLayout></Route>

      <Route path="/super-admin/config/profiles"><SuperAdminLayout><ConfigProfilesPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/config/push"><SuperAdminLayout><BulkPushPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/config/ota"><SuperAdminLayout><OTAUpdatesPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/config/history"><SuperAdminLayout><ConfigHistoryPage /></SuperAdminLayout></Route>

      <Route path="/super-admin/operations/tickets"><SuperAdminLayout><TicketsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/operations/vendors"><SuperAdminLayout><VendorsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/operations/escalations"><SuperAdminLayout><EscalationsPage /></SuperAdminLayout></Route>

      <Route path="/super-admin/analytics/network"><SuperAdminLayout><NetworkHealthPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/analytics/availability"><SuperAdminLayout><AvailabilityPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/analytics/power"><SuperAdminLayout><PowerAnalyticsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/analytics/vendors"><SuperAdminLayout><VendorAnalyticsPage /></SuperAdminLayout></Route>

      <Route path="/super-admin/reports/operational"><SuperAdminLayout><OpReportsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/reports/alarms"><SuperAdminLayout><AlarmReportsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/reports/customers"><SuperAdminLayout><CustomerReportsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/reports/sla"><SuperAdminLayout><SLAReportsPage /></SuperAdminLayout></Route>

      <Route path="/super-admin/users"><SuperAdminLayout><AdminUsersPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/users/customers"><SuperAdminLayout><CustAccountsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/users/vendors"><SuperAdminLayout><VendorAccountsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/users/roles"><SuperAdminLayout><RolesPage /></SuperAdminLayout></Route>

      <Route path="/super-admin/audit/activity"><SuperAdminLayout><ActivityLogsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/audit/logins"><SuperAdminLayout><LoginsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/audit/config"><SuperAdminLayout><ConfigAuditPage /></SuperAdminLayout></Route>

      <Route path="/super-admin/settings"><SuperAdminLayout><SystemSettingsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/settings/notifications"><SuperAdminLayout><NotificationsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/settings/integrations"><SuperAdminLayout><IntegrationsPage /></SuperAdminLayout></Route>
      <Route path="/super-admin/profile"><SuperAdminLayout><SuperAdminProfile /></SuperAdminLayout></Route>

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
      <Route path="/owner/profile">
        <OwnerLayout><OwnerProfile /></OwnerLayout>
      </Route>
      <Route path="/owner">
        <OwnerLayout><OwnerOverview /></OwnerLayout>
      </Route>

      {/* ── Engineer Portal ──────────────────────────────── */}
      <Route path="/engineer/dashboard">
        <EngineerLayout><EngineerDashboard /></EngineerLayout>
      </Route>
      <Route path="/engineer/jobs/ticket/:id">
        <EngineerLayout><TicketDetails /></EngineerLayout>
      </Route>
      <Route path="/engineer/jobs/execute/:id">
        <EngineerLayout><WorkExecution /></EngineerLayout>
      </Route>
      <Route path="/engineer/jobs/:status">
        <EngineerLayout><JobsList /></EngineerLayout>
      </Route>
      <Route path="/engineer/sites">
        <EngineerLayout><MySites /></EngineerLayout>
      </Route>
      <Route path="/engineer/sites/:id">
        <EngineerLayout><MySites /></EngineerLayout>
      </Route>
      <Route path="/engineer/tickets">
        <EngineerLayout><JobsList /></EngineerLayout>
      </Route>
      <Route path="/engineer/maintenance/:type">
        <EngineerLayout><JobsList /></EngineerLayout>
      </Route>
      <Route path="/engineer/inventory">
        <EngineerLayout><Inventory /></EngineerLayout>
      </Route>
      <Route path="/engineer/notifications">
        <EngineerLayout><EngineerNotifications /></EngineerLayout>
      </Route>
      <Route path="/engineer/reports">
        <EngineerLayout><EngineerReports /></EngineerLayout>
      </Route>
      <Route path="/engineer/profile">
        <EngineerLayout><Profile /></EngineerLayout>
      </Route>
      <Route path="/engineer/settings">
        <EngineerLayout><Settings /></EngineerLayout>
      </Route>
      <Route path="/engineer/support">
        <EngineerLayout><Support /></EngineerLayout>
      </Route>
      <Route path="/engineer">
        <EngineerLayout><EngineerDashboard /></EngineerLayout>
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
      <Route path="/profile">
        <Layout><CustomerProfile /></Layout>
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
            <ImpersonationProvider>
              <AppRouter />
            </ImpersonationProvider>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
