import { create } from "zustand";

export const ProjectCodeStore = create((set) => ({
  ProjectCode: {
    ProjectCode: "",
  },
  updateProjectCode: (newProjectCode: any) =>
    set((state: any) => ({
      ProjectCode: { ...state.ProjectCode, ...newProjectCode },
    })),
}));
