import React, { use } from 'react';
import location from "../../../assets/customer-top.png"

import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

const Reviews = ({reviewPromise}) => {
    const reviewData=use(reviewPromise)
    console.log(reviewData)
    return (
        <div className='mb-10'>
            <div className='flex flex-col justify-center items-center'>
                <img src={location} alt="" className='  object-contain ' />
                <h1 className='font-extrabold text-secondary mt-4 mb-2 text-2xl'>What our customers are sayings</h1>
                <p className='text-[#606060] mb-5'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>

            <Swiper
        effect={'coverflow'}
        grabCursor={true}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}

        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          scale: 0.75,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination,Autoplay]}
        className="mySwiper"
      >

        { reviewData.map((review,index)=>(
            <SwiperSlide key={index}>
          <ReviewCard review={review} ></ReviewCard>
        </SwiperSlide>
        ))}

        
        
      </Swiper>

            
        </div>
    );
};

export default Reviews;