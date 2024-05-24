import React, { useState } from 'react'
import { CreatePost } from '../helpers/postHelpers'

const PostContainer = () => {
  const [post, setPost] = useState({
    post: '',
    location: '',
  })

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!post.post || !post.location)return  window.alert('All fields required')
    try {
      const response = await CreatePost(post)
      if(response.success) window.alert("Post created successfully")
      else window.alert("ERROR in creating post")
    } catch (error) {
      return window.alert('Error in createing a post')
    }
  }
  return (
    <div
      className="p-4 m-4 rounded-md shadow-lg bg-primary xs:w-12/12 sm:w-8/12 md:w-6/12"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className="m-3 text-xl font-semibold text-center text-slate-200">
        Let us Create a Post
      </h1>
      <form className="flex flex-col gap-3 px-3 text-slate-200">
        <textarea
          rows={8}
          type="text"
          placeholder="Text here.."
          className="p-2 border rounded-md bg-primary outline-slate-200 border-slate-200"
          onChange={(e) => handleChange(e)}
          name="post"
          value={post.post}
        />
        <input
          type="text"
          placeholder="Locality here"
          className="p-2 border rounded-md bg-primary outline-slate-200 border-slate-200"
          onChange={(e) => handleChange(e)}
          name="location"
          value={post.location}
        />
        <button
          type="submit"
          className="p-3 my-3 bg-transparent border text-slate-200 border-slate-200 hover:bg-slate-800"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}

export default PostContainer
