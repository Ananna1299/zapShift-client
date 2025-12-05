import React from 'react';
import Banner from '../Banner/Banner';
import Howitworks from '../HowItWorks/Howitworks';
import OurServices from '../OurServices/OurServices';
import Brands from '../Brands/Brands';
import FeatureWork from '../FeatureWork/FeatureWork';
import Reviews from '../Reviews/Reviews';

 const reviewPromise= fetch('../reviews.json')
    .then(res=>res.json())

const Home = () => {

   
    return (
        <div>
            <Banner></Banner>
            <Howitworks></Howitworks>
            <OurServices></OurServices>
            <Brands></Brands>
            <FeatureWork></FeatureWork>
            <Reviews reviewPromise={reviewPromise}></Reviews>
            
            
        </div>
    );
};

export default Home;