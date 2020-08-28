
const baseEndpoint = "http://www.recipepuppy.com/api";
const proxy = 'https://cors-anywhere.herokuapp.com/';

const form = document.querySelector('form.search');
const recipesEl = document.querySelector('.recipes');
const ingCheckboxes = Array.from(form.querySelectorAll('[type="checkbox"'));
console.log(ingCheckboxes);

async function fetchRecipes(query, ingredients) {

    const ingredientString = ingredients.join(',');
    const res = await fetch(`${proxy}${baseEndpoint}?q=${query}&i=${ingredientString}`);
    console.log(res); 
    const data = await res.json();
    console.log(data);
    return data;
}


const handleSubmit = async event => {
    event.preventDefault();
    const el = event.currentTarget;
    console.log(el.query.value);
    fetchAndDispay(el.query.value);
    
}

async function fetchAndDispay(query) {

    // turn the form off 
    form.submit.disabled = true;

    // handle checkboxes here 

    let ingredients = [];

    ingCheckboxes.forEach(checkbox => {
        if(checkbox.checked) {
            ingredients.push(checkbox.name);
        }
    });

    // submit the search
    const recipes = await fetchRecipes(query, ingredients);

    // turn the form on
    form.submit.disabled = false;
    console.log(recipes);
    displayRecipes(recipes.results);
}

function displayRecipes(recipes) {
    console.log('Create HTML');
    const html = recipes.map(recipe => {
        return `<div class="recipe">
                    <h2>${recipe.title}</h2>
                    <p>${recipe.ingredients}</p>
                    ${recipe.thumbnail && `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`}

                    <a href="${recipe.href}">View ${recipe.title}</a>
                </div>`;
    });
    recipesEl.innerHTML = html.join('');
}

form.addEventListener('submit', handleSubmit);
fetchAndDispay('pizza');
