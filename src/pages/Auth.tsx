import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { auth, db } from "@/integrations/firebase/client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/types";
import { ArrowRight, Mail, Lock, User, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/components/UserContext";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, loading } = useUser();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("donor");
  const [error, setError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const { toast } = useToast();

  // Redirect already authenticated users to their dashboard
  useEffect(() => {
    if (!loading && user && userRole) {
      navigate(`/${userRole}-dashboard`);
    }
  }, [user, userRole, loading, navigate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const modeParam = searchParams.get("mode");
    if (modeParam === "login" || modeParam === "register") {
      setMode(modeParam);
    }

    // Check for role parameter
    const roleParam = searchParams.get("role");
    if (
      roleParam === "donor" ||
      roleParam === "recipient" ||
      roleParam === "volunteer"
    ) {
      setRole(roleParam);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setError(null);

    try {
      if (mode === "register") {
        // Register new user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Create user profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email,
          name,
          role,
          createdAt: new Date().toISOString(),
        });

        // If user is a recipient, create recipient profile
        if (role === "recipient") {
          await setDoc(doc(db, "recipients", user.uid), {
            name,
            email,
            role,
            userId: user.uid,
            createdAt: new Date().toISOString(),
          });
        }

        // Update user display name
        await updateProfile(user, {
          displayName: name,
        });

        // Show success toast
        toast({
          title: "Account created successfully!",
          description: `Welcome to Food Connect, ${name}! Your account has been created.`,
          variant: "default",
        });

        // Redirect to appropriate dashboard based on role
        navigate(`/${role}-dashboard`);
      } else {
        // Login existing user
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Get user role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          navigate(`/${userData.role}-dashboard`);
        } else {
          throw new Error("User profile not found");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setAuthLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background with gradient and patterns */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 via-white to-brand-blue/10"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/5 via-transparent to-brand-green/5 animate-gradient"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 border border-gray-100 relative z-10"
      >
        <div>
          <div className="flex justify-center mb-6">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-green text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                FC
              </div>
              <span className="font-display font-bold text-2xl text-brand-dark group-hover:text-brand-green transition-colors">
                Food Connect
              </span>
            </Link>
          </div>
          <h2 className="text-center text-3xl font-bold text-brand-dark">
            {mode === "login" ? "Welcome Back" : "Join Our Mission"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === "login"
              ? "Sign in to your account to continue"
              : "Create a new account to start making a difference"}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {mode === "register" && (
              <>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-hover:text-brand-green transition-colors duration-300" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green focus:z-10 sm:text-sm transition-all duration-300 hover:border-brand-green/50"
                    placeholder="Full Name"
                  />
                </div>

                <div className="group">
                  <Select
                    value={role}
                    onValueChange={(value: UserRole) => setRole(value)}
                  >
                    <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-brand-green focus:border-brand-green transition-all duration-300 hover:border-brand-green/50 group-hover:border-brand-green/50">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="donor">Food Donor</SelectItem>
                      <SelectItem value="recipient">Food Recipient</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-hover:text-brand-green transition-colors duration-300" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green focus:z-10 sm:text-sm transition-all duration-300 hover:border-brand-green/50"
                placeholder="Email address"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-hover:text-brand-green transition-colors duration-300" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green focus:z-10 sm:text-sm transition-all duration-300 hover:border-brand-green/50"
                placeholder="Password"
              />
            </div>

            {mode === "login" && (
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-brand-green hover:text-brand-green/80"
                >
                  Forgot your password?
                </Link>
              </div>
            )}
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-green hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              disabled={authLoading}
            >
              {authLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  {mode === "login" ? "Sign in" : "Create Account"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <Link
                    to="/auth?mode=register"
                    className="font-medium text-brand-green hover:text-brand-green/80 transition-colors hover:underline"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    to="/auth?mode=login"
                    className="font-medium text-brand-green hover:text-brand-green/80 transition-colors hover:underline"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
