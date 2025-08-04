import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import useAuthentication from "../utils/amIAuthenticated";
import { LoaderPage } from "./LoaderPage";
import { useCallback, useEffect, useState } from "react";
import { useErrorState } from "../store/errorState";
import { useQuery } from "@tanstack/react-query";
import api from "../axios/baseUrl";
import { LoadingSpinner } from "../components/LoadingSpinner";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { useTitleAndContentState } from "../store/titleAndDescription";

export default function BlogPage() {
  const { isChecking, isLoggedIn } = useAuthentication();
  const { errorMessage, setErrorMessage } = useErrorState();
  const { setTitle, setContent } = useTitleAndContentState();
  const [params] = useSearchParams();
  const [blogId, setBlogId] = useState<number | null>(0);
  const navigate = useNavigate();
  const handleError = useCallback(
    (message: string) => {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(""), 3000);
      navigate("/blogs");
    },
    [setErrorMessage, navigate]
  );
  useEffect(() => {
    if (isLoggedIn) {
      const blogId = params.get("id");

      if (!blogId) {
        handleError("please provide blog Id");
        return;
      }
      const blogIdNumber = parseInt(blogId);
      if (isNaN(blogIdNumber)) {
        handleError("please provide blogId Properly");
      }
      setBlogId(blogIdNumber);
    }
  }, [isLoggedIn, params, handleError]);
  const doesBlogIdExist = useCallback(() => {
    if (blogId) {
      return true;
    } else {
      return false;
    }
  }, [blogId]);
  const { isError, isPending, data, error, isSuccess } = useQuery({
    queryKey: ["fetch-BLog", blogId],
    queryFn: async () => {
      const response = await api.get("/blog?blogId=" + blogId);
      return response.data;
    },
    enabled: isLoggedIn && doesBlogIdExist(),
  });
  useEffect(() => {
    if (data && data.blogObject) {
      if (data.blogObject.isDraft) {
        setTitle(data.blogObject.title);
        setContent(data.blogObject.content);
        navigate("/createBlog");
      }
    }
  }, [data, navigate, setContent, setTitle]);
  const handleApiError = useCallback(
    (error: Error | null) => {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          handleError("an unknown error occured ");
          return;
        }
        const { data } = error.response;
        const { msg }: { msg: string } = data;

        handleError(msg);
      } else {
        if (error) {
          handleError(error.message);
        } else {
          handleError("an unknown error ");
        }
      }
    },
    [handleError]
  );
  useEffect(() => {
    if (isError) {
      handleApiError(error);
    }
  }, [isError, error, handleApiError]);
  return isChecking ? (
    <LoaderPage></LoaderPage>
  ) : isLoggedIn ? (
    <div className="min-h-screen w-full bg-gradient-to-br from-fuchsia-950 to-slate-950 px-[20%] pt-12 pb-6">
      <div className="">
        <Navbar></Navbar>
      </div>
      {isPending ? (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner></LoadingSpinner>
        </div>
      ) : isError ? (
        <>
          <div className="fixed top-0 left-0 bg-black/50 z-10"></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            {errorMessage}
          </div>
        </>
      ) : isSuccess && !data.blogObject.isDraft ? (
        <div className="text-center">
          <div className="text-left inline-block  w-9/10  text-5xl font-bold text-fuchsia-400 my-12">
            {data.blogObject.title}
          </div>
          <div className="text-left inline-block  w-8/9 text-xl font-md text-fuchsia-200">
            {data.blogObject.content}
          </div>
        </div>
      ) : (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner></LoadingSpinner>
        </div>
      )}
    </div>
  ) : (
    <Navigate to={"/signin"}></Navigate>
  );
}
