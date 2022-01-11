import PropTypes from 'prop-types';
import React from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export default function DetailsFavShare({
  setIsCopied,
  recipeInfo,
  setIsFavorite,
  isFavorite,
  id,
}) {
  const handleShare = () => {
    const COPIED_MESSAGE = 4000;

    setIsCopied(true);
    setInterval(() => {
      setIsCopied(false);
    }, COPIED_MESSAGE);
    copy(window.location.href.split('/in-progress')[0]);
  };

  const handleFavorite = () => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavorites.some((favorite) => favorite.id === id)) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(localFavorites.filter((favorite) => favorite.id !== id)),
      );
      setIsFavorite(false);
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...localFavorites, recipeInfo]),
      );
      setIsFavorite(true);
    }
  };

  return (
    <div className="details-fav-share">
      <div>
        <input
          type="image"
          src={ shareIcon }
          alt="share icon"
          data-testid="share-btn"
          onClick={ handleShare }
        />
      </div>
      <div>
        <input
          type="image"
          src={ isFavorite ? blackHeart : whiteHeart }
          alt="favorite icon"
          data-testid="favorite-btn"
          onClick={ handleFavorite }
        />
      </div>
    </div>
  );
}

DetailsFavShare.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  recipeInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  setIsCopied: PropTypes.func.isRequired,
  setIsFavorite: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
