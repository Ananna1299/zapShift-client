import React from 'react';
import service from "../../../assets/service.png"


const services=[
  {
    title: "Express  & Standard Delivery",
    description: "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
    image: service
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
    image: service
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    image:service 
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    image: service
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    image: service
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    image: service
  }
];

const OurServices = () => {
    return (
        <div className='bg-secondary rounded-xl mb-25'>
            <div className='pt-20 pb-8 flex flex-col justify-center items-center'>
                <h1 className='mb-4 text-white font-extrabold text-2xl'>Our Services</h1>
                <p className=' text-white  text-xs text-justify px-3' >Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to  business shipments — we deliver on time, every time.</p>
            </div>
            <div className='max-w-7xl mx-auto px-4 pb-24'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                      {services.map((ser,index)=>(
                        <div key={index}
                         className='bg-gray-50 rounded-xl p-6 flex flex-col justify-center items-center gap-4 hover:bg-primary'
                        >
                            <img src={ser.image} alt=""   className="w-12 h-12 object-contain
                             "/>
                            <h1 className='text-secondary text-2xl font-bold'>{ser.title}</h1>
                            <p className='text-[#606060] font-medium text-[16px]'>{ser.description}</p>



                        </div>

                      ))
                        
                      }

                </div>
              

            </div>
            
        </div>
    );
};

export default OurServices;