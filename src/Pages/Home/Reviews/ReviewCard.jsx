import React from 'react';
import reviewQuote from "../../../assets/reviewQuote.png"
const ReviewCard = ({review}) => {
    //console.log(review)
    const {user_photoURL,review:reviewGiven,userName,ratings}=review
    return (
        <div class="max-w-sm bg-white rounded-xl shadow-sm p-6">
    
  
    <div class="text-teal-300 text-4xl mb-4">
        <img src={reviewQuote} alt="" />
    </div>

    
    <p class="text-gray-600 text-sm leading-relaxed mb-6">
       {reviewGiven}
    </p>

  
    <div class="w-full border-t border-dashed border-gray-300 mb-4"></div>

   
    <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-teal-700 rounded-full">
            <img src={user_photoURL} alt="" />
        </div>

        <div>
            <h3 class="text-gray-900 font-semibold text-sm">{userName}</h3>
            <p class="text-gray-500 text-xs">Ratings: {ratings}</p>
        </div>
    </div>
</div>

    );
};

export default ReviewCard;