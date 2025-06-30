import { Navigate } from "react-router-dom";
import { BlogButton } from "../components/BlogButton";
import { Navbar } from "../components/Navbar";
import useAuthentication from "../utils/amIAuthenticated";
import { LoaderPage } from "./LoaderPage";
// import { useQuery } from "@tanstack/react-query";
// import { nav } from "motion/react-client";

export default function Blogs() {
  const { isChecking, isLoggedIn } = useAuthentication();
  // const {isPending, isSuccess, isError, data} = useQuery({queryKey : ["getBlogs"], queryFn : async ()=>{
  // }})
  return isChecking ? (
    <LoaderPage />
  ) : isLoggedIn ? (
    <>
      <div className="min-h-screen w-full text-center bg-gradient-to-br from-slate-950 to-purple-950 pb-10 pt-4 px-[15%]">
        <Navbar></Navbar>
        <div className="text-slate-200 text-8xl font-bold ">Blogs.</div>
        <div className="   mx-auto">
          <BlogButton
            heading={
              "hello blog this is here dwnfojdsjbf dwnfojdsjbf dwnfojdsjbf dwnfojdsjbf"
            }
            animationDelay={0.5}
            isDraft={true}
          ></BlogButton>
          <BlogButton
            heading={
              "hello blog this is here dwnfojdsjbf dwnfojdsjbf dwnfojdsjbf dwnfojdsjbf"
            }
            isDraft={false}
            animationDelay={0.9}
          ></BlogButton>
          <BlogButton
            heading={
              "hello blog this is here dwnfojdsjbf dwnfojdsjbf dwnfojdsjbf dwnfojdsjbf"
            }
            animationDelay={1.3}
            isDraft={false}
          ></BlogButton>
          <BlogButton
            heading={
              "hello blog this is here dwnfojdsjbf dwnfojdsjbf dwnfojdsjbf dwnfojdsjbf"
            }
            animationDelay={1.7}
            isDraft={true}
          ></BlogButton>
        </div>
      </div>
    </>
  ) : !isChecking && !isLoggedIn ? (
    <Navigate to="/signin"></Navigate>
  ) : (
    <></>
  );
}
