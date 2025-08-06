import { PenLine } from "lucide-react";
import { BookCheck } from "lucide-react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { GridItem } from "./GridItem";
import { useNavigate } from "react-router-dom";
export function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <div className=" sm:mt-16 mt-6.5 ">
        <div className=" text-center mx-auto">
          <motion.h1
            className="  sm:text-8xl text-6xl font-bold text-slate-300 mx-auto"
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
            className=" sm:text-8xl text-6xl font-bold text-slate-300 mx-auto"
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
            onClick={() => {
              navigate("/createblog");
            }}
            className=" mt-8 shadow-slate-400 text-slate-800 shadow-md text-2xl font-semibold bg-slate-200 px-4 pb-3 pt-1  cursor-pointer rounded-3xl active:scale-90 hover:shadow-lg hover:shadow-slate-400 transition-all ease-in-out duration-200"
          >
            get started {">"}
          </motion.button>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-1 text-center sm:mt-12 mt-3">
          <GridItem
            title="create"
            description="create new blogs on anything that you like"
            iconName={PenLine}
          ></GridItem>
          <GridItem
            title="refine"
            description="refine your blogs with the power of AI"
            iconName={Sparkles}
          ></GridItem>
          <GridItem
            title="publish"
            description="publish your blogs for the world to see"
            iconName={BookCheck}
          ></GridItem>
        </div>
      </div>
    </>
  );
}
