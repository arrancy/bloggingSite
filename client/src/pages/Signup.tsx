import { useMutation } from "@tanstack/react-query";
import { BottomHeading } from "../components/BottomHeading";
import { BottomMessage } from "../components/BottomMessage";
import { ButtonToSign } from "../components/ButtonToSign";
import { InputField } from "../components/InputField";
import { TopHeading } from "../components/TopHeading";
import { useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { Navigate } from "react-router-dom";
import api from "../axios/baseUrl";
import useAuthentication from "../utils/amIAuthenticated";
import { LoaderPage } from "./LoaderPage";
import { useSuccessState } from "../store/successState";
import { SuccessfulPopup } from "../components/SuccessfulPopup";

interface SignupInput {
  name: string;
  email: string;
  username: string;
  password: string;
}

export default function Signup() {
  const { successMessage, setSuccessMessage } = useSuccessState();
  const [signupInput, setSignupInput] = useState<SignupInput>({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const { isChecking, isLoggedIn } = useAuthentication();

  const signupMutation = useMutation({
    mutationFn: async (signupInput: SignupInput) => {
      const response = await api.post("/user/signup", signupInput);
      return response;
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        setSuccessMessage("please check your email to verify");
        setTimeout(() => {
          window.location.href = "https://mail.google.com";
          setSuccessMessage("");
        }, 3000);
      }
    },
  });
  const { isPending, isSuccess, isError } = signupMutation;
  return isChecking ? (
    <LoaderPage></LoaderPage>
  ) : !isChecking && !isLoggedIn ? (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="shadow-2xl shadow-fuchsia-600 px-6 py-4 rounded-lg">
          <TopHeading label="Sign up" />
          <BottomHeading label="sign up to create your account" />
          <InputField
            label="name"
            type="text"
            onChange={(event) => {
              setSignupInput({ ...signupInput, name: event.target.value });
            }}
          />
          <InputField
            label="email"
            type="text"
            onChange={(event) => {
              setSignupInput({ ...signupInput, email: event.target.value });
            }}
          />
          <InputField
            label="username"
            type="text"
            onChange={(event) => {
              setSignupInput({
                ...signupInput,
                username: event.target.value,
              });
            }}
          />
          <InputField
            label="password"
            type="password"
            onChange={(event) => {
              setSignupInput({
                ...signupInput,
                password: event.target.value,
              });
            }}
          />
          <ButtonToSign
            label={isPending ? <LoadingSpinner></LoadingSpinner> : "Sign Up"}
            onClick={
              isPending
                ? () => null
                : isSuccess
                ? () => null
                : () => {
                    signupMutation.mutate(signupInput);
                  }
            }
          ></ButtonToSign>
          {isError && (
            <ErrorMessage label={signupMutation.error.message}></ErrorMessage>
          )}
          <BottomMessage
            message="already have an account ?"
            link="sign in"
            toPage="signin"
          ></BottomMessage>
        </div>
        {successMessage && (
          <>
            <div className="fixed top-0 left-0 h-screen w-screen z-10 bg-black/50"></div>
            <SuccessfulPopup label={successMessage}></SuccessfulPopup>
          </>
        )}
      </div>
    </>
  ) : (
    <Navigate to="/blogs" replace />
  );
}
