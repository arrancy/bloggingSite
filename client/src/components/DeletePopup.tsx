import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDeletePopupState } from "../store/deletePopup";
import api from "../axios/baseUrl";
import { useSuccessState } from "../store/successState";
import { useErrorState } from "../store/errorState";
import axios from "axios";
import { LoadingSpinner } from "./LoadingSpinner";
import { BlogsResponseObject } from "../pages/BlogDashboard";

export function DeletePopup() {
  const queryClient = useQueryClient();
  const { setIsDeletePopupActive, setDeleteId, deleteId } =
    useDeletePopupState();
  const { setSuccessMessage } = useSuccessState();
  const { setErrorMessage } = useErrorState();
  const errorAndSucccessHandler = (
    functionCall: (messageString: string) => void,
    message: string
  ) => {
    functionCall(message);
    setIsDeletePopupActive(false);

    setTimeout(() => functionCall(""), 3000);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete("/blog?blogId=" + id);
      return response.data;
    },
    onSuccess: () => {
      errorAndSucccessHandler(setSuccessMessage, "blog deleted successfully");
      queryClient.setQueryData(
        ["userBlogs"],
        (oldData: { blogs: BlogsResponseObject[] }) => {
          if (!oldData) return oldData;

          const newArray = oldData.blogs.filter((obj) => obj.id !== deleteId);
          const newData = { ...oldData, blogs: newArray };
          return newData;
        }
      );
      setDeleteId(null);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          setDeleteId(null);

          return errorAndSucccessHandler(setErrorMessage, error.message);
        }
        const { data } = error.response;
        const { msg }: { msg: string } = data;
        setDeleteId(null);

        return errorAndSucccessHandler(setErrorMessage, msg);
      } else {
        setDeleteId(null);

        return errorAndSucccessHandler(setErrorMessage, error.message);
      }
    },
  });
  const { isPending } = deleteMutation;
  return (
    <>
      <div className="fixed top-0 left-0 z-20 h-screen w-screen bg-black/50"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 p-8 bg-fuchsia-300 border-red-700 border-2">
        <h2 className="text-4xl text-red-500 text-center">
          are you sure you want to delete this blog?
        </h2>
        <div className="flex justify-center space-x-4 px-6 mt-6 ">
          <button
            onClick={() => {
              if (deleteId) {
                return deleteMutation.mutate(deleteId);
              }
            }}
            className="p-4 text-2xl font-semibold bg-red-700 text-red-200 hover:bg-red-900 hover:text-red-400 transition-colors ease-in-out duration-100"
          >
            {isPending ? <LoadingSpinner></LoadingSpinner> : "yes"}{" "}
          </button>
          <button
            onClick={() => {
              setIsDeletePopupActive(false);
              setDeleteId(null);
            }}
            className="p-4 text-2xl bg-red-200 text-red-500 hover:bg-fuchsia-200 hover:text-fuchsia-800 transition-colors ease-in-out duration-150"
          >
            no
          </button>
        </div>
      </div>
    </>
  );
}
