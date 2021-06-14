import React from 'react';
import PropTypes from 'prop-types';
import Message from '../../Message/Message';
import Photos from '../../Photos/Photos';
import MSGHeader from './MSGHeader/MSGHeader';
import HelpfulMSG from '../../HelpfulMSG/HelpfulMSG';

const MessageList = (props) => {
  const {
    listReviews,
    reported,
  } = props;
  return (
    <div
      data-testid="msgListBase"
      className="msgListBase"
    >
      { listReviews.map((i, index) => (
        <div
          key={index}
          className="msgContainer"
        >
          <MSGHeader
            user={i.reviewer_name}
            date={i.date}
            rate={i.rating}
          />
          <div className="msgSummary ">
            {i.summary}
          </div>
          <Message body={i.body} />
          {i.recommend
            ? (
              <div className="msgBody">
                ✓ I recommend this product
              </div>
            )
            : null}
          {(i.response)
            ? (
              <div className="msgResponseContainer">
                Response:
                <br />
                <div className="msgResponse">
                  {i.response}
                </div>
              </div>
            )
            : null}
          <Photos
            photos={i.photos}
          />
          <HelpfulMSG
            countHelpful={i.helpfulness}
            reviewId={i.review_id}
            countNotHelpful={0}// should get the key from i
            reported={reported}
          />
        </div>
      ))}
    </div>
  );
};

MessageList.propTypes = {
  reported: PropTypes.func,
  listReviews: PropTypes.arrayOf(PropTypes.shape({})),
};

MessageList.defaultProps = {
  reported: () => 1,
  listReviews: [{}],
};
export default MessageList;
