import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
    const logout = () => {
        sessionStorage.clear();
    }

    return (
        <>
            <div className="main-container navbar-container">
                <div className="container ">
                    <nav className="navbar navbar-expand-sm">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="#">Admin</Link>
                            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                                <span className="text-white"><i class="fa-solid fa-bars-staggered"></i></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-center" id="collapsibleNavbar">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/shika/product">Product</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/shika/customer">Customer</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/shika/daily-entry">DailyEntry</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/shika/report">Reports</Link>
                                    </li>
                                    <li className="nav-item dropdown d-none-desktop">
                                        <Link to="/" data-bs-toggle="dropdown" className='nav-icon pe-md-0 nav-link'>
                                            <img src={require("../img/profile-img.jpg")} className='avatar profile img-fluid rounded' alt="" />
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            {/* <Link to="/" className='dropdown-item'>Profile</Link>
                                            <Link to="/" className='dropdown-item'>Setting</Link> */}
                                            <Link to="/shika" className='dropdown-item' onClick={logout}>LogOut</Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className='d-none-mobile'>
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <Link to="/" data-bs-toggle="dropdown" className='nav-icon pe-md-0 nav-link'>
                                            <img src={require("../img/profile-img.jpg")} className='avatar profile img-fluid rounded' alt="" />
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            {/* <Link to="/shika" className='dropdown-item'>Profile</Link>
                                            <Link to="/shika" className='dropdown-item'>Setting</Link> */}
                                            <Link to="/shika" className='dropdown-item' onClick={logout}>LogOut</Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <hr className='m-0' />
        </>
    )
}

export default Navbar