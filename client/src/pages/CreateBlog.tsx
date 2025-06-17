import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import useAuthentication from "../utils/amIAuthenticated";
import { LoaderPage } from "./LoaderPage";

export default function CreateBlog() {
  const { isChecking, isLoggedIn } = useAuthentication();
  const navigate = useNavigate();
  return isChecking ? (
    <LoaderPage />
  ) : isLoggedIn ? (
    <div className="min-h-screen flex flex-col w-screen bg-gradient-to-br from-slate-950 to-fuchsia-950 px-[15%] pt-4">
      <Navbar></Navbar>
      <div className=" w-full flex flex-col flex-1  mx-auto ">
        <div className="w-full flex flex-row shadow-fuchsia-700 bg-white shadow-md rounded-lg px-4 py-4">
          <textarea
            className="flex-1 resize- focus:outline-none text-4xl font-bold  text-slate-950 resize-none "
            placeholder="enter your title here"
          ></textarea>
          <button className="bg-fuchsia-900 font-bold text-lg px-3 rounded-3xl my-3  text-fuchsia-100 ">
            done
          </button>
        </div>
        <div className=" flex flex-row flex-1 my-6 bg-white rounded-lg shadow-fuchsia-900 shadow-md ">
          <textarea
            className=" flex-1 resize-none px-4 py-2 text-lg  font-semibold text-slate-800 focus:outline-none"
            placeholder="enter your blog text here"
          ></textarea>
          <div className="">
            <button className="font-semibold text-fuchsia-950 text-xl bg-fuchsia-200 p-4 rounded-2xl hover:cursor-pointer hover:bg-fuchsia-300 relative mx-2 top-[83%]">
              done
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    navigate("/signin")
  );
}
