import PropTypes from 'prop-types';
import React from 'react';
import FoodRecipeCard from './FoodRecipeCard';
import DrinksRecipesCards from './DrinksRecipesCards';

export default function Recommendations({
  inProgress,
  recommendations,
  recipeType,
}) {
  return (
    !inProgress && (
      <div className="recommendations-wrapper">
        {recommendations.length > 0
          && (recipeType === 'comida' ? (
            <DrinksRecipesCards
              recipes={ recommendations }
              maxRecipes={ 6 }
              testId="recomendation-card"
              titleTestId="recomendation-title"
            />
          ) : (
            <FoodRecipeCard
              recipes={ recommendations }
              maxRecipes={ 6 }
              testId="recomendation-card"
              titleTestId="recomendation-title"
            />
          ))}
      </div>
    )
  );
}

Recommendations.propTypes = {
  inProgress: PropTypes.bool.isRequired,
  recipeType: PropTypes.string.isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};
