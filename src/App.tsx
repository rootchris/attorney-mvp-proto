import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { UserRole } from "./components/RoleSelector";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientIntake from "./pages/ClientIntake";
import ClientsList from "./pages/ClientsList";
import MattersList from "./pages/MattersList";
import { ClientRecord } from "./components/ClientRecord";
import { MatterRecord } from "./components/MatterRecord";

const queryClient = new QueryClient();

const App = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('attorney');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout currentRole={currentRole} onRoleChange={setCurrentRole}>
            <Routes>
              <Route path="/" element={<Index currentRole={currentRole} onRoleChange={setCurrentRole} />} />
              <Route path="/client-intake" element={<ClientIntake />} />
              <Route path="/clients" element={<ClientsList />} />
              <Route path="/matters" element={<MattersList />} />
              <Route path="/client/:clientId" element={<ClientRecord />} />
              <Route path="/matter/:matterId" element={<MatterRecord />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
