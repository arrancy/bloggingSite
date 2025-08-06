import { Hero } from "../components/Hero";
import { LogoutModaL } from "../components/LogoutModal";
import { Navbar } from "../components/Navbar";
import { useErrorState } from "../store/errorState";
import { useLogoutModalState } from "../store/logoutModalState";
import { useSuccessState } from "../store/successState";
import { ErrorPopup } from "../components/ErrorPopup";
import { SuccessfulPopup } from "../components/SuccessfulPopup";
// import useAuthentication from "../utils/amIAuthenticated";

export default function LandingPage() {
  // const { isLoggedIn } = useAuthentication();
  const { isLogoutModalActive } = useLogoutModalState();
  const { errorMessage } = useErrorState();
  const { successMessage } = useSuccessState();
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 to-fuchsia-950 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 pt-4">
        {isLogoutModalActive && <LogoutModaL></LogoutModaL>}
        {errorMessage && (
          <>
            <div className=" fixed top-0  left-0 h-screen w-screen   bg-black/50 z-10"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <ErrorPopup label={errorMessage}></ErrorPopup>
            </div>
          </>
        )}
        {successMessage && (
          <>
            <div className="fixed top-0 left-0 h-screen w-screen z-10 bg-black/50"></div>
            <SuccessfulPopup label={successMessage}></SuccessfulPopup>
          </>
        )}
        \<Navbar></Navbar>
        <Hero></Hero>
      </div>
    </>
  );
}
