import React from 'react';
import { Link } from 'react-router-dom';

const TitledImage = props => (
    

    <div className={`${props.height} ${props.width} ${props.color}`}>
        {/* <Link /></Link> */}
        {/* <img src={props.source} alt="" className={`${props.height} ${props.width} object-cover`} /> */}
    </div>
);

export default TitledImage;