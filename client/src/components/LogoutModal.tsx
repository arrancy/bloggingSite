import { useMutation } from "@tanstack/react-query";
import { useLogoutModalState } from "../store/logoutModalState";
import api from "../axios/baseUrl";
import { useNavigate } from "react-router-dom";
import { useSuccessState } from "../store/successState";
import axios from "axios";
import { useErrorState } from "../store/errorState";
import { LoadingSpinner } from "./LoadingSpinner";

export function LogoutModaL() {
  const { setIsLogoutModalActive } = useLogoutModalState();
  const { setSuccessMessage } = useSuccessState();
  const { setErrorMessage } = useErrorState();
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await api.get("/user/logout");
      return response.data;
    },
    onSuccess: () => {
      setSuccessMessage("logged out successfully");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("signin");
      }, 3000);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          setErrorMessage("could not logout , error : " + error.message);
          return setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
        const { data } = error.response;
        const { msg }: { msg: string } = data;
        setErrorMessage(msg);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        setErrorMessage("could not logout , error : " + error.message);
        return setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    },
  });
  const { isPending } = logoutMutation;
  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-screen bg-black/50 z-10"></div>
      <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20  bg-purple-900 sm:px-8 px-4 sm:py-6 py-3 rounded-2xl border-2 border-purple-500">
        <div className="sm:text-3xl text-center  text-2xl font-medium text-fuchsia-300 ">
          are you sure you want to log out ?
        </div>
        <div className="flex px-1/4 sm:space-x-4 space-x-2 justify-center sm:mt-6 mt-3 mb-1">
          <button
            className="rounded-lg sm:text-xl text-lg sm:px-4 px-2 cursor-pointer sm:py-2 py-1 sm:font-semibold font-normal bg-fuchsia-300 hover:bg-fuchsia-900 text-red-900 hover:text-fuchsia-300"
            onClick={() => logoutMutation.mutate()}
          >
            {isPending ? <LoadingSpinner></LoadingSpinner> : "yes"}
          </button>
          <button
            onClick={() => {
              setIsLogoutModalActive(false);
            }}
            className="rounded-lg sm:text-xl text-lg sm:px-4 px-2 cursor-pointer  sm:py-2 py-1 sm:font-semibold font-normal bg-fuchsia-300 hover:bg-fuchsia-900 text-fuchsia-900 hover:text-fuchsia-300"
          >
            no
          </button>
        </div>
      </div>
    </>
  );
}
