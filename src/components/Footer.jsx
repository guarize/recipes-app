import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <footer data-testid="footer" className="footer-wrapper">
      <Link
        to="/bebidas"
        className={ pathname.split('/')[1].includes('bebidas') ? 'selected' : '' }
      >
        <input
          type="image"
          src={ drinkIcon }
          alt="drink icon"
          data-testid="drinks-bottom-btn"
          className={ pathname.split('/')[1].includes('bebidas') ? 'active' : '' }
        />
      </Link>
      <Link
        to="/explorar"
        className={ pathname.split('/')[1].includes('explorar') ? 'selected' : '' }
      >
        <input
          type="image"
          src={ exploreIcon }
          alt="explore icon"
          data-testid="explore-bottom-btn"
          className={ pathname.split('/')[1].includes('explorar') ? 'active' : '' }
        />
      </Link>
      <Link
        to="/comidas"
        className={ pathname.split('/')[1].includes('comidas') ? 'selected' : '' }
      >
        <input
          type="image"
          src={ mealIcon }
          alt="food icon"
          data-testid="food-bottom-btn"
          className={ pathname.split('/')[1].includes('comidas') ? 'active' : '' }
        />
      </Link>
    </footer>
  );
}
