import logoImage from "./../assets/Adobe Express - file.png";
import { NavElement } from "./NavElement";
export function Navbar() {
  return (
    <>
      <div className="  text-slate-200 rounded-lg shadow-md shadow-fuchsia-400 font-semibold sticky top-0 flex justify-between w-full hover:shadow-lg duration-100 py-2 px-2 mb-14 sm:mb-24">
        <div className="flex justify-center space-x-2">
          <div className="w-8">
            <img src={logoImage} className="max-w-full w-fit "></img>
          </div>
          <div className="font-semibold text-lg text-fuchsia-200">
            writeIntelligent
          </div>
        </div>
        <div className="flex space-x-1 sm:space-x-4  text-slate-400 font-semibold text-lg ">
          <NavElement label="home"></NavElement>
          <NavElement label="about us"></NavElement>
          <NavElement label="blogs"></NavElement>
        </div>
      </div>
    </>
  );
}
