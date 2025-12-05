import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignedTask = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()

     const {refetch,data: parcel = [] } = useQuery({
    queryKey: ['parcel', user?.email, ],
    queryFn: async () => {
        const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver-assigned`);
        console.log(res.data);
        return res.data;
    }
});

const handleDeliverStatus=(p,status)=>{
    const statusInfo={
        deliveryStatus:status,
        riderId:p.riderId,
        trackingId:p.trackingId

}
    const message=`The delivery status is ${status}`
    axiosSecure.patch(`/parcels/${p._id}/status`,statusInfo)
    .then(res=>{
        if (res.data.modifiedCount>1){
            refetch()
            Swal.fire({
            title: message,
            text: "Thanks.",
            icon: "success"
            });
        }
    })
}

//reject the parcel request

const handleReject = (p) => {
    const riderInfo={
        riderId:p.riderId
        
    }
  axiosSecure.patch(`/parcels/${p._id}/reject`,riderInfo)
    .then(res => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Task Rejected",
          text: "Parcel is now available for reassignment.",
          icon: "warning"
        });
      }
    })
}

    return (
        <div className='mt-5'>
             <p className='text-secondary text-2xl font-semibold mb-10'>Assigned Tasks: {parcel.length}</p>

            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Parcel Name</th>
        <th>Receiver Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {
            parcel.map((p,i)=>{
                return (
                    <tr>
                    <th>{i+1}</th>
                    <td>{p.name}</td>
                    <td>{p.ReceiverEmail}</td>
                    <td className='space-x-1.5'>
                        {
                            p.deliveryStatus==="driver-assigned"?
                            <>
                             <button onClick={()=>handleDeliverStatus(p,"rider-arriving")} className='btn btn-primary text-black btn-xs'>Accept</button>
                        <button
                            onClick={() => handleReject(p)}
                            className='btn btn-secondary text-white btn-xs'
                            >
                            Reject
                            </button>
                            </>:
                            "Accepted"
                        }
                       
                    </td>
                    <td className='space-x-1.5'>
                        {
                           p.deliveryStatus==="rider-arriving"  ? <>
                           <button onClick={()=>handleDeliverStatus(p,"parcel-pickedup")}  className='btn btn-primary text-black btn-xs'>Parcel Pickup</button></>:
                           <p>Picked the Parcel</p>
                        }
                        
                        <button onClick={()=>handleDeliverStatus(p,"parcel-delivered")}  className='btn btn-primary text-black btn-xs'>Parcel Deliver</button>
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

export default AssignedTask;