import { AlertTriangle, NotebookPen } from "lucide-react";

export function DashboardBlogElement() {
  return (
    <div className="text-left bg-inherit mt-16 w-[70%] mx-auto">
      <div className="flex justify-between w-[97%]">
        <div className="flex space-x-3 bprder border-b-3 w-fit border-b-purple-500 drop-shadow-blue-400 drop-shadow-2xl">
          <NotebookPen className="h-10 text-neutral-50 "></NotebookPen>
          <div className="text-3xl font-semibold text-green-300">
            hey this is my first blog
          </div>
        </div>
        <div className=" flex space-x-1 border-2 rounded-lg border-amber-800 px-2 pt-1 ">
          <div className="text-2xl font-semibold text-red-200">draft</div>
          <AlertTriangle className=" h-9 text-amber-900"> </AlertTriangle>
        </div>
      </div>

      <div className="text-cyan-700 text-xl font-medium mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
        similique dolorem molestias, dicta sapiente pariatur quisquam a
        praesentium itaque! Labore saepe ab deserunt voluptas ducimus dolores
        eveniet libero corrupti possimus.
      </div>
    </div>
  );
}
