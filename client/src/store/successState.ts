import { create } from "zustand";
interface SuccessState {
  successMessage: string;
  setSuccessMessage: (newSuccessMessage: string) => void;
}

export const useSuccessState = create<SuccessState>()((set) => ({
  successMessage: "",
  setSuccessMessage: (newSuccessMessage) =>
    set({ successMessage: newSuccessMessage }),
}));
