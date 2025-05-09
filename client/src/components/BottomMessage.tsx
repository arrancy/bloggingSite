interface BottomMessageProps {
  message: string;
  link: string;
  toPage: "signin" | "signup";
}

export function BottomMessage({ message, link, toPage }: BottomMessageProps) {
  return (
    <div className="font-medium text-center text-purple-400 mt-3  text-shadow-gray-400 text-lg ">
      {message}
      <br></br> click here to{" "}
      <a
        className="underline hover:text-purple-500 transition-all ease-in-out duration-150"
        href={`/${toPage}`}
      >
        {link}
      </a>
    </div>
  );
}
