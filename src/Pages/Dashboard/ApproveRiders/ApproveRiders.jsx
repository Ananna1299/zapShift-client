import React, { useRef, useState } from 'react';

import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { HiMagnifyingGlass } from 'react-icons/hi2';


import { FaRegTrashAlt, FaTrash } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { ImCross } from 'react-icons/im';

const ApproveRiders = () => {

    

    const axiosSecure=useAxiosSecure()

    const modal= useRef(null);
    const [selectedRider, setSelectedRider] = useState(null);


    const { refetch,data: rider = [] } = useQuery({
    queryKey: ['riders', "pending" ],
    queryFn: async () => {
        const res = await axiosSecure.get(`/riders`);
        console.log(res.data);
        return res.data;
    }
});

const updateRiderStatus=(rider,status)=>{
    const updateInfo={status:status, email:rider.senderEmail};
    axiosSecure.patch(`/riders/${rider._id}`,updateInfo)
    .then(res=>{
        console.log("after update the data",res.data)
                        if (res.data.modifiedCount){
                             refetch()
                            Swal.fire({
                            title: "Status Updated!",
                            text: "Thanks.",
                            icon: "success"
                            });
                            
                        }

    })
}

const handleRejectRider=(rider)=>{
    updateRiderStatus(rider,"reject")


}

const handleApproveRider=(rider)=>{
     updateRiderStatus(rider,"approved")

}
const handleDeleteRider=(id)=>{
    axiosSecure.delete(`/riders/${id}`)
    .then(res=>{
        console.log(res.data)
        refetch()
    })



}

//for open the modal
const handleModalOpen=()=>{
    modal.current.showModal();
}

const handleCloseModal=()=>{
    modal.current.close();
}


    return (
        <div>
            <p className='font-bold'><span  className='text-secondary text-2xl font-semibold '>Total Riders:</span> {rider.length}</p>

            <div className='mt-10'>
                <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Rider Name</th>
        <th>Rider Email</th>
        <th>Contact No.</th>
        <th>Region</th>
        <th>District</th>
        <th>Status</th>
        <th>Work Status</th>

        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
        {
            rider.map((r,index)=>{
                return (
                <tr key={index}>
                <td>{index+1}</td>
                <td>{r.riderName}</td>
                <td>{r.senderEmail}</td>
                <td>{r.phoneNo}</td>
                <td>{r.riderRegion} </td>
                <td>{r.riderDistrict} </td>
                <td>{r.status} </td>
                <td>{r.workStatus} </td>
                <td className='space-x-2'>
                          <button  onClick={() => {setSelectedRider(r);handleModalOpen();}}
                           className="btn btn-square hover:bg-primary"><HiMagnifyingGlass /></button>

                         <button onClick={()=>handleApproveRider(r)} className="btn btn-square hover:bg-primary"><FaCircleCheck /></button>
                          <button className="btn btn-square hover:bg-primary" onClick={()=> handleRejectRider(r)}><ImCross /></button>
                           <button className="btn btn-square hover:bg-primary" onClick={()=> handleDeleteRider(r._id)}><FaTrash /></button>
                        </td>
                        
            </tr>
                )

            })

        }
     
     

    </tbody>
  </table>
</div>
            </div>
            
        

        {/* modal */}

        <dialog ref={modal} className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Rider Details</h3>
    {selectedRider && (
      <div>
        <p>Name: {selectedRider.riderName}</p>
        <p>Email: {selectedRider.senderEmail}</p>
        <p>Contact No.: {selectedRider.phoneNo}</p>
        <p>Region: {selectedRider.riderRegion}</p>
        <p>District: {selectedRider.riderDistrict}</p>
      </div>
    )}
    <p className="py-4">Click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button onClick={handleCloseModal} className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
            
        </div>
    );
};

export default ApproveRiders;