import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: { id: number; name: string; email: string } | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: { id: number; name: string; email: string } | null) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  setToken: (token) => set({ token, isAuthenticated: !!token }),
  setUser: (user) => set({ user }),
  clearAuth: () => set({ token: null, user: null, isAuthenticated: false }),
}));

export default useAuthStore;