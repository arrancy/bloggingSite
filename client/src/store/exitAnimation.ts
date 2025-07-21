import { create } from "zustand";

type ExitAnimationState = {
  exitAnimation: boolean;
  setExitAnimation: (newExitAnimation: boolean) => void;
};
export const useExitAnimationState = create<ExitAnimationState>()((set) => ({
  exitAnimation: false,
  setExitAnimation: (newExitAnimation) =>
    set({ exitAnimation: newExitAnimation }),
}));
