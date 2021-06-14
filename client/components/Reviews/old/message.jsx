import React from 'react';

const Message = (props) => {
  const { text, style, res, id, msgClick } = props;
  if( text !== true && res === undefined) {
    return (
      <div
        onClick = { msgClick }
        id = { id }
        style = { style === undefined? body: style }>
          {text}
      </div>
    )
  } else if (text === true) {
    return <div style = { style }>✓ I recommend this product</div>
  } else if (res !== null) {
    return <div style = { style }>Response:<br></br><div style={space}>{ res }</div></div>
  }
}

export default Message

const space = {
  marginLeft: '10px'
}
const body = {
  fontSize: '10px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
}