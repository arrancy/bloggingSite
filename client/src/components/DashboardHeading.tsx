import { motion } from "motion/react";

export function DashboardHeading() {
  const heading = "your blogs";
  const letters = heading.split("");

  return (
    <h2 className="text-7xl text-center  text-sky-200 font-bold">
      {letters.map((letter, index) => {
        return (
          <motion.span
            key={index}
            initial={{ filter: "blur(10px)", opacity: 0, y: 12 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        );
      })}
    </h2>
  );
}
