import React from 'react';

import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { useLoaderData } from 'react-router';
import rider from "../../assets/agent-pending.png"
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const BeARider = () => {
  const {user}=useAuth()
   const serviceCenter=useLoaderData()
   const axiosSecure=useAxiosSecure()
  const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset
    }= useForm()

    const regionDup=serviceCenter.map(r=>r.region)
    const regions=[...new Set( regionDup)]

    //watch  region 
    const watchRegion=useWatch({control,name:"riderRegion"})

    //handle  district
    const  handleRegion=regionGet=>{
        const regionInfo=serviceCenter.filter(r=>r.region===regionGet)
        const districts=regionInfo.map(d=>d.district)
        return districts

    }

    const handleRiderApplication=(data)=>{
        //console.log(data)
        
        axiosSecure.post("/riders",data)
        .then(res=>{
            console.log(res.data)
            reset()
        })

    }




    return (
        <div className='mx-10'>
            <h2 className='font-extrabold text-3xl text-secondary mb-4 mt-24'>Be a Rider</h2>
            <p className='text-[#606060] mb-20'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <hr class="border-black opacity-10 mb-7"></hr>
            <p className='font-extrabold text-xl text-secondary mb-4 '>Tell us about yourself</p>
            <div className='flex justify-between items-center gap-20 mb-30'>

                  <form onSubmit={handleSubmit(handleRiderApplication)} className='w-full'>
                <fieldset  className="fieldset ">
                    {/*rider name */}
                <label className="label font-bold">Rider Name</label>
                <input type="text" className="input w-full" placeholder="Rider Name" 
                {...register("riderName" , { required: true, maxLength:20})} />

                {errors.riderName?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Rider name is required</p>
      )}
                {errors.riderName?.type === "maxLength" && (
                 <p className='text-red-600 font-semibold'>Maximum Length 20 characters</p>
      )}
                {/* sender Email */}

                <label className="label font-bold mt-4">Rider Email</label>
                <input type="email" className="input w-full" placeholder="Rider Email" defaultValue={user.email}
                {...register("senderEmail" , { required: true})} />

                {/* Phone No */}
                <label className="label font-bold mt-4">Rider Phone Number</label>
                <input type="number" className="input w-full" placeholder="Rider Phone Number" 
                {...register("phoneNo" , { required: true })} />

                {/* NID */}
                <label className="label font-bold mt-4">Rider NID Number</label>
                <input type="number" className="input w-full" placeholder="Rider NID Number" 
                {...register("nid" , { required: true })} />

                 {/* Rider Region */}
                <fieldset className="fieldset mt-4">
                <legend className="label font-bold">Rider Region</legend>
                <select {...register("riderRegion")} defaultValue="Pick a region" className="select w-full">
                    <option disabled={true}>Pick a region</option>
                    {
                        regions.map((r,i)=> <option key={i} value={r}>{r}</option>)
                    }
                   
                </select>
                </fieldset>

                 {/* sender District */}
                <fieldset className="fieldset mt-4">
                <legend className="label font-bold">Rider District</legend>
                <select {...register("riderDistrict")}  defaultValue="Pick a district" className="select w-full">
                    <option disabled={true}>Pick a district</option>
                    {
                        handleRegion(watchRegion).map((r,i)=> <option key={i} value={r}>{r}</option>)
                    }
                </select>
                </fieldset>
                <button className="btn bg-primary text-black mt-4 mb-7 ">Apply</button>

        

                </fieldset>
            </form>
            <figure className=''>
                <img src={rider} alt="" />
            </figure>

            </div>

          

            
        </div>
    );
};

export default BeARider;