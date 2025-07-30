import { createContext } from "react";
interface SelectionContextType {
  selection: string;
}
export const SelectionContext = createContext<SelectionContextType>({
  selection: "",
});
