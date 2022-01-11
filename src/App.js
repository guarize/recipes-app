import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Aos from 'aos';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Details from './pages/Details';
import RecipesProvider from './providers/RecipesProvider';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreByArea from './pages/ExploreByArea';
import InProgress from './pages/InProgress';
import NotFound from './pages/NotFound';
import ReceitasFeitas from './pages/ReceitasFeitas';
import 'aos/dist/aos.css';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Foods } />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/comidas/:id" component={ Details } />
          <Route exact path="/bebidas/:id" component={ Details } />
          <Route exact path="/explorar/comidas" component={ ExploreFoods } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreDrinkIngredients }
          />
          <Route
            exact
            path="/explorar/comidas/area"
            component={ ExploreByArea }
          />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodIngredients }
          />
          <Route
            exact
            path="/comidas/:id/in-progress"
            component={ InProgress }
          />
          <Route
            exact
            path="/bebidas/:id/in-progress"
            component={ InProgress }
          />
          <Route
            exact
            path="/receitas-feitas"
            component={ ReceitasFeitas }
          />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
