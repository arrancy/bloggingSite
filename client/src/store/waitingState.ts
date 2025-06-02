import { create } from "zustand";
type WaitingState = {
  isWaiting: boolean;
  setWaiting: (newWaitingValue: boolean) => void;
};
export const useWaitingState = create<WaitingState>()((set) => ({
  isWaiting: false,
  setWaiting: (newWaitingValue) => set({ isWaiting: newWaitingValue }),
}));
