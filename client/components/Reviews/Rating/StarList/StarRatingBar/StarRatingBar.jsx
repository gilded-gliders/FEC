import React from 'react';
import PropTypes from 'prop-types';

const StarRatingBar = (props) => {
  const { per } = props;
  let bar = {
    border: '5px solid green',
    width: `${per}%`,
    backgroundColor: 'green',
  };
  if (per === 0) {
    bar = {
      display: 'none',
    };
  }

  return (
    <div
      data-testid="starRatingBar"
      className="starRatingBarBase"
    >
      <div style={bar} />
    </div>
  );
};

StarRatingBar.propTypes = {
  per: PropTypes.number,
};

StarRatingBar.defaultProps = {
  per: 0,
};

export default StarRatingBar;
