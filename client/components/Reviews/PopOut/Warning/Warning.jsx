import React from 'react';
import PropTypes from 'prop-types';

const Warning = (props) => {
  const { listWarning, isShowWarning } = props;
  return (
    <div
      data-testid="WarningContainer"
      className="warningContainer"
    >
      You must enter the following:
      { listWarning.map((i) => (
        <div
          key={i}
          data-testid="WarningItems"
        >
          <div className="warningItems">
            {i}
          </div>
        </div>
      ))}
      <div>
        <div className="warningButtonBG" />
        <button
          data-testid="WarningButton"
          type="button"
          className="warningButton"
          onClick={isShowWarning}
        >
          Back
        </button>
        <div className="warningButtonPart1" />
        <div className="warningButtonPart2" />
      </div>
    </div>
  );
};

Warning.propTypes = {
  listWarning: PropTypes.arrayOf(PropTypes.string),
  isShowWarning: PropTypes.func,
};

Warning.defaultProps = {
  listWarning: [],
  isShowWarning: () => (1),
};

export default Warning;
