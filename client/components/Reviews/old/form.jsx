import React from 'react';

const Form = (props)=>{
  const { getTarget, style, name, info } = props;
  let a = ck;
  let b = ck1;
  if (info === true) {
    a = ck1;
    b = ck;
  }
  return (
    <div style = {style}>
      <div>{ name }</div>
      <div style = { base }>
        <div onClick = { getTarget } style = { a } id = { name } value ={ 'YES' } >YES</div>
        <div onClick = { getTarget } style = { b } id = { name } >NO</div>
      </div>

      <div></div>
    </div>
  )
}

export default Form;


const base = {
  display: 'flex',
}

const ck = {
  borderBottom: '1px solid black',
  margin: '2px',
}

const ck1 = {
  borderBottom: '1px solid black',
  margin: '2px',
  fontWeight: 'bold',
}