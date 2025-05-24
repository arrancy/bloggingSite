import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { RecoilRoot } from "recoil";
import { lazy, Suspense } from "react";
import { LoaderPage } from "./pages/LoaderPage";
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const Blogs = lazy(() => import("./pages/Blogs"));

function App() {
  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
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
            </Routes>
          </Suspense>
        </RecoilRoot>
      </BrowserRouter>
    </>
  );
}

export default App;
