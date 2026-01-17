import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import MedicalReports from "@/pages/MedicalReports";
import FoodRecognition from "@/pages/FoodRecognition";
import HabitTracker from "@/pages/HabitTracker";
import DiseaseRecognition from "@/pages/DiseaseRecognition";
import PatientManagement from "@/pages/PatientManagement";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<PatientManagement />} />
            <Route path="/medical-reports" element={<MedicalReports />} />
            <Route path="/food-recognition" element={<FoodRecognition />} />
            <Route path="/habit-tracker" element={<HabitTracker />} />
            <Route path="/disease-recognition" element={<DiseaseRecognition />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
