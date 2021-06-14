import React from 'react';
import Stars from './star.jsx';

const Head = (props)=> {
  const { user, date, rate }  = props;
  let datestr = date.slice(0, 10)
  let str = String(new Date(datestr))
  let str1 = str.slice(4,15)
  return (
    <div style={ base }>
      <Stars rate = {rate}/>
      <div>{user}, {str1}</div>
    </div>
  )
}

export default Head

const base = {
  display:'flex',
  justifyContent:'space-between',
  fontSize: '10px',
  margin:'5px',
}
