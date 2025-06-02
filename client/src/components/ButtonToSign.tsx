import { memo } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface ButtonToSignProps {
  label: string;
  onClick: () => void;
  isLoading: boolean;
}

export const ButtonToSign = memo(
  ({ label, onClick, isLoading }: ButtonToSignProps) => {
    return (
      <button
        onClick={onClick}
        className="w-full rounded-xl cursor-pointer bg-purple-900 text-purple-300 hover:bg-purple-700 pt-1.5 pb-2 mt-2 text-xl"
      >
        {isLoading ? <LoadingSpinner></LoadingSpinner> : label}
      </button>
    );
  }
);
