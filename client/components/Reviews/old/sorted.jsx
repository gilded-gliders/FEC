import React from 'react';

const Sorted = (props) => {
  const { sort } = props;

  const a = (event) =>{
    let str = String( event.target.value );
    sort(str);
  };

  return (
    <select style ={ style } onChange ={a}>
      <option>relevant</option>
      <option>newest</option>
      <option>helpful</option>
    </select>
  )
}

export default Sorted;

const style = {
  borderStyle: 'none',
  outline: '0px',
  fontSize: '10px'
}
