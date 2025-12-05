import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const SendAParcel = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const serviceCenter=useLoaderData()
    //console.log(serviceCenter)
    const navigate=useNavigate()

    const regionDup=serviceCenter.map(regionN=>regionN.region)
    //console.log(regionDup)
    const regions=[...new Set( regionDup)]
    //console.log(regions)

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    }= useForm()

    //watch sender region 
    const senderRegion=useWatch({control,name:"senderRegion"})

    //watch receiver region 
    const receiverRegion=useWatch({control,name:"receiverRegion"})

    //handle sender district
    const handleSenderRegion=regionGet=>{
        const regionInfo=serviceCenter.filter(r=>r.region===regionGet)
        const districts=regionInfo.map(d=>d.district)
        return districts

    }

    //handle receiver district
    const handleReceiverRegion=regionGet=>{
        const regionInfo=serviceCenter.filter(r=>r.region===regionGet)
        const districts=regionInfo.map(d=>d.district)
        return districts

    }

    const handleParcel=(data)=>{
        console.log(data)
        const {parcelType,receiverDistrict,weight,senderDistrict}=data

        let taka=0;
        const isDocument=parcelType=="document";
        const isSameDistrict=senderDistrict===receiverDistrict;

        if (isDocument){
            taka=isSameDistrict? 60: 80;
        }

        if (!isDocument){
            if (Number(weight)<=3){
                taka=isSameDistrict? 110:150
            }
            else{
                const weightNum=Number(weight);
                if(isSameDistrict){
                    taka=110+ ((weightNum-3)*40)
                }
                else{
                    taka=150+((weightNum-3)*40)+40
                }
            }
        }
        //console.log(taka)
        data.cost=taka;
          

        Swal.fire({
        title: "Are you agree with the cost?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
        }).then((result) => {
        if (result.isConfirmed) {
          
            axiosSecure.post("/parcels",data)
            .then(res=>{
                console.log("after saving the data",res.data)
                if (res.data.insertedId){
                    Swal.fire({
                    title: "Confirmed!",
                    text: "Thanks.",
                    icon: "success"
                    });
                    navigate("/dashboard/my-parcel")
                }
            })

            

        }
        });

        
    }
    return (
        <div>
            <h1 className='text-secondary font-extrabold text-5xl my-10'>Send A Parcel</h1>
            <p className='text-secondary font-extrabold text-xl mb-7'>Enter your parcel detail</p>
             <hr class="border-black opacity-10 mb-7"></hr>

            <form onSubmit={handleSubmit(handleParcel)}>
                {/* document */}
                <div className='mb-7'>
                     <label className="label mr-5">
                        <input type="radio" {...register("parcelType",{ required: true })} className="radio radio-secondary" defaultChecked value="document" /> 
                        Document</label>

                      <label className="label"><input type="radio"  className="radio radio-secondary" {...register("parcelType",{ required: true })} value="non-document"  />Non-Document</label>

                </div>
                {/* parcel name and weight */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-7'>
                <fieldset className="fieldset ">
                <label className="label font-bold">Parcel Name</label>
                <input type="text" className="input w-full" placeholder="Parcel Name" 
                {...register("name" , { required: true })} />

                {errors.name?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Parcel name is required</p>
      )}
                </fieldset>

                <fieldset className="fieldset ">
                <label className="label font-bold">Parcel Weight (KG)</label>
                <input type="number" className="input w-full" placeholder="Parcel Weight (KG)" 
                {...register("weight" , { required: true })} />

                {errors.weight?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Parcel weight is required</p>
      )}
                </fieldset>
               </div>
                <hr class="border-black opacity-10 mb-7"></hr>


                {/* sender and receiver details */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    

                <div>
                {/* sender details */}
                <h1 className='font-extrabold text-secondary text-xl'>Sender Details</h1>

                <fieldset className="fieldset ">
                {/*sender name */}
                <label className="label font-bold">Sender Name</label>
                <input type="text" className="input w-full" placeholder="Sender Name" 
                {...register("senderName" , { required: true, maxLength:20})} />

                {errors.senderName?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Sender name is required</p>
      )}
                {errors.senderName?.type === "maxLength" && (
                 <p className='text-red-600 font-semibold'>Maximum Length 20 characters</p>
      )}
                {/* sender Email */}

                <label className="label font-bold mt-4">Sender Email</label>
                <input type="email" className="input w-full" placeholder="Sender Email" defaultValue={user.email}
                {...register("senderEmail" , { required: true})} />


                {/*sender Phone No */}
                <label className="label font-bold mt-4">Sender Phone Number</label>
                <input type="number" className="input w-full" placeholder="Sender Phone Number" 
                {...register("sPhoneNo" , { required: true, minLength:11,maxLength:11 })} />

                {errors.sPhoneNo?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Sender Phone Number is required</p>
      )}
                {errors.sPhoneNo?.type === "maxLength" && (
                 <p className='text-red-600 font-semibold'>Invalid Phone Number</p>
      )}
                 {errors.sPhoneNo?.type === "minLength" && (
                 <p className='text-red-600 font-semibold'>Invalid Phone Number</p>
      )}

            {/* sender Region */}
                <fieldset className="fieldset mt-4">
                <legend className="label font-bold">Sender Region</legend>
                <select {...register("senderRegion")} defaultValue="Pick a rigion" className="select w-full">
                    <option disabled={true}>Pick a region</option>
                    {
                        regions.map((r,i)=> <option key={i} value={r}>{r}</option>)
                    }
                   
                </select>
                </fieldset>

            {/* sender District */}
                <fieldset className="fieldset mt-4">
                <legend className="label font-bold">Sender District</legend>
                <select {...register("senderDistrict")}  defaultValue="Pick a district" className="select w-full">
                    <option disabled={true}>Pick a district</option>
                    {
                        handleSenderRegion(senderRegion).map((r,i)=> <option key={i} value={r}>{r}</option>)
                    }
                </select>
                </fieldset>
                {/* Parcel sending Instruction */}
                <fieldset className="fieldset mt-4">
                <legend className="label">Pickup Instructions</legend>
                <textarea className="textarea h-24 w-full" placeholder="Pickup Instructions"
                {...register("senderPickupIns")}></textarea>
                
                </fieldset>
                </fieldset>

                
                </div>


                <div>
                {/* Receiver details */}
                <h1 className='font-extrabold text-secondary text-xl'>Receiver Details</h1>

                <fieldset className="fieldset ">
                {/*Receiver name */}
                <label className="label font-bold">Receiver Name</label>
                <input type="text" className="input w-full" placeholder="Receiver Name" 
                {...register("receiverName" , { required: true, maxLength:20})} />

                {errors.receiverName?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Parcel name is required</p>
      )}
                {errors.receiverName?.type === "maxLength" && (
                 <p className='text-red-600 font-semibold'>Maximum Length 20 characters</p>
      )}
       {/* sender Email */}

                <label className="label font-bold mt-4">Receiver Email</label>
                <input type="email" className="input w-full" placeholder="Reicever Email" 
                {...register("ReceiverEmail" , { required: true})} />

                {/*Receiver Phone No */}
                <label className="label font-bold mt-4">Receiver Phone Number</label>
                <input type="number" className="input w-full" placeholder="Receiver Phone Number" 
                {...register("rPhoneNo" , { required: true, minLength:11,maxLength:11 })} />

                {errors.rPhoneNo?.type === "required" && (
                 <p className='text-red-600 font-semibold'>Sender Phone Number is required</p>
      )}
                {errors.rPhoneNo?.type === "maxLength" && (
                 <p className='text-red-600 font-semibold'>Invalid Phone Number</p>
      )}
                 {errors.rPhoneNo?.type === "minLength" && (
                 <p className='text-red-600 font-semibold'>Invalid Phone Number</p>
      )}

            {/* Receiver  Region */}
                <fieldset className="fieldset mt-4">
                <legend className="label font-bold">Receiver Region</legend>
                <select {...register("receiverRegion")} defaultValue="Pick a rigion" className="select w-full">
                    <option disabled={true}>Pick a region</option>
                    {
                        regions.map((r,i)=><option key={i} value={r}>{r}</option>)
                    }
                    
                </select>
                </fieldset>

            {/* Receiver District */}
                <fieldset className="fieldset mt-4">
                <legend className="label font-bold">Receiver  District</legend>
                <select {...register("receiverDistrict")} defaultValue="Pick a district" className="select w-full">
                    {
                        handleReceiverRegion(receiverRegion).map((r,i)=> <option key={i} value={r}>{r}</option>)
                    }
                </select>
                </fieldset>
                {/* Parcel receiving Instruction */}
                <fieldset className="fieldset mt-4">
                <legend className="label">Pickup Instructions</legend>
                <textarea className="textarea h-24 w-full" placeholder="Pickup Instructions"
                {...register("receiverPickupIns")}></textarea>
                
                </fieldset>
                </fieldset>

                
                </div>
                    
                </div>
                 <button className="btn bg-primary text-black mt-4 mb-7 block mx-auto ">Proceed to Confirm Booking</button>
            </form>
            
        </div>
    );
};

export default SendAParcel;