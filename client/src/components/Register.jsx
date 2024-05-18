import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { LoginUser, RegisterUser } from '../helpers/authHelpers'

const Register = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  // Handle Onchange event
  const handleOnChange = (e) => {
    pathname === '/register'
      ? setRegisterData({ ...registerData, [e.target.name]: e.target.value })
      : setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      let response
      if (pathname === '/register') {
        response = await RegisterUser(registerData)
        setRegisterData({
          name: '',
          email: '',
          password: '',
        })
      } else {
        response = await LoginUser(loginData)
        setLoginData({
          email: '',
          password: '',
        })
      }
      if (!response.success) return window.alert(response?.message)
      navigate('/')
      return window.alert(response?.message)
    } catch (error) {
      console.log(error)
      window.alert('Error: ', error)
    }
  }

  return (
    <div className="flex justify-center items-center h-svh ">
      <div className="text-center bg-teal-400 sm:w-2/3 md:w-1/3 lg:w-1/3 py-3 px-5 m-3 rounded-lg text-white ">
        <h1 className=" mt-2 font-semibold text-xl ">Register</h1>
        <form className="p-5" onSubmit={(e) => handleFormSubmit(e)}>
          {pathname === '/register' ? (
            <input
              className="w-full m-2 rounded-md p-2 shadow-sm bg-transparent placeholder:text-white border outline-white "
              type="text"
              placeholder="Username"
              name="name"
              value={registerData.name}
              onChange={(e) => handleOnChange(e)}
            />
          ) : null}
          <input
            className="w-full m-2 rounded-md p-2 shadow-sm bg-transparent placeholder:text-white border outline-white"
            type="text"
            placeholder="Email"
            name="email"
            value={
              pathname === '/register' ? registerData.email : loginData.email
            }
            onChange={(e) => handleOnChange(e)}
          />
          <input
            className="w-full m-2 rounded-md p-2 shadow-sm bg-transparent placeholder:text-white border outline-white"
            type="text"
            placeholder="Password"
            name="password"
            value={
              pathname === '/register'
                ? registerData.password
                : loginData.password
            }
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
