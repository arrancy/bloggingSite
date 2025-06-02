import { memo, useEffect, useState } from "react";
interface ErrorMessageProps {
  label: string;
}

export const ErrorMessage = memo(({ label }: ErrorMessageProps) => {
  const [isShowing, setIsShowing] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShowing(false);
    }, 3000);
  }, []);
  return (
    isShowing && (
      <>
        <div className=" text-red-500 text-md text-center mt-1 transition-all ease-in-out duration-200">
          {label}
        </div>
      </>
    )
  );
});
