import React from 'react';
import useRole from '../../../Hooks/useRole';
import AdminDashboardHome from './AdminDashboardHome';
import RiderDashboardHome from './RiderDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {

    const {isLoading,role}=useRole()
    if (isLoading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if (role.role==="admin"){
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else if (role.role==="rider"){
        return <RiderDashboardHome></RiderDashboardHome>
    }
    else{
        return <UserDashboardHome></UserDashboardHome>
    }
    
};

export default DashboardHome;