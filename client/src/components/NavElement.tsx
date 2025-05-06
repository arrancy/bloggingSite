interface NavElementProps {
  label: string;
}

export function NavElement({ label }: NavElementProps) {
  return (
    <div className="rounded-lg sm:px-2 px-2 hover:text-slate-200 hover:bg-purple-950 cursor-pointer">
      {label}
    </div>
  );
}
