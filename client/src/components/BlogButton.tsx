interface BlogButtonProps {
  heading: string;
  blogContent: string;
}

export function BlogButton({ heading, blogContent }: BlogButtonProps) {
  return (
    <>
      <div className="w-1/2 mx-auto my-10 border-2 rounded-3xl border-fuchsia-300 shadow-cyan-300 shadow-lg hover:scale-101 hover:shadow-xl transition-all duration-300 ease-in-out">
        <h1 className="text-4xl font-semibold text-purple-50 text-left text-shadow-md text-shadow-fuchsia-300 px-5 rounded-t-2xl py-4">
          {heading}
        </h1>
        <div className="text-purple-300 text-xl font-medium text-left px-5 pt-3 pb-4 border-t-2 rounded-b-2xl ">
          {blogContent}
        </div>
      </div>
    </>
  );
}
