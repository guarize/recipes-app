import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../contexts/RecipesContext';
import Footer from '../components/Footer';
import fetchRecipes from '../services/fetchApi';
import '../styles/RecipesCards.css';
import FoodCategories from '../components/FoodCategories';

export default function Foods() {
  const { foodsRecipes, setFoodsRecipes,
    setDefaultFoodRecipes } = useContext(RecipesContext);
  const maxLength = 12;

  useEffect(() => {
    async function responseApi() {
      const returnDefaultFoods = await fetchRecipes(
        'Comidas',
        'search.php?s=',
      );
      setDefaultFoodRecipes(returnDefaultFoods);
      setFoodsRecipes(returnDefaultFoods);
    }
    responseApi();
  }, [setDefaultFoodRecipes, setFoodsRecipes]);

  return (
    <>
      <Header title="Comidas" />
      <FoodCategories />
      <div className="recipes-cards">
        {foodsRecipes && foodsRecipes
          .slice(0, maxLength)
          .map(({ strMealThumb, strMeal, idMeal }, index) => (
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
                <p data-testid={ `${index}-card-name` }>{strMeal}</p>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </>
  );
}