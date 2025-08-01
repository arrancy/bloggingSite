import { Ban } from "lucide-react";

interface ErrorPopupProps {
  label: string;
}
export function ErrorPopup({ label }: ErrorPopupProps) {
  return (
    <div className="flex bg-slate-900 space-x-2 p-3 border-red-600 rounded-lg">
      <div className="pt-2">
        <Ban className="h-4 w-4 text-red-700"></Ban>
      </div>
      <div className="text-slate-200 font-semibold text-lg">{label}</div>
    </div>
  );
}
