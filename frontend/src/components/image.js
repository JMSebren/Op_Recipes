import React from 'react';

const Image = props => (
    

    <div className={`relative ${props.top}`} >
        <img src={props.source} alt="" className={`${props.height} ${props.width} rounded-3xl object-cover`} />
    </div>
    
);
// h-[22rem] w-54

export default Image;