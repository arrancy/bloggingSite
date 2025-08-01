import { Navigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import useAuthentication from "../utils/amIAuthenticated";
import { LoaderPage } from "./LoaderPage";
import { useEffect, useRef, useState } from "react";
import { SendToAiMenu } from "../components/SendToAiMenu";
import { SelectionContext } from "../utils/SelectionContext";
import { useTitleAndContentState } from "../store/titleAndDescription";
import { useWaitingState } from "../store/waitingState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useTitleOrContentState } from "../store/titleOrContentState";
import { useErrorState } from "../store/errorState";
import { ErrorPopup } from "../components/ErrorPopup";
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
  const { isWaiting } = useWaitingState();
  const { title, content, setTitle, setContent } = useTitleAndContentState();
  const { titleOrContent, setTitleOrContent } = useTitleOrContentState();
  const { errorMessage } = useErrorState();
  const inputRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [titleDivHeight, setTitleDivHeight] = useState<number>(0);
  const [contentDivHeight, setContentHeight] = useState<number>(0);
  useEffect(() => {
    if (titleOrContent === "content") {
      if (contentRef.current) {
        const currentDivHeight = contentRef.current.offsetHeight;
        setContentHeight(currentDivHeight);
      }
    }
    if (titleOrContent === "title") {
      if (titleRef.current) {
        const currentTitleHeight = titleRef.current.offsetHeight;
        setTitleDivHeight(currentTitleHeight);
      }
    }
  }, [isWaiting, titleOrContent]);
  useEffect(() => {
    selectionRef.current = selection;
  });
  return isChecking ? (
    <LoaderPage />
  ) : isLoggedIn ? (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-950 to-fuchsia-950 px-[15%] pt-8 pb-16">
      <Navbar></Navbar>
      <div>
        <div
          ref={inputRef}
          onSelect={() => {
            const selectionObject = window.getSelection();
            if (!selectionObject) {
              return;
            }
            const selectionString = selectionObject.toString();

            const { anchorNode, focusNode } = selectionObject;

            if (focusNode === titleRef.current) {
              setTitleOrContent("title");
            }
            if (focusNode === contentRef.current) {
              setTitleOrContent("content");
            }
            if (anchorNode === focusNode) {
              setSelection(selectionString);
            }
          }}
          onMouseUp={(event) => {
            console.log("mouse upped");

            const { clientX, clientY } = event;
            setSelectionPosition({ x: clientX, y: clientY });
          }}
          onMouseDown={() => {
            setTitleOrContent(null);
            setSelection("");
          }}
          className=" w-full mx-auto mt-24  shadow-md rounded-2xl  bg-fuchsia-950/40 backdrop-blur-xl border-2 border-purple-950 focus-within:shadow-sky-500 transition-shadow ease-in-out duration-200"
        >
          <div className="w-full  px-4 rounded-lg  pt-4 " ref={titleRef}>
            {isWaiting && titleOrContent === "title" ? (
              <div
                style={{ height: titleDivHeight }}
                className="flex items-center justify-center"
              >
                <LoadingSpinner></LoadingSpinner>
              </div>
            ) : (
              <textarea
                className="w-full resize-none field-sizing-content py-3 focus:outline-none  text-4xl bg-transparent font-bold  text-purple-200  placeholder-purple-900 tracking-wide   "
                placeholder="enter your title here..."
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></textarea>
            )}
          </div>
          <div className="   px-5 mt-1  rounded-lg  " ref={contentRef}>
            {isWaiting && titleOrContent === "content" ? (
              <div
                style={{ height: contentDivHeight }}
                className="flex items-center justify-center"
              >
                <LoadingSpinner></LoadingSpinner>
              </div>
            ) : (
              <textarea
                className="  resize-none w-full field-sizing-content py-2 text-xl tracking-wide  font-light text-slate-100 placeholder-purple-700/40  focus:outline-none "
                placeholder="enter your blog text here..."
                value={content}
                onChange={(event) => setContent(event.target.value)}
              ></textarea>
            )}
          </div>

          <button className="bg-fuchsia-900 font-semibold w-18 ml-[92%] mb-3.5 h-12 border-2 border-fuchsia-300 text-lg px-3 rounded-xl mt-1 cursor-pointer hover:bg-fuchsia-900/70 hover:border-fuchsia-400/20 text-fuchsia-300 ">
            done
          </button>
        </div>
      </div>
      {selection && (
        <SelectionContext.Provider value={{ selection }}>
          <SendToAiMenu
            x={selectionPosition.x}
            y={selectionPosition.y}
          ></SendToAiMenu>
        </SelectionContext.Provider>
      )}
      {errorMessage && (
        <div className=" absolute top-0 bottom-0 left-0 min-h-dvh w-full bg-black/50 z-10"></div>
      )}
      <div className=" border-2 border-amber-200 text-2xl text-white ">
        {selection}
      </div>
      {errorMessage && (
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] z-20">
          <ErrorPopup label={errorMessage}></ErrorPopup>
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/signin"></Navigate>
  );
}
