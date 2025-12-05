import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import banner1 from "../../../assets/banner/banner1.png"
import banner2 from "../../../assets/banner/banner2.png"
import banner3 from "../../../assets/banner/banner3.png"
import { FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router';

const Banner = () => {
    return (
       <div className="relative">
  <Carousel autoPlay={true} infiniteLoop={true}>
    <div>
      <img src={banner1} />
    </div>
    <div>
      <img src={banner2} />
    </div>
    <div>
      <img src={banner3} />
    </div>
  </Carousel>

  {/* Positioned Text */}
  <p className="absolute hidden  md:bottom-23  md:block md:left-14 lg:bottom-42  lg:left-22  
                text-[10px] md:text-sm font-semibold text-gray-500 
                ">
    Enjoy fast, reliable parcel delivery with real-time tracking 
    and zero hassle. From personal packages to business shipments — 
    we deliver on time, every time.
  </p>
  <div className="md:absolute  md:bottom-82 lg:bottom-28 md:left-22   md:w-2/4 flex items-center">


   <Link className="btn  bg-primary text-black rounded-full font-bold mr-2 border-black px-3 py-1 text-sm">Track your percel</Link>
   <div className="p-1 md:p-2 rounded-full bg-black text-primary mr-2">
            <FaArrowUp className='rotate-45'/>
    </div>
    <Link to="/rider" className="btn text-gray-500 bg-white rounded-full font-bold mr-2  px-3 py-1 text-sm ">Be a Rider</Link>
    
    
    
  </div>
</div>

    );
};

export default Banner;