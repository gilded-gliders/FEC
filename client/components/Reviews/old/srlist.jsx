import React from 'react';
import StarRating from './starrating.jsx';

const SRList = (props) =>{
  const { star, per, ratingstar } = props;
  const click = (event) =>{
    ratingstar(event.target.id)
  }
  return (
    <div
      style = { container }>
      { star.map( i =>{
        return(
          <div
            key = { i }
            style = { base }>
            <button
              style = { text }
              id = { i }
              onClick = { click }>
                { i } Stars
            </button>
            <StarRating
              per = { per[ i - 1 ] }/>
          </div>
        )
      })}
    </div>
  )
}

export default SRList;

const base = {
  display: 'flex',
  marginTop: '10px',
}

const text = {
  fontSize: '7px',
  borderStyle: 'none',
  borderBottom: '1px solid black',
  backgroundColor: 'white',
  marginRight: '10px',
  padding: '1px',
}

const container = {
  margin: '10px',
}