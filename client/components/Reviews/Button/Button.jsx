import React from 'react';
import PropTypes from 'prop-types';
import PopOut from '../PopOut/PopOut';
import useButton from './useButton';

const Button = (props) => {
  const {
    rating,
    getMoreReviews,
    addUserReview,
    isMoreReviews,
  } = props;
  const {
    handleClickMoreReview,
    handleClickAddReview,
    cancelAddReview,
    isAddReview,
  } = useButton(getMoreReviews);

  return (
    <div
      data-testid="addmoreBtn"
      className="add_moreBTNContainer"
    >
      {isAddReview
        ? (
          <PopOut
            addUserReview={addUserReview}
            data={rating}
            cancelAddReview={cancelAddReview}
          />
        )
        : null}
      {isMoreReviews === true
        ? (
          <button
            data-testid="moreBtn"
            className="add_moreBTN"
            type="button"
            onClick={handleClickMoreReview}
          >
            MORE REVIEWS
          </button>
        ) : null }
      <button
        data-testid="AddBtn"
        className="add_moreBTN"
        type="button"
        onClick={handleClickAddReview}
      >
        ADD A REVIEWS
      </button>
    </div>
  );
};

Button.propTypes = {
  rating: PropTypes.shape({}),
  isMoreReviews: PropTypes.bool,
  addUserReview: PropTypes.func,
  getMoreReviews: PropTypes.func,
};

Button.defaultProps = {
  rating: {},
  isMoreReviews: true,
  addUserReview: () => (1),
  getMoreReviews: () => (1),
};

export default Button;
