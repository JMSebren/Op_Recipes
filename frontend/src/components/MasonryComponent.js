import React, { useState } from 'react';
import { getAllRecipes } from './recipeApi';

const MasonryComponent = () => {

    // STATE BLOCK
    const [ children, setChildren ] = useState([]);
    const [ columnCount, setColumnCount ] = useState(0);
    const [ colItemsCount, setColItemsCount ] = useState( columnCount / children.length );


    return (
        <div>
            
        </div>

    );
    
}

export default MasonryComponent;