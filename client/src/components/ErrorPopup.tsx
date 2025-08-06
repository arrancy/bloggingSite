import { Ban } from "lucide-react";

interface ErrorPopupProps {
  label: string;
}
export function ErrorPopup({ label }: ErrorPopupProps) {
  return (
    <div className="flex bg-slate-900 space-x-2 sm:p-3 p-1 border-red-600 rounded-lg">
      <div className="sm:pt-2 pt-4">
        <Ban className="h-4 w-4 text-red-700"></Ban>
      </div>
      <div className="text-slate-200 font-semibold sm:text-lg text-md">
        {label}
      </div>
    </div>
  );
}
