import { LogOut } from "lucide-react";
import logoImage from "./../assets/Adobe Express - file.png";
import { NavElement } from "./NavElement";
import { useLogoutModalState } from "../store/logoutModalState";
export function Navbar() {
  const { setIsLogoutModalActive } = useLogoutModalState();
  return (
    <>
      <div className="  text-slate-200 rounded-lg shadow-md bg-gradient-to-br from-slate-950 to-purple-950  border-fuchsia-300 shadow-fuchsia-800 font-semibold sticky top-0 flex justify-between w-full hover:shadow-lg duration-100 py-2 px-2 mb-14 sm:mb-4">
        <div className="flex justify-center space-x-2">
          <div className="w-8">
            <img src={logoImage} className="max-w-full w-fit "></img>
          </div>
          <div className="font-semibold text-lg text-fuchsia-200">
            writeIntelligent
          </div>
        </div>
        <div className="flex space-x-1 sm:space-x-4  text-slate-400 font-semibold text-lg ">
          <NavElement label="home" redirect=""></NavElement>
          <NavElement label="create" redirect="createblog"></NavElement>
          <NavElement label="blogs" redirect="blogs"></NavElement>
          <NavElement label="dashboard" redirect="dashboard"></NavElement>
          <div
            onClick={() => setIsLogoutModalActive(true)}
            className="flex items-center space-x-1 px-2 rounded-lg sm:px-2  hover:text-slate-200 hover:bg-purple-950 cursor-pointer "
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
