import React from 'react';
import PropTypes from 'prop-types';
import useMessage from './useMessage';

const Message = (props) => {
  const { body } = props;
  const {
    isClick,
    handleClickText,
    handleKeyPressText,
  } = useMessage();

  if (isClick) {
    return (
      <div
        data-testid="textShow"
        className="msgBody1"
        role="button"
        tabIndex={0}
        onKeyPress={handleKeyPressText}
        onClick={handleClickText}
      >
        {body}
      </div>
    );
  }
  return (
    <div
      data-testid="textHidden"
      className="msgBody"
      role="button"
      tabIndex={0}
      onKeyPress={handleKeyPressText}
      onClick={handleClickText}
    >
      {body}
    </div>
  );
};

Message.propTypes = {
  body: PropTypes.string,
};

Message.defaultProps = {
  body: '',
};

export default Message;
