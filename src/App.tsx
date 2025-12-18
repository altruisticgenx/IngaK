import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FeatureFlagProvider } from "@/contexts/FeatureFlagContext";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FeatureFlagProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/blog" element={<Index />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/article/:id" element={<Article />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/creativity" element={<Creativity />} />
              <Route path="/growth" element={<Growth />} />
              <Route path="/about" element={<About />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/style-guide" element={<StyleGuide />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </FeatureFlagProvider>
  </QueryClientProvider>
);

export default App;
