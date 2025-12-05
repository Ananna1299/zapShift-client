import React from 'react';
import bookingIcon from "../../../assets/bookingIcon.png"

const services = [
  {
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    image: bookingIcon,
  },
  {
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    image: bookingIcon,
  },
  {
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    image:bookingIcon ,
  },
  {
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    image: bookingIcon,
  },
];
const Howitworks = () => {
    return (
    <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className='font-extrabold text-secondary mb-4 text-2xl'>How It Works</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300"
          >
            <img
              src={service.image}
              alt="service icon"
              className="w-12 h-12 object-contain"
            />

            <h3 className="text-lg font-semibold">{service.title}</h3>

            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );


  
};

export default Howitworks;