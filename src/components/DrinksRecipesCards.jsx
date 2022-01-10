import React from 'react';
import { Link } from 'react-router-dom';

export default function DrinksRecipesCards({
  recipes,
  maxRecipes,
  testId,
  titleTestId,
}) {
  return recipes
    .slice(0, maxRecipes)
    .map(({ strDrinkThumb, strDrink, idDrink }, index) => (
      <Link
        key={ index }
        to={ `/bebidas/${idDrink}` }
        data-aos="fade-up"
        data-aos-once
        data-aos-delay={ 100 }
      >
        <div data-testid={ `${index}-${testId}` } className="recipe-card">
          <img src={ strDrinkThumb } alt="" data-testid={ `${index}-card-img` } />
          <p data-testid={ `${index}-${titleTestId}` } className="recipe-name">
            {strDrink}
          </p>
        </div>
      </Link>
    ));
}
