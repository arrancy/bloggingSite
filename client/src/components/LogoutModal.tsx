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
      <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20  bg-purple-900 px-8 py-6 rounded-2xl border-2 border-purple-500">
        <div className="text-3xl font-medium text-fuchsia-300 ">
          are you sure you want to log out ?
        </div>
        <div className="flex px-1/4 space-x-4 justify-center mt-6 mb-1">
          <button
            className="rounded-lg text-xl px-4 cursor-pointer py-2 font-semibold bg-fuchsia-300 hover:bg-fuchsia-900 text-red-900 hover:text-fuchsia-300"
            onClick={() => logoutMutation.mutate()}
          >
            {isPending ? <LoadingSpinner></LoadingSpinner> : "yes"}
          </button>
          <button
            onClick={() => {
              setIsLogoutModalActive(false);
            }}
            className="rounded-lg text-xl px-4 cursor-pointer  py-2 cursor font-semibold bg-fuchsia-300 hover:bg-fuchsia-900 text-fuchsia-900 hover:text-fuchsia-300"
          >
            no
          </button>
        </div>
      </div>
    </>
  );
}
