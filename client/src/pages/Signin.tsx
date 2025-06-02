import { useState } from "react";
import { BottomHeading } from "../components/BottomHeading";
import { BottomMessage } from "../components/BottomMessage";
import { ButtonToSign } from "../components/ButtonToSign";
import { InputField } from "../components/InputField";
import { TopHeading } from "../components/TopHeading";
import { useMutation } from "@tanstack/react-query";
import api from "../axios/baseUrl";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
// import api from "./../axios/baseUrl"
// import api from "../axios/baseUrl";
interface SigninInput {
  email: string;
  password: string;
}

export default function Signin() {
  const [signinInput, setSigninInput] = useState<SigninInput>({
    email: "",
    password: "",
  });
  // const queryClient = useQueryClient();
  const signinMutation = useMutation({
    mutationFn: async (signinInput: SigninInput) => {
      const response = await api.post("/user/signin", signinInput);
      return response;
    },
  });
  const { isPending, isError, isSuccess } = signinMutation;
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="shadow-lg shadow-fuchsia-600 rounded-lg px-6 py-4 bg-purple-100">
        <TopHeading label="Sign in"></TopHeading>
        <BottomHeading label="sign in into your account"></BottomHeading>
        <InputField
          onChange={(event) => {
            setSigninInput({ ...signinInput, email: event.target.value });
          }}
          label="email"
          type="text"
        ></InputField>
        <InputField
          onChange={(event) => {
            setSigninInput({ ...signinInput, password: event.target.value });
          }}
          label="password"
          type="password"
        ></InputField>
        <ButtonToSign
          onClick={
            isPending
              ? () => null
              : async () => {
                  signinMutation.mutate(signinInput);
                }
          }
          label={
            isPending ? (
              <LoadingSpinner></LoadingSpinner>
            ) : isSuccess ? (
              "signed in successfully"
            ) : (
              "signin"
            )
          }
        ></ButtonToSign>
        {isError && (
          <ErrorMessage label={signinMutation.error.message}></ErrorMessage>
        )}
        <BottomMessage
          message="don't have an account ?"
          link="Sign Up"
          toPage="signup"
        ></BottomMessage>
      </div>
    </div>
  );
}
