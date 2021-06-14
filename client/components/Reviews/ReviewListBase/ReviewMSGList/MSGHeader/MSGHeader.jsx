import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../../../Stars/Stars';

const MSGHeader = (props) => {
  const { user, date, rate } = props;
  const dateStr = date.slice(0, 10);
  const str = String(new Date(dateStr)).slice(4, 15);

  return (
    <div
      data-testid="msgHeader"
      className="msgHeader"
    >
      <Stars
        classNameForSize="msgStar"
        rate={rate}
      />
      <div>
        {user}
        ,
        {' '}
        {str}
      </div>
    </div>
  );
};

MSGHeader.propTypes = {
  user: PropTypes.string,
  date: PropTypes.string,
  rate: PropTypes.number,
};

MSGHeader.defaultProps = {
  user: '',
  date: '',
  rate: 0,
};

export default MSGHeader;
