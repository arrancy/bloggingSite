import { ClipboardPen, NotebookPen } from "lucide-react";
import { motion } from "motion/react";

interface BlogButtonProps {
  heading: string;
  blogContent: string;
  animationDelay: number;
}

export function BlogButton({
  heading,
  blogContent,
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
        className="text-left bg-inherit mt-16 w-[70%] mx-auto"
      >
        <div className="flex justify-between w-[97%]">
          <div className="flex space-x-3 bprder border-b-3 w-fit border-b-purple-500 drop-shadow-blue-400 drop-shadow-2xl">
            <NotebookPen className="h-10 text-neutral-50 "></NotebookPen>
            <div className="text-3xl font-semibold text-green-300">
              {heading}{" "}
            </div>
          </div>
          <div className=" flex space-x-1 border-2 rounded-lg border-purple-600 px-2 pt-1 ">
            <div className="text-2xl font-semibold text-blue-200">draft</div>
            <ClipboardPen className=" h-9 text-cyan-400"> </ClipboardPen>
          </div>
        </div>

        <div className="text-cyan-700 text-xl font-medium mt-2">
          {blogContent}
        </div>
      </motion.div>
    </>
  );
}
