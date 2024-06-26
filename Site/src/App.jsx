import { useEffect, useState } from 'react'
import {Route,Routes, useNavigate} from 'react-router-dom'
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
import {setLoggedIn, updateuserinfo} from "./redux/userauthslice"


function App() {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
     const accessToken = localStorage.getItem("accessToken");
     const user = JSON.parse(localStorage.getItem("userinfo"));
     if(accessToken !== null) {
        
        dispatch(updateuserinfo(user))
        dispatch(setLoggedIn())
     }else{
      navigate("/login")

     }
  }, [])
  return (
    <>
      
<Navbar/>
{/* <Nav/> */}
<div className='container'>

<Routes>
        <Route path='/' element={<Authguard> <Home/> </Authguard>}/>
       
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/profile/update' element={}/> */}
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
</div>
     
    </>
  )
}

export default App
