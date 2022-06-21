import React, { useState, useEffect } from 'react';
import nomad from '../assets/cyber_nomad.png';
// import RecipeForm from './components/recipeForm.js';

const RecipeModal = ({ setRecipeIsOpen }) => {

    const [ingredientCounter, setIngredientCounter] = useState(1);
    const [stepsCounter, setStepsCounter] = useState(1);
    const [section, setSection] = useState('ingredients');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [about, setAbout] = useState( '');
    const [result, setResult] = useState({});

    useEffect(() => console.log(result), [result]);

    const handleClickAdd = (type) => {
        if (type === 'ingredient') {
            let temp = ingredients.map((ing) => ing);
            setIngredientCounter(ingredientCounter + 1);
            temp.push("");
            setIngredients(temp);

        } else if (type === 'step') {
            let temp = steps.map((ing) => ing);
            setStepsCounter(stepsCounter + 1);
            temp.push("");
            setSteps(temp);
        }
    }

    /*     const handleSubmit = (e) => {
            e.preventDefault();
    
            let temp = {
                "ingredients" : ingredients,
                "steps" : steps,
                "about" : about
            };
    
            setResult( result => ({
                ...result,
                ...temp
            }) );
    
            setIngredientCounter(1);
            setStepsCounter(1);
            setIngredients([]);
            setSteps([]);
            setAbout('');
    
            document.getElementById("recipe").reset();
        } */

    const handleChange = (e, index, type) => {
        if (type === "ingredient") {
            let temp = ingredients.map((ing) => ing);
            temp[index] = e.target.value;
            setIngredients(temp);
            console.log(ingredients);
        } else if (type === 'step') {
            let temp = steps.map((ing) => ing);
            temp[index] = e.target.value;
            setSteps(temp);
            console.log(steps);
        } else if (type === 'about') {
            let temp;
            temp = e.target.value;
            setAbout(temp);
            console.log(about);
        }

    }

    const handleChangeSection = () => {
        switch(section) {
            case 'ingredients':
                setSection('steps');
                break;
            case 'steps':
                setSection('about');
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // updateRecipe();
        document.querySelector("#recipe").reset();
    }

    const handleClose = () => {
        setRecipeIsOpen(false);
    }

    let fieldSet;

    if (section === 'ingredients') {
        fieldSet = (
            <fieldset id="ingredientFields" className="space-y-2">
                <legend className="w-full ml-4 text-left text-2xl">Ingredients</legend>
                {Array.from(Array(ingredientCounter)).map((i, index) => {
                    return (
                        <div key={i} className={`${index} ingredientRow flex flex-row space-x-4`}>
                            <input
                                type="text"
                                onChange={(e) => { handleChange(e, index, 'ingredient') }}
                                name="ingredients"
                                placeholder="Find ingredient"
                                className="h-8 w-72 ml-4 pl-4 bg-gray-200 rounded-full"
                            />
                            <select name="ingredients-quant">
                                <option value="">Quantity</option>
                                <option value="1/8">1/8</option>
                                <option value="1/4">1/4</option>
                                <option value="1/2">1/2</option>
                                <option value="1/3">1/3</option>
                                <option value="2/3">2/3</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                            <select name="ingredients-unit">
                                <option value="">Unit</option>
                                <option value="tbsp">tbsp</option>
                                <option value="tsp">tsp</option>
                                <option value="cup">cup</option>
                                <option value="oz">oz</option>
                                <option value="lb">lb</option>
                                <option value="gr">gr</option>
                                <option value="kg">kg</option>
                            </select>
                            <button
                                type="button"
                                onClick={() => handleClickAdd('ingredient')}
                                className="addNew w-8 h-8 bg-gray-200 rounded-full"
                            >
                                +
                            </button>
                        </div>
                    )
                })}
            </fieldset>
        )
    } else if (section === 'steps') {
        fieldSet = (
            <fieldset className="space-y-2">
                <legend className="w-full text-center">Steps</legend>
                {Array.from(Array(stepsCounter)).map((i, index) => {
                    return (
                        <div key={i} className={`${index} flex flex-row w-full space-x-4`}>
                            <textarea
                                name="steps"
                                onChange={(e) => { handleChange(e, index, 'step') }}
                                placeholder="Enter directions . . ."
                                className="h-16 w-3/4 ml-4 pl-4 pt-px bg-gray-200 rounded-xl"
                            />
                            <button
                                type="button"
                                onClick={() => handleClickAdd('step')}
                                className="addNew w-8 h-8 bg-gray-200 rounded-full"
                            >
                                +
                            </button>
                        </div>
                    )
                })}
            </fieldset>
        )
    } else if (section === 'about') {
        fieldSet = (
            <fieldset className="space-y-2">
                <legend className="w-full text-center">About</legend>
                <textarea
                    name="steps"
                    onChange={(e) => { handleChange(e, 0 ,'step') }}
                    placeholder="Enter description . . ."
                    className="h-16 w-3/4 ml-4 pl-4 pt-px bg-gray-200 rounded-xl"
                />
            </fieldset>
        )
    }

    return (
        <div className="h-full w-full absolute top-0 left-0 bg-zinc-800/90 z-10">
            <div className="h-4/5 w-3/5 absolute left-1/4 top-24 bg-neutral-100 rounded-2xl">
                <div className="flex justify-center items-center h-full w-full">
                    <button
                        className="h-8 w-8 absolute -top-4 -right-4 bg-neutral-100 rounded-full"
                        onClick={() => handleClose()}
                    >
                        x
                    </button>
                    {/* <button 
                        className="h-8 w-8 absolute -top-4 -right-4 bg-neutral-100 rounded-full" 
                    >
                        x
                    </button> */}
                    <form id="recipe" className="flex flex-row h-full w-full mt-16" onSubmit={handleSubmit}>
                        <div id="detailsContainer" className="flex flex-col items-center w-1/4 ">
                            <fieldset className="flex flex-col items-center w-full space-y-2">
                                <img src={nomad} width={150} height={150} alt="nomad"
                                    className="object-cover rounded-full mt-8 mb-6"></img>
                                <input
                                    type="text"
                                    name="details"
                                    className="h-8 w-64 pl-4 bg-gray-200 rounded-full"
                                    placeholder="Recipe Name"></input>
                                <input
                                    type="text"
                                    name="details"
                                    className="h-8 w-64 pl-4 bg-gray-200 rounded-full"
                                    placeholder="Author"></input>
                                <input
                                    type="text"
                                    name="details"
                                    className="h-8 w-64 pl-4 bg-gray-200 rounded-full"
                                    placeholder="National Origin"></input>
                                <div className="flex flex-row justify-between w-64">
                                    <label
                                        type="text"
                                        name="details"
                                        className="h-8 w-32 pl-4"> Prep Time</label>
                                    <select className="h-8 w-24 pl-4 bg-gray-200 rounded-full">
                                        <option value="" className="text-gray-400">hr:mn</option>
                                        <option value="5 min">00:05</option>
                                        <option value="10 min">00:10</option>
                                        <option value="15 min">00:15</option>
                                        <option value="20 min">00:20</option>
                                        <option value="30 min">00:30</option>
                                        <option value="45 min">00:45</option>
                                        <option value="1 hr">01:00</option>
                                    </select>
                                </div>
                                <div className="flex flex-row justify-between w-64">
                                    <label
                                        type="text"
                                        name="details"
                                        className="h-8 w-32 pl-4"> Cook Time</label>
                                    <select className="h-8 w-24 pl-4 bg-gray-200 rounded-full">
                                        <option value="" className="text-gray-400">hr:mn</option>
                                        <option value="5 min">00:05</option>
                                        <option value="10 min">00:10</option>
                                        <option value="15 min">00:15</option>
                                        <option value="20 min">00:20</option>
                                        <option value="30 min">00:30</option>
                                        <option value="45 min">00:45</option>
                                        <option value="1 hr">01:00</option>
                                        <option value="1 hr 15 min">01:15</option>
                                        <option value="1 hr 15 min">01:30</option>
                                        <option value="1 hr 45 min">01:45</option>
                                        <option value="2 hr">02:00</option>
                                        <option value="2 hr 15 min">02:15</option>
                                        <option value="2 hr 30 min">02:30</option>
                                        <option value="2 hr 45 min">02:45</option>
                                        <option value="3 hr">03:00</option>
                                    </select>
                                </div>
                            </fieldset>
                        </div>
                        <div className="flex flex-col w-3/4 align-center">
                            {fieldSet}
                            <button onClick={ () => handleChangeSection()}>{`Next ->`} </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RecipeModal;