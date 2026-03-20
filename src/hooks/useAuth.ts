/**
 * useAuth Hook
 * React hook to use authentication store in components
 */

import { useEffect, useState } from 'react';
import { authStore, type AuthState } from '../stores/auth';

export function useAuth() {
  const [state, setState] = useState<AuthState>(authStore.getState());

  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = authStore.subscribe((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, []);

  return state;
}

/**
 * Hook for auth operations
 */
export function useAuthActions() {
  return {
    setUser: authStore.setUser.bind(authStore),
    clearUser: authStore.clearUser.bind(authStore),
    setLoading: authStore.setLoading.bind(authStore),
    setError: authStore.setError.bind(authStore),
    reset: authStore.reset.bind(authStore),
  };
}
