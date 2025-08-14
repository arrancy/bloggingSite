import { create } from "zustand";

interface DeletePopupState {
  deleteId: number | null;
  setDeleteId: (newDeleteId: number | null) => void;
  isDeletePopupActive: boolean;
  setIsDeletePopupActive: (newDeletePopupState: boolean) => void;
}
export const useDeletePopupState = create<DeletePopupState>()((set) => ({
  deleteId: null,
  setDeleteId: (newDeleteId: number | null) => set({ deleteId: newDeleteId }),
  isDeletePopupActive: false,
  setIsDeletePopupActive: (newDeletePopupState) =>
    set({ isDeletePopupActive: newDeletePopupState }),
}));
