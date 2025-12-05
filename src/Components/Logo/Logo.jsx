import React from 'react';
import logo from "../../assets/logo.png"
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/">
         <div className='flex items-end '>
            <img src={logo} alt="" />
            <p className='-ms-4 font-extrabold text-2xl'>ZapShift</p>
            
        </div></Link>
       
    );
};

export default Logo;