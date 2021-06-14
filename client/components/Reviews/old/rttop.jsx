import React from 'react';
import Stars from './star';

const Top = (props) => {
  const { rating } = props;
  return (
    <div style={base}>
      <div style={text}>
        { rating }
      </div>
      <Stars
        rate={rating}
      />
    </div>
  );
};
export default Top;

const base = {
  display: 'flex',
  justifyContent: 'left',
  margin: '10px',
};

const text = {
  fontSize: '40px',
  fontWeight: 'bold',
  marginRight: '15px',
};
