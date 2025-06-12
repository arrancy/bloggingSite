import { useMutation } from "@tanstack/react-query";
import { BottomHeading } from "../components/BottomHeading";
import { BottomMessage } from "../components/BottomMessage";
import { ButtonToSign } from "../components/ButtonToSign";
import { InputField } from "../components/InputField";
import { TopHeading } from "../components/TopHeading";
import { useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import api from "../axios/baseUrl";

interface SignupInput {
  name: string;
  email: string;
  username: string;
  password: string;
}

export default function Signup() {
  const [signupInput, setSignupInput] = useState<SignupInput>({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: async (signupInput: SignupInput) => {
      const response = await api.post("/user/signup", signupInput);
      return response;
    },
    onSuccess: (data) => {
      if (data.statusText === "OK") {
        navigate("/blogs");
      }
    },
  });
  const { isPending, isSuccess, isError } = signupMutation;
  return (
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
              setSignupInput({ ...signupInput, username: event.target.value });
            }}
          />
          <InputField
            label="password"
            type="password"
            onChange={(event) => {
              setSignupInput({ ...signupInput, password: event.target.value });
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
      </div>
    </>
  );
}
