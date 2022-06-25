import React, { useState, useEffect } from 'react';
import { addRecipe, getIngredients, getUnits, addIngredient } from './recipeApi';
import nomad from '../assets/cyber_nomad.png';
import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';


 const RecipeModal = ({ setRecipeIsOpen }) => {

    /* Id has been removed from the ingredient. Will update recipe on dB side to check if a matching ingredient is already in the db. 
        If an ingredient exists then it's id will be used in the recipe. If not, a new ingredient will be generated.
        That's how I hope it to go. We'll see if works properly after implementation.
        Will do the same with units, I guess.
    */

    // INITIAL STATE OBJECTS. READ BY THE RELEVANT USESTATE, AND USED AS THE TEMPLATE FOR UPDATING THAT STATE.
    const ingredientBaseInitial = {
        id: "",
        name: "",
        quantity: "",
        unit: { id: "", name: "" }
    }

    const unitInitial = {
        id: "",
        name: ""
    }

    const stepInitialState = {
        stepNumber: '',
        description: ''
    }

    let recipeData = {
        name: "",
        author: "",
        cookTime: "",
        prepTime: "",
        steps: [],
        ingredients: [],
        about: ""
    }

    // STATE BLOCK: GETS UPDATED AS INFORMATION IS ADDED, AND FINAL VALUE OF DATA GETS SENT THROUGH THE API CALL
    const [ingredientCounter, setIngredientCounter] = useState(1);
    const [stepsCounter, setStepsCounter] = useState(1);
    const [section, setSection] = useState('ingredients');
    const [data, setData] = useState(recipeData);
    const [ingredientList,setIngredientList] = useState([]);
    const [unitList,setUnitList] = useState([]);
    const [ingredient, setIngredient] = useState(ingredientBaseInitial);
    const [currIndex, setCurrIndex] = useState("");
    const [unit, setUnit] = useState(unitInitial);
    const [step, setStep] = useState(stepInitialState);

    useEffect( () => {
        const ingredientCall = async() => {
            getIngredients()
                .then( res => setIngredientList(res.data));
                
        }
        const unitCall = async() => {
            getUnits()
                .then( res => setUnitList(res.data));
            
    } 
    ingredientCall();   
    unitCall();
    } , []);
    
    // console.log(ingredientList[0]);
    // console.log(unitList[0]);
    
    const response = async() => await addRecipe(data.name, data.author, data.cookTime, data.prepTime, data.about, data.steps, data.ingredients)
            .then(res => console.log(res));


    // ADDS A NEW INPUT TO THE SECTION. UPDATES INGREDIENTCOUNTER, WHICH IS READ BY ARRAYFROM TO RENDER THE CORRECT NUMBER OF INPUTS.
    // ROOM IS MADE IN THE RELEVANT DATA ARRAY BY PUSHING AN EMPTY STRING TO THE END.
    // ARRAYFROM ASSIGNS AN INDEX TO EACH GENERATED INPUT, AND THAT IS USED TO TRACK WHICH INPUT TO UPDATE.
    const handleClickAdd = (e) => {
            let temp;            
            const {name} = e.target;
            
            if (e.target.name === 'ingredients') {
                setIngredientCounter(ingredientCounter + 1);
                temp = data.ingredients.map( (i) => i);
            } else if (e.target.name === 'steps') {
                setStepsCounter(stepsCounter + 1);
                temp = data.steps.map( (i) => i);   
            }
            temp.push("");
            setData({...data, [name]: temp});
    }

    // UPDATES STATE OF THE BASIC DETAILS OF A RECIPE, I.E. AUTHOR, RECIPE NAME, TIMINGS, ETC
    // BROKE THIS OUT FROM THE NEXT FUNCTION TO MAKE BOTH A BIT MORE NARROW IN SCOPE AND TO MAKE IT EASIER
    //      TO SEE POINTS OF FAILURE
    const handleSingleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);

        const { name, value } = e.target;
        // NOTE TO SELF - THIS NOTATION USES THE SPREAD OPERATORTO GET THE CURRENT VALUES IN DATA, AND THEN UPDATE ONLY THE RELEVANT SECTION
        // THE RELEVANT SECTION IS DETERMINED BY THE PROPERTY NAME PASSED IN BY E.TARGET.NAME. THE SAME GOES FOR THE VALUE, FED BY E.TARGET.VALUE
        setData({ ...data, [name]: value });
        console.log(data);
        console.log(data.prepTime);
    }

    // UPDATES STATE OF CURRINDEX TO THE PASSED INVALUE THEN READS VALUES TO DETERMINE WHICH UPDATE TO MAKE
    // DONE THIS WAY TO ALLOW FOR A BIT MORE CLEAR DELINEATION BETWEEN SECTIONS
    // NEED TO UPDATE UNIT TO MAKE IT CONFORM PROPERLY
    const handleSectionValueChange = (e, index, section) => {
        setCurrIndex(index);
        const { name, value} = e.target;
        console.log(index);
            
        if(section === 'ingredients') {
            switch (e.target.id) {
                case "ingredient_name":
                    setIngredient({...ingredient, [name]: value});
                    break;
                case "ingredient_quantity":
                    setIngredient({...ingredient, [name]: value});
                    break;
                case "unit_name":
                    console.log("unit:" + e.target.id);
                                  
                    break;
                default:
                    console.log(e.target.id);
                    break;
            } 
        } else if (section === 'unit') {
            setUnit({name: e.target.value}); 

        } else if (section === 'steps') {
            console.log(e.target.name + " " + e.target.value);
            setStep({stepNumber: index+1, description: e.target.value});           
        } else if (section === 'about') {
            setData({...data, about: e.target.value});
        }
    }

    // UPDATES DATA WHEN THE STATE OF ITS COMPONENTS GETS UPDATED
    // useEffect ENSURES THAT DATA IS GETTING THE CURRENT VALUES INSTEAD OF BEING ONE CHARACTER SHORT
    useEffect( () => {
        let temp = data.ingredients.map( (ing) => ing );
        temp[currIndex] = ingredient;
        setData({...data, ingredients: temp});

        console.log(`useEffect(ingredient): ${ingredient}`)
        console.log(ingredient);
    } , [ingredient] )

    useEffect( () => {
        setIngredient({...ingredient, unit: unit});

        console.log(`useEffect(unit)- Unit: ${unit}  Ingredient ${ingredient}`)
        console.log(ingredient);
    } , [unit] )

    useEffect( () => {
        let temp = data.steps.map( (ing) => ing );
        temp[currIndex] = step;
        setData({...data, steps: temp});
    } , [step] )

    useEffect( () => {
        console.log("useEffect(currIndex):")
        console.log(currIndex);
    } , [currIndex] )

    // useEffect( () => {console.log(data)}, [data] )
    

    // SWITCHES THE CURRENT SECTION WHEN THE NEXT BUTTON IS PUSHED
    const handleChangeSection = () => {
        switch (section) {
            case 'ingredients':
                setSection('steps');
                break;
            case 'steps':
                setSection('about');
                break;
            // case 'about':
                
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Entering handleSubmit, currIndex is: ${currIndex}`)
        // updateRecipe();
        // document.querySelector("#recipe").reset();
        // response();
        console.log(ingredientList);

        // getId(data.ingredients[0],0,"ingredient");
        data.ingredients.forEach( (ingredient, index) => getId(ingredient,index, 'ingredient'));
        data.ingredients.forEach( (ingredient, index) => getId(ingredient['unit'],index, 'unit'));

        console.log(data.ingredients);
        // console.log(getId(data.ingredients[0], 0, 'ingredient'));

        // if (testVal > 0 && testVal !== undefined) {
        //     const id= ingredientList[testVal]['id'];
        //     const name= ingredientList[testVal]['name'];
        //     setCurrIndex(0);
        //     setIngredient({ id , name});
        // } else {
        //     console.log("Failed. No matching items found. Return value: " + testVal);
        // }
       

    }

    // CHECK IF PROVIDED VALUE IS IN THE INGREDIENTLIST. SAVE THE ITEM ID AND INDEX IF FOUND, OR SET VALUES TO -1.
    // SEND VALUES TO SETID TO MAKE ANY NEEDED API CALLS AND UPDATE STATE.
    const getId = (item, itemIndex, itemType) => {
        console.log(`Entering getId, item is: ${item.name}`)
        let index;
        let id;
        if(itemType === 'ingredient') {
            index = ingredientList.findIndex( e => e.name === item.name);
            if(index >= 0) {
                id = ingredientList[index]['id'];
            } else {
                id = -1;
            }
        }

        if(itemType === 'unit') {
            index = unitList.findIndex( e => e.name === item.name);
            id = unitList[index]['id'];
        }
        console.log(`getId -- id: ${id}  itemIndex: ${itemIndex} foundIndex: ${index}`)
        setId(id, itemIndex, itemType);
    }
    // MAKES CALLS TO THE API AS NEEDED, AND UPDATES THE STATE USING THE PASSED IN OR CALLED DATA.
    const setId = (itemId, itemIndex, itemType) => {
        console.log(`Entering setId, before setCurrIndex, itemIndex is: ${itemIndex}`)
        setCurrIndex(itemIndex);
        console.log(`Current index location is: ${currIndex}`);
        const updateIngredientList = async() => {
            getIngredients()
                .then( res => setIngredientList(res.data));
        }
        
        const addNewIngredient = async(itemName) => {
            let ingredientId;
            let ingredientName;
            addIngredient(itemName)
                .then( res => {
                    console.log("Inside addIngredient:");
                    console.log(res.data);
                    ingredientId = res.data.id;
                    ingredientName = res.data.name;
                    setIngredient({...ingredient ,id: ingredientId, name: ingredientName});
                })
        } 

        let calledIngredientApi = false;

        if(itemType === 'ingredient') {
            if(itemId >= 0) {             
                console.log("Saving ingredient.")  
                setIngredient({...ingredient,  id: itemId, name: data.ingredients[itemIndex]['name'] });
            } else {
                console.log("Creating and saving new ingredient.")  
                calledIngredientApi = true;
                addNewIngredient(data.ingredients[itemIndex]['name']);
            }
        }

        if(itemType === 'unit') {
            console.log("Saving unit.") 
            setUnit({ id: itemId, name: data.ingredients[itemIndex]['unit']['name'] });
        }

        if(calledIngredientApi) {
            console.log(`Updating ingredients list`)
            updateIngredientList();
        }
    }


    // CLOSES THE MODAL ON X BUTTON PRESS
    const handleClose = () => {
        setRecipeIsOpen(false);
    }

    let proceedButton;
    let fieldSet;

    if(section === 'ingredients' || section === 'steps') {
        proceedButton = (
            <button type="button" id="proceed" onClick={() => handleChangeSection()}>Next </button>
        )
    } else if (section === 'about') {
        proceedButton = (
            <button
                type="button"
                id="submit"
                className= 'w-[4.5rem] h-8 text-center bg-gray-900 rounded-full text-neutral-100'
                onClick={(e) => handleSubmit(e)}>
                Submit
            </button>
        )
    }


    if (section === 'ingredients') {
        fieldSet = (
            <fieldset id="ingredientFields" className="space-y-2">
                <legend className="w-full ml-4 text-2xl text-left">Ingredients</legend>
                {Array.from(Array(ingredientCounter)).map((i, index) => {
                    return (
                        <div key={i} className={`${index} ingredientRow flex flex-row space-x-4`}>
                            <input
                                id="ingredient_name"
                                type="text"
                                name="name"
                                value={ data.ingredients['name'] }
                                onChange={(e) => { handleSectionValueChange(e, index, 'ingredients') }}
                                placeholder="Find ingredient"
                                className="h-8 pl-4 ml-4 bg-gray-200 rounded-full w-72"
                            />
                            <select 
                                id="ingredient_quantity"
                                name="quantity"
                                value={data.ingredients['quantity']}
                                onChange={(e) => { handleSectionValueChange(e, index, 'ingredients') }} >
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
                            
                            <select 
                                name="unit"
                                value={data.ingredients['unit']}
                                onChange={(e) => {handleSectionValueChange(e, index, 'unit')}} >
                                <option value="">Unit</option>
                                <option  value="ct">ct</option>
                                <option  value="mg">mg</option>
                                <option  value="g">g</option>
                                <option  value="kg">kg</option>
                                <option  value="oz">oz</option>
                                <option  value="lb">lb</option>
                                <option  value="fl oz">fl oz</option>
                                <option  value="cup">cup</option>
                                <option  value="pt">pt</option>
                                <option  value="qt">qt</option>
                                <option  value="gal">gal</option>
                                <option  value="tsp">tsp</option>
                                <option  value="tbsp">tbsp</option>
                                <option  value="mL">mL</option>
                                <option  value="L">L</option>
                                
                                <option value="cup">cup</option>
                                
                                
                            </select>
                            <button
                                type="button"
                                name="ingredients"
                                onClick={(e) => handleClickAdd(e)}
                                className="w-8 h-8 bg-gray-200 rounded-full addNew"
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
                                name="description"
                                value={data.steps['description']}
                                onChange={(e) => { handleSectionValueChange(e, index, 'steps') }}
                                placeholder="Enter directions . . ."
                                className="w-3/4 h-16 pt-px pl-4 ml-4 bg-gray-200 rounded-xl"
                            />
                            <button
                                type="button"
                                name="steps"
                                onClick={(e) => handleClickAdd(e)}
                                className="w-8 h-8 bg-gray-200 rounded-full addNew"
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
                    onChange={(e) => { handleSectionValueChange(e, 0, 'about') }}
                    placeholder="Enter description . . ."
                    className="w-3/4 h-16 pt-px pl-4 ml-4 bg-gray-200 rounded-xl"
                />
            </fieldset>
        )
    }

    return (
        <div className="absolute top-0 left-0 z-10 w-full h-full bg-zinc-800/90">
            <div className="absolute w-3/5 h-4/5 left-1/4 top-24 bg-neutral-100 rounded-2xl">
                <div className="flex items-center justify-center w-full h-full">
                    <button
                        className="absolute w-8 h-8 rounded-full -top-4 -right-4 bg-neutral-100"
                        onClick={() => handleClose()}
                    >
                        x
                    </button>
                    {/* <button 
                        className="absolute w-8 h-8 rounded-full -top-4 -right-4 bg-neutral-100" 
                    >
                        x
                    </button> */}
                    <form id="recipe" className="flex flex-row w-full h-full mt-16" onSubmit={handleSubmit}>
                        <div id="detailsContainer" className="flex flex-col items-center w-1/4 ">
                            <fieldset className="flex flex-col items-center w-full space-y-2">
                                <img src={nomad} width={150} height={150} alt="nomad"
                                    className="object-cover mt-8 mb-6 rounded-full"></img>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleSingleChange}
                                    className="w-64 h-8 pl-4 bg-gray-200 rounded-full"
                                    placeholder="Recipe Name"></input>
                                <input
                                    type="text"
                                    name="author"
                                    value={data.author}
                                    onChange={handleSingleChange}
                                    className="w-64 h-8 pl-4 bg-gray-200 rounded-full"
                                    placeholder="Author"></input>
                                <input
                                    type="text"
                                    name="details"
                                    className="w-64 h-8 pl-4 bg-gray-200 rounded-full"
                                    placeholder="National Origin"></input>
                                <div className="flex flex-row justify-between w-64">
                                    <label
                                        type="text"
                                        name="prepTime"
                                        className="w-32 h-8 pl-4"> Prep Time</label>
                                    <select 
                                        name="prepTime" 
                                        value={data.prepTime} 
                                        className="w-24 h-8 pl-4 bg-gray-200 rounded-full" 
                                        onChange={handleSingleChange}>
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
                                        name="cookTime"
                                        className="w-32 h-8 pl-4"> Cook Time</label>
                                    <select
                                        name="cookTime" 
                                        value={data.cookTime}
                                        onChange={handleSingleChange}
                                        className="w-24 h-8 pl-4 bg-gray-200 rounded-full">
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
                            {proceedButton}
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RecipeModal;