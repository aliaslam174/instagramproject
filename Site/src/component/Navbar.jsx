import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import insta from '../../../instagram-wordmark.svg'

function Navbar() {
    const userInfo = useSelector((state) => state.userAuth);
   
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                <img src={insta} alt=""  width={110}/>
                    <Link className="navbar-brand" to='/layout'>
                       
                    </Link>
                   
                   
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            {
                                (userInfo.islogin !== true) ? <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">
                                        signup
                                    </Link>
                                </li>
                                </> : <li className="nav-item">
                                    <Link className="nav-link"   to='/logout'>
                                        Logout
                                    </Link>
                                </li>
                            }
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li> */}
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/signup">
                                    Signup
                                </Link>
                            </li> */}
                        </ul>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar