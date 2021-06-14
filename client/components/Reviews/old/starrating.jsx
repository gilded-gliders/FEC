import React from 'react';

const StarRating = (props) =>{
  const { per } = props;
  let bar = {
    border: '1px solid green',
    width:`${ per }%`,
    height:'9px',
    margin:'1px',
    backgroundColor:'green'
  }
  if ( per === 0) {
    bar = {
      display: 'none',
    }
  }

  return (
    <div
      style ={ container }>
      <div
        style = { bar }>
      </div>
    </div>
  )
}

export default StarRating;

const container = {
  border: '1px solid rgb(240,240,240)',
  width: '80%',
  height: '10px',
  maring: '2px',
  backgroundColor:' rgb(240,240,240)',
}
