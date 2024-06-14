import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GoogleSignIn, LoginUser, RegisterUser } from '../helpers/authHelpers'
import { login } from '../store/authSlice'

const Register = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('Access-token')
  const searchParams = new URLSearchParams(window.location.search)

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
    const accessToken = searchParams.get('accessToken')
    if (accessToken) localStorage.setItem('Access-token', accessToken)

    if (token) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [token])

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

  const handleGoogleSignIn = async () => {
    try {
      const signInObj = await GoogleSignIn()
      window.location.href = signInObj.url
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="px-5 py-3 m-3 text-center text-white bg-teal-400 rounded-lg sm:w-2/3 md:w-1/3 lg:w-1/3">
        <h1 className="mt-2 text-xl font-semibold">
          {pathname === '/register' ? 'Register' : 'Login'}
        </h1>
        <form className="p-5" onSubmit={handleFormSubmit}>
          {pathname === '/register' && (
            <input
              className="w-full p-2 m-2 bg-transparent border rounded-md shadow-sm placeholder:text-white outline-white"
              type="text"
              placeholder="Username"
              name="name"
              value={registerData.name}
              onChange={handleOnChange}
            />
          )}
          <input
            className="w-full p-2 m-2 bg-transparent border rounded-md shadow-sm placeholder:text-white outline-white"
            type="email"
            placeholder="Email"
            name="email"
            value={
              pathname === '/register' ? registerData.email : loginData.email
            }
            onChange={handleOnChange}
          />
          <input
            className="w-full p-2 m-2 bg-transparent border rounded-md shadow-sm placeholder:text-white outline-white"
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
            className="w-full p-3 m-2 bg-transparent border"
          >
            {pathname === '/register' ? 'Sign Up' : 'Login'}
          </button>
          <p className="p-2 mb-2">
            {pathname === '/register'
              ? 'Already have an account? Login here'
              : "Don't have an account? Register here"}
          </p>
        </form>
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      </div>
    </div>
  )
}

export default Register
