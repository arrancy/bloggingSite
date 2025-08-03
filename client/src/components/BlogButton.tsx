import { ClipboardPen, NotebookPen } from "lucide-react";
import { motion } from "motion/react";

interface BlogButtonProps {
  heading: string;
  animationDelay: number;
  isDraft: boolean;
}

export function BlogButton({
  heading,
  isDraft,
  animationDelay,
}: BlogButtonProps) {
  return (
    <>
      <motion.div
        initial={{ x: -24, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          default: {
            type: "spring",
            duration: 0.6,
            bounce: 0.5,
            delay: animationDelay,
          },
          opacity: { ease: "easeIn", duration: 0.2, delay: animationDelay },
        }}
        className="text-left bg-inherit mt-16 w-[80%] mx-auto p-2 rounded-lg  hover:bg-violet-900/30"
      >
        <div className="flex justify-between w-[97%]">
          <div className="flex space-x-3  w-fit  drop-shadow-2xl">
            <div className="shrink-0 pt-2">
              <NotebookPen
                // size={30}
                className="max-h-7 max-w-7 h-7 w-7 text-neutral-50 "
              ></NotebookPen>
            </div>
            <div className="text-3xl font-semibold text-green-300">
              {heading}
            </div>
          </div>
          <div
            className={`flex space-x-1 border-2 rounded-lg border-purple-600 px-2 pt-1 max-h-12 ${
              isDraft ? `visible` : `hidden`
            } `}
          >
            <div className="text-2xl font-semibold text-blue-200">draft</div>
            <ClipboardPen className=" h-9 text-cyan-400"> </ClipboardPen>
          </div>
        </div>
      </motion.div>
    </>
  );
}
