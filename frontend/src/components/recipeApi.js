import axios from 'axios';

const BASE_URL_RECIPE = "http://localhost:8080/api/recipe";
const BASE_URL_INGREDIENTS = "http://localhost:8080/api/ingredients";

// export const addRecipe = (name, author, cookTime, prepTime, about, steps, ingredients) => axios({
//     url: `${BASE_URL_RECIPE}/add`,
//     headers: {
//         "Authorization": localStorage.getItem('access_token'),
//         "Content-Type": "application/json"
//     },
//     method: 'post',
    
//     data: {
//         "name": name,
//         "author": author,
//         "cookTime": cookTime,
//         "prepTime": prepTime,
//         "about": about,
//         "steps": steps,
//         "ingredients": ingredients
//     },
//     response: 'json'
// })


export const getIngredients = () => axios ({
    url: `${BASE_URL_INGREDIENTS}/all`,
    method: 'get',
    response: 'json'
})

export const getUnits = () => axios ({
    url: `${BASE_URL_INGREDIENTS}/allUnits`,
    method: 'get',
    response: 'json'
})

export const getByUser = (id) => axios({
    url: `${BASE_URL_INGREDIENTS}/all`,
    method: 'get',
    params: {
        id: id
    },
    response: 'json'
})

export const addIngredient = (name) => axios ({
    url: `${BASE_URL_INGREDIENTS}/add`,
    method: 'post',
    data: {
        "name": name
    },
    response: 'json'
})

export const addRecipe = (name, author, cookTime, prepTime, about, steps, ingredients) => axios({
    url: `${BASE_URL_RECIPE}/add`,
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

export const deleteRecipe = (id) => axios.post(
    `${BASE_URL_RECIPE}/remove`,
    {},
    {
        params: {
            id: id
        }
    }
);