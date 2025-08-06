import { LogOut } from "lucide-react";
import logoImage from "./../assets/Adobe Express - file.png";
import { NavElement } from "./NavElement";
import { useLogoutModalState } from "../store/logoutModalState";
import { useState } from "react";
export function Navbar() {
  const { setIsLogoutModalActive } = useLogoutModalState();
  const [isButtonToggled, setIsButtonToggled] = useState<boolean>(false);
  return (
    <>
      <div className="sm:hidden visible flex justify-between sticky top-0  px-2 py-2 rounded-lg shadow-md focus:shadow-lg shadow-pink-900">
        <button
          onClick={() => setIsButtonToggled(!isButtonToggled)}
          className={
            "inline-block  top-1.5  h-8 w-8 bg-purple-900 z-30 rounded-lg focus:border-1 focus:border-purple-300 sm:hidden sm:pointer-events-none cursor-pointer"
          }
        >
          <div className="h-0.5 w-3 mx-auto mb-0.5 bg-purple-400"></div>
          <div className="h-0.5 w-3 mx-auto   bg-purple-400"></div>
          <div className="h-0.5 w-3 mx-auto mt-0.5  bg-purple-400"></div>
        </button>
        <div className="flex sm:justify-center sm:space-x-2">
          <div className="w-8">
            <img src={logoImage} className="max-w-full w-fit "></img>
          </div>
          <div className="font-semibold text-lg text-fuchsia-200">
            writeIntelligent
          </div>
        </div>
      </div>

      <div
        className={`text-slate-200 absolute z-20 rounded-lg shadow-md bg-gradient-to-br from-slate-950 to-purple-950 border-fuchsia-300 shadow-fuchsia-800 font-semibold sm:sticky sm:top-0 sm:flex sm:justify-between sm:w-full w-fit hover:shadow-lg pl-2 pr-3 py-0 sm:py-2 sm:px-2 sm:visible sm:mb-4 overflow-hidden sm:overflow-auto sm:opacity-100 sm:pointer-events-auto sm:max-h-none transition-all duration-500 ease-in-out
    ${
      isButtonToggled
        ? "opacity-100 max-h-screen py-4 "
        : "opacity-0 max-h-0 py-0 pointer-events-none sm:"
    }
  `}
      >
        <div className="flex sm:justify-center sm:space-x-2">
          <div className="w-8">
            <img src={logoImage} className="max-w-full w-fit "></img>
          </div>
          <div className="font-semibold text-lg text-fuchsia-200">
            writeIntelligent
          </div>
        </div>
        <div className="sm:flex  sm:space-x-4  text-slate-400 font-semibold text-lg ">
          <NavElement label="home" redirect=""></NavElement>
          <NavElement label="create" redirect="createblog"></NavElement>
          <NavElement label="blogs" redirect="blogs"></NavElement>
          <NavElement label="dashboard" redirect="dashboard"></NavElement>
          <div
            onClick={() => setIsLogoutModalActive(true)}
            className="flex items-center space-x-1 px-2 py-2 sm:py-0 rounded-lg sm:px-2  hover:text-slate-200 hover:bg-purple-950 cursor-pointer "
          >
            <div className="text-purple-800 ">
              <LogOut size={18}></LogOut>
            </div>
            <div className="">logout</div>
          </div>
        </div>
      </div>
    </>
  );
}
