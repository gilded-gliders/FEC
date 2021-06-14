import React from 'react';

const HR = ( props ) =>{
  const { helpful, yes, no, report, index, notHelpful } = props;
  const a = `Helpful? Yes (${ helpful }) `;
  const e = ` No (${ notHelpful }) `;
  const b = ` | report`;

  const c = (event) =>{
    yes( index );
  };

  const d = (event) =>{
    report( index );
  };

  const f = (event) =>{
    no( index );
    //should not see the num change,
    //need to find the key first to change state,
    //but it will block the user to click YES button;
  };

  return (
    <div
      style= { style }>
      <button
        style= { button }
        onClick = { c }>
          { a }
      </button>
      <button
        style= { button }
        onClick = { f }>
          { e }
      </button>
      <button
        style= { button }
        onClick = { d }>
          { b }
      </button>
    </div>
  )
}

export default HR;

const style = {
  display: 'flex',

}
const button = {
  borderStyle: 'none',
  backgroundColor: 'white',
  fontSize: '10px',
  margin:'2px',
}