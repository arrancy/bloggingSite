import { useState } from "react";
import { motion } from "motion/react";
import { useExitAnimationState } from "../store/exitAnimation";

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
          <div className="flex space-x-1">
            <input
              type="checkbox"
              checked={checkedElementState[index]}
              onClick={() => {
                if (!(checkedElementState[index] === true)) {
                  const newArray = [];
                  for (let i = 0; i <= 3; i++) {
                    newArray.push(false);
                  }

                  newArray[index] = true;
                  setCheckedElementState(newArray);
                }
              }}
              className="outline-none border-0 rounded-lg"
            ></input>
            <div
              key={index}
              className={`text-sm text-slate-400 p-2 hover:bg-purple-800 hover:cursor-pointer   ${
                index === 0 ? `rounded-t-lg` : index === 3 ? `rounded-b-lg` : ``
              }      
                `}
            >
              {tone}
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
}
