import { ReactNode } from "react";
import { useUser } from "@/components/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  error?: string | null;
  loading?: boolean;
  stats?: {
    label: string;
    value: number;
    icon?: ReactNode;
  }[];
}

export function DashboardLayout({
  children,
  title,
  description,
  error,
  loading,
  stats,
}: DashboardLayoutProps) {
  const { user } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-dark mb-2">{title}</h1>
            {description && <p className="text-gray-600">{description}</p>}
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <Avatar className="h-10 w-10 mr-3 border-2 border-brand-green">
              <AvatarFallback className="bg-brand-green text-white">
                {user?.displayName?.charAt(0) || user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-brand-green font-semibold">
                {user?.displayName || user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role || "User"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center space-x-2 border border-red-200"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {stats && stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.label}
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-brand-green/10 flex items-center justify-center">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-brand-dark">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
