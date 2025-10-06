import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import { LoaderPage } from "./pages/LoaderPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDashboard = lazy(() => import("./pages/BlogDashboard"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<LoaderPage></LoaderPage>}>
            <Routes>
              <Route path="/" element={<LandingPage></LandingPage>}></Route>
              <Route path="/signup" element={<Signup></Signup>}></Route>
              <Route path="/signin" element={<Signin></Signin>}></Route>
              <Route
                path="/createBlog"
                element={<CreateBlog></CreateBlog>}
              ></Route>
              <Route path="/Blogs" element={<Blogs></Blogs>}></Route>
              <Route
                path="/dashboard"
                element={<BlogDashboard></BlogDashboard>}
              ></Route>
              <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
