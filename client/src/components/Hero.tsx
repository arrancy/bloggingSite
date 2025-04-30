import { PenLine } from "lucide-react";
import { Sparkles } from "lucide-react";
import { BookCheck } from "lucide-react";
import { motion } from "motion/react";
export function Hero() {
  return (
    <>
      <div className="  relative top-1/8 ">
        <div className=" text-center mx-auto">
          <motion.h1
            className="  text-8xl font-bold text-slate-300 mx-auto"
            initial={{
              transform: "translateY(50px)",
              opacity: 0,
              filter: "blur(10px)",
            }}
            animate={{
              transform: "translateX(0px)",
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.6 }}
          >
            write intelligent blogs
          </motion.h1>
          <motion.h1
            className=" text-8xl font-bold text-slate-300 mx-auto"
            initial={{
              transform: "translateY(50px)",
              opacity: 0,
              filter: "blur(10px)",
            }}
            animate={{
              transform: "translateX(0px)",
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            with AI
          </motion.h1>
          <motion.button
            initial={{
              transform: "translateY(50px)",
              opacity: 0,
              filter: "blur(10px)",
            }}
            animate={{
              transform: "translateX(0px)",
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.6, delay: 1 }}
            className=" mt-8 shadow-blue-200 text-slate-800 shadow-md text-2xl font-semibold bg-slate-200 px-4 pb-3 pt-1  cursor-pointer rounded-3xl hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out duration-200"
          >
            get started {">"}
          </motion.button>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-1 text-center mt-12">
          <div className="text-purple-300 flex justify-center space-x-4">
            <div className="text-5xl font-bold  ">
              <motion.span
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.3 }}
                className="inline-block"
              >
                create
              </motion.span>
            </div>
            <div className="relative top-3">
              <PenLine size={34}></PenLine>
            </div>
          </div>
          <div className=" text-purple-300 flex justify-center space-x-4">
            <div className="text-5xl font-bold">refine</div>
            <div className=" relative top-3">
              <Sparkles size={34}></Sparkles>
            </div>
          </div>
          <div className=" text-purple-300 flex justify-center space-x-4">
            <div className="text-5xl font-bold">publish</div>
            <div className="relative top-3">
              <BookCheck size={34}></BookCheck>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
