import Landing from './pages/landing';
import Navbar from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shopping from './pages/shopping'

function App() {

  return(
    <div className="font-montserrat min-h-screen h-full text-center w-full">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Landing/>}/>
          <Route path='/shopping' element={<Shopping/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
