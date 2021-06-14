import { useState } from 'react';

export default function useButton(getMoreReviews) {
  const [isAddReview, setIsAddReview] = useState(false);

  const cancelAddReview = () => {
    setIsAddReview(false);
  };

  const handleClickAddReview = () => {
    setIsAddReview(true);
  };

  const handleClickMoreReview = () => {
    getMoreReviews(2);
  };
  return {
    handleClickMoreReview,
    handleClickAddReview,
    cancelAddReview,
    isAddReview,
  };
}
