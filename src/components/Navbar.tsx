import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/components/UserContext";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
  const { user, userRole, logout } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
        variant: "default",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Function to scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to handle link clicks
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only scroll to top if it's an internal link
    if (e.currentTarget.getAttribute("href")?.startsWith("/")) {
      scrollToTop();
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center space-x-2 group"
                onClick={handleLinkClick}
              >
                <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-110">
                  FC
                </div>
                <span className="text-xl font-bold text-brand-green group-hover:text-brand-green/90 transition-colors">
                  Food Connect
                </span>
              </Link>
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              <Link
                to="/"
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                onClick={handleLinkClick}
              >
                Home
              </Link>
              <Link
                to="/how-it-works"
                className={`nav-link ${
                  isActive("/how-it-works") ? "active" : ""
                }`}
                onClick={handleLinkClick}
              >
                How It Works
              </Link>
              <Link
                to="/impact"
                className={`nav-link ${isActive("/impact") ? "active" : ""}`}
                onClick={handleLinkClick}
              >
                Our Impact
              </Link>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={`/${userRole?.toLowerCase()}-dashboard`}
                  className="nav-link"
                  onClick={handleLinkClick}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="nav-link"
                  onClick={handleLinkClick}
                >
                  Profile
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth?mode=login"
                  className="nav-link"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
                <Button
                  asChild
                  className="bg-brand-green hover:bg-brand-green/90 text-white transition-colors"
                >
                  <Link to="/auth?mode=register" onClick={handleLinkClick}>
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-green transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/")
                ? "text-brand-green bg-brand-green/10"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/how-it-works")
                ? "text-brand-green bg-brand-green/10"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={handleLinkClick}
          >
            How It Works
          </Link>
          <Link
            to="/impact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/impact")
                ? "text-brand-green bg-brand-green/10"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={handleLinkClick}
          >
            Our Impact
          </Link>
          {user ? (
            <>
              <Link
                to={`/${userRole?.toLowerCase()}-dashboard`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                onClick={handleLinkClick}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                onClick={handleLinkClick}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth?mode=login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                to="/auth?mode=register"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-brand-green hover:bg-brand-green/90"
                onClick={handleLinkClick}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
