import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../styles/Favorites.css';

export default function FavoriteRecipes() {
  const history = useHistory();

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  const handleShare = (type, id) => {
    const COPIED_MESSAGE = 4000;

    setIsCopied(true);
    setInterval(() => {
      setIsCopied(false);
    }, COPIED_MESSAGE);
    const recipePath = `${
      window.location.href.split('/receitas-favoritas')[0]
    }/${type}s/${id}`;
    copy(recipePath);
  };

  const handleFavorite = (id) => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoritesFilter = localFavorites.filter(
      (favorite) => favorite.id !== id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesFilter));
    setFavoriteRecipes(favoritesFilter);
  };

  const handleRedirect = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <>
      <Header title="Receitas Favoritas" searchHidden />
      {isCopied && (
        <div className="copied-message">
          <p>Link copiado!</p>
        </div>
      )}
      <section className="favorites-wrapper">
        <div className="favotires-filters">
          <button
            type="button"
            onClick={ () => setFilter('') }
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            onClick={ () => setFilter('comida') }
            data-testid="filter-by-food-btn"
          >
            Foods
          </button>
          <button
            type="button"
            onClick={ () => setFilter('bebida') }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
        <div>
          {favoriteRecipes.length ? (
            <div className="favorites-container">
              {favoriteRecipes
                .filter((recipe) => recipe.type.includes(filter))
                .map(
                  (
                    { id, type, category, area, alcoholicOrNot, name, image },
                    index,
                  ) => (
                    <div key={ id } className="favorite-recipe">
                      <input
                        type="image"
                        src={ image }
                        alt="recipe preview"
                        className="favorite-recipe-preview"
                        onClick={ () => handleRedirect(type, id) }
                        data-testid={ `${index}-horizontal-image` }
                      />
                      <div className="favorite-recipe-info">
                        <div className="favotite-header">
                          {type === 'comida' ? (
                            <p
                              className="favorite-category"
                              data-testid={ `${index}-horizontal-top-text` }
                            >
                              {`${area} - ${category}`}
                            </p>
                          ) : (
                            <p
                              className="favorite-category"
                              data-testid={ `${index}-horizontal-top-text` }
                            >
                              {alcoholicOrNot}
                            </p>
                          )}
                          <button
                            type="button"
                            className="favorite-title"
                            onClick={ () => handleRedirect(type, id) }
                            data-testid={ `${index}-horizontal-name` }
                          >
                            {name}
                          </button>
                        </div>
                        <div className="favorites-share-fav">
                          <div>
                            <input
                              type="image"
                              src={ shareIcon }
                              alt="share icon"
                              data-testid={ `${index}-horizontal-share-btn` }
                              onClick={ () => handleShare(type, id) }
                            />
                          </div>
                          <div>
                            <input
                              type="image"
                              src={ blackHeart }
                              alt="favorite icon"
                              data-testid={ `${index}-horizontal-favorite-btn` }
                              onClick={ () => handleFavorite(id) }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
            </div>
          ) : (
            <p>Nenhuma receita favorita.</p>
          )}
        </div>
      </section>
    </>
  );
}
