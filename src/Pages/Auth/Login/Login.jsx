import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import GoogleLogin from '../SocialLogin/GoogleLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {

    const {signIn}=useAuth()

    const location=useLocation()
    //console.log(location)
    const navigate=useNavigate()

    const [showpassword,setShowPassword]=useState(true)
    
        const handleShowpassword=(e)=>{
            e.preventDefault()
            setShowPassword(!showpassword)
        }




    const {register,
        handleSubmit,
        formState: { errors },
        reset

    }=useForm()

    const handleLogin=(data)=>{
        //console.log(data)
        signIn(data.email,data.password)
        .then(result=>{
            console.log(result)
            navigate(`${location.state? location.state : "/"}`)
            reset();
        })
        .catch(error=>{
            console.log(error)
        })
        
    }
    return (
        <div className="w-full max-w-sm shrink-0 ">
            <h1 className='font-extrabold text-3xl'>Welcome Back</h1>
            <p className='text-sm mt-2'>Login with ZapShift</p>
            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">

                 {/* email    */}
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" 
                {...register("email" , { required: true })} />

                {errors.email?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Email is required</p>
      )}

                

                {/* password */}
                <label className="label">Password</label>
                <div className='relative'>
                    <input type="password" className="input" placeholder="Password" 
                {...register("password" , 
                { required: true,
                minLength:6,
                pattern:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/ })}/>
                <button onClick={handleShowpassword} className="btn btn-xs absolute top-1.5 right-5">
                                    {showpassword?<FaEye />:<FaEyeSlash />}
                
                                </button>

                </div>
                
                {/* errors */}
                {errors.password?.type === "minLength" && (
                 <p className='text-red-600 font-semibold'>Password should be at least 6 characters</p>
                )}

                {errors.password?.type === "required" && (
                <p className='text-red-600 font-semibold'>Password is required</p>
                )}

                {errors.password?.type === "pattern" && (
                <p className='text-red-600 font-semibold'>Password should have at least one uppercase , at least one lowercase, at least one digit and at least one special character</p>
                )}


                {/* forget pass */}
                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn bg-primary text-black mt-4 ">Login</button>
                 <p>Don't have an account? <Link className='text-primary' to="/register"> Register</Link></p>
                </fieldset>
            </form>
            <GoogleLogin></GoogleLogin>
    </div>
    );
};

export default Login;