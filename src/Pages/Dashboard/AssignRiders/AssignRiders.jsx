import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignRiders = () => {

     const axiosSecure=useAxiosSecure()
      const modal= useRef(null);
      const [selectedParcel,setSelectedParcel]=useState(null)

     const {refetch, data: parcels = [] } = useQuery({
    queryKey: ['parcels',"pending-pickup"],
    queryFn: async () => {
        const res = await axiosSecure.get(`/parcels?deliveryStatus=pending-pickup`);
        console.log(res.data);
        return res.data;
    }
});


const { data: riders = [] } = useQuery({
    queryKey: ["riders",selectedParcel?.senderDistrict,"available"],
    //convert to boolean and have enable when selectedparcel has value
    enabled: !!selectedParcel,

    queryFn: async () => {
        const res = await axiosSecure.get(`/riders?workStatus=available&riderDistrict=${selectedParcel.senderDistrict}`);
        console.log(res.data);
        return res.data;
    }
});




const handelRider=(rider)=>{
    const riderInfo={
        
riderName:rider.riderName,
riderEmail:rider.senderEmail,
phoneNo:rider.phoneNo,
parcelId:selectedParcel._id,
riderId: rider._id,

trackingId:selectedParcel.trackingId



    }

axiosSecure.patch(`/parcels/${selectedParcel._id}`,riderInfo)
.then(res=>{
    console.log(res.data)
    if(res.data.modifiedCount>0){
                                 
                                modal.current.close();
                                refetch()
                                Swal.fire({
                                title: "Status Updated!",
                                text: "Thanks.",
                                icon: "success"
                                });
                                
                            }

})
}



const showModal=(parcel)=>{
    setSelectedParcel(parcel)
     modal.current.showModal();

}
    return (
        <div>
            <p className='text-secondary text-2xl font-semibold mb-10'>Assign Riders: {parcels.length}</p>

            <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                                </th>
                                <th>Name</th>
                                <th>Sender Email</th>
                                <th>Receiver Email</th>
                                <th>Sender Address</th>
                                <th>Receiver Address</th>
                                <th>paymentStatus</th>
                                <th>Delivery Status</th>
                                <th>trackingId</th>
                                <th>Actions</th>

            
                               
                            </tr>
                            </thead>
                            <tbody>
                        {
                parcels.map((parcel,index)=>{
                    return (
                        <tr key={parcel._id}>
                            <th>{index+1}</th>
                            <td>{parcel.name}</td>
            
                            <td>
                                {parcel.senderEmail}
                            </td>
            
                            <td>{parcel.ReceiverEmail}</td>
                            <td>Region: {parcel.senderRegion} <br /> District: {parcel.senderDistrict}</td>
                            <td>Region: {parcel.receiverRegion} <br /> District: {parcel.receiverDistrict}</td>
                            <td>{parcel.paymentStatus}</td>
                            <td>{parcel.deliveryStatus}</td>
                            <td>{parcel.trackingId}</td>
            
                            
                            <th>
                                <button onClick={()=>showModal(parcel)} className="btn  btn-xs btn-primary text-black"> Rider Info</button>
                            </th>
                        </tr>
                    );
                })
            }
            
                           
                    
                            
                            
                            </tbody>
               
                
              </table>
            </div>

            <dialog ref={modal} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    



     <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      

      {
        riders.map((rider,index)=>{
            return (
             <tr key={index}>
                <th>{index+1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.senderEmail}</td>
                <td>{rider.phoneNo}</td>
                <td><button onClick={()=>handelRider(rider)} className="btn  btn-xs btn-primary text-black">Assign Rider</button></td>
            </tr>
            )

        })
    }
     
      {/* row 2 */}
      
    </tbody>
  </table>
</div>





    
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>


            
        </div>
    );
};

export default AssignRiders;
