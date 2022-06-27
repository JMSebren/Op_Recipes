import axios from 'axios';

const token = localStorage.getItem('access_token');

const BASE_URL_RECIPE = "http://localhost:8080/api/recipe";
const BASE_URL_INGREDIENTS = "http://localhost:8080/api/ingredients";


///////////////////////////////////////////////////////
/////////////////  GET ITEMS  /////////////////////////
export const getIngredients = () => axios ({
    url: `${BASE_URL_INGREDIENTS}/all`,
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    },
    method: 'get',
    response: 'json'
})

export const getUnits = () => axios ({
    url: `${BASE_URL_INGREDIENTS}/allUnits`,
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    },
    method: 'get',
    response: 'json'
})

export const getRecipeByUser = (email) => axios({
    url: `${BASE_URL_RECIPE}/all`,
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    },
    method: 'get',
    params: {
        email: email
    },
    response: 'json'
})

export const getAllRecipes = () => axios({
    url: `${BASE_URL_RECIPE}/all`,
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    },
    method: 'get',
    response: 'json'
});


///////////////////////////////////////////////////////
///////////////  ADD NEW ITEMS  ///////////////////////
export const addIngredient = (name) => axios ({
    url: `${BASE_URL_INGREDIENTS}/add`,
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    },
    method: 'post',
    data: {
        "name": name
    },
    response: 'json'
})

export const addRecipe = (name, author, cookTime, prepTime, about, steps, ingredients) => axios({
    url: `${BASE_URL_RECIPE}/add`,
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    },
    method: 'post',   
    data: {
        "name": name,
        "author": author,
        "cookTime": cookTime,
        "prepTime": prepTime,
        "about": about,
        "steps": steps,
        "ingredients": ingredients
    },
    response: 'json'
});


///////////////////////////////////////////////////////
////////////////  DELETE ITEMS  ///////////////////////
export const deleteRecipe = (id) => axios({
    url: `${BASE_URL_RECIPE}/remove`,
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    },
    method: 'post',
    params: {
            id: id
    }

});