/**
 * ProtectedRoute Component
 * Wraps React components to require authentication
 * Redirects to login if not authenticated
 */

import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AuthLoader from '../auth/AuthLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // If user is not authenticated and not loading, redirect
    if (!isLoading && !isAuthenticated) {
      window.location.href = redirectTo;
    }
  }, [isAuthenticated, isLoading, redirectTo]);

  // Show loader while checking authentication
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AuthLoader className="w-16 h-16" />
      </div>
    );
  }

  return <>{children}</>;
}
