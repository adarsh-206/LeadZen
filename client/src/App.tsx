import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/:id' element={<User />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
