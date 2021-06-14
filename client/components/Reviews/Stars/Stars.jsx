import React from 'react';
import PropTypes from 'prop-types';
import checkStar from '../func/checkStar/checkStar';

const Stars = (props) => {
  const {
    rate,
    name,
    classNameForSize,
    starClick,
  } = props;

  return (
    <div
      data-testid="stars"
      className="ratingHead"
    >
      {[...Array(5)].map((i, index) => (
        <div key={index}>
          <div
            className={`${classNameForSize} ${checkStar(index, rate)}`}
            data-testid={`button${index}`}
            onKeyPress={starClick}
            tabIndex={0}
            role="button"
            label={checkStar(index, rate)}
            namew={name}
            id={`${name} ${index + 1}`}
            onClick={starClick}
          />
        </div>
      ))}
    </div>
  );
};

Stars.propTypes = {
  rate: PropTypes.number,
  classNameForSize: PropTypes.string,
  starClick: PropTypes.func,
  name: PropTypes.string,
};

Stars.defaultProps = {
  rate: 1,
  name: '',
  classNameForSize: '',
  starClick: () => 1,
};

export default Stars;
