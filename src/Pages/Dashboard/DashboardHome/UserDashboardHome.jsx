import React from 'react';
import riderImg from "../../../assets/authImage.png"

const UserDashboardHome = () => {
    return (
         <div  className='my-10'>
             <p className='text-secondary text-2xl font-semibold mb-10'>User Dashboard</p>
              <img src={riderImg} alt="" />
        </div>
    );
};

export default UserDashboardHome;