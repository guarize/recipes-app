import React from 'react';
import { Link } from 'react-router-dom';

export default function FoodRecipeCard({
  recipes,
  maxRecipes,
  testId,
  titleTestId,
}) {
  return recipes
    .slice(0, maxRecipes)
    .map(({ strMealThumb, strMeal, idMeal }, index) => (
      <Link
        key={ index }
        to={ `/comidas/${idMeal}` }
        data-aos="fade-up"
        data-aos-once
        data-aos-delay={ 100 }
      >
        <div data-testid={ `${index}-${testId}` } className="recipe-card">
          <img
            src={ strMealThumb }
            alt="meal thumb"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-${titleTestId}` } className="recipe-name">
            {strMeal}
          </p>
        </div>
      </Link>
    ));
}
