import { create } from "zustand";

interface AuthState {
  user: any;
  accessToken: string | null;
  setCredentials: (data: { accessToken: string; user: any }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setCredentials: ({ accessToken, user }) => set({ accessToken, user }),
  logout: () => set({ user: null, accessToken: null }),
}));


