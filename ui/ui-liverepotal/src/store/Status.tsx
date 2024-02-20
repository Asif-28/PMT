import { create } from "zustand";

export const useStatusStore = create((set) => ({
  status: "",
  setStatus: (status: string) => set({ status }),
}));
