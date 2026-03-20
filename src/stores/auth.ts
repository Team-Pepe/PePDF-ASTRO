/**
 * Authentication Store
 * Manages authentication state without external dependencies
 * Uses Observer pattern for reactive updates
 */

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthListener = (state: AuthState) => void;

class AuthStore {
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  private listeners: Set<AuthListener> = new Set();

  constructor() {
    this.restoreFromLocalStorage();
  }

  /**
   * Get current state
   */
  getState(): AuthState {
    return { ...this.state };
  }

  /**
   * Update state and notify listeners
   */
  private setState(updates: Partial<AuthState>) {
    this.state = { ...this.state, ...updates };
    this.saveToLocalStorage();
    this.notifyListeners();
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: AuthListener): () => void {
    this.listeners.add(listener);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of state change
   */
  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.getState()));
  }

  /**
   * Set user as logged in
   */
  setUser(user: User) {
    this.setState({
      user,
      isAuthenticated: true,
      error: null,
    });
  }

  /**
   * Clear user (logout)
   */
  clearUser() {
    this.setState({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  }

  /**
   * Set loading state
   */
  setLoading(isLoading: boolean) {
    this.setState({ isLoading });
  }

  /**
   * Set error
   */
  setError(error: string | null) {
    this.setState({ error });
  }

  /**
   * Check if user is authenticated
   */
  isAuthed(): boolean {
    return this.state.isAuthenticated;
  }

  /**
   * Get current user
   */
  getUser(): User | null {
    return this.state.user;
  }

  /**
   * Save state to localStorage
   */
  private saveToLocalStorage() {
    try {
      localStorage.setItem('auth_state', JSON.stringify({
        user: this.state.user,
        isAuthenticated: this.state.isAuthenticated,
      }));
    } catch (error) {
      console.warn('Failed to save auth state to localStorage:', error);
    }
  }

  /**
   * Restore state from localStorage
   */
  private restoreFromLocalStorage() {
    try {
      const saved = localStorage.getItem('auth_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = {
          ...this.state,
          user: parsed.user,
          isAuthenticated: parsed.isAuthenticated,
        };
      }
    } catch (error) {
      console.warn('Failed to restore auth state from localStorage:', error);
    }
  }

  /**
   * Reset everything (for dev/testing)
   */
  reset() {
    this.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    localStorage.removeItem('auth_state');
  }
}

// Export singleton instance
export const authStore = new AuthStore();
