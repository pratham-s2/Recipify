import Landing from './pages/landing';
import Navbar from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
function App() {

  return(
    <div className="font-montserrat min-h-screen h-full text-center w-full">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route exact path='/' element={<Landing/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
