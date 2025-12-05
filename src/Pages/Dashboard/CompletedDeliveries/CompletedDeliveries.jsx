import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';

const CompletedDeliveries = () => {

    const axiosSecure=useAxiosSecure();
    const {user}=useAuth()


    const { data: completedTask = [] } = useQuery({
    queryKey: ['task',user?.email,"parcel-delivered"],
    queryFn: async () => {
        const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel-delivered`);
        console.log(res.data);
        return res.data;
    }
});

const handlePayment=(parcel)=>{
    if (parcel.senderDistrict===parcel.receiverDistrict){
        return parcel.cost*0.8

    }
    else{
         return parcel.cost*0.6

    }
}
    return (
        <div>
            <h2  className='text-secondary text-2xl font-semibold my-10'>Completed Tasks: {completedTask.length}</h2>


            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Parcel Name</th>
        <th>Created At</th>
        <th>Pickup District</th>
        <th>Cost</th>
        <th>Payout</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {
            completedTask.map((p,i)=>{
                return (
                    <tr>
                    <th>{i+1}</th>
                    <td>{p.name}</td>
                    <td>{p.createdAt}</td>
                    <td>{p.senderDistrict}</td>
                    <td>{p.cost}</td>
                    <td>{ handlePayment(p)}</td>
                    <td>
                        <button className='btn btn-primary text-black btn-xs'>Cash Out</button>
                    </td>
                    
                </tr>

                )
            }
            )
        }
      {/* row 1 */}
      
      
    </tbody>
  </table>
</div>
            
        </div>
    );
};

export default CompletedDeliveries;