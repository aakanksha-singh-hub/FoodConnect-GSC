
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

type ProtectedRouteProps = {
  children: ReactNode;
  userType?: 'donor' | 'recipient';
};

const ProtectedRoute = ({ children, userType }: ProtectedRouteProps) => {
  const { user, profile, isLoading } = useUser();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  // If not logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If userType is specified, check if the user has the correct type
  if (userType && profile && profile.user_type !== userType) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
