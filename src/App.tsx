import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const STORAGE_USER_KEY = 'arbaah_user_name';

// رابط الإعلان المباشر بتاعك اللي هيظهر أول ما يفتح الموقع
const ENTRY_AD_URL = "https://omg10.com/4/10942560";

function AuthWrapper() {
  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_USER_KEY);
  });

  // كود فتح الإعلان إجبارياً عند أول دخول للموقع
  useEffect(() => {
    // بنشيك إذا كان الزائر شاف إعلان الدخول قبل كدة في الجلسة دي ولا لأ
    const hasSeenEntryAd = sessionStorage.getItem('seen_entry_ad');
    
    if (!hasSeenEntryAd) {
      // فتح الإعلان في نافذة جديدة
      const adWin = window.open(ENTRY_AD_URL, '_blank');
      
      // لو المتصفح عمل بلوك للنافذة، بنحاول نفتحها لما يضغط في أي حتة كحل احتياطي
      if (!adWin) {
        const handleFirstClick = () => {
          window.open(ENTRY_AD_URL, '_blank');
          sessionStorage.setItem('seen_entry_ad', 'true');
          window.removeEventListener('click', handleFirstClick);
        };
        window.addEventListener('click', handleFirstClick);
      } else {
        // تسجيل إنه شاف الإعلان بنجاح
        sessionStorage.setItem('seen_entry_ad', 'true');
      }
    }
  }, []);

  function handleLogin(name: string) {
    localStorage.setItem(STORAGE_USER_KEY, name);
    setUserName(name);
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_USER_KEY);
    setUserName(null);
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
