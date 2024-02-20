import { create } from "zustand";

export const useAuthTokenStore = create((set) => ({
  token: "",
  setToken: (token: string) => set({ token }),
}));
