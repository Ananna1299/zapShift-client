import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';

const PaymentHistory = () => {
    const {user}=useAuth()

    const axiosSecure=useAxiosSecure()

    const { data: payment = [] } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        console.log(res.data);
        return res.data;
    }
});

    return (
        <div>
            <p className='font-bold'><span  className='text-secondary text-2xl font-semibold '>Total Parcel:</span> {payment.length}</p>

            <div className='mt-10'>
                <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Parcel Info</th>
        <th>Recipient Email</th>
        <th>Tracking Number</th>
        <th>Transaction ID</th>
        <th>Payment Info</th>
      </tr>
    </thead>
    <tbody>
        {
            payment.map((history,index)=>{
                return (
                <tr key={index}>
                <td>{index+1}</td>
                <td>{history.parcelName}</td>
                <td>{history.receiverEmail}</td>
                <td>{history.trackingId}</td>
                <td>{history.transactionId} </td>
                <td>{history.paymentStatus} (cost: {history.amount})</td>
            </tr>
                )

            })

        }
     
     

    </tbody>
  </table>
</div>
            </div>
            
        </div>
    );
};

export default PaymentHistory;