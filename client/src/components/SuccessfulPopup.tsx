import { Check } from "lucide-react";
import { motion } from "motion/react";
export function SuccessfulPopup({ label }: { label: string }) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-20">
      <div className="flex items-center space-x-2 px-2 py-3 rounded-lg bg-slate-800">
        <div>
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="inline-block"
          >
            <Check className="text-green-500 sm:text-xl text-lg pt-2"></Check>
          </motion.span>
        </div>
        <div className="sm:text-xl text-lg font-semibold text-slate-200">
          {label}
        </div>
      </div>
    </div>
  );
}
