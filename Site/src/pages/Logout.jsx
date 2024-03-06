import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"

import {resetState, setLoggedOut } from "../redux/userauthslice"

function Logout() {
    const userInfo = useSelector((state) => state.userAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userinfo')
        dispatch(setLoggedOut()) 
        // dispatch(resetState())
        navigate("/");
    }, [])
   
}

export default Logout
