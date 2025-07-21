import { Navigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import useAuthentication from "../utils/amIAuthenticated";
import { LoaderPage } from "./LoaderPage";
import { useEffect, useRef, useState } from "react";
import { SendToAiMenu } from "../components/SendToAiMenu";
interface SelectionPosition {
  x: number;
  y: number;
}
export default function CreateBlog() {
  const { isChecking, isLoggedIn } = useAuthentication();
  const [selection, setSelection] = useState<string>("");
  const [selectionPosition, setSelectionPosition] = useState<SelectionPosition>(
    { x: 0, y: 0 }
  );
  const selectionRef = useRef<string>("");
  useEffect(() => {
    selectionRef.current = selection;
  });
  const inputRef = useRef<HTMLDivElement>(null);

  return isChecking ? (
    <LoaderPage />
  ) : isLoggedIn ? (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-950 to-fuchsia-950 px-[15%] pt-8 pb-16">
      <Navbar></Navbar>
      <div>
        <div
          ref={inputRef}
          onSelect={() => {
            const selectionString = window.getSelection()?.toString() ?? "";
            setSelection(selectionString);
          }}
          onMouseUp={(event) => {
            console.log("mouse upped");

            const { clientX, clientY } = event;
            setSelectionPosition({ x: clientX, y: clientY });
            console.log(selectionPosition);
          }}
          onMouseDown={() => {
            setSelection("");
          }}
          className=" w-full mx-auto mt-24  shadow-md rounded-2xl  bg-fuchsia-950/40 backdrop-blur-xl border-2 border-purple-950 focus-within:shadow-sky-500 transition-shadow ease-in-out duration-200"
        >
          <div className="w-full  px-4 rounded-lg  pt-4 ">
            <textarea
              className="w-full resize-none field-sizing-content py-3 focus:outline-none  text-4xl bg-transparent font-bold  text-purple-200  placeholder-purple-900 tracking-wide   "
              placeholder="enter your title here..."
            ></textarea>
          </div>
          <div className="   px-5 mt-1  rounded-lg  ">
            <textarea
              className="  resize-none w-full field-sizing-content py-2 text-xl tracking-wide  font-light text-slate-100 placeholder-purple-700/40  focus:outline-none "
              placeholder="enter your blog text here..."
            ></textarea>
          </div>

          <button className="bg-fuchsia-900 font-semibold w-18 ml-[92%] mb-3.5 h-12 border-2 border-fuchsia-300 text-lg px-3 rounded-xl mt-1 cursor-pointer hover:bg-fuchsia-900/70 hover:border-fuchsia-400/20 text-fuchsia-300 ">
            done
          </button>
        </div>
      </div>
      {selection && (
        <SendToAiMenu
          x={selectionPosition.x}
          y={selectionPosition.y}
          selectionValue={selectionRef.current}
        ></SendToAiMenu>
      )}
      <div className=" border-2 border-amber-200 text-2xl text-white ">
        {selection}
      </div>
    </div>
  ) : (
    <Navigate to="/signin"></Navigate>
  );
}
