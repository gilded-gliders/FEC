import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import reviewsGET from '../func/reviewsGet/reviewsGet';
import ReviewListHeader from './ReviewListHeader/ReviewListHeader';
import ReviewMSGList from './ReviewMSGList/ReviewMSGList';
import Button from '../Button/Button';
// import RLB from './ReviewListBaseHook';

const ReviewListBase = (props) => {
  const {
    listUserReview,
    listReported,
    addListReported,
    addUserReview,
    rating,
    id,
    stars,
  } = props;

  // const {
  //   data,
  //   sort,
  //   isMoreReviews,
  //   isReviewsLoad,
  //   listReviews,
  //   getMoreReviews,
  //   sortBy,
  // } = RLB(id, listReported, listUserReview, stars);
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

  useEffect(() => {
    const Reviews = data.filter((i) => (
      !listReported.includes(i.review_id)
    ));

    const StarsReview = Reviews.filter((i) => (
      Number(i.rating) <= Number(stars)
    ));

    const UserReview = listUserReview.filter((i) => (
      Number(i.product_id) === Number(id)
    ));
    const newReviews = UserReview.concat(StarsReview);
    setListReviews(newReviews);
  }, [isReviewsLoad, listReported, data, listUserReview, stars]);

  useEffect(() => {
    axios.get('/get', {
      params: {
        endpoint: `reviews/?product_id=${id}&count=${data.length || 2}&sort=${sort}`,
      },
    })
      .then((res) => {
        const arr = res.data.results;
        setData(arr);
      })
      .catch();
  }, [sort]);

  const sortBy = (str) => {
    setSort(str);
  };

  const getMoreReviews = (num) => {
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

  if (isReviewsLoad) {
    return (
      <div
        data-testid="reviewListBase"
        className="reviewListBase"
      >
        <ReviewListHeader
          len={listReviews.length}
          sortBy={sortBy}
        />
        <ReviewMSGList
          listReviews={listReviews}
          reported={addListReported}
        />
        <br />
        <Button
          addUserReview={addUserReview}
          rating={rating}
          isMoreReviews={isMoreReviews}
          getMoreReviews={getMoreReviews}
        />
      </div>
    );
  }
  return <div>loading...</div>;
};
ReviewListBase.propTypes = {
  listUserReview: PropTypes.arrayOf(PropTypes.shape({})),
  listReported: PropTypes.arrayOf(PropTypes.shape({})),
  addListReported: PropTypes.func,
  addUserReview: PropTypes.func,
  rating: PropTypes.shape({
    product_id: PropTypes.string,
  }),
  id: PropTypes.number,
  stars: PropTypes.number,
};

ReviewListBase.defaultProps = {
  listUserReview: [],
  listReported: [],
  addListReported: () => 1,
  addUserReview: () => 1,
  rating: {},
  id: 25711,
  stars: 1,
};
export default ReviewListBase;
