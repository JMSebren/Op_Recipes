import React from 'react';
import Image from './image.js';
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
import foodDisplay from '../assets/food_display.jpg'

function Home () {
    return (

        <div className="relative flex flex-col flex-grow w-full min-h-full overflow-hidden pinstripe">
            <div className="flex flex-grow"></div>
            <div className="absolute top-1/4 left-1/2">
                <p className="absolute text-4xl text-neutral-900 -top-14 -left-48">Search</p>
                <p className="absolute w-24 text-5xl text-neutral-900 top-12 -left-4">Save</p>
                <p className="absolute w-24 text-red-700 -top-10 left-52 text-7xl">Share</p>
            </div>
            {/* <img className="absolute top-72 left 72" src={foodDisplay} ></img> */}
            {/* <div className="flex flex-row justify-between flex-1 gap-8 mx-12 overflow-hidden ">
                <div className="relative flex flex-col justify-end gap-y-4 -bottom-16">
                    <Image source={food9} height="h-[22rem]" width="w-54" />
                    <Image source={food2}  height="h-[22rem]" width="w-54" />
                </div>
                <div className="relative flex flex-col justify-end bottom-28">
                    <Image source={food3}  height="h-[22rem]" width="w-54" />
                </div>
                <div className="relative flex flex-col justify-end gap-y-8 -bottom-56">
                    <Image source={food4}  height="h-[22rem]" width="w-54"/>
                    <Image source={food10} height="h-[22rem]" width="w-54" />
                </div>
                <div className="relative flex flex-col justify-end -bottom-20">
                    <Image source={food6} height="h-[22rem]" width="w-54" />
                </div>
                <div className="relative flex flex-col justify-end -bottom-4">
                    <Image source={food7} height="h-[22rem]" width="w-54" />
                </div>
                <div className="relative flex flex-col justify-end bottom-32">
                    <Image source={food8} height="h-[22rem]" width="w-54" />
                </div>
                <div className="relative flex flex-col justify-end gap-y-16 -bottom-24">
                    <Image source={food1} height="h-[22rem]" width="w-54" />
                    <Image source={food5} height="h-[22rem]" width="w-54" />
                </div>
               <div className="absolute left-0 w-full h-24 bottom-10 bg-gradient-to-t from-stone-900 to-transparent"></div>
            </div> */}
            {/* <footer className="h-16 border-t bg-stone-800 "> */}
            <div className="absolute w-56 h-56 rounded-full -right-16 -bottom-16 bg-neutral-900">

            </div>
            <footer className="h-16 border-t bg-neutral-900 ">
                <p className="text-base font-medium leading-[3.75rem] text-center text-white align-middle flex-end">Get Started</p>
            </footer>
        </div>            

    )
}

export default Home;