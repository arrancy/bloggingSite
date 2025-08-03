import { Check } from "lucide-react";

export function SuccessfulPopup({ label }: { label: string }) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex items-center space-x-2 px-2 py-3 rounded-lg bg-slate-800 z-20">
        <div>
          <Check className="text-green-500 text-xl"></Check>
        </div>
        <div className="text-xl font-semibold text-slate-200">{label}</div>
      </div>
    </div>
  );
}
