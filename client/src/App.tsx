import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { AppSettingsProvider } from "./contexts/AppSettingsContext";
import Dashboard from "./pages/Dashboard";
// @ts-ignore - Composants avec Supabase
import Properties from "./pages/PropertiesComplete";
import PropertyDetail from "./pages/PropertyDetail";
import Reservations from "./pages/Reservations";
import ReservationNew from "./pages/ReservationNew";
import Tasks from "./pages/Tasks";
import TaskNew from "./pages/TaskNew";
import Settings from "./pages/Settings";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Dashboard} />
      <Route path={"/login"} component={Login} />
      <Route path={"/properties"} component={Properties} />
      <Route path={"/properties/:id"} component={PropertyDetail} />
      <Route path={"/reservations"} component={Reservations} />
      <Route path={"/reservations/new"} component={ReservationNew} />
      <Route path={"/tasks"} component={Tasks} />
      <Route path={"/tasks/new"} component={TaskNew} />
      <Route path="/settings" component={Settings} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  // P0-03: route guard minimal (redirige vers /login si non authentifié)
  const { isAuthenticated, loading } = useSupabaseAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated) return;
    if (location === "/login") return;
    setLocation("/login");
  }, [isAuthenticated, loading, location, setLocation]);

  // Évite de rendre des pages protégées le temps de rediriger.
  if (!loading && !isAuthenticated && location !== "/login") {
    return null;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <AppSettingsProvider>
          <SidebarProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </SidebarProvider>
        </AppSettingsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
