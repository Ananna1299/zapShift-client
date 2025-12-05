import React from 'react';
import safeDelivery from "../../../assets/safe-delivery.png"
import liveTrack from "../../../assets/live-tracking.png"

const FeatureWork = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 pb-10">
            <div class="w-full border-t-2 border-dashed border-gray-400 mb-20"></div>
            <div className='grid grid-cols-1 gap-3'>


                <div className='w-full bg-white rounded-xl flex items-center p-2 gap-3 md:gap-10'>
                    <figure className='p-4 ' >
                        <img src={liveTrack} alt="" />
                    </figure>
                  <div class="h-full border-l-2 border-dashed border-gray-400 "></div>
                  <div>
                    <h1 className='font-extrabold text-xl  md:text-2xl text-secondary'>Live Parcel Tracking</h1>
                    <p className='text-[#606060] font-medium text-sm md:text-[16px] text-justify mr-2'>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                  </div>

                </div>



                <div className='w-full bg-white rounded-xl flex items-center p-2 gap-3 md:gap-10'>
                    <figure className='p-4 ' >
                        <img src={safeDelivery} alt="" />
                    </figure>
                  <div class="h-full border-l-2 border-dashed border-gray-400 "></div>
                  <div>
                    <h1 className='font-extrabold text-xl  md:text-2xl text-secondary'>100% Safe Delivery</h1>
                    <p className='text-[#606060] font-medium text-sm md:text-[16px] text-justify mr-2'>We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.</p>
                  </div>

                </div>



                <div className='w-full bg-white rounded-xl flex items-center p-2 gap-3 md:gap-10'>
                    <figure className='p-4 ' >
                        <img src={safeDelivery} alt="" />
                    </figure>
                  <div class="h-full border-l-2 border-dashed border-gray-400 "></div>
                  <div>
                    <h1 className='font-extrabold text-xl  md:text-2xl text-secondary'>24/7 Call Center Support</h1>
                    <p className='text-[#606060] font-medium text-sm md:text-[16px] text-justify mr-2'>
                       We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time. 
                    </p>
                  </div>

                </div>





                 



            </div>


        </div>
    );
};

export default FeatureWork;