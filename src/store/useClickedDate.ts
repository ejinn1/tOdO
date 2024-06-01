import { create } from "zustand";

interface ClickedDateStore {
  clickedDate: Date;
  setClickedDate: (date: Date) => void;
}

export const useClickedDate = create<ClickedDateStore>((set) => ({
  clickedDate: new Date(),
  setClickedDate: (clickedDate) => set({ clickedDate }),
}));
