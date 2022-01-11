import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Details.css';

export default function IngredientsProgress({
  ingredients,
  id,
  recipeType,
  completedIngredients,
  setCompletedIngredients,
}) {
  const handleClick = (checked, ingredient) => {
    const inProgressRecipesFromStorage = localStorage.getItem('inProgressRecipes');

    setCompletedIngredients(
      checked ? completedIngredients + 1 : completedIngredients - 1,
    );

    let inProgressRecipes = {
      cocktails: {},
      meals: {},
    };

    if (inProgressRecipesFromStorage !== null) {
      inProgressRecipes = JSON.parse(inProgressRecipesFromStorage);
    }

    if (recipeType === 'comida') {
      const previousList = inProgressRecipes.meals[id] || [];
      if (checked) {
        inProgressRecipes.meals[id] = [...previousList, ingredient];
      } else {
        const filteredList = previousList.filter((item) => item !== ingredient);
        inProgressRecipes.meals[id] = filteredList;
      }
    } else {
      const previousList = inProgressRecipes.cocktails[id] || [];
      if (checked) {
        inProgressRecipes.cocktails[id] = [...previousList, ingredient];
      } else {
        const filteredList = previousList.filter((item) => item !== ingredient);
        inProgressRecipes.cocktails[id] = filteredList;
      }
    }

    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  };

  const checkIngredient = (ingredient) => {
    const inProgressRecipesFromStorage = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipesFromStorage === null) {
      return false;
    }

    const inProgressRecipes = JSON.parse(inProgressRecipesFromStorage);
    if (recipeType === 'comida') {
      const previousList = inProgressRecipes.meals[id] || [];
      return previousList.includes(ingredient);
    }

    const previousList = inProgressRecipes.cocktails[id] || [];
    return previousList.includes(ingredient);
  };

  return (
    <div className="ingredients-progress-wrapper">
      {ingredients.map((ingredient, index) => (
        <div key={ ingredient } data-testid={ `${index}-ingredient-step` }>
          <input
            className="check-with-label"
            type="checkbox"
            id={ ingredient }
            value={ ingredient }
            onClick={ (event) => handleClick(event.target.checked, ingredient) }
            defaultChecked={ checkIngredient(ingredient) }
          />
          <label htmlFor={ ingredient } className="label-for-check">
            {ingredient}
          </label>
        </div>
      ))}
    </div>
  );
}

IngredientsProgress.propTypes = {
  ingredients: PropTypes.arrayOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
  completedIngredients: PropTypes.number.isRequired,
  setCompletedIngredients: PropTypes.func.isRequired,
};
