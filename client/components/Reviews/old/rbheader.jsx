import React from 'react';
import Sorted from './sorted.jsx'

const Rbheader = (props)=>{
  const { length, sort } = props;
  return (
    <div
      style = { style }>
      {`${ length } reviews, sorted by`}
      <Sorted
        sort={ sort }/>
    </div>
  )
}

export default Rbheader;

const style = {
  display: 'flex',
  fontSize: '10px',
}