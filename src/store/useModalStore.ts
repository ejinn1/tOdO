import { create } from "zustand";

type ModalType = "addTodo" | null;

interface ModalState {
  activeModal: ModalType;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  openModal: (modalType: ModalType) => set({ activeModal: modalType }),
  closeModal: () => set({ activeModal: null }),
}));
