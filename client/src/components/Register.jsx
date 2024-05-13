import React, { useState } from 'react'
import { AUTH_BASE_URL } from '../constants'
import {useNavigate} from 'react-router-dom'


const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  // Handle Onchange event
  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(AUTH_BASE_URL + 'register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(form),
      })
      const json = await response.json()
      if (!json.success) return window.alert(json?.message)
      else return window.alert(json?.message) && navigate('/')
    } catch (error) {
      window.alert('Error: ', error)
    }
  }

  return (
    <div className="flex justify-center items-center h-svh ">
      <div className="text-center bg-teal-400 sm:w-2/3 md:w-1/3 lg:w-1/3 py-3 px-5 m-3 rounded-lg text-white ">
        <h1 className=" mt-2 font-semibold text-xl ">Register</h1>
        <form className="p-5" onSubmit={(e) => handleFormSubmit(e)}>
          <input
            className="w-full m-2 rounded-md p-2 shadow-sm bg-transparent placeholder:text-white border outline-white "
            type="text"
            placeholder="Username"
            name="name"
            value={form.name}
            onChange={(e) => handleOnChange(e)}
          />
          <input
            className="w-full m-2 rounded-md p-2 shadow-sm bg-transparent placeholder:text-white border outline-white"
            type="text"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={(e) => handleOnChange(e)}
          />
          <input
            className="w-full m-2 rounded-md p-2 shadow-sm bg-transparent placeholder:text-white border outline-white"
            type="text"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={(e) => handleOnChange(e)}
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
