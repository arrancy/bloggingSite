import { useState } from "react";
import { motion } from "motion/react";
import { useExitAnimationState } from "../store/exitAnimation";

enum Tones {
  "casual",
  "formal",
  "funny",
  "friendly",
}
export function DialogueBox() {
  const tones = ["casual", "formal", "funny", "friendly"];

  const [sendingTone, setSendingTone] = useState<Tones | "">("");
  const { exitAnimation } = useExitAnimationState();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exitAnimation ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-purple-900 rounded-lg "
      >
        {tones.map((tone, index) => (
          <div className="flex">
            <input
              type="checkbox"
              className="outline-none border-0 rounded-lg"
            ></input>
            <div
              key={index}
              className={`text-sm text-slate-400 p-2 hover:bg-purple-800 hover:cursor-pointer   ${
                index === 0 ? `rounded-t-lg` : index === 3 ? `rounded-b-lg` : ``
              }      
                `}
            >
              {tone}
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
}
