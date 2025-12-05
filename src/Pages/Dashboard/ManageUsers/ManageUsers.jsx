import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUserCheck, FaUserMinus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useState } from 'react';

const ManageUsers = () => {

    const axiosSecure=useAxiosSecure()
    const [searchText,setSearchText]=useState("")

    const { refetch,data: users = [] } = useQuery({
    queryKey: ['users',searchText],
    queryFn: async () => {
        const res = await axiosSecure.get(`/users?searchText=${searchText}`);
        console.log(res.data);
        return res.data;
    }
});

//set as admin
const handleMakeAdmin=(user)=>{
    const roleInfo={role:"admin"}

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, make admin !"
      }).then((result) => {

     if (result.isConfirmed) {
         axiosSecure.patch(`/users/${user._id}/role`,roleInfo)
    .then(res=>{
        console.log("after update the data",res.data)
                                if (res.data.modifiedCount){
                                    refetch()
                                    Swal.fire({
                                    title: `${user.displayName} assigned as admin`,
                                    text: "Thanks.",
                                    icon: "success"
                                    });
                                    
                                }
    })
     }   

   
        });
    
}


const handleRemoveAdmin=(user)=>{
    const roleInfo={role:"user"}
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove from admin!"
      }).then((result) => {

         if (result.isConfirmed) {
               axiosSecure.patch(`/users/${user._id}/role`,roleInfo)
    .then(res=>{
        console.log("after update the data",res.data)
                                if (res.data.modifiedCount){
                                    refetch()
                                    Swal.fire({
                                    title: `${user.displayName} removed from admin`,
                                    text: "Thanks.",
                                    icon: "success"
                                    });
                                    
                                }
    })
         }

 
        });

}
    return (
        <div>
            <p className='text-secondary text-2xl font-semibold '>Manage Users</p>
            

            <label className="input my-5">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
                >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input onChange={(e)=>setSearchText(e.target.value)} type="search" required placeholder="Search" />
            </label>


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
                     <th>Photo</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Admin Actions</th>
                    <th>Other Actions</th>

                   
                </tr>
                </thead>
                <tbody>
            {
    users.map((user,index)=>{
        return (
            <tr key={user._id}>
                <th>{index+1}</th>
                <td>{user.displayName}</td>

                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img src={user.photoURL} alt="user photo" />
                            </div>
                        </div>
                    </div>
                </td>

                <td>{user.email}</td>
                <td>{user.role}</td>

                <td className='space-x-2'>
                                        {user.role==="admin"?
                                        <button onClick={()=>handleRemoveAdmin(user)}  className="btn btn-square hover:bg-primary"><FaUserMinus /></button>:
                                        <button onClick={()=>handleMakeAdmin(user)}
                                           className="btn btn-square hover:bg-primary"><FaUserCheck /></button>
                                        }
                                          
                
                                         
                                         
                                        </td>
                <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                </th>
            </tr>
        );
    })
}

               
        
                
                
                </tbody>
   
    
  </table>
</div>
            
        </div>
    );
};

export default ManageUsers;