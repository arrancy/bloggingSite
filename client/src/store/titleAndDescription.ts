import { create } from "zustand";
interface TitleAndContentState {
  title: string;
  setTitle: (newTitleValue: string) => void;
  content: string;
  setContent: (newContentValue: string) => void;
}

export const useTitleAndContentState = create<TitleAndContentState>()(
  (set) => ({
    title: "",
    setTitle: (newTitleValue) => set({ title: newTitleValue }),
    content: "",
    setContent: (newContentValue) => set({ content: newContentValue }),
  })
);
