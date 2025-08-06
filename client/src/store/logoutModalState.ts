import { create } from "zustand";

interface LogoutModalState {
  isLogoutModalActive: boolean;
  setIsLogoutModalActive: (newValue: boolean) => void;
}
export const useLogoutModalState = create<LogoutModalState>()((set) => ({
  isLogoutModalActive: false,
  setIsLogoutModalActive: (newValue) => set({ isLogoutModalActive: newValue }),
}));
