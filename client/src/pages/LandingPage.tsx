import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";

export function LandingPage() {
  console.log("component called");
  return (
    <>
      <div className=" h-screen w-screen bg-linear-to-br from-slate-950 to-fuchsia-950 px-64 pt-4">
        <Navbar></Navbar>
        <Hero></Hero>
      </div>
    </>
  );
}
