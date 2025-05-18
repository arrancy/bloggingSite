import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";

export function LandingPage() {
  console.log("component called");
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 to-fuchsia-950 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 pt-4">
        <Navbar></Navbar>
        <Hero></Hero>
      </div>
    </>
  );
}
