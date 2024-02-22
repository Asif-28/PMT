import {create}  from "zustand";

export const useDataSummaryStore = create((set) => ({
  dataSummary: [],
  setDataSummary: (dataSummary: any) => set({ dataSummary }),
}));
