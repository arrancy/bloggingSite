export interface HeadingProps {
  label: string;
}
export function TopHeading({ label }: HeadingProps) {
  return (
    <h1 className="text-3xl font-bold text-center text-fuchsia-950">{label}</h1>
  );
}
