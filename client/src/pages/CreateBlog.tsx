import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import useAuthentication from "../utils/amIAuthenticated";
import { LoaderPage } from "./LoaderPage";
import { useCallback, useEffect, useRef, useState } from "react";
import { SendToAiMenu } from "../components/SendToAiMenu";
import { SelectionContext } from "../utils/SelectionContext";
import { useTitleAndContentState } from "../store/titleAndDescription";
import { useWaitingState } from "../store/waitingState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useTitleOrContentState } from "../store/titleOrContentState";
import { useErrorState } from "../store/errorState";
import { ErrorPopup } from "../components/ErrorPopup";
import { useMutation } from "@tanstack/react-query";
import api from "../axios/baseUrl";
import { useSuccessState } from "../store/successState";
import { SuccessfulPopup } from "../components/SuccessfulPopup";
import axios from "axios";
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
  const [params] = useSearchParams();
  const selectionRef = useRef<string>("");
  const { isWaiting } = useWaitingState();
  const { title, content, setTitle, setContent } = useTitleAndContentState();
  const { titleOrContent, setTitleOrContent } = useTitleOrContentState();
  const { errorMessage, setErrorMessage } = useErrorState();
  const { successMessage, setSuccessMessage } = useSuccessState();
  const inputRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [titleDivHeight, setTitleDivHeight] = useState<number>(0);
  const [contentDivHeight, setContentHeight] = useState<number>(0);
  const [blogId, setBlogId] = useState<number | null>(null);
  // const [isDraft, setisDraft] = useState<boolean | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const blogIdString = params.get("id");

    if (blogIdString) {
      console.log(params);
      if (!blogIdString) {
        setErrorMessage("please provide blog is properly or do not at all");
        setTimeout(() => setErrorMessage(""), 3000);
        navigate("/blogs");
        return;
      }
      const blogId = parseInt(blogIdString);
      if (isNaN(blogId)) {
        setErrorMessage("please provide blog is properly or do not at all");
        setTimeout(() => setErrorMessage(""), 3000);
        navigate("/blogs");
        return;
      }
      setBlogId(blogId);
    } else {
      return;
    }
  }, [params, setBlogId, setErrorMessage, navigate]);
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
  const handleNoTitleOrContent = useCallback(() => {
    if (!(title && content)) {
      setErrorMessage("please fill up the required fields");
      setTimeout(() => setErrorMessage(""), 3000);
      return false;
    } else {
      return true;
    }
  }, [title, content, setErrorMessage]);

  const publishMutation = useMutation({
    mutationKey: ["publish-mutation"],
    mutationFn: async (isDraft: boolean) => {
      if (blogId) {
        const response = await api.put("/blog", {
          title,
          content,
          isDraft,
          blogId,
        });
        return response.data;
      }
      const response = await api.post("/blog", {
        title,
        content,
        isDraft,
      });
      return response.data;
    },
    onSuccess: (_, isDraft) => {
      setSuccessMessage(isDraft ? "saved as  draft" : "published successfully");
      setTimeout(() => {
        setSuccessMessage("");
        setTitle("");
        setContent("");
        navigate("/dashboard");
      }, 3000);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          setErrorMessage(error.message);
          setTimeout(() => setErrorMessage(""), 3000);
          return;
        }
        const { data } = error.response;
        const { msg }: { msg: string } = data;
        setErrorMessage(msg);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    },
  });
  const { isPending, variables } = publishMutation;
  const handlePublishOrDraft = useCallback(
    (isDraftValue: boolean) => {
      const result = handleNoTitleOrContent();
      if (result) {
        publishMutation.mutate(isDraftValue);
      } else {
        return;
      }
    },
    [publishMutation, handleNoTitleOrContent]
  );
  return isChecking ? (
    <LoaderPage />
  ) : isLoggedIn ? (
    <div className="min-h-screen max-w-screen bg-gradient-to-br from-slate-950 to-fuchsia-950 px-[15%] pt-8 pb-16">
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
          <div
            className="w-full  px-5 rounded-lg  pt-4 "
            ref={titleRef}
            onKeyDown={(event) => {
              console.log("here");
              if (document.activeElement === titleTextareaRef.current) {
                console.log("here");
                if (event.key === "Backspace") {
                  if (title.length === 255) {
                    console.log("here");
                    const newTitle = title.slice(0, 254);
                    event.preventDefault();
                    setTitle(newTitle);
                  }
                }
              }
              if (document.activeElement === contentTextareaRef.current) {
                if (event.key === "Backspace") {
                  if (content.length >= 2500) {
                    const newContent = content.slice(0, 2499);
                    setContent(newContent);
                    event.preventDefault();
                  }
                }
              }
            }}
          >
            {isWaiting && titleOrContent === "title" ? (
              <div
                style={{ height: titleDivHeight }}
                className="flex items-center justify-center"
              >
                <LoadingSpinner></LoadingSpinner>
              </div>
            ) : (
              <>
                <textarea
                  className="w-full resize-none field-sizing-content py-3 focus:outline-none  text-4xl bg-transparent font-bold  text-purple-200  placeholder-purple-900 tracking-wide   "
                  placeholder="enter your title here..."
                  value={title}
                  ref={titleTextareaRef}
                  onChange={(event) => {
                    if (event.target.value.length <= 255) {
                      setTitle(event.target.value);
                    }
                    if (event.target.value.length > 255) {
                      const fixedTitle = event.target.value.slice(0, 255);
                      setTitle(fixedTitle);
                    }
                  }}
                ></textarea>
                <div
                  className={` border-2 rounded-lg p-2 font-semibold inline-block border-purple-500 ${
                    title.length >= 255 ? `text-red-600` : `text-purple-300`
                  }`}
                >
                  {title.length >= 255 ? "255/255" : title.length + "/" + 255}
                </div>
              </>
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
                ref={contentTextareaRef}
                value={content}
                onChange={(event) => {
                  if (event.target.value.length <= 2500) {
                    setContent(event.target.value);
                  }
                  if (event.target.value.length > 2500) {
                    const fixedContent = event.target.value.slice(0, 2500);
                    setContent(fixedContent);
                  }
                }}
              ></textarea>
            )}
          </div>

          <div className="flex justify-between items-center px-5">
            <div
              className={`font-semibold text-md border-2 border-purple-500 mb-1.5 inline-block p-1 rounded-lg ${
                content.length >= 2500 ? `text-red-600` : `text-purple-300`
              }`}
            >
              {(content.length >= 2500 ? 2500 : content.length) + "/" + 2500}
            </div>
            <div className="flex items-center space-x-3 px-2">
              <button
                onClick={() => handlePublishOrDraft(false)}
                className="bg-gradient-to-l from-violet-500 to-fuchsia-300 font-semibold mb-3.5  p-2 text-lg  rounded-xl mt-1 cursor-pointer hover:bg-gradient-to-l hover:from-violet-900 hover:to-fuchsia-700 hover:text-fuchsia-200 hover:shadow-lg shadow-md shadow-pink-300 hover:shadow-pink-200  text-fuchsia-900 transition-all ease-in-out duration-700"
              >
                {isPending && !variables ? (
                  <LoadingSpinner></LoadingSpinner>
                ) : (
                  "Publish"
                )}
              </button>
              <button
                onClick={() => handlePublishOrDraft(true)}
                className="bg-gradient-to-br from-purple-800 to-fuchsia-800  mb-3 hover:bg-gradient-to-l hover:from-violet-300 cursor-pointer hover:to-fuchsia-300 text-lg font-semibold text-purple-200 hover:text-fuchsia-950 p-2 rounded-lg transition-all ease-in-out duration-700"
              >
                {isPending && variables ? (
                  <LoadingSpinner></LoadingSpinner>
                ) : (
                  "Save As Draft"
                )}
              </button>
            </div>
          </div>
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
        <div className=" fixed top-0  left-0 h-screen w-screen   bg-black/50 z-10"></div>
      )}
      {successMessage && (
        <div className="fixed top-0 left-0 h-screen w-screen z-10 bg-black/50"></div>
      )}
      <div className=" border-2 border-amber-200 text-2xl text-white ">
        {selection}
      </div>
      {errorMessage && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <ErrorPopup label={errorMessage}></ErrorPopup>
        </div>
      )}
      {successMessage && (
        <SuccessfulPopup label={successMessage}></SuccessfulPopup>
      )}
    </div>
  ) : (
    <Navigate to="/signin"></Navigate>
  );
}
