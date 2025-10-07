import { Navigate } from "react-router-dom";
import { BlogButton } from "../components/BlogButton";
import { Navbar } from "../components/Navbar";
import useAuthentication from "../utils/amIAuthenticated";
import { LoaderPage } from "./LoaderPage";
import { useQuery } from "@tanstack/react-query";
import api from "../axios/baseUrl";
import { useErrorState } from "../store/errorState";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { ErrorPopup } from "../components/ErrorPopup";
import { useLogoutModalState } from "../store/logoutModalState";
import { LogoutModaL } from "../components/LogoutModal";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function Blogs() {
  const { isChecking, isLoggedIn } = useAuthentication();
  const { errorMessage, setErrorMessage } = useErrorState();
  const { isLogoutModalActive } = useLogoutModalState();
  const { isError, isSuccess, data, error, isPending } = useQuery({
    queryKey: ["get-all-blogs"],
    queryFn: async () => {
      const response = await api.get("/blog/allBlogs");
      return response.data;
    },
    enabled: isLoggedIn,
  });
  const handleError = useCallback(
    (message: string) => {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    },
    [setErrorMessage]
  );
  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          handleError(error.message);
          return;
        }
        const { data } = error.response;
        const { msg }: { msg: string } = data;
        handleError(msg);
        return;
      } else {
        handleError(error.message);
        return;
      }
    }
  }, [handleError, error, isError]);
  return isChecking ? (
    <LoaderPage />
  ) : isLoggedIn && isSuccess ? (
    <>
      {isLogoutModalActive && <LogoutModaL></LogoutModaL>}

      <div className="min-h-screen w-full text-center bg-gradient-to-br from-slate-950 to-purple-950 pb-10 pt-4  sm:px-[15%]">
        <div className="px-6 sm:px-0">
          <Navbar></Navbar>
        </div>
        <div className="text-slate-200 sm:text-8xl text-6xl sm:mt-0 mt-6 font-bold ">
          Blogs.
        </div>
        <div className="   mx-auto">
          {isPending ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            data.allBlogs.map(
              (
                blog: {
                  title: string;
                  content: string;
                  id: number;
                  isDraft: boolean;
                },
                index: number
              ) => (
                <BlogButton
                  heading={blog.title}
                  id={blog.id}
                  animationDelay={0.8 + 0.4 * index}
                  isDraft={blog.isDraft}
                ></BlogButton>
              )
            )
          )}
        </div>
      </div>
    </>
  ) : isLoggedIn && isError ? (
    <LoaderPage></LoaderPage>
  ) : isLoggedIn && isError && errorMessage ? (
    <>
      <div className="min-h-screen w-full  bg-gradient-to-br from-slate-950 to-purple-95">
        <div className="fixed top-0 left-0 h-screen w-screen z-10 bg-black/50"></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <ErrorPopup label={errorMessage}></ErrorPopup>
        </div>
      </div>
    </>
  ) : !isLoggedIn ? (
    <Navigate to="/signin"></Navigate>
  ) : (
    <LoaderPage></LoaderPage>
  );
}

// isPending is true initially , if cached data isn't there or of course if query attempt hasn't been finished , even if the query is disabled like how isLoggedIn is doing here.
