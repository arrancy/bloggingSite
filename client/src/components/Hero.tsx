import { PenLine } from "lucide-react";
import { BookCheck } from "lucide-react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { GridItem } from "./GridItem";
import { useNavigate } from "react-router-dom";
import writeText from "./../assets/writeText.png";
import tone from "./../assets/tone.png";
import customPrompt from "./../assets/customPrompt.png";
import menu from "../assets/menu.png";
import { GradientHeading } from "./GradientHeading";
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
        <div className="mt-16">
          <motion.div
            initial={{
              opacity: 0,
              transform: "translateY(30px)",
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              transform: "translateY(0px)",
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.3, delay: 2.8 }}
            className="sm:text-6xl text-4xl text-violet-950 font-bold text-center  pt-4 pb-6 rounded-xl sm:w-[70%] mx-auto bg-gradient-to-r from-purple-600  to-fuchsia-400"
          >
            Empower your blogs
          </motion.div>
          <motion.div
            initial={{ opacity: 0, transform: "translateY(30px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <GradientHeading label="Write your text"></GradientHeading>
            <div className="border-1 shadow-lg rounded-lg overflow-clip p-4 sm:mt-8 mt-2 shadow-fuchsia-300">
              <img src={writeText}></img>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, transform: "translateY(30px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <GradientHeading label="Select the text to refine"></GradientHeading>
            <div className="border-1  shadow-lg rounded-lg overflow-clip p-4 sm:mt-8 mt-2 shadow-fuchsia-300">
              <img
                className="rounded-lg sm:h-auto sm:w-auto h-26 w-56 mx-auto"
                src={menu}
              ></img>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, transform: "translateY(30px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <GradientHeading label="choose any option"></GradientHeading>
            <div className="border-1 shadow-lg flex items-center justify-center sm:space-x-22 space-x-8 rounded-lg overflow-clip p-4 sm:mt-8 mt-3 shadow-fuchsia-300">
              <img
                className="rounded-lg h-30 sm:h-50 sm:w-[60%]"
                src={customPrompt}
              ></img>
              <img className="rounded-lg h-30  sm:h-70" src={tone}></img>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
