import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import DonorDashboard from "@/components/DonorDashboard";
import RecipientDashboard from "@/components/RecipientDashboard";
import VolunteerDashboard from "@/components/VolunteerDashboard";
import HowItWorks from "@/pages/HowItWorks";
import Impact from "@/pages/Impact";
import Blog from "@/pages/Blog";
import FAQ from "@/pages/FAQ";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import { UserProvider } from "@/components/UserContext";
import LogoutHandler from "@/components/LogoutHandler";
import { useUser } from "@/components/UserContext";
import PageLayout from "@/components/PageLayout";
import ScrollToTop from "@/components/ScrollToTop";

// Protected Route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, userRole } = useUser();

  if (!user) {
    return <Navigate to="/auth?mode=login" />;
  }

  return <>{children}</>;
}

// Role-based redirect component
function RoleBasedRedirect() {
  const { userRole } = useUser();

  if (userRole === "donor") {
    return <Navigate to="/donor-dashboard" />;
  } else if (userRole === "recipient") {
    return <Navigate to="/recipient-dashboard" />;
  } else if (userRole === "volunteer") {
    return <Navigate to="/volunteer-dashboard" />;
  }

  return <Navigate to="/" />;
}

export default function App() {
  return (
    <Router>
      <UserProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/donor-dashboard"
              element={
                <ProtectedRoute>
                  <DonorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipient-dashboard"
              element={
                <ProtectedRoute>
                  <RecipientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/volunteer-dashboard"
              element={
                <ProtectedRoute>
                  <VolunteerDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/TermsOfService" element={<TermsOfService />} />
            <Route path="/dashboard" element={<RoleBasedRedirect />} />
          </Routes>
          <LogoutHandler />
          <Footer />
        </div>
        <Toaster />
      </UserProvider>
    </Router>
  );
}
