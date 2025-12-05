import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link,  } from 'react-router';

const Myparcels = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    


    const { data: myParcel = [],refetch}=useQuery(
        { queryKey: ["myParcels", user?.email],
         queryFn: async()=>{
            const res=await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
         } }
    )




    //delete particular parcel
    const handleParcelDelete = id => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.delete(`/parcels/${id}`)
        .then(res => {
          console.log(res.data)
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire(
              "Deleted!",
              "Your parcel has been deleted.",
              "success"
            );
          }
        });
    }
  });
};
    return (
        <div className=''>
            <p className='my-5'><span className='text-secondary font-extrabold text-xl'>My Total Parcels:</span> <span
            className='font-semibold text-xl text-secondary'>{myParcel.length}</span></p>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Cost</th>
        <th>Payment</th>
        <th>Delivery Status</th>
        <th>Tracking ID</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
        {
            myParcel?.map((parcel,index)=><tr key={parcel._id} className="bg-base-200">
        <th>{index+1}</th>
        <td>{parcel.name}</td>
        <td>{parcel.cost}</td>
        <td>
          {
            parcel.paymentStatus==="paid"? 
            <span className='text-green-500'>Paid</span>:
            <Link to={`/dashboard/payment/${parcel._id}`} className='btn btn-square bg-primary text-black'>Pay</Link>

          }
        </td>
        <td>{parcel.deliveryStatus}</td>
        <Link to={`/parcel-track/${parcel.trackingId}`}>

        <td>{parcel.trackingId}</td>
        </Link>
        
        <td className='space-x-2'>
          <button className="btn btn-square hover:bg-primary"><HiMagnifyingGlass /></button>
         <button className="btn btn-square hover:bg-primary"><FiEdit /></button>
          <button className="btn btn-square hover:bg-primary" onClick={()=>handleParcelDelete(parcel._id)}><FaRegTrashAlt /></button>
        </td>
      </tr>)

        }
      
      
     
    </tbody>
  </table>
</div>
            
            
        </div>
    );
};

export default Myparcels;