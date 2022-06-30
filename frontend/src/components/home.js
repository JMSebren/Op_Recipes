import React from 'react';
import foodDisplay from '../assets/food_display.png';
import blueDisplay from '../assets/blue_display.png';

function Home () {
    return (

        <div className="relative flex flex-col flex-grow w-full min-h-full overflow-hidden pinstripe">
            <div className="relative flex flex-row justify-center flex-grow min-w-full">
                <div id="welcome_text" className="relative top-36 left-40">
                    <p className="relative text-4xl text-neutral-900 top-4 -left-48">Search</p>
                    <p className="relative w-24 text-5xl text-neutral-900 top-20 -left-8">Save</p>
                    <p className="relative w-48 text-red-700 -top-12 left-48 text-7xl">Share</p>
                </div>
                <div className="absolute p-0 w-72 h-72 top-72 left-36">
                    <img className="box-border p-0 m-0 bg-red-700 border-red-700 rounded-full w-72 h-72 border-1" src={foodDisplay} alt="food display" ></img>
                </div>
                <div id="bubbles" className="absolute top-60 left-1/2 width-1/2 h-1/2">
                    <div className="relative w-32 h-32 border-4 border-red-700 rounded-full left-96 top-10 bg-neutral-100" >
                        {/* <img className="relative w-full h-full rounded-full" src={blueDisplay} alt="blue food display" ></img> */}
                    </div>
                    <div className="relative w-16 h-16 border-4 border-red-700 rounded-full left-[20rem] top-8 bg-neutral-100" ></div>
                    <div className="relative w-8 h-8 border-4 border-red-700 rounded-full left-56 top-10 bg-neutral-100" ></div>
                    <div className="relative w-4 h-4 bg-red-700 border-4 border-red-700 rounded-full left-36 top-10 " ></div>
                </div>
                <button className="relative w-56 h-16 text-2xl bg-red-700 rounded-full top-[30rem] -left-28 text-neutral-100">
                    Get Fooded
                </button>
            </div>
            
            <div className="absolute w-56 h-56 rounded-full -right-16 -bottom-16 bg-neutral-900">
            </div>
            <footer className="h-16 border-t bg-neutral-900 ">
                <p className="text-base font-medium leading-[3.75rem] text-center text-white align-middle flex-end">
                    Search for new recipes. Save your favourites. Share your creations.
                </p>
            </footer>
        </div>            

    )
}

export default Home;