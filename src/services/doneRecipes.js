const handleCompleteRecipe = (recipe, history, recipeInfo) => {
  const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  if (!localDoneRecipes) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }

  localStorage.setItem(
    'doneRecipes',
    JSON.stringify([
      ...JSON.parse(localStorage.getItem('doneRecipes')),
      {
        ...recipeInfo,
        doneDate: new Date().toLocaleDateString(),
        tags: recipe.strTags.split(',') || '',
      },
    ]),
  );

  history.push('/receitas-feitas');
};

export default handleCompleteRecipe;
