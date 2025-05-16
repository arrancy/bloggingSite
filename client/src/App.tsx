import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { RecoilRoot } from "recoil";
import { LandingPage } from "./pages/LandingPage";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { CreateBlog } from "./pages/CreateBlog";
import { Blogs } from "./pages/Blogs";

function App() {
  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
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
        </RecoilRoot>
      </BrowserRouter>
    </>
  );
}

export default App;
