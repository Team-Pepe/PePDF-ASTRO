/**
 * Authentication Service
 * Handles all HTTP requests to the backend authentication API
 * Uses credentials: 'include' to automatically send/receive cookies
 */

const API_URL = import.meta.env.PUBLIC_API_URL;
const API_TIMEOUT = parseInt(import.meta.env.PUBLIC_API_TIMEOUT || '10000', 10);

if (!API_URL) {
  throw new Error('Missing PUBLIC_API_URL. Configure it in environment variables.');
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  id: string;
  email: string;
  username: string;
  message?: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: AuthResponse;
}

interface ErrorResponse {
  detail: string | { msg: string }[];
}

class AuthService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_URL;
    this.timeout = API_TIMEOUT;
  }

  /**
   * Set a timeout for fetch requests
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      // Inject Authorization header manually if token exists in localStorage
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      const headers = new Headers(options.headers || {});
      
      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
        credentials: 'omit', // Stop relying on Docker cookie passing, use explicit header
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): never {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }

    if (error instanceof TypeError) {
      throw new Error('Network error - unable to connect to backend');
    }

    throw error;
  }

  /**
   * User login
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const error = (await response.json()) as ErrorResponse;
        throw new Error(
          typeof error.detail === 'string'
            ? error.detail
            : 'Login failed',
        );
      }

      const data = (await response.json()) as LoginResponse;
      
      // Save tokens directly to local storage to bypass cookie issues
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
      }

      return data.user;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * User registration
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = (await response.json()) as ErrorResponse;
        throw new Error(
          typeof error.detail === 'string'
            ? error.detail
            : 'Registration failed',
        );
      }

      return await response.json();
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get current user info
   */
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/auth/me`, {
        method: 'GET',
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Not authenticated');
        }
        throw new Error('Failed to fetch user info');
      }

      return await response.json();
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired');
        }
        throw new Error('Failed to refresh token');
      }

      return await response.json();
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * User logout
   */
  async logout(): Promise<void> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
      });

      if (!response.ok) {
        console.warn('Logout returned non-OK status, but continuing...');
      }
    } catch (error) {
      console.warn('Logout error:', error);
      // Continue with logout even if request fails
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
