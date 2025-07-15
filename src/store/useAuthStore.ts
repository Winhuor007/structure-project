// import { create } from "zustand";
// import Cookies from "js-cookie";

// interface AuthState {
//   accessToken: string | null;
//   login: (token: string) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   accessToken: Cookies.get("access_token") || null,
//   login: (token) => {
//     Cookies.set("access_token", token);
//     set({ accessToken: token });
//   },
//   logout: () => {
//     Cookies.remove("access_token");
//     set({ accessToken: null });
//   },
// }));

// import { create } from 'zustand';
// import Cookies from 'js-cookie';

// interface AuthState {
//   accessToken: string | null;
//   setAccessToken: (token: string) => void;
//   clearAuth: () => void;
//   isAuthenticated: () => boolean;
// }

// export const useAuthStore = create<AuthState>((set, get) => ({
//   accessToken: Cookies.get('access_token') || null,
//   setAccessToken: (token: string) => {
//     Cookies.set('access_token', token);
//     set({ accessToken: token });
//   },
//   clearAuth: () => {
//     Cookies.remove('access_token');
//     set({ accessToken: null });
//   },
//   isAuthenticated: () => !!get().accessToken,
// }));

// store/useAuthStore.ts
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

