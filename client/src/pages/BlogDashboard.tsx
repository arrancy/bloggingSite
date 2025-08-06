import { useQuery } from "@tanstack/react-query";
import { DashboardHeading } from "../components/DashboardHeading";
import api from "../axios/baseUrl";
import useAuthentication from "../utils/amIAuthenticated";
import { LoaderPage } from "./LoaderPage";
import { Navigate } from "react-router-dom";
import { BlogButton } from "../components/BlogButton";
import { Navbar } from "../components/Navbar";
// import useAuthentication from "../utils/amIAuthenticated";
// import { LoaderPage } from "./LoaderPage";
interface BlogsResponseObject {
  title: string;
  content: string;
  isDraft: boolean;
  id: number;
}
export default function BlogDashboard() {
  const { isChecking, isLoggedIn } = useAuthentication();
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
      <div className="sm:mt-4 ">
        <Navbar></Navbar>
      </div>
      <DashboardHeading></DashboardHeading>
      <>
        {data.blogs.map((blog: BlogsResponseObject, index: number) => {
          console.log(blog.isDraft);
          return (
            <BlogButton
              id={blog.id}
              key={index}
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
