import { create } from "zustand";

export const VendorProjectCodeStore = create((set) => ({
  VendorProjectCode: {
    ProjectCode: "",
  },
  updateVendorProjectCode: (newProjectCode: any) =>
    set((state: any) => ({
      VendorProjectCode: { ...state.ProjectCode, ...newProjectCode },
    })),
}));
