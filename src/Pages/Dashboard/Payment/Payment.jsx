import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {
    const {parcelId}=useParams()
      const axiosSecure=useAxiosSecure()

      const { data:parcel,isLoading}= useQuery({
         queryKey: ['parcel',parcelId],
          queryFn: async () => {
            const res = await axiosSecure.get(`parcels/${parcelId}`)
            //console.log(res.data)
            return res.data
  },
      })

      const handlePayment=async()=>{
        const paymentInfo={
          cost:parcel.cost,
          senderEmail:parcel.senderEmail,
          parcelId:parcel._id,
          name:parcel.name,
          receiverEmail:parcel.ReceiverEmail
        }
        const res=await axiosSecure.post("/create-checkout-session",paymentInfo)
        console.log(res.data)
        window.location.href=res.data.url
      }

      if (isLoading){
        return <span className="loading loading-spinner loading-xl"></span>

      } 


    
    return (
        <div className='text-center mt-3'>
            <h1 className='mb-2'><span className='text-secondary text-xl font-bold'>Parcel Name:</span> {parcel.name}</h1>
             <button onClick={handlePayment}  className='btn  bg-primary text-black'>Pay</button>
          
            
            
        </div>
    );
};

export default Payment;