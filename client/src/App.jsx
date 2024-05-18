import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Register} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
