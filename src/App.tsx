import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import NotFound from "@/pages/not-found";
import Analytics from "@/pages/Analytics";
import Monitor from "@/pages/Monitor";
import NetworkMap from "@/pages/Network";
import Sites from "@/pages/Sites";
import Config from "@/pages/Config";
import Users from "@/pages/Users";
import Reports from "@/pages/Reports";
import Notifications from "@/pages/Notifications";
import Login from "@/pages/Login";

const queryClient = new QueryClient();

function Router() {
  return (
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
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="stms-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
