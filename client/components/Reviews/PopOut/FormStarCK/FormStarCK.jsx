import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../../Stars/Stars';
import { Data } from '../../data';

const FormStarCK = (props) => {
  const {
    name,
    info,
    starClick,
  } = props;
  return (
    <div
      data-testid="formStarCK"
      className="topSmallContainer">
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
      <div
        data-testid="formStarCKText"
        className="formText"
      >
        {Data[name][info - 1]}
      </div>
    </div>
  );
};

FormStarCK.propTypes = {
  name: PropTypes.string,
  info: PropTypes.number,
  starClick: PropTypes.func,
};

FormStarCK.defaultProps = {
  name: '',
  info: 1,
  starClick: () => 1,
};
export default FormStarCK;
