import React from 'react'

const PostContainer = () => {
  return (
    <div className="bg-primary p-4 m-4 rounded-md xs:w-12/12 sm:w-8/12 md:w-6/12">
      <h1 className="text-center m-3 font-semibold text-xl text-slate-200">
        Let us Create a Post
      </h1>
      <form className="flex flex-col gap-3 text-slate-200  px-3">
        <textarea
          rows={8}
          type="text"
          placeholder="Text here.."
          className="p-2 bg-primary outline-slate-200 border border-slate-200  rounded-md"
        />
        <input
          type="text"
          placeholder="Locality here"
          className="p-2  bg-primary  outline-slate-200 border border-slate-200 rounded-md"
        />
        <button
          type="submit"
          className="text-slate-200  p-3 my-3 bg-transparent border border-slate-200 hover:bg-slate-800"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}

export default PostContainer
