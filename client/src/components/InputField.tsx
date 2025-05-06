interface InputFieldProps {
  label: string;
  type: "text" | "password";
}

export function InputField({ label, type }: InputFieldProps) {
  return (
    <div className="py-1.5">
      <label className="font-semibold text-fuchsia-700 ">{label}</label>
      <input
        className="w-full pl-1  bg-white text-fuchsia-900 rounded-lg border-2 border-purple-500 outline-none focus:ring-purple-800 focus:border-purple-800  focus:ring-1  transition-all ease-in-out duration-100"
        type={type}
      ></input>
    </div>
  );
}
