import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/components/UserContext';

// List of protected routes that require authentication
const protectedRoutes = [
  '/donor-dashboard',
  '/recipient-dashboard',
  '/volunteer-dashboard',
  '/donate',
  '/receive'
];

export default function LogoutHandler() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && protectedRoutes.includes(location.pathname)) {
      navigate('/auth?mode=register');
    }
  }, [user, navigate, location]);

  return null;
} 