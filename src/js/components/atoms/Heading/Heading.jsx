import React from 'react';

import './heading.css';

const Heading = ({ level, text, withMargin, lineHeight }) => {
    let cssClass = `heading-atom ${!withMargin ? 'heading-atom--no-margin' : ''}`;
    let inlineStyle = {};

    if(lineHeight) inlineStyle.lineHeight = lineHeight;
    
    switch(level) {
        default:
        case 1:
        return <h1 className={cssClass} style={inlineStyle} >{text}</h1>;
        break;
        
        case 2:
        return <h2 className={cssClass} style={inlineStyle} >{text}</h2>;
        break;
        
        case 3:
        return <h3 className={cssClass} style={inlineStyle} >{text}</h3>;
        break;
        
        case 4:
        return <h4 className={cssClass} style={inlineStyle} >{text}</h4>;
        break;
        
        case 5:
        return <h5 className={cssClass} style={inlineStyle} >{text}</h5>;
        break;
        
        case 6:
        return <h6 className={cssClass} style={inlineStyle} >{text}</h6>;
        break;
    }
}

export default Heading;
