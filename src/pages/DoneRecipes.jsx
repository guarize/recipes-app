import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../styles/Favorites.css';

export default function DoneRecipes() {
  const history = useHistory();

  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    } else {
      setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
  }, []);

  const handleShare = (type, id) => {
    const COPIED_MESSAGE = 4000;

    setIsCopied(true);
    setInterval(() => {
      setIsCopied(false);
    }, COPIED_MESSAGE);
    const recipePath = `${
      window.location.href.split('/receitas-feitas')[0]
    }/${type}s/${id}`;
    copy(recipePath);
  };

  const handleFavorite = (id) => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoritesFilter = localFavorites.filter(
      (favorite) => favorite.id !== id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesFilter));
  };

  const handleRedirect = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <>
      <Header title="Receitas Feitas" searchHidden />
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
          {doneRecipes.length ? (
            <div className="favorites-container">
              {doneRecipes
                .filter((recipe) => recipe.type.includes(filter))
                .map(
                  (
                    {
                      id,
                      type,
                      category,
                      area,
                      alcoholicOrNot,
                      name,
                      image,
                      doneDate,
                      tags,
                    },
                    index,
                  ) => (
                    <div key={ id } className="favorite-recipe">
                      { console.log(tags) }
                      <p
                        className="favorite-done-date"
                        data-testid={ `${index}-horizontal-done-date` }
                      >
                        {doneDate}
                      </p>
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
                        {tags.length > 0 && (
                          <div className="favorite-tags">
                            {tags.map((tag) => (
                              <p
                                data-testid={ `${index}-${tag}-horizontal-tag` }
                                key={ tag }
                              >
                                {tag}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ),
                )}
            </div>
          ) : (
            <p>Nenhuma receita feita.</p>
          )}
        </div>
      </section>
    </>
  );
}
