import { motion } from "motion/react";

export function Hero() {
  return (
    <>
      <div className="  relative top-1/4">
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
      </div>
    </>
  );
}
