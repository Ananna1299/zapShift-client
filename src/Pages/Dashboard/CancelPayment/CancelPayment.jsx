import React from 'react';

const CancelPayment = () => {
    return (
        <div className='flex justify-center items-center my-5'>
            <p className='text-secondary text-2xl font-semibold my-4'>Payment Cancelled</p>
            <Link to="/dashboard/my-parcel">Try Again</Link>
            
        </div>
    );
};

export default CancelPayment;