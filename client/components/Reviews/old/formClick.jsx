import React from 'react';
import Stars from './Stars/Stars';
import { Data } from './data';

const FormStarCK = (props) => {
  const {
    name,
    info,
    starClick,
  } = props;
  return (
    <div className="topSmallContainer">
      <div>
        { name }
      </div>
      <Stars
        className="formStar"
        rate={info}
        classNameForSize="formStar"
        starClick={starClick}
        name={String(name)}
      />
      <div className="formText">
        {Data[name][info - 1]}
      </div>
    </div>
  );
}

export default FormStarCK;
