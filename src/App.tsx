import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "@/routes/AppRoutes";
import AppShell from "@/components/Layout/AppShell";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

const queryClient = new QueryClient();

const SPLASH_SHOWN_KEY = "swiftcart-splash-shown";

const App = () => {
  const alreadyShown = sessionStorage.getItem(SPLASH_SHOWN_KEY) === "1";
  const [showSplash, setShowSplash] = useState(!alreadyShown);

  const handleSplashDone = useCallback(() => {
    sessionStorage.setItem(SPLASH_SHOWN_KEY, "1");
    setShowSplash(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showSplash && <SplashScreen onDone={handleSplashDone} />}
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppShell>
              <AppRoutes />
            </AppShell>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
