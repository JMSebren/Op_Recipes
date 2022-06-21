import React,{ useState, useEffect } from 'react';

const RecipeForm = () => {
    const [ingredientCounter, setIngredientCounter] = useState(1);
    const [stepsCounter, setStepsCounter] = useState(1);
    const [ingredients, setIngredients] = useState( [] );
    const [steps, setSteps] = useState( [] );
    const [result, setResult] = useState( {} );

    useEffect( () => console.log(result), [result] );

    const handleClickAdd = (type) => {
        if (type === 'ingredient') {
            let temp = ingredients.map( (ing) => ing);
            setIngredientCounter(ingredientCounter + 1);
            temp.push("");
            setIngredients(temp);

        } else if (type === 'step') {
            let temp = steps.map( (ing) => ing);
            setStepsCounter(stepsCounter + 1);
            temp.push("");
            setSteps(temp);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let temp = {
            "ingredients" : ingredients,
            "steps" : steps
        };

        setResult( result => ({
            ...result,
            ...temp
        }) );

        setIngredientCounter(1);
        setStepsCounter(1);
        setIngredients([]);
        setSteps([]);

        document.getElementById("recipeForm").reset();
    }

    const handleChange = (e, index, type) => {
        if (type === "ingredient") {
            let temp = ingredients.map( (ing) => ing);
            temp[index] = e.target.value;
            setIngredients(temp);
            console.log(ingredients);
        } else if (type === 'step') {
            let temp = steps.map( (ing) => ing);
            temp[index] = e.target.value;
            setSteps(temp);
            console.log(steps);
        }
        
    }

    /* 
        -steps and ingredients each saved in an array(or to a key in recipeData, not sure on this one)
        -after entering the info, the user presses a button to save the current line, and create a new one
        -onClick should append the current info to the correct array, turn the input into matching text, and create a new input/text area
            below the last one
        -submit button will have data entered be transformed into JSON, and then sent to the backend for db insertion

        -may create an 'origin' prop that will change how the form is used/displayed. origin would be 'page' and 'modal'
    */
    return (
        <form onSubmit={handleSubmit} id="recipeForm" className="flex flex-row justify-around w-full mt-4">
            <div className="flex flex-col w-1/3 align-center">
                <fieldset  id="ingredientFields" className="space-y-2">
                    <legend className="w-full text-center">Ingredients</legend>
                    {Array.from(Array(ingredientCounter)).map((i,index) => {
                        return (
                            <div key={i} className={`${index} ingredientRow flex flex-row space-x-4`}>
                                <input 
                                    type="text" 
                                    onChange= {(e) => {handleChange(e, index, 'ingredient')}}
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
                        
            </div>
            <div className="flex flex-col w-1/3">
            <fieldset className="space-y-2">
                    <legend className="w-full text-center">Steps</legend>
                    {Array.from(Array(stepsCounter)).map((i,index) => {
                        return (
                            <div key={i} className={`${index} flex flex-row w-full space-x-4`}>
                                <textarea 
                                    name="steps" 
                                    onChange= {(e) => {handleChange(e, index, 'step')}}
                                    placeholder="Enter directions . . ." 
                                    className="h-16 w-full ml-4 pl-4 pt-px bg-gray-200 rounded-xl" 
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
            </div>
            <button type="submit" >Submit</button>
        </form>
    )
}

export default RecipeForm;