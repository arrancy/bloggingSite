import { BottomHeading } from "../components/BottomHeading";
import { BottomMessage } from "../components/BottomMessage";
import { ButtonToSign } from "../components/ButtonToSign";
import { InputField } from "../components/InputField";
import { TopHeading } from "../components/TopHeading";

export function Signin() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="shadow-lg shadow-fuchsia-600 rounded-lg px-6 py-4">
        <TopHeading label="Sign in"></TopHeading>
        <BottomHeading label="sign in into your account"></BottomHeading>
        <InputField label="email" type="text"></InputField>
        <InputField label="password" type="password"></InputField>
        <ButtonToSign label="Sign In"></ButtonToSign>
        <BottomMessage
          message="don't have an account ?"
          link="Sign Up"
          toPage="signup"
        ></BottomMessage>
      </div>
    </div>
  );
}
