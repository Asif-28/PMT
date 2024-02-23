import { create } from "zustand";

export const useProjectCodeStore = create((set) => ({
  project_code: "",
  setProjectCode: (project_code: string) => set({ project_code }),
}));
