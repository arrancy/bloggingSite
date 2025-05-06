import { BottomHeading } from "../components/BottomHeading";
import { BottomMessage } from "../components/BottomMessage";
import { ButtonToSign } from "../components/ButtonToSign";
import { InputField } from "../components/InputField";
import { TopHeading } from "../components/TopHeading";

export function Signup() {
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="shadow-2xl shadow-fuchsia-600 px-6 py-4 rounded-lg">
          <TopHeading label="Sign up" />
          <BottomHeading label="sign up to create your account" />
          <InputField label="name" type="text" />
          <InputField label="email" type="text" />
          <InputField label="username" type="text" />
          <InputField label="password" type="password" />
          <ButtonToSign></ButtonToSign>
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
