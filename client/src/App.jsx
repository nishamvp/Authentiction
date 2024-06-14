import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './components/Home'
import Register from './components/Register'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { store } from './store/store'
import About from './components/About'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Redirect from './components/Redirect'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      {/* <GoogleOAuthProvider clientId=''> */}
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Register />} />
          <Route path="/redirect" element={<Redirect />} />
        </Routes>
        {/* </GoogleOAuthProvider> */}
      </BrowserRouter>
    </Provider>
  )
}

export default App
