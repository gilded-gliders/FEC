import React from 'react';

const Characteristics = (props) => {
  const { value, array, name } = props;
  const perce = Math.floor(value / 5 * 100);
  const point = {
    position: 'absolute',
    top: '0px',
    left: `${perce}%`,
  };

  return (
    <div
      style={container}
    >
      {name}
      <div
        style={bar}
      >
        { array.map((i, index) => (
          <div
            key={index}
            style={text}
          >
            <div
              style={smallbar}
            />
            { i }
          </div>
        ))}
        <div
          style={point}
        >
          <div
            style={barpoint}
          />
        </div>
      </div>
    </div>
  );
};

export default Characteristics;

const container = {
  fontSize: '10px',
  margin: '10px',
  width: '90%',
};

const bar = {
  display: 'flex',
  width: '100%',
  position: 'relative',
};

const smallbar = {
  width: '95%',
  height: '10px',
  margin: '1px',
  backgroundColor: 'rgb(240,240,240)',
  position: 'relative',
};

const text = {
  fontSize: '10px',
  width: '19%',

};

const barpoint = {
  width: '5px',
  height: '15px',
  backgroundColor: 'black',
  margin: '1px',
};
