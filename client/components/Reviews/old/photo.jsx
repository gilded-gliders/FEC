import React from 'react';

const Photo = (props) =>{
  const { photo } = props;
  if (photo.length !== 0) {
    return (
      <div>
        {photo.map(( i, index ) =>{
          return (
            <img
              src = { i.url }
              key = { index }
              style = { img }>
            </img>
          )
        })}
      </div>
    )
  } else {
    return <></>
  };
};

export default Photo

const img = {
  display: 'block flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100px',
  height: '100px'
}