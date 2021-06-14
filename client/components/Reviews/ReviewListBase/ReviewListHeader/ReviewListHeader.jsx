import React from 'react';
import PropTypes from 'prop-types';

const ReviewListHeader = (props) => {
  const { len, sortBy } = props;

  const handleChangeSelect = (event) => sortBy(event.target.value);

  return (
    <div
      className="reviewListHeader"
    >
      {`${len} reviews, sorted by`}
      <select
        data-testid="select"
        className="reviewListHeader reviewListSort"
        onChange={handleChangeSelect}
      >
        <option data-testid="option">relevant</option>
        <option data-testid="option">newest</option>
        <option data-testid="option">helpful</option>
      </select>
    </div>
  );
};

ReviewListHeader.propTypes = {
  len: PropTypes.number,
  sortBy: PropTypes.func,
};

ReviewListHeader.defaultProps = {
  len: 0,
  sortBy: () => 1,
};
export default ReviewListHeader;
