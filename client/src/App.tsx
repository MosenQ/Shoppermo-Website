import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import OldHomepage from "@/pages/OldHomepage";
import Business from "@/pages/Business";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Admin from "@/pages/Admin";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import CreateDeal from "@/pages/dashboard/CreateDeal";
import AppHome from "@/pages/app/AppHome";
import AppPlaceholder from "@/pages/app/Placeholder";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/old_homepage" component={OldHomepage} />
      <Route path="/business" component={Business} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/dashboard" component={DashboardHome} />
      <Route path="/dashboard/create-deal" component={CreateDeal} />
      <Route path="/dashboard/analytics" component={DashboardHome} />
      <Route path="/dashboard/settings" component={DashboardHome} />
      <Route path="/app" component={AppHome} />
      <Route path="/app/explore" component={AppPlaceholder} />
      <Route path="/app/wallet" component={AppPlaceholder} />
      <Route path="/app/profile" component={AppPlaceholder} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
