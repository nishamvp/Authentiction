import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser, RegisterUser } from '../helpers/authHelpers'
import { login } from '../store/authSlice'

const Register = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.auth)
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  const handleOnChange = (e) => {
    if (pathname === '/register') {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    } else {
      setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
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

      if (!response.success) {
        return window.alert(response?.message || 'An error occurred')
      }

      dispatch(login(response))
      navigate('/')
      window.alert(response?.message || 'Success')
    } catch (error) {
      console.error('Error:', error)
      window.alert('Error: ' + (error.message || 'An error occurred'))
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center bg-teal-400 sm:w-2/3 md:w-1/3 lg:w-1/3 py-3 px-5 m-3 rounded-lg text-white">
        <h1 className="mt-2 font-semibold text-xl">
          {pathname === '/register' ? 'Register' : 'Login'}
        </h1>
        <form className="p-5" onSubmit={handleFormSubmit}>
          {pathname === '/register' && (
            <input
              className="w-full m-2 rounded-md p-2 shadow-sm bg-transparent placeholder:text-white border outline-white"
              type="text"
              placeholder="Username"
              name="name"
              value={registerData.name}
              onChange={handleOnChange}
            />
          )}
          <input
            className="w-full m-2 rounded-md p-2 shadow-sm bg-transparent placeholder:text-white border outline-white"
            type="email"
            placeholder="Email"
            name="email"
            value={
              pathname === '/register' ? registerData.email : loginData.email
            }
            onChange={handleOnChange}
          />
          <input
            className="w-full m-2 rounded-md p-2 shadow-sm bg-transparent placeholder:text-white border outline-white"
            type="password"
            placeholder="Password"
            name="password"
            value={
              pathname === '/register'
                ? registerData.password
                : loginData.password
            }
            onChange={handleOnChange}
          />
          <button
            type="submit"
            className="bg-transparent border p-3 m-2 w-full"
          >
            {pathname === '/register' ? 'Sign Up' : 'Login'}
          </button>
          <p className="p-2 mb-2">
            {pathname === '/register'
              ? 'Already have an account? Login here'
              : "Don't have an account? Register here"}
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
