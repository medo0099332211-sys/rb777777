import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const STORAGE_USER_KEY = 'arbaah_user_name';

function AuthWrapper() {
  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_USER_KEY);
  });

  function handleLogin(name: string) {
    localStorage.setItem(STORAGE_USER_KEY, name);
    setUserName(name);
    console.log('User logged in:', name);
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_USER_KEY);
    setUserName(null);
    console.log('User logged out');
  }

  if (!userName) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index userName={userName} onLogout={handleLogout} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthWrapper />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
