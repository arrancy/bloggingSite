import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function SendToAiMenu() {
  //   const [inputBoxOpen, setInputBoxOpen] = useState<boolean>(false);
  const [exitAnimation, setExitAnimation] = useState<boolean>(false);
  const [isDialogueBoxOpen, setIsDialogueBoxOpen] = useState<boolean>(false);
  const [isCustonPromptOpen, setIsCustomPromptOpen] = useState<boolean>(false);
  const tones = ["casual", "formal", "funny", "friendly"];
  return isCustonPromptOpen ? (
    <div className=" bg-slate-800 w-fit rounded-lg p-2">
      <textarea
        className="border-0 resize-none text-md font-light placeholder:text-slate-600 rounded-lg p-3 w-74 outline-none text-slate-300 tracking-wide "
        placeholder="eg: make this text more persuasive"
      ></textarea>
      <div className="flex space-x-2">
        <button className="bg-slate-300 text-slate-900 rounded-lg text-sm hover:bg-slate-600 p-2 cursor-pointer transition-all ease-in-out duration-100">
          cancel
        </button>
        <button className="bg-slate-100 p-2 rounded-2xl hover:cursor-pointer hover:bg-slate-200 group">
          <ArrowUpRight className="text-slate-800 h-4 w-4 group-hover:rotate-45 group-hover:scale-110 transition-all ease-in-out duration-100"></ArrowUpRight>
        </button>
      </div>
    </div>
  ) : (
    <div className="flex text-slate-300  w-fit ">
      <button
        className="text-md p-3 h-12 max-h-12 bg-blue-950 cursor-pointer border-l border-r-2 border-r-slate-900 border-blue-950 rounded-l-lg hover:bg-blue-950/80"
        onClick={() => {
          setIsCustomPromptOpen(true);
        }}
      >
        custom prompt
      </button>
      <div>
        <button
          className="text-md p-3  bg-blue-950 border-r border-blue-950 rounded-r-lg hover:bg-blue-950/80 cursor-pointer"
          onClick={() => {
            if (isDialogueBoxOpen && !exitAnimation) {
              setExitAnimation(true);
            }
            setTimeout(
              () => {
                setIsDialogueBoxOpen(!isDialogueBoxOpen);
                setExitAnimation(false);
              },
              isDialogueBoxOpen ? 400 : 0
            );
          }}
        >
          tone
        </button>

        {isDialogueBoxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: exitAnimation ? 0 : 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-purple-900 rounded-lg"
          >
            {tones.map((tone, index) => (
              <div
                key={index}
                className={`text-sm text-slate-400 p-2 hover:bg-purple-800 hover:cursor-pointer      
                `}
              >
                {tone}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
