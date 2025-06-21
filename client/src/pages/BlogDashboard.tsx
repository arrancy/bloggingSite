// import { Navigate } from "react-router-dom";
import { DashboardBlogElement } from "../components/DashboardBlogElement";
import { DashboardHeading } from "../components/DashboardHeading";
// import useAuthentication from "../utils/amIAuthenticated";
// import { LoaderPage } from "./LoaderPage";

export default function BlogDashboard() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 to-purple-950 pt-7 px-36">
      <DashboardHeading></DashboardHeading>
      <DashboardBlogElement></DashboardBlogElement>
    </div>
  );
}
