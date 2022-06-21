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

function Home () {
    return (

        <div className="flex flex-col flex-grow relative w-full min-h-full bg-neutral-100">
            <div className="absolute top-1/4 left-1/2">
                <p className="absolute -top-14 -left-48 text-4xl">Search</p>
                <p className="absolute top-12 -left-4 w-24 text-5xl">Save</p>
                <p className="absolute -top-10 left-52 w-24 text-7xl text-red-700">Share</p>
            </div>
            <div className="flex flex-row flex-1 gap-8 justify-between overflow-hidden mx-12 ">
                <div className="flex flex-col gap-y-4 justify-end relative -bottom-16">
                    <Image source={food9} height="h-[22rem]" width="w-54" />
                    <Image source={food2}  height="h-[22rem]" width="w-54" />
                </div>
                <div className="flex flex-col justify-end relative bottom-28">
                    <Image source={food3}  height="h-[22rem]" width="w-54" />
                </div>
                <div className="flex flex-col gap-y-8  justify-end relative -bottom-56">
                    <Image source={food4}  height="h-[22rem]" width="w-54"/>
                    <Image source={food10} height="h-[22rem]" width="w-54" />
                </div>
                <div className="flex flex-col justify-end relative -bottom-20">
                    <Image source={food6} height="h-[22rem]" width="w-54" />
                </div>
                <div className="flex flex-col justify-end relative -bottom-4">
                    <Image source={food7} height="h-[22rem]" width="w-54" />
                </div>
                <div className="flex flex-col justify-end relative bottom-32">
                    <Image source={food8} height="h-[22rem]" width="w-54" />
                </div>
                <div className="flex flex-col gap-y-16 justify-end relative -bottom-24">
                    <Image source={food1} height="h-[22rem]" width="w-54" />
                    <Image source={food5} height="h-[22rem]" width="w-54" />
                </div>
               <div className="absolute bottom-10 left-0 w-full h-24 bg-gradient-to-t from-neutral-100 to-transparent"></div>
            </div>
            <footer className="border-t h-10 bg-red-700 ">
                <p className="text-center text-white font-medium text-base leading-10 align-middle">Get Started</p>
            </footer>
        </div>            

    )
}

export default Home;