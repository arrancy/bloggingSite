import { motion } from "motion/react";
import { LucideProps } from "lucide-react";
type GridItemProps = {
  title: string;
  description: string;
  iconName: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export function GridItem({ title, description, iconName }: GridItemProps) {
  const Icon = iconName;
  return (
    <>
      <div className="mt-4 sm:mt-0 px-6 sm:px-0 pb-1 sm:pb-0">
        <div className=" text-purple-300 flex justify-center space-x-1 sm:space-x-4">
          <div className="sm:text-5xl text-4xl font-bold">
            <motion.span
              initial={{
                opacity: 0,
                transform: "translateY(20px)",
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                transform: "translateY(0px)",
                filter: "blur(0px)",
              }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.3 }}
              className="inline-block"
            >
              {title}
            </motion.span>
          </div>
          <div className=" relative top-3">
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 2 }}
              className="inline-block"
            >
              {/* <Sparkles size={34}></Sparkles> */}
              <Icon className="sm:w-9 sm:h-9  w-6 h-6"></Icon>
            </motion.span>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl text-purple-400 font-medium relative sm:top-6 top-1">
          <motion.span
            className="inline-block"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 2.2 }}
          >
            {description}
          </motion.span>
        </div>
      </div>
    </>
  );
}
