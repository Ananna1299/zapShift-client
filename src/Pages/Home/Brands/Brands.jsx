import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from "../../../assets/brands/amazon.png"
import amazon_vector from "../../../assets/brands/amazon_vector.png"
import casio from "../../../assets/brands/casio.png"
import moonstar from "../../../assets/brands/moonstar.png"
import randstad from "../../../assets/brands/randstad.png"
import star from "../../../assets/brands/star.png"
import start_people from "../../../assets/brands/start_people.png"
import { Autoplay } from 'swiper/modules';

const arr=[ amazon,amazon_vector,casio,moonstar,randstad,star,start_people]

const Brands = () => {
    return (
       <div className="max-w-7xl mx-auto px-4 pb-10 mb-10">
        <h1 className='font-extrabold text-secondary mb-12 text-2xl text-center'>We've helped thousands of sales teams</h1>

          <Swiper 
          slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}

         modules={[Autoplay]}
        >
            {arr.map((brand,index)=>(
                <SwiperSlide key={index}>
                    <img src={brand} alt="" />
                </SwiperSlide>

            ))}
            
            
          </Swiper>

        





       </div>
    );
};

export default Brands;
