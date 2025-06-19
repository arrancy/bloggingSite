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
        <div className=" w-fit  mx-auto">
          <BlogButton
            heading={
              "hello blog this is here dwnfojdsjbf fdsijbjfidsj gsdidjfhdsijbg sdidifjbdsijgb"
            }
            blogContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          ></BlogButton>
          <BlogButton
            heading={
              "hello blog this is here dwnfojdsjbf fdsijbjfidsj gsdidjfhdsijbg sdidifjbdsijgb"
            }
            blogContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          ></BlogButton>
          <BlogButton
            heading={
              "hello blog this is here dwnfojdsjbf fdsijbjfidsj gsdidjfhdsijbg sdidifjbdsijgb"
            }
            blogContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
