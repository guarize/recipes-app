import PropTypes from 'prop-types';
import React from 'react';
import ReactPlayer from 'react-player/youtube';

export default function DetailsVideo({
  inProgress,
  recipeType,
  recipe: { strYoutube },
}) {
  return (
    !inProgress
    && recipeType === 'comida' && (
      <ReactPlayer
        url={ strYoutube }
        controls
        data-testid="video"
        className="details-video"
      />
    )
  );
}

DetailsVideo.propTypes = {
  inProgress: PropTypes.bool.isRequired,
  recipeType: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    strYoutube: PropTypes.string,
  }),
};

DetailsVideo.defaultProps = {
  recipe: {
    strYoutube: '',
  },
};
