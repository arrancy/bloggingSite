import { useQuery } from "@tanstack/react-query";
import api from "../axios/baseUrl";
import useAuthentication from "../utils/amIAuthenticated";
import { LoaderPage } from "../pages/LoaderPage";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";
import { BlogButton } from "./BlogButton";
interface BlogsResponseObject {
  title: string;
  content: string;
}
export function DashboardBlogElement() {
  const { isChecking, isLoggedIn } = useAuthentication();
  const userBlogs = useQuery({
    queryKey: ["userBlogs"],
    queryFn: isLoggedIn
      ? async () => {
          const response = await api.get("/blog/blogsOfUser");
          return response.data;
        }
      : () => null,
  });
  const { isError, isLoading, data, error } = userBlogs;
  return isChecking ? (
    <LoaderPage></LoaderPage>
  ) : !isChecking && isLoggedIn ? (
    isLoading ? (
      <div className="flex items-center justify-center">
        <LoadingSpinner></LoadingSpinner>
      </div>
    ) : isError ? (
      <div className="text-red-400 font-medium text-xl ">
        an error occured : {" " + error.message}
      </div>
    ) : (
      <>
        {data.map((blog: BlogsResponseObject, index: number) => {
          return (
            <BlogButton
              heading={blog.title}
              blogContent={blog.content.slice(0, 100)}
              animationDelay={0.8 + 0.4 * index}
            ></BlogButton>
          );
        })}
      </>
    )
  ) : (
    <Navigate to={"/signin"}></Navigate>
  );
}
