import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.auth)
  const token = localStorage.getItem('Access-token')

  useEffect(() => {
    if (!token ) {
      navigate('/login')
    }
  }, [token, navigate])

  if (!token) {
    return <p>Loading...</p> // Or a loading spinner
  }

  return <Outlet />
}

export default ProtectedRoute
