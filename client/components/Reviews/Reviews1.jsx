import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ratingGET from './func/ratingGet/ratingGet';
import Rating from './Rating/Rating';
import ReviewListBase from './ReviewListBase/ReviewListBase';

export default function Reviews(props) {
  const { id } = props;
  const [isRatingLoad, setIsRatingLoad] = useState(false);
  const [countStars, setCountStars] = useState(5);
  const [rating, setRating] = useState({});
  const [listUserReview, setListUserReview] = useState([]);
  const [listReported, setListReported] = useState([]);

  useEffect(() => {
    setCountStars(5);
    ratingGET('reviews/meta', id, setRating, setIsRatingLoad);
  }, [id]);

  const starClicked = (num) => {
    setCountStars(num);
  };

  const addUserReview = (obj) => {
    setListUserReview([...listUserReview, obj]);
  };

  const addListReported = (reportId) => {
    setListReported([...listReported, reportId]);
  };

  if (isRatingLoad) {
    return (
      <div className="reviewContainer">
        <Rating
          rating={rating}
          starClicked={starClicked}
        />
        <ReviewListBase
          rating={rating}
          id={id}
          listReported={listReported}
          addListReported={addListReported}
          listUserReview={listUserReview}
          addUserReview={addUserReview}
          stars={countStars}
        />
      </div>
    );
  }
  return <div> Loading... </div>;
}

Reviews.propTypes = {
  id: PropTypes.number,
};

Reviews.defaultProps = {
  id: 25711,
};
