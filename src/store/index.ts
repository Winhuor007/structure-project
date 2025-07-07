import { create } from "zustand";
import Cookies from "js-cookie";

export interface AuthState {
  accessToken: string;
  refreshToken: string;
  name: string;
  username: string;
  setAuth: (payload: { accessToken: string; refreshToken: string; name: string; username: string }) => void;
  logout: () => void;
}


import type { ApiItem } from "@/features/api/interface";
interface SubscriptionState {
  subscribedApis: ApiItem[];
  subscribe: (api: ApiItem) => void;
  unsubscribe: (apiId: string) => void;
  clearSubscriptions: () => void;
  isSubscribed: (apiId: string) => boolean;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscribedApis: [],

  subscribe: (api) => {
    const exists = get().subscribedApis.some((item) => item.id === api.id);
    if (exists) return;
    set((state) => ({
      subscribedApis: [...state.subscribedApis, api],
    }));
  },

  unsubscribe: (apiId) =>
    set((state) => ({
      subscribedApis: state.subscribedApis.filter((item) => item.id !== apiId),
    })),

  clearSubscriptions: () => set({ subscribedApis: [] }),

  isSubscribed: (apiId) => {
    return get().subscribedApis.some((item) => item.id === apiId);
  },
}));



export const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get("accessToken") || "",
  refreshToken: Cookies.get("refreshToken") || "",
  name: Cookies.get("name") || "",
  username: Cookies.get("username") || "",

  setAuth: ({ accessToken, refreshToken, name, username }) => {
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
    Cookies.set("name", name);
    Cookies.set("username", username);
    set({ accessToken, refreshToken, name, username });
  },

  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("name");
    Cookies.remove("username");
    set({ accessToken: "", refreshToken: "", name: "", username: "" });
  },

  // ✅ Add this
  hydrateFromCookies: () => {
    set({
      accessToken: Cookies.get("accessToken") || "",
      refreshToken: Cookies.get("refreshToken") || "",
      name: Cookies.get("name") || "",
      username: Cookies.get("username") || "",
    });
  },
}));

