import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeftCircleFill } from 'react-icons/bs';

export default function DetailsMainInfo({
  isCopied,
  recipeType,
  recipe: {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strAlcoholic,
  },
}) {
  return (
    <>
      {isCopied && (
        <div className="copied-message">
          <p>Link copiado!</p>
        </div>
      )}
      <Link to={ `/${recipeType}s` } className="previous-button">
        <BsArrowLeftCircleFill fontSize={ 34 } color="#99f2c8" />
      </Link>
      <img
        src={ recipeType === 'comida' ? strMealThumb : strDrinkThumb }
        alt="recipe thumb"
        data-testid="recipe-photo"
        className="details-img"
      />
      <div className="details-title">
        <h2 data-testid="recipe-title" data-aos="fade-right" data-aos-once>
          {recipeType === 'comida' ? strMeal : strDrink}
        </h2>
        <div className="details-line" />
      </div>
      <p data-testid="recipe-category" className="details-category">
        {recipeType === 'comida' ? strCategory : strAlcoholic}
      </p>
    </>
  );
}

DetailsMainInfo.propTypes = {
  isCopied: PropTypes.bool.isRequired,
  recipeType: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }),
};

DetailsMainInfo.defaultProps = {
  recipe: {
    strMeal: '',
    strDrink: '',
    strMealThumb: '',
    strDrinkThumb: '',
    strCategory: '',
    strAlcoholic: '',
  },
};
