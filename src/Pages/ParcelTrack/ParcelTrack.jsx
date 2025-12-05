import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../Hooks/useAxios';


const ParcelTrack = () => {
    const {trackingId}=useParams()
    //console.log(trackingId)
    const axiosInstance=useAxios()

    const {data:trackedParcel=[]}=useQuery({
        queryKey:["tracking",trackingId],
        queryFn:async()=>{
        const res = await axiosInstance.get(`/track/${trackingId}/log`);
        console.log(res.data);
        return res.data;
        }
    })




    return (
        <div className='mt-5 min-h-screen'>

             <p className='text-secondary text-2xl font-semibold mb-10'>Tracking ID: {trackingId}</p>

             <ul className="timeline timeline-vertical">

                {trackedParcel.map((log,i)=>{
                    return (
                         <li key={i}>
    <div className="timeline-start">
        {
            new Date(log.createdAt).toLocaleString()
        }



    </div>
    <div className="timeline-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <div className="timeline-end timeline-box">{log.details}</div>
    <hr />
  </li>

                    )
                })}
 
  
</ul>

            
        </div>
    );
};

export default ParcelTrack;