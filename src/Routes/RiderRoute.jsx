import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Forbidden from '../Components/Forbiddden/Forbidden';

const RiderRoute = ({children}) => {

    const {loading}=useAuth()
    const {role,isLoading}=useRole()

     if (loading || isLoading ){
        return <span className="loading loading-spinner loading-xl"></span>
     }


   if (role.role!=="rider"){
        return <Forbidden></Forbidden>
    }

    return children
    
};

export default RiderRoute;