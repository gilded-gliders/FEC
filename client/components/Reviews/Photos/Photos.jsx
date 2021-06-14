import React from 'react';
import PropTypes from 'prop-types';

const Photos = (props) => {
  const { photos } = props;
  if (photos.length !== 0) {
    return (
      <div
        data-testid="photos"
        className="photoContainer"
      >
        {photos.map((i) => (
          <div
            data-testid="img"
            key={i.id}
          >
            <img
              alt=""
              src={i.url}
              className="photos"
            />
          </div>
        ))}
      </div>
    );
  }
  return <div data-testid="null" />;
};

Photos.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    }),
  ),
};

Photos.defaultProps = {
  photos: [{}],
};
export default Photos;
