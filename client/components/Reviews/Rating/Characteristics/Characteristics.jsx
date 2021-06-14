import React from 'react';
import PropTypes from 'prop-types';

const Characteristics = (props) => {
  const { value, dataArray, name } = props;
  const perce = Math.floor((value / 5) * 100);
  const point = {
    position: 'absolute',
    bottom: '10%',
    left: `${perce}%`,
  };

  return (
    <div
      data-testid="chara"
      className="charaContainer"
    >
      {name}
      <div className="charaBar">
        <div className="charaSmallBar" />
        <div className="charaSmallBar" />
        <div className="charaSmallBar" />
        <div className="charaSmallBar" />
        <div className="charaSmallBar" />
        <div style={point}>
          <div className="charaBarPoint" />
        </div>
      </div>
      <div className="barTextContainer">
        <div className="barText">{dataArray[0]}</div>
        <div className="barText">{dataArray[dataArray.length - 1]}</div>
      </div>
    </div>
  );
};

Characteristics.propTypes = {
  name: PropTypes.string,
  dataArray: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.number,
};

Characteristics.defaultProps = {
  name: '',
  dataArray: [],
  value: 0,
};

export default Characteristics;
