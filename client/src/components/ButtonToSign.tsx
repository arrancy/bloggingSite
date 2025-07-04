import { memo, ReactNode } from "react";

interface ButtonToSignProps {
  label: string | ReactNode;
  onClick: () => void;
}

export const ButtonToSign = memo(({ label, onClick }: ButtonToSignProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl cursor-pointer bg-purple-900 text-purple-300 hover:bg-purple-700 pt-1.5 pb-2 mt-2 text-xl"
    >
      {label}
    </button>
  );
});
