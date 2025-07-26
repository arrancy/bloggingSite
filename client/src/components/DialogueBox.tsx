import { useState } from "react";
import { motion } from "motion/react";
import { useExitAnimationState } from "../store/exitAnimation";
import { ArrowRightIcon, ArrowRightLeft } from "lucide-react";

// enum Tones {
//   "casual",
//   "formal",
//   "funny",
//   "friendly",
// }
// interface CheckedBox {
//   isChecked: boolean;
//   thisOne: Tones | "";
// }
export function DialogueBox() {
  const tones = ["casual", "formal", "funny", "friendly"];

  // const [sendingTone, setSendingTone] = useState<Tones | "">("");
  // const [currentChecked, setCurrentChecked] = useState<CheckedBox>({
  //   isChecked: false,
  //   thisOne: "",
  // });
  const [checkedElementState, setCheckedElementState] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [isAnElementChecked, setIsAnElementChencked] = useState<boolean>(false);
  const { exitAnimation } = useExitAnimationState();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exitAnimation ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-purple-900 rounded-lg "
      >
        {tones.map((tone, index) => (
          <div
            className={`flex space-x-1  hover:bg-purple-800  ${
              index === 0 ? `rounded-t-lg` : ``
            }      `}
          >
            <input
              type="checkbox"
              checked={checkedElementState[index]}
              onClick={() => {
                setIsAnElementChencked(true);
                if (!(checkedElementState[index] === true)) {
                  const newArray = [];
                  for (let i = 0; i <= 3; i++) {
                    newArray.push(false);
                  }

                  newArray[index] = true;
                  setCheckedElementState(newArray);
                }
              }}
              className="outline-none border-0 rounded-lg m-2 bg-purple-100 checked:bg-purple-900"
            ></input>
            <div
              key={index}
              className={`text-sm text-slate-400 p-2  hover:cursor-pointer  
                `}
            >
              {tone}
            </div>
          </div>
        ))}
        {isAnElementChecked && (
          <div className="flex space-x-2 justify-center py-2 hover:bg-purple-800 hover:cursor-pointer group rounded-b-lg transition-all ease-in-out duration-200">
            <div className="text-sm  text-slate-100 font-semibold group-hover:scale-110 ">
              send
            </div>
            <div className="pt-0.5  group-hover:scale-120">
              <ArrowRightIcon size={16}></ArrowRightIcon>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
