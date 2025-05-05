import { BottomHeading } from "../components/BottomHeading";
import { InputField } from "../components/InputField";
import { TopHeading } from "../components/TopHeading";

export function Signup() {
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="shadow-2xl shadow-fuchsia-800 px-6 py-4 rounded-lg">
          <TopHeading label="Sign up" />
          <BottomHeading label="sign up to create your account" />
          <InputField label="name" type="text"></InputField>
        </div>
      </div>
    </>
  );
}
