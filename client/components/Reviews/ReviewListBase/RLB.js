import { useState, useEffect } from 'react';
import axios from 'axios';
import reviewsGET from '../func/reviewsGet/reviewsGet';

export default function RLB(id, listReported, listUserReview, stars) {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('relevant');
  const [isMoreReviews, setIsMoreReviews] = useState(true);
  const [isReviewsLoad, setIsReviewsLoad] = useState(false);
  const [listReviews, setListReviews] = useState([]);

  useEffect(() => {
    setIsMoreReviews(true);
    setSort('relevant');
    reviewsGET('reviews', id, 2, sort, setData, setIsReviewsLoad);
  }, [id]);

  // useEffect(() => {
  //   const Reviews = data.filter((i) => (
  //     !listReported.includes(i.review_id)
  //   ));

  //   const StarsReview = Reviews.filter((i) => (
  //     Number(i.rating) <= Number(stars)
  //   ));

  //   const UserReview = listUserReview.filter((i) => (
  //     Number(i.product_id) === Number(id)
  //   ));
  //   const newReviews = UserReview.concat(StarsReview);
  //   setListReviews(newReviews);
  // }, [isReviewsLoad, listReported, data, listUserReview, stars]);

  useEffect(() => {
    let num;
    if (data.length === 0) {
      num = 2;
    } else {
      num = data.length + 2;
    }
    reviewsGET('reviews', id, num, sort, setData);
  }, [sort]);

  const sortBy = (str) => {
    setSort(str);
  };

  const getMoreReviews = async (num) => {
    axios.get('/get', {
      params: {
        endpoint: `reviews/?product_id=${id}&count=${data.length + num}&sort=${sort}`,
      },
    })
      .then((res) => {
        const arr = res.data.results;
        if (arr.length === data.length) {
          setIsMoreReviews(false);
        } else {
          setData(arr);
        }
      })
      .catch();
  };

  return {
    data,
    sort,
    isMoreReviews,
    isReviewsLoad,
    listReviews,
    getMoreReviews,
    sortBy,
  };
}
