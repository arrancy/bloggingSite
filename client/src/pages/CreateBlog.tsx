export function CreateBlog() {
  return (
    <div className="min-h-screen flex pt-6 flex-col w-screen  bg-purple-100">
      <div className=" w-3/4 flex flex-col flex-1  mx-auto">
        <div className="w-full flex flex-row shadow-fuchsia-700 shadow-md rounded-lg px-4 py-4">
          <textarea
            className="flex-1 resize-none focus:outline-none text-4xl font-bold text-slate-950 "
            placeholder="enter your title here"
          ></textarea>
          <button className="bg-fuchsia-900 font-bold text-lg px-3 rounded-3xl my-3  text-fuchsia-100 ">
            done
          </button>
        </div>
        <div className=" flex flex-row flex-1 my-6 rounded-lg shadow-fuchsia-900 shadow-md ">
          <textarea
            className=" flex-1 resize-none px-4 py-2 text-lg font-semibold text-slate-800 focus:outline-none"
            placeholder="enter your blog text here"
          ></textarea>
          <div className="">
            <button className="font-semibold text-fuchsia-950 text-xl bg-fuchsia-200 p-4 rounded-2xl hover:cursor-pointer hover:bg-fuchsia-300 relative mx-2 top-[88%]">
              done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
