import React, {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getRecipeByUser } from '../adapters/recipeApi';
import Image from './image.js';
import TitledImage from './titledImage.js';
import nomad from '../assets/cyber_nomad.png';
import food1 from '../assets/food1.jpg';
import food2 from '../assets/food2.jpg';
import food3 from '../assets/food3.jpg';
import food5 from '../assets/food5.jpg';
import food7 from '../assets/food7.jpg';
import food8 from '../assets/food8.jpg';
import food10 from '../assets/food10.jpg';


// template for the profile, recipe_books, and recipe_page pages. should take in props to determine which page to render, and then return a page setup for that.
// 6/26/2022 - will probably be breaking these out into separate pages, or refactoring this to take some additional props to setup display.

function Page (props) {

    const location = useLocation();
    const {state} = location
    const[type,setType] = useState(state.componentType);
    const [ data, setData ] = useState([]);
    const imgWidth = "w-36";
    const imgHeight ="h-48";
    const top = 'top-12';

    // FORCES STATE UPDATE WHEN PAGES ARE VISITED VIA REACT-ROUTER LINKS - WILL NOT UPDATE OTHERWISE
    useEffect( () => { 
        setType(state.componentType);             
    } , [state.componentType]);

    useEffect( () => {
        const getRecipes = async() => await getRecipeByUser(localStorage.getItem('username'))
        .then( res => {
            setData(res.data);
            localStorage.setItem('userRecipes', JSON.stringify(res.data));
        } )

    // PULLS IN RECIPES OWNED BY THE CURRENT USER
    if(type === 'profile') {
        getRecipes(1);
    } 
    }, []);

    useEffect( () => {
        if (data.length > 0) {
            console.log(data[0]['name'])
        }       
    }, [data] );

    const tImgWidth = "w-44";
    const tImgHeight = "h-44";
    const dataCount = data.length;
    const tImgCount = 17;

    // CREATES AN ARRAY OF IMAGES. IMAGES DISPLAYED IN A BOX ON THE PAGE.
    // WILL EVENTUALLY BE UPDATING TO BE BASED ON RECIPES CREATED BY THE USER.
    // IMG URL'S WILL BE PASSED IN TO THE IMG COMPONENT.
    const tImgDisplay = (val) => {
        let imgArr = [];
        for(let i=0; i<dataCount; i++) {
            console.log('displaying user data');
            imgArr.push(
            <Link to="/recipe" index={i} >
                < TitledImage width={tImgWidth} height={tImgHeight} color={`bg-red-700`} />
            </Link>
            );
        }

        for (let i=0; i< (val - dataCount );i++) {
            console.log('dispalying image');
            imgArr.push(< TitledImage width={tImgWidth} height={tImgHeight} color={`bg-gray-700`} />);
        }
        return imgArr;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////     PROFILE PAGE LAYOUT    ///////////////////////////////////////////////
    const bgImgContainer  = (
        <div id="bgImgContainer" className="absolute z-0 w-4/5 left-72 top-8 ">
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
        <div id="detailsContainer" className="relative flex flex-col items-center w-1/6 mt-12 mb-8 ml-16 rounded-md shadow-md bg-neutral-50 z-1">
            <div className="flex flex-col items-center w-full">
                <button className="absolute top-2 right-2 "> + </button>
                <img src={nomad} width={150} height={150} alt="nomad"
                    className="object-cover mt-8 mb-6 rounded-full"></img>
                <p className="text-2xl font-semibold">Username</p>
                <p className="text-sm">FirstName LastName</p>
                <p className="text-sm">{localStorage.getItem('username')}</p>
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
        <div id="recipesContainer" className="relative flex flex-col w-5/6 mb-8 ml-8 mr-16 z-1">
            <div id="recipesContainer-buttons" className="flex flex-row mb-4 grow">
                <div className="self-end">
                    <button className="w-20 h-8 mr-2 bg-gray-900 rounded-full text-neutral-100" >
                        Recipes
                    </button>
                    <button className="w-20 h-8 text-gray-900 rounded-full bg-neutral-50">Saved</button>
                </div>
                    
                    
            </div>
            <div id="recipesContainer-content" 
                 className="flex flex-row flex-wrap justify-start gap-4 p-4 overflow-y-scroll rounded-md shadow-md hide-scrollbar justify-self-end h-2/3 bg-neutral-800">
                {tImgDisplay(tImgCount)}
            </div>
        </div>
    );

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////     RECIPE_BOOKS PAGE LAYOUT    //////////////////////////////////////////////
    const bookDetails = (
        <div id="detailsContainer" className="relative flex flex-col items-center w-1/6 mt-12 mb-8 ml-16 rounded-md shadow-md bg-neutral-50 z-1">
        <div className="flex flex-col items-center w-full">
            <button className="absolute top-2 right-2 "> + </button>
            <img src={nomad} width={150} height={150} alt="nomad"
                className="object-cover mt-8 mb-6 rounded-full"></img>
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
        <div id="booksContainer" className="relative flex flex-col w-5/6 mt-12 mb-8 ml-8 mr-16 z-1">
            <div id="booksContainer-buttons" className="flex flex-row mb-4 grow">
                <div className="self-start">
                    <button className="w-20 h-8 mr-2 bg-gray-900 rounded-full text-neutral-100" >
                        + New
                    </button>
                    {/* <button className="w-20 h-8 text-gray-900 rounded-full bg-neutral-50">Saved</button> */}
                </div>        
            </div>
            <div id="booksContainer-content" className="flex flex-row h-full rounded-md shadow-md justify-self-end bg-neutral-50"></div>
        </div>
    );

    
    let detailsPanel;
    let contentPanel;
    let bgContainer;
    if ( type === 'profile') {
        // bgContainer = bgImgContainer;
        detailsPanel = profileDetails;
        contentPanel = recipesContainer;

    } else if ( type === 'collections') {
        detailsPanel = bookDetails;
        contentPanel = booksContainer;
    } else {
        bgContainer = null;
        detailsPanel = null;
        contentPanel = null;
    }
    return (

        <div className="relative flex flex-row flex-grow w-full min-h-full bg-neutral-900">
            {bgContainer}

            {detailsPanel}

            {contentPanel}
            
        </div>


    )
}


export default Page;