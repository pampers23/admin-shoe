import UserSessionContextProvider from "@/components/context/user-session-context";
import AppRoutes from "./lib/routes/app-routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserSessionContextProvider>
      <TooltipProvider>
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </UserSessionContextProvider>
  </QueryClientProvider>
);

export default App;