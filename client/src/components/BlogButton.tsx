import { ClipboardPen, NotebookPen } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useTitleAndContentState } from "../store/titleAndDescription";

interface BlogButtonProps {
  heading: string;
  animationDelay: number;
  id: number;
  isDraft: boolean;
  content?: string;
}

export function BlogButton({
  heading,
  isDraft,
  id,
  content,
  animationDelay,
}: BlogButtonProps) {
  const navigate = useNavigate();
  const { setTitle, setContent } = useTitleAndContentState();
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
        onClick={
          isDraft
            ? () => {
                if (!content) {
                  return;
                }
                navigate("/createBlog?id=" + id);
                setTitle(heading);
                setContent(content);
              }
            : () => navigate("/blog?id=" + id)
        }
        className="text-left sm:bg-inherit sm:mt-16  mt-6 sm:w-[80%] w-[97%] mx-auto p-2 rounded-lg cursor-pointer bg-violet-900/30 hover:bg-violet-900/70 sm:hover:bg-violet-900/30 "
      >
        <div className="flex justify-between w-[97%] ">
          <div className="flex space-x-3  w-fit  drop-shadow-2xl">
            <div className="shrink-0 pt-2">
              <NotebookPen
                // size={30}
                className="sm:h-7 sm:w-7 h-5 w-5 text-neutral-50 "
              ></NotebookPen>
            </div>
            <div className="sm:text-3xl text-xl  font-semibold text-green-300">
              {heading}
            </div>
          </div>
          <div
            className={`flex space-x-1 border-2 rounded-lg  border-purple-600 px-2 pt-1 sm:max-h-12 max-h-10 ${
              isDraft ? `visible` : `hidden`
            } `}
          >
            <div className="sm:text-2xl text-xl font-semibold text-blue-200">
              draft
            </div>
            <div className="pt-1 sm:pt-0">
              <ClipboardPen className=" sm:h-9 h-5  text-cyan-400"></ClipboardPen>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
