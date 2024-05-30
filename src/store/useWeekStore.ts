import { create } from "zustand";

interface WeekStore {
  week: Date[];
  setWeek: (week: Date[]) => void;
}

export const useWeekStore = create<WeekStore>((set) => ({
  week: [],
  setWeek: (week) => set({ week }),
}));
