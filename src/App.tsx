import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LearningStyleQuiz from "./components/LearningStyleQuiz";
import Navbar from "./components/Navbar";
import ChatWithAI from "./components/ChatWithAI";
import ImageAnalysis from "./components/ImageAnalysis";
import Roadmap from "./components/Roadmap";
import Profile from "./components/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quiz" element={<LearningStyleQuiz />} />
            <Route path="/chat" element={<ChatWithAI />} />
            <Route path="/image-analysis" element={<ImageAnalysis />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;