import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import RecipesContext from '../contexts/RecipesContext';
import deconstructedFoodSvg from '../images/Deconstructed-food.svg';
import waveSvg from '../images/wave.png';
import '../styles/Login.css';

export default function Login() {
  const history = useHistory();

  const { isValidEmail,
    setValidEmail,
    isValidPassword,
    setValidPassword,
  } = useContext(RecipesContext);

  const [emailValue, setEmailValue] = useState('');

  const handleEmail = ({ target: { value } }) => {
    // Regex reference https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (regex.test(value)) {
      setValidEmail(true);
      setEmailValue(value);
    } else {
      setValidEmail(false);
    }
  };

  const handlePassword = ({ target: { value } }) => {
    const PASSWORD_LENGTH = 6;
    if (value.length > PASSWORD_LENGTH) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email: emailValue || '' }));
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        cocktails: {},
        meals: {},
      }),
    );
    localStorage.setItem('doneRecipes', JSON.stringify([]));

    history.push('/comidas');
  };

  return (
    <>
      <img src={ waveSvg } alt="wave" className="login-wave" />
      <div className="meals">
        <img
          src={ deconstructedFoodSvg }
          alt="deconstructed food"
          className="login-img"
        />
        <form className="login-form">
          <div className="login-input-container">
            <AiOutlineUser color="#38d39f" fontSize={ 22 } />
            <input
              type="email"
              id="email-input"
              placeholder="E-mail"
              data-testid="email-input"
              autoComplete="false"
              onChange={ handleEmail }
            />
          </div>
          <div className="login-input-container">
            <RiLockPasswordLine color="#38d39f" fontSize={ 22 } />
            <input
              type="password"
              id="password-input"
              placeholder="Senha"
              data-testid="password-input"
              onChange={ handlePassword }
            />
          </div>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ !(isValidEmail && isValidPassword) }
            onClick={ handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}
