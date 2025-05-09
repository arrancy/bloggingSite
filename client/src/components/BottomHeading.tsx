import { HeadingProps } from "./TopHeading";

export function BottomHeading({ label }: HeadingProps) {
  return (
    <div className="text-center text-purple-400 text-lg font-semibold text-opacity-100">
      {label}
    </div>
  );
}
