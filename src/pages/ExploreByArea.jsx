import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRecipes from '../services/fetchApi';
import { fetchAreas, fetchRecipesByArea } from '../services/fetchRecipesByArea';

export default function ExploreByArea() {
  const [recipesArea, setRecipesArea] = useState([]);
  const [recipesByArea, setRecipesByArea] = useState([]);

  useEffect(() => {
    async function getAreas() {
      const areas = await fetchAreas();
      setRecipesArea([...areas, 'All']);
      const recipes = await fetchRecipesByArea('American');
      setRecipesByArea(recipes);
    }
    getAreas();
  }, []);

  const handleSelectChange = async ({ target: { value } }) => {
    const recipes = await fetchRecipesByArea(value);
    if (value === 'All') {
      const defaultFoods = await fetchRecipes('Comidas', 'search.php?s=');
      setRecipesByArea(defaultFoods);
    } else {
      setRecipesByArea(recipes);
    }
  };

  const MAX_RECIPES_AREA = 12;

  return (
    <>
      <Header title="Explorar Origem" />
      <section className="explore-area-wrapper">
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ handleSelectChange }
        >
          {recipesArea.length > 0
            && recipesArea.map((area) => (
              <option key={ area } value={ area } data-testid={ `${area}-option` }>
                {area}
              </option>
            ))}
        </select>
        <div className="recipes-cards">
          {recipesByArea.length > 0
            && recipesByArea
              .slice(0, MAX_RECIPES_AREA)
              .map(
                ({ strMealThumb, strMeal, idMeal }, index) => (
                  <Link key={ index } to={ `/comidas/${idMeal}` }>
                    <div
                      data-testid={ `${index}-recipe-card` }
                      className="recipe-card"
                    >
                      <img
                        src={ strMealThumb }
                        alt=""
                        data-testid={ `${index}-card-img` }
                      />
                      <p
                        data-testid={ `${index}-card-name` }
                        className="recipe-name"
                      >
                        {strMeal}
                      </p>
                    </div>
                  </Link>
                ),
              )}
        </div>
      </section>
      <Footer />
    </>
  );
}
