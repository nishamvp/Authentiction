import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/register" Component={Register } />
            <Route path="/login" Component={Login } />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App