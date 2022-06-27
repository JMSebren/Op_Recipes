import React,{ useState, useEffect } from 'react';
import nomad from '../assets/cyber_nomad.png';

const RecipePage = (  ) => {

    const dataInitial = JSON.parse(localStorage.getItem("userRecipes"));

    const [ data, setData ] = useState( dataInitial[0] );

    useEffect( () => {console.log(data)}, []);

    return (
        <div className="relative flex flex-row flex-grow w-full min-h-full bg-neutral-100">
            <div id="detailsContainer" 
                className="relative flex flex-col items-center w-1/6 mt-12 mb-8 ml-16 rounded-md shadow-md bg-neutral-50 z-1">
                <div className="flex flex-col items-center w-full">
                    <button className="absolute top-2 right-2 "> + </button>
                    <img src={nomad} width={150} height={150} alt="nomad"
                        className="object-cover mt-8 mb-6 rounded-full"></img>
                    <p className="text-2xl font-semibold">{data['name']}</p>
                    <p className="text-sm">{data['author']}</p>
                    <p className="text-sm">Tags</p>
                    <p className="">Cuisine</p>
                </div>
                <div className="flex flex-col items-start w-full px-8 mt-2">
                    <div className="flex flex-row justify-around w-full">
                        <p className="">Prep Time</p>
                        <p>{data['prepTime']}</p>
                    </div>
                    <div className="flex flex-row justify-around w-full">
                        <p className="">Cook Time</p>
                        <p>{data['cookTime']}</p>
                    </div>
                </div>
                <div className="w-full px-8 mt-2">
                    <p className="">{data['about']}</p>
                </div>
            </div>
            <div id="recipeContainer" className="relative flex flex-col w-5/6 mt-12 mb-8 ml-8 mr-16 z-1">
                <div id="recipeContainer-buttons" className="flex flex-row mb-4 grow">
                    <div className="self-start">
                        <button className="w-20 h-8 mr-2 bg-gray-900 rounded-full text-neutral-100" >
                            Save
                        </button>
                        <button className="w-20 h-8 text-gray-900 rounded-full bg-neutral-50">Edit</button>
                        <button className="w-20 h-8 text-gray-900 rounded-full bg-neutral-50">Delete</button>
                    </div>        
                </div>
                <div id="recipeContainer-content" className="flex flex-row h-full rounded-md shadow-md justify-self-end bg-neutral-50">
                    <div className="flex flex-col w-1/3 align-center">
                        <h2 className="w-full text-center">Ingredients</h2>
                        {Array.from(Array(data['ingredients'].length)).map((i,index) => {
                            return (
                                <div key={i} className={`${index} ingredientRow flex flex-row space-x-4`}>
                                    <p>{data['ingredients'][index]['ingredient']['name']}</p>
                                    <p>{data['ingredients'][index]['quantity']}</p>
                                    <p>{data['ingredients'][index]['unit']['name']}</p>
                                </div> 
                            )                       
                        })}   
                    </div>
                    <div className="flex flex-col w-1/3 align-center">    
                        <h2 className="w-full text-center">Steps</h2>
                        {Array.from(Array(data['steps'].length)).map((i, index) => {
                            return (
                                <div key={i} className={`${index} flex flex-row w-full space-x-4`}>
                                    <p>{data['steps'][index]['stepNumber']}</p>
                                    <p>{data['steps'][index]['description']}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipePage;