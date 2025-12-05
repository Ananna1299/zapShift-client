import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccessful = () => {
    const [searchParams] = useSearchParams();
    const sessionId=searchParams.get("session_id")
    const [paymentInfo,setPaymentInfo]=useState({})
    const axiosSecure=useAxiosSecure();

    useEffect(()=>{
        if (sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data)
                setPaymentInfo({
                    transactionId:res.data.transactionId,
                    trackingId:res.data. trackingId


                })
            })
        }
    },[sessionId,axiosSecure])




    //console.log(sessionId)
    console.log(paymentInfo)
    return (
        <div className='flex flex-col justify-center items-center my-5'>
            <p className='text-secondary text-2xl font-semibold '>Payment Successful</p>
            <p><span className='font-bold'>Transaction Id: </span>{paymentInfo.transactionId}</p>
            <p><span  className='font-bold'>Tracking Id:</span> {paymentInfo.trackingId}</p>
            
        </div>
    );
};

export default PaymentSuccessful;