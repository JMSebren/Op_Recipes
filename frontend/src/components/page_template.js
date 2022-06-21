import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Image from './image.js';
import TitledImage from './titledImage.js';
import RecipeForm from './recipeForm.js';
import nomad from '../assets/cyber_nomad.png';
import food1 from '../assets/food1.jpg';
import food2 from '../assets/food2.jpg';
import food3 from '../assets/food3.jpg';
import food4 from '../assets/food4.jpg';
import food5 from '../assets/food5.jpg';
import food6 from '../assets/food6.jpg';
import food7 from '../assets/food7.jpg';
import food8 from '../assets/food8.jpg';
import food9 from '../assets/food9.jpg';
import food10 from '../assets/food10.jpg';


// template for the profile, recipe_books, and recipe_page pages. should take in props to determine which page to render, and then return a page setup for that.

function Page (props) {

    const location = useLocation();
    const {state} = location
    const[type,setType] = useState(state.componentType);
    const imgWidth = "w-36";
    const imgHeight ="h-48";
    const top = 'top-12';

    // FORCES STATE UPDATE WHEN PAGES ARE VISITED VIA REACT-ROUTER LINKS - WILL NOT UPDATE OTHERWISE
    useEffect( () => { setType(state.componentType) } , [state.componentType]);

    const tImgWidth = "w-44";
    const tImgHeight = "h-44";
    const tImgCount = 23;

    const tImgDisplay = (val) => {
        let imgArr = [];
        for (let i=0; i<val;i++) {
            console.log('dispalying image');
            imgArr.push(< TitledImage width={tImgWidth} height={tImgHeight} />);
        }
        return imgArr;
    }

    // PROFILE PAGE LAYOUT
    const bgImgContainer  = (
        <div id="bgImgContainer" className="w-4/5 absolute left-72 top-8 z-0 ">
            <div className="flex flex-row justify-between">
                <Image source={food2}  top={top} height={imgHeight} width={imgWidth}/>
                <Image source={food5}  height={imgHeight} width={imgWidth}/>
                <Image source={food8}  top={top} height={imgHeight} width={imgWidth}/>
                <Image source={food1}  height={imgHeight} width={imgWidth}/>
                <Image source={food7}  top={top} height={imgHeight} width={imgWidth}/>
                <Image source={food10} height={imgHeight} width={imgWidth} />
                <Image source={food3}  top={top} height={imgHeight} width={imgWidth}/>
            </div>
        </div>
    );
    
    const profileDetails = (
        <div id="detailsContainer" className="flex flex-col items-center mt-12 mb-8 ml-16 w-1/6 bg-neutral-50 rounded-md shadow-md relative z-1">
            <div className="flex flex-col items-center w-full">
                <button className="absolute top-2 right-2 "> + </button>
                <img src={nomad} width={150} height={150} alt="nomad"
                    className="object-cover rounded-full mt-8 mb-6"></img>
                <p className="text-2xl font-semibold">Username</p>
                <p className="text-sm">FirstName LastName</p>
                <p className="text-sm">Email</p>
                <p className="">Location</p>
            </div>
            <div className="flex flex-col items-start w-full px-8 mt-2">
                <p className="">Recipes</p>
                <p className="">Saves</p>
            </div>
            <div className="w-full px-8 mt-2">
                <p className="">About me...</p>
            </div>
        </div>
    );

    const recipesContainer = (
        <div id="recipesContainer" className="flex flex-col w-5/6 mb-8 ml-8 mr-16 relative z-1">
            <div id="recipesContainer-buttons" className="flex flex-row grow mb-4">
                <div className="self-end">
                    <button className="bg-gray-900 text-neutral-100 rounded-full mr-2 w-20 h-8" >
                        Recipes
                    </button>
                    <button className="bg-neutral-50 text-gray-900 rounded-full w-20 h-8">Saved</button>
                </div>
                    
                    
            </div>
            <div id="recipesContainer-content" 
                 className="flex flex-row  flex-wrap justify-self-end justify-start gap-4 p-4 h-2/3 bg-neutral-50 
                            rounded-md shadow-md overflow-y-scroll">
                {tImgDisplay(tImgCount)}
            </div>
        </div>
    );

    // RECIPE_BOOKS PAGE LAYOUT
    const bookDetails = (
        <div id="detailsContainer" className="flex flex-col items-center mt-12 mb-8 ml-16 w-1/6 bg-neutral-50 rounded-md shadow-md relative z-1">
        <div className="flex flex-col items-center w-full">
            <button className="absolute top-2 right-2 "> + </button>
            <img src={nomad} width={150} height={150} alt="nomad"
                className="object-cover rounded-full mt-8 mb-6"></img>
            <p className="text-2xl font-semibold">BookName</p>
            <p className="text-sm">Author</p>
            <p className="text-sm">Tags</p>
            <p className="">National Origin</p>
        </div>
        <div className="flex flex-col items-start w-full px-8 mt-2">
            <p className="">Recipes</p>
            <p className="">Saves</p>
        </div>
        <div className="w-full px-8 mt-2">
            <p className="">About this book...</p>
        </div>
    </div>
    );

    const booksContainer = (
        <div id="booksContainer" className="flex flex-col w-5/6 mt-12 mb-8 ml-8 mr-16 relative z-1">
            <div id="booksContainer-buttons" className="flex flex-row grow mb-4">
                <div className="self-start">
                    <button className="bg-gray-900 text-neutral-100 rounded-full mr-2 w-20 h-8" >
                        + New
                    </button>
                    {/* <button className="bg-neutral-50 text-gray-900 rounded-full w-20 h-8">Saved</button> */}
                </div>        
            </div>
            <div id="booksContainer-content" className="flex flex-row justify-self-end h-full bg-neutral-50 rounded-md shadow-md"></div>
        </div>
    );
    // RECIPE_PAGE PAGE LAYOUT
    const recipeDetails = (
        <div id="detailsContainer" 
            className="flex flex-col items-center mt-12 mb-8 ml-16 w-1/6 bg-neutral-50 rounded-md shadow-md relative z-1">
            <div className="flex flex-col items-center w-full">
                <button className="absolute top-2 right-2 "> + </button>
                <img src={nomad} width={150} height={150} alt="nomad"
                    className="object-cover rounded-full mt-8 mb-6"></img>
                <p className="text-2xl font-semibold">RecipeName</p>
                <p className="text-sm">Author</p>
                <p className="text-sm">Tags</p>
                <p className="">National Origin</p>
            </div>
            <div className="flex flex-col items-start w-full px-8 mt-2">
                <p className="">Prep Time</p>
                <p className="">Cook Time</p>
            </div>
            <div className="w-full px-8 mt-2">
                <p className="">About this recipe...</p>
            </div>
        </div>
    );

    const recipeContainer = (
        <div id="recipeContainer" className="flex flex-col w-5/6 mt-12 mb-8 ml-8 mr-16 relative z-1">
            <div id="recipeContainer-buttons" className="flex flex-row grow mb-4">
                <div className="self-start">
                    <button className="bg-gray-900 text-neutral-100 rounded-full mr-2 w-20 h-8" >
                        Save
                    </button>
                    <button className="bg-neutral-50 text-gray-900 rounded-full w-20 h-8">Edit</button>
                    <button className="bg-neutral-50 text-gray-900 rounded-full w-20 h-8">Delete</button>
                </div>        
            </div>
            <div id="recipeContainer-content" className="flex flex-row justify-self-end h-full bg-neutral-50 rounded-md shadow-md">
                < RecipeForm />        
            </div>
        </div>
    );
    
    let detailsPanel;
    let contentPanel;
    let bgContainer;
    if ( type === 'profile') {
        bgContainer = bgImgContainer;
        detailsPanel = profileDetails;
        contentPanel = recipesContainer;

    } else if ( type === 'collections') {
        detailsPanel = bookDetails;
        contentPanel = booksContainer;
    } else if ( type === 'recipe') {
        detailsPanel = recipeDetails;
        contentPanel = recipeContainer;
    }else {
        bgContainer = null;
        detailsPanel = null;
        contentPanel = null;
    }
    return (

        <div className="flex flex-row flex-grow relative w-full min-h-full bg-neutral-100">
            {bgContainer}

            {detailsPanel}

            {contentPanel}
            
        </div>


    )
}


export default Page;