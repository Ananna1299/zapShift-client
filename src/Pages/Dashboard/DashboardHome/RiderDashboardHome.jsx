import React from 'react';
import riderImg from "../../../assets/agent-pending.png"

const RiderDashboardHome = () => {
    return (
        <div  className='my-10'>
             <p className='text-secondary text-2xl font-semibold mb-10'>Rider Dashboard</p>
             <img src={riderImg} alt="" />
        </div>
    );
};

export default RiderDashboardHome;