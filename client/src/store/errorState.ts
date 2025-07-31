import { create } from "zustand";

interface ErrorState {
  errorMessage: string;
  setErrorMessage: (newErrorMessage: string) => void;
}

export const useErrorState = create<ErrorState>()((set) => ({
  errorMessage: "",
  setErrorMessage: (newErrorMessage) => set({ errorMessage: newErrorMessage }),
}));
