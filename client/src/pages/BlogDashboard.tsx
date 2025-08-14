import { useQuery } from "@tanstack/react-query";
import { DashboardHeading } from "../components/DashboardHeading";
import api from "../axios/baseUrl";
import useAuthentication from "../utils/amIAuthenticated";
import { LoaderPage } from "./LoaderPage";
import { Navigate } from "react-router-dom";
import { BlogButton } from "../components/BlogButton";
import { Navbar } from "../components/Navbar";
import { useLogoutModalState } from "../store/logoutModalState";
import { LogoutModaL } from "../components/LogoutModal";
import { useDeletePopupState } from "../store/deletePopup";
import { DeletePopup } from "../components/DeletePopup";
import { useSuccessState } from "../store/successState";
import { useErrorState } from "../store/errorState";
import { SuccessfulPopup } from "../components/SuccessfulPopup";
import { ErrorPopup } from "../components/ErrorPopup";
// import useAuthentication from "../utils/amIAuthenticated";
// import { LoaderPage } from "./LoaderPage";
export interface BlogsResponseObject {
  title: string;
  content: string;
  isDraft: boolean;
  id: number;
}
export default function BlogDashboard() {
  const { isChecking, isLoggedIn } = useAuthentication();
  const { isLogoutModalActive } = useLogoutModalState();
  const { isDeletePopupActive } = useDeletePopupState();
  const { successMessage } = useSuccessState();
  const { errorMessage } = useErrorState();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["userBlogs"],
    queryFn: async () => {
      const response = await api.get("/blog/blogsOfUser");
      return response.data;
    },
    enabled: isLoggedIn,
  });
  return isChecking ? (
    <LoaderPage></LoaderPage>
  ) : !(isChecking || isLoggedIn) ? (
    <Navigate to={"/signin"}></Navigate>
  ) : isLoading ? (
    <LoaderPage></LoaderPage>
  ) : isError ? (
    <div className="text-red-400 font-medium text-xl ">
      an error occured : {" " + error.message}
    </div>
  ) : (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 to-purple-950 sm:pt-7 pt-3 sm:px-[15%] px-4 pb-4">
      {isLogoutModalActive && <LogoutModaL></LogoutModaL>}
      <div className="sm:mt-4 ">
        <Navbar></Navbar>
      </div>
      <DashboardHeading></DashboardHeading>
      {isDeletePopupActive && <DeletePopup></DeletePopup>}
      {errorMessage && (
        <div className=" fixed top-0  left-0 h-screen w-screen   bg-black/50 z-10"></div>
      )}
      {successMessage && (
        <div className="fixed top-0 left-0 h-screen w-screen z-10 bg-black/50"></div>
      )}
      {errorMessage && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <ErrorPopup label={errorMessage}></ErrorPopup>
        </div>
      )}
      {successMessage && (
        <SuccessfulPopup label={successMessage}></SuccessfulPopup>
      )}
      <>
        {data.blogs.map((blog: BlogsResponseObject, index: number) => {
          console.log(blog.isDraft);
          return (
            <BlogButton
              id={blog.id}
              key={blog.id}
              heading={blog.title}
              animationDelay={0.8 + 0.4 * index}
              isDraft={blog.isDraft}
              content={blog.content}
            ></BlogButton>
          );
        })}
      </>
    </div>
  );
}
