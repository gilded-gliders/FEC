import React from 'react';
import PropTypes from 'prop-types';
import StarRatingBar from './StarRatingBar/StarRatingBar';

const StarList = (props) => {
  const {
    stars,
    perArray,
    starClicked,
  } = props;

  const handleClickStar = (event) => {
    starClicked(Number(event.target.id));
  };
  return (
    <div
      data-testid="starList"
      className="starListContainer"
    >
      {stars.map((i) => (
        <div key={i}>
          <div
            className="starListBase"
          >
            <button
              data-testid={`startListButton${i}`}
              type="button"
              id={i}
              className="starListText"
              onClick={handleClickStar}
            >
              {`${i} Stars`}
            </button>
            <StarRatingBar per={perArray[i - 1]} />
          </div>
        </div>
      ))}
    </div>
  );
};

StarList.propTypes = {
  stars: PropTypes.arrayOf(PropTypes.string),
  perArray: PropTypes.arrayOf(PropTypes.number),
  starClicked: PropTypes.func,
};

StarList.defaultProps = {
  stars: [],
  perArray: [],
  starClicked: () => 1,
};

export default StarList;
