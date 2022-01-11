import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import fetchRecipeById from '../services/fetchRecipeById';
import fetchRecipes from '../services/fetchApi';
import DetailsMainInfo from '../components/DetailsMainInfo';
import DetailsVideo from '../components/DetailsVideo';
import Recommendations from '../components/Recommendations';
import DetailsIngredients from '../components/DetailsIngredients';
import handleCompleteRecipe from '../services/doneRecipes';
import DetailsFavShare from '../components/DetailsFavShare';
import {
  handleDetailsButtonText,
  checkDoneRecipes,
  checkInProgressRecipes,
} from '../services/checkLocalStorage';
import '../styles/Details.css';

export default function Details({ inProgress }) {
  const history = useHistory();
  const { pathname } = useLocation();
  const id = pathname.replace(/\D/g, '');

  const [recipe, setRecipe] = useState({});
  const [recipeType, setRecipeType] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [completedIngredients, setCompletedIngredients] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    setIsFavorite(
      JSON.parse(localStorage.getItem('favoriteRecipes')).some(
        (favorite) => favorite.id === id,
      ),
    );
  }, [id]);

  useEffect(() => {
    async function getRecipe() {
      if (pathname.includes('comidas')) {
        const getDrinksRecomendations = await fetchRecipes(
          'Bebidas',
          'search.php?s=',
        );
        setRecommendations(getDrinksRecomendations);
        setRecipeType('comida');
        setCompletedIngredients(checkInProgressRecipes('meals', id));
        const { meals } = await fetchRecipeById('comida', id);
        setRecipe(meals[0]);
      } else {
        const getFoodRecomendations = await fetchRecipes(
          'Comidas',
          'search.php?s=',
        );
        setRecommendations(getFoodRecomendations);
        setRecipeType('bebida');
        setCompletedIngredients(checkInProgressRecipes('cocktails', id));
        const { drinks } = await fetchRecipeById('bebida', id);
        setRecipe(drinks[0]);
      }
    }
    getRecipe();
  }, [id, pathname]);

  const ingredients = Object.entries(recipe)
    .filter((entrie) => entrie[0].includes('strIngredient') && entrie[1])
    .map((element) => element[1]);
  const measure = Object.entries(recipe)
    .filter((entrie) => entrie[0].includes('strMeasure') && entrie[1])
    .map((element) => element[1]);

  const recipeInfo = {
    id: recipeType === 'comida' ? recipe.idMeal : recipe.idDrink,
    type: recipeType,
    area: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipeType === 'comida' ? recipe.strMeal : recipe.strDrink,
    image: recipeType === 'comida' ? recipe.strMealThumb : recipe.strDrinkThumb,
  };

  return (
    Object.keys(recipe).length > 0 && (
      <section className="details-wrapper">
        <DetailsMainInfo
          isCopied={ isCopied }
          recipeType={ recipeType }
          recipe={ recipe }
        />
        <div className="details-container">
          <DetailsFavShare
            setIsCopied={ setIsCopied }
            setIsFavorite={ setIsFavorite }
            recipeInfo={ recipeInfo }
            isFavorite={ isFavorite }
            id={ id }
          />
          <DetailsIngredients
            inProgress={ inProgress }
            ingredients={ ingredients }
            id={ id }
            recipeType={ recipeType }
            completedIngredients={ completedIngredients }
            setCompletedIngredients={ setCompletedIngredients }
            measure={ measure }
          />
          <p className="details-instructions" data-testid="instructions">
            {recipe.strInstructions}
          </p>
          <DetailsVideo
            recipe={ recipe }
            inProgress={ inProgress }
            recipeType={ recipeType }
          />
          <Recommendations
            inProgress={ inProgress }
            recommendations={ recommendations }
            recipeType={ recipeType }
          />
          {inProgress ? (
            <button
              type="button"
              data-testid="finish-recipe-btn"
              className="details-begin-recipe"
              disabled={ completedIngredients !== ingredients.length }
              onClick={ () => {
                handleCompleteRecipe(recipe, history, recipeInfo);
              } }
            >
              Finalizar receita
            </button>
          ) : (
            <Link to={ `${pathname}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="details-begin-recipe"
                data-aos="fade-up"
                data-aos-once
                style={ { display: checkDoneRecipes(id) } }
              >
                {handleDetailsButtonText(id, recipeType)}
              </button>
            </Link>
          )}
        </div>
      </section>
    )
  );
}

Details.propTypes = {
  inProgress: PropTypes.bool,
};

Details.defaultProps = {
  inProgress: false,
};
