import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { FeatureFlagProvider } from "@/contexts/FeatureFlagContext";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

// Critical path - loaded immediately
import Portfolio from "./pages/Portfolio";

// Non-critical pages - lazy loaded for code splitting
const Index = lazy(() => import("./pages/Index"));
const Article = lazy(() => import("./pages/Article"));
const Wellness = lazy(() => import("./pages/Wellness"));
const Travel = lazy(() => import("./pages/Travel"));
const Creativity = lazy(() => import("./pages/Creativity"));
const Growth = lazy(() => import("./pages/Growth"));
const About = lazy(() => import("./pages/About"));
const Authors = lazy(() => import("./pages/Authors"));
const Contact = lazy(() => import("./pages/Contact"));
const StyleGuide = lazy(() => import("./pages/StyleGuide"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Chat = lazy(() => import("./pages/Chat"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

// Animated routes component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/chat" element={<PageTransition><Chat /></PageTransition>} />
        <Route path="/article/:id" element={<PageTransition><Article /></PageTransition>} />
        <Route path="/wellness" element={<PageTransition><Wellness /></PageTransition>} />
        <Route path="/travel" element={<PageTransition><Travel /></PageTransition>} />
        <Route path="/creativity" element={<PageTransition><Creativity /></PageTransition>} />
        <Route path="/growth" element={<PageTransition><Growth /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/authors" element={<PageTransition><Authors /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/style-guide" element={<PageTransition><StyleGuide /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FeatureFlagProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </FeatureFlagProvider>
  </QueryClientProvider>
);

export default App;
