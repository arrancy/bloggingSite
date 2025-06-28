import { useQuery } from "@tanstack/react-query";
import { DashboardHeading } from "../components/DashboardHeading";
import api from "../axios/baseUrl";
import useAuthentication from "../utils/amIAuthenticated";
import { LoaderPage } from "./LoaderPage";
import { Navigate } from "react-router-dom";
import { BlogButton } from "../components/BlogButton";
// import useAuthentication from "../utils/amIAuthenticated";
// import { LoaderPage } from "./LoaderPage";
interface BlogsResponseObject {
  title: string;
  content: string;
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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 to-purple-950 pt-7 px-36">
      <DashboardHeading></DashboardHeading>
      <>
        {data.blogs.map((blog: BlogsResponseObject, index: number) => {
          return (
            <BlogButton
              heading={blog.title}
              blogContent={blog.content.slice(0, 100)}
              animationDelay={0.8 + 0.4 * index}
            ></BlogButton>
          );
        })}
      </>
    </div>
  );
}
