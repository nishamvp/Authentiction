import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useSelector((store) => store.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }, [user, navigate])

  if (!user) {
    return <p>Loading...</p> // Or a loading spinner
  }

  return children
}

export default ProtectedRoute
