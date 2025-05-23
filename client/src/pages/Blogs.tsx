import { BlogButton } from "../components/BlogButton";
import { Navbar } from "../components/Navbar";

export default function Blogs() {
  return (
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
  );
}
