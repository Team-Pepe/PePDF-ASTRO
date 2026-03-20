/**
 * AuthGuard Component
 * Verifies authentication session on app load
 * Should be placed in the root layout
 */

import { useEffect } from 'react';
import { authService } from '../../services/auth';
import { useAuthActions } from '../../hooks/useAuth';

export default function AuthGuard() {
  const { setUser, clearUser, setLoading } = useAuthActions();

  useEffect(() => {
    const verifySession = async () => {
      setLoading(true);

      try {
        // Try to get current user from backend
        const user = await authService.getCurrentUser();

        // User is authenticated
        setUser({
          id: user.id,
          email: user.email,
          username: user.username,
        });
      } catch (error) {
        // User is not authenticated or session expired
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    // Verify session on mount
    verifySession();
  }, [setUser, clearUser, setLoading]);

  return null; // This component doesn't render anything
}
