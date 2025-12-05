import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import { FaArrowUp } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {
  const { logout,user}=useAuth()

  const handleSignout=()=>{
    logout()
    .then((result)=>{
      console.log(result)

    })
    .catch(error=>{
      console.log(error)
    })
  }

    const links=<>
    <li><NavLink>Services</NavLink></li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li><NavLink>About Us</NavLink></li>
       <li><NavLink>Pricing</NavLink></li>
        <li><NavLink>Blog</NavLink></li>
        <li><NavLink>Contact</NavLink></li>
        <li>
        <NavLink to="/rider">Br a Rider</NavLink>
      </li>
        {
          user && <><li><NavLink to="send-parcel">Send Parcel</NavLink></li>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li></>
        }

      </>
    return (
        <div className="navbar bg-base-100 shadow-sm rounded-xl px-4 mb-4 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
    <Logo></Logo>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-gray-400">
        {links}
      
    </ul>
  </div>
  <div className="navbar-end">
    {user?
    <button onClick={handleSignout}  className="btn text-gray-500 bg-white rounded-xl font-semibold mr-2">Signout</button>
    :
     <Link to="/login" className="btn text-gray-500 bg-white rounded-xl font-semibold mr-2">
    Sign In</Link>
    }
    
    <Link to="/register" className="btn my-btn text-black rounded-xl font-semibold mr-2">Sign Up</Link>
    <div className="p-2 rounded-full bg-black text-primary">
  <FaArrowUp className='rotate-45'/>
</div>
  </div>
</div>
    );
};

export default Navbar;