export function GradientHeading({ label }: { label: string }) {
  return (
    <>
      <div className="sm:text-6xl text-4xl font-bold bg-gradient-to-r w-7/10 sm:py-3 py-1 mx-auto from-fuchsia-800 to-violet-200 text-center  bg-clip-text text-transparent">
        {label}
      </div>
    </>
  );
}
