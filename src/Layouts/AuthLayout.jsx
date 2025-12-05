import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';
import img from "../assets/authImage.png"

//min-h-[calc(100vh-80px)]

const AuthLayout = () => {
    return (
        
        <div className='flex h-[100vh] flex-col lg:flex-row'>
            <div className='flex-1'>
            <div className='w-11/12 mx-auto  py-4 '>
                 <Logo></Logo>
            </div>
              <div className='flex justify-center items-center   '>
                 <Outlet></Outlet>
              </div>
               

            </div>
            <div className='flex-1 bg-[#FAFDF0] h-full  flex items-center justify-center '>
                
                     <img src={img} alt="" className=''/>
                
               

            </div>

            
        </div>
    );
};

export default AuthLayout;