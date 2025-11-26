import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { IntroRoute, DataroomRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import IntroSlides from "./pages/IntroSlides";
import Dataroom from "./pages/Dataroom";
import HomePage from "./pages/HomePage";
import Simulador from "./pages/Simulador";
import Materiales from "./pages/Materiales";
import Cadena from "./pages/Cadena";
import CalculadoraESG from "./pages/CalculadoraESG";
import Proyectos from "./pages/Proyectos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Login - Public */}
            <Route path="/" element={<Login />} />
            
            {/* Dataroom - Protected (main view after login) */}
            <Route 
              path="/dataroom" 
              element={
                <DataroomRoute>
                  <Dataroom />
                </DataroomRoute>
              } 
            />

            {/* Optional Routes */}
            <Route 
              path="/home" 
              element={
                <IntroRoute>
                  <HomePage />
                </IntroRoute>
              } 
            />
            <Route 
              path="/intro-slides" 
              element={
                <IntroRoute>
                  <IntroSlides />
                </IntroRoute>
              } 
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
