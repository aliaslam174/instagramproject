import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './component/Navbar';
import Navhom from './pages/Navhom';
import Nav from './component/Nav';
import Authguard from './component/Authguard';
function App() {
 

  return (
    <>
      
<Navbar/>
{/* <Nav/> */}
<div className='container'>

<Routes>
        <Route path='/' element={<Authguard> <Home/> </Authguard>}/>
        <Route path='/layout' element={<Navhom/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
</div>
     
    </>
  )
}

export default App
