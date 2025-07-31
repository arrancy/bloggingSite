import { create } from "zustand";

export type TitleOrContent = "title" | "content" | null;

interface TitleOrContentState {
  titleOrContent: TitleOrContent;
  setTitleOrContent: (newValue: TitleOrContent) => void;
}
export const useTitleOrContentState = create<TitleOrContentState>()((set) => ({
  titleOrContent: null,
  setTitleOrContent: (newValue) => set({ titleOrContent: newValue }),
}));
