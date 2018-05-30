import React from 'react';

import './heading.css';

const Heading = ({ level, text }) => {
    let cssClass = "heading-atom";
    
    switch(level) {
        default:
        case 1:
        return <h1 className={cssClass}>{text}</h1>;
        break;
        
        case 2:
        return <h2 className={cssClass}>{text}</h2>;
        break;
        
        case 3:
        return <h3 className={cssClass}>{text}</h3>;
        break;
        
        case 4:
        return <h4 className={cssClass}>{text}</h4>;
        break;
        
        case 5:
        return <h5 className={cssClass}>{text}</h5>;
        break;
        
        case 6:
        return <h6 className={cssClass}>{text}</h6>;
        break;
    }
}

export default Heading;