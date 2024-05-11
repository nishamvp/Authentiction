import React from 'react'

const Register = () => {
  return (
    <div className="flex justify-center items-center h-svh ">
      <div className="text-center bg-teal-400 sm:w-2/3 md:w-1/3 lg:w-1/3 py-3 px-5 m-3 rounded-lg text-white ">
        <h1 className=" mt-2 font-semibold text-xl ">Register</h1>
        <form className="p-5">
          <input
            className="w-full m-2 rounded-md p-2 shadow-sm bg-transparent placeholder:text-white border outline-white "
            type="text"
            placeholder="Username"
          />
          <input
            className="w-full m-2 rounded-md p-2 shadow-sm bg-transparent placeholder:text-white border outline-white"
            type="text"
            placeholder="Email"
          />
          <input
            className="w-full m-2 rounded-md p-2 shadow-sm bg-transparent placeholder:text-white border outline-white"
            type="text"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-transparent border  p-3 m-2 w-full  "
          >
            Sign Up
          </button>
          <p className=" p-2 mb-2">
            Already have an account? <span>Login here</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
