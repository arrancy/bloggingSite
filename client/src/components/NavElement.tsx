import { useNavigate } from "react-router-dom";

interface NavElementProps {
  label: string;
  redirect: string;
}

export function NavElement({ label, redirect }: NavElementProps) {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-lg text-left sm:text-center sm:px-2 px-2 py-2 sm:py-0 hover:text-slate-200 hover:bg-purple-950 cursor-pointer"
      onClick={() => {
        navigate("/" + redirect);
      }}
    >
      {label}
    </div>
  );
}
