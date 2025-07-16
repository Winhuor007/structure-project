import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (tokens: { accessToken: string; refreshToken: string }) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: Cookies.get("access_token") || null,
  refreshToken: Cookies.get("refresh_token") || null,
  setAuth: ({ accessToken, refreshToken }) => {
    Cookies.set("access_token", accessToken);
    Cookies.set("refresh_token", refreshToken);
    set({ accessToken, refreshToken });
  },
  clearAuth: () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    set({ accessToken: null, refreshToken: null });
  },
  isAuthenticated: () => !!get().accessToken,
}));

