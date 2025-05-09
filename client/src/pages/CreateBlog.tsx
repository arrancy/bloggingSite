export function CreateBlog() {
  return (
    <div className="min-h-screen flex pt-6 flex-col w-screen  bg-purple-100">
      <div className=" w-3/4 flex flex-col flex-1  mx-auto">
        <div className="w-full flex flex-row shadow-fuchsia-700 shadow-md rounded-lg px-4 py-4">
          <textarea
            className="flex-1 resize-none focus:outline-none text-4xl font-bold text-fuchsia-900 "
            placeholder="enter your title here"
          ></textarea>
          <button className="bg-fuchsia-900 font-bold text-lg px-3 rounded-3xl my-3  text-fuchsia-100 ">
            done
          </button>
        </div>
      </div>
    </div>
  );
}
