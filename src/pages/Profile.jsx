import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

export default function Profile() {
  const history = useHistory();
  const [userEmail, setEmail] = React.useState('');

  React.useEffect(() => {
    if (localStorage.getItem('user')) {
      const emailLocal = localStorage.getItem('user');
      const emailObj = JSON.parse(emailLocal);
      setEmail(emailObj.email);
    }
  }, []);

  function handleClickFavorite() {
    history.push('/receitas-favoritas');
  }

  function handleClickDone() {
    history.push('/receitas-feitas');
  }

  function handleClickLogOut() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <>
      <Header title="Perfil" searchHidden />
      <div className="profile-wrapper">
        <p data-testid="profile-email">{userEmail}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleClickDone }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleClickFavorite }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClickLogOut }
        >
          Sair
        </button>
      </div>
      <Footer />
    </>
  );
}
