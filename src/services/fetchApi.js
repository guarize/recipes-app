export default async function fetchRecipes(type, endpoint) {
  if (type === 'Comidas') {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/${endpoint}`)
      .then((response) => response.json()).catch(() => []);
    return meals;
  }
  if (type === 'Bebidas') {
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${endpoint}`)
      .then((response) => response.json()).catch(() => []);
    return drinks;
  }
}
