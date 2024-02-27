import { useEffect, useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import Navbar from './component/Navbar';
import Navhom from './pages/Navhom';
import Nav from './component/Nav';
import Authguard from './component/Authguard';
import { useDispatch } from 'react-redux';
import {setLoggedIn} from "./redux/userauthslice"

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
     const accessToken = localStorage.getItem("accessToken");
     if(accessToken !== null) {
        dispatch(setLoggedIn())
     }
  }, [])
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
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
</div>
     
    </>
  )
}

export default App
