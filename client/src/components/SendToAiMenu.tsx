import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { DialogueBox } from "./DialogueBox";
import { useExitAnimationState } from "../store/exitAnimation";
interface SelectionPositionProps {
  x: number;
  y: number;
  selectionValue: string;
}

export function SendToAiMenu({ x, y, selectionValue }: SelectionPositionProps) {
  //   const [inputBoxOpen, setInputBoxOpen] = useState<boolean>(false);
  console.log(x, y);
  const { exitAnimation, setExitAnimation } = useExitAnimationState();
  const [isDialogueBoxOpen, setIsDialogueBoxOpen] = useState<boolean>(false);
  const [isCustonPromptOpen, setIsCustomPromptOpen] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>("");

  return isCustonPromptOpen ? (
    <div
      className=" bg-slate-800 w-fit rounded-lg p-2  "
      style={{ position: "absolute", top: `${y}px`, left: `${x}px` }}
    >
      <textarea
        className="border-0 resize-none field-sizing-content text-lg font-light placeholder:text-slate-600 rounded-lg p-3 w-80 outline-none text-slate-300 tracking-wide "
        placeholder="eg: make this text more persuasive"
        value={customPrompt}
        onChange={(event) => {
          setCustomPrompt(event.target.value);
        }}
      ></textarea>
      <div className="flex justify-between py-1 px-1">
        <button
          className="bg-slate-300 text-slate-900 rounded-lg text-sm hover:bg-slate-600 p-2 cursor-pointer transition-all ease-in-out duration-100"
          onClick={() => {
            setIsCustomPromptOpen(false);
          }}
        >
          cancel
        </button>
        <button className="bg-slate-100 p-2 rounded-2xl hover:cursor-pointer hover:bg-slate-200 group">
          <ArrowUpRight className="text-slate-800 h-5 w-5 group-hover:rotate-45 group-hover:scale-110 transition-all ease-in-out duration-100"></ArrowUpRight>
        </button>
      </div>
    </div>
  ) : (
    <div
      className={`flex text-slate-300  w-fit  `}
      style={{ position: "absolute", top: `${y}px`, left: `${x}px` }}
    >
      <button
        className="text-md p-3 h-12 max-h-12 bg-blue-950 cursor-pointer border-l border-r-2 border-r-slate-900 border-blue-950 rounded-l-lg hover:bg-blue-950/80"
        onClick={() => {
          setIsCustomPromptOpen(true);
        }}
      >
        custom prompt
      </button>
      <div>
        <button
          className="text-md p-3  bg-blue-950 border-r border-blue-950 rounded-r-lg hover:bg-blue-950/80 cursor-pointer"
          onClick={() => {
            if (isDialogueBoxOpen && !exitAnimation) {
              setExitAnimation(true);
            }
            setTimeout(
              () => {
                setIsDialogueBoxOpen(!isDialogueBoxOpen);
                setExitAnimation(false);
              },
              isDialogueBoxOpen ? 400 : 0
            );
          }}
        >
          tone
        </button>

        {isDialogueBoxOpen && <DialogueBox />}
      </div>
    </div>
  );
}
