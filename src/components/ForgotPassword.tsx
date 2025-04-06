import { useState } from "react";
import { auth } from "@/integrations/firebase/client";
import { sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!email) {
        throw new Error("Email is required");
      }

      await sendPasswordResetEmail(auth, email);

      setSuccess(true);
      toast({
        title: "Password reset email sent",
        description: "Check your email for instructions to reset your password",
        variant: "default",
      });
    } catch (err) {
      console.error("Error sending password reset email:", err);
      setError(
        err instanceof Error ? err.message : "Failed to send reset email"
      );

      toast({
        title: "Error",
        description: "Failed to send password reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background with gradient and patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 via-white to-brand-blue/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/5 via-transparent to-brand-green/5 animate-gradient"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
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
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-5 rounded-md flex flex-col items-center text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
            <h3 className="text-lg font-medium">Email Sent!</h3>
            <p className="mt-1">
              We've sent password reset instructions to {email}. Please check
              your inbox.
            </p>
            <Button asChild className="mt-4">
              <Link to="/auth">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to login
              </Link>
            </Button>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
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
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green"
              >
                {loading ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <Link
                to="/auth"
                className="inline-flex items-center font-medium text-sm text-brand-green hover:text-brand-green/80"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to login
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
